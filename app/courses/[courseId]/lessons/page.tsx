import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, ChevronRight } from 'lucide-react'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const supabase = await createClient()
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single()

  return {
    title: `${course?.title || 'Course'} - Lessons - LearnHub`,
  }
}

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // Check enrollment
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('course_id', courseId)
    .eq('student_id', user.id)
    .single()

  if (!enrollment) {
    redirect(`/courses/${courseId}`)
  }

  // Fetch course and lessons
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single()

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('order', { ascending: true })

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LearnHub</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/courses">
              <Button variant="ghost">Browse Courses</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Course Info */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {course?.title}
          </h1>
          <p className="text-muted-foreground">
            {lessons?.length || 0} lessons • {enrollment?.progress_percentage || 0}% complete
          </p>
        </div>

        {/* Lessons List */}
        <div className="grid gap-4">
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/courses/${courseId}/lessons/${lesson.id}`}
              >
                <div className="p-6 border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Lesson {index + 1}
                      </p>
                      <h3 className="text-lg font-semibold text-foreground">
                        {lesson.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {lesson.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No lessons available yet
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
