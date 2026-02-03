import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Star, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'
import CourseEnrollButton from '@/components/courses/course-enroll-button'

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
    title: course?.title ? `${course.title} - LearnHub` : 'Course - LearnHub',
    description: course?.description || 'Learn with LearnHub',
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const supabase = await createClient()
  const user = await getCurrentUser()

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single()

  if (!course) {
    notFound()
  }

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('order', { ascending: true })

  const { data: isEnrolled } = user
    ? await supabase
        .from('enrollments')
        .select('id')
        .eq('course_id', courseId)
        .eq('student_id', user.id)
        .single()
    : { data: null }

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

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Course Header */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge>{course.category}</Badge>
                <Badge variant="outline">{course.difficulty_level}</Badge>
              </div>
              <h1 className="text-4xl font-bold text-foreground text-balance">
                {course.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {course.description}
              </p>
            </div>

            <div className="flex gap-6 text-muted-foreground">
              {course.rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating.toFixed(1)} rating</span>
                </div>
              )}
              {course.students_count && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{course.students_count.toLocaleString()} students</span>
                </div>
              )}
              {course.duration_hours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration_hours} hours</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6 space-y-4 sticky top-24">
              <CourseEnrollButton
                courseId={courseId}
                isEnrolled={!!isEnrolled}
                user={user}
              />
              {isEnrolled && (
                <Link href={`/courses/${courseId}/lessons`}>
                  <Button className="w-full bg-transparent" variant="outline">
                    Continue Learning
                  </Button>
                </Link>
              )}
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                About This Course
              </h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {course.long_description || course.description}
              </p>
            </Card>

            {/* Lessons */}
            {lessons && lessons.length > 0 && (
              <Card className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  Course Content
                </h2>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="p-3 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <p className="text-sm text-muted-foreground">
                        Lesson {index + 1}
                      </p>
                      <p className="font-medium text-foreground">
                        {lesson.title}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Instructor Info */}
          <div>
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Instructor
              </h3>
              <div className="space-y-2">
                <p className="font-medium text-foreground">
                  {course.instructor_name || 'LearnHub Team'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {course.instructor_bio || 'Expert instructor'}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
