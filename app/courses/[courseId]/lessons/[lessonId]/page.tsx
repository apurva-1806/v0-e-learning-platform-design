import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BookOpen, MessageCircle, ChevronRight, ChevronLeft } from 'lucide-react'
import { redirect } from 'next/navigation'
import LessonContent from '@/components/lessons/lesson-content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const { lessonId } = await params
  const supabase = await createClient()
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single()

  return {
    title: `${lesson?.title || 'Lesson'} - LearnHub`,
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const { courseId, lessonId } = await params
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

  // Fetch lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single()

  if (!lesson) {
    redirect(`/courses/${courseId}/lessons`)
  }

  // Fetch all lessons for navigation
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('order', { ascending: true })

  // Fetch quiz for this lesson
  const { data: quiz } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lessonId)
    .single()

  const currentIndex = allLessons?.findIndex(
    (l) => l.id === lessonId
  ) ?? -1
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson =
    currentIndex < (allLessons?.length ?? 0) - 1
      ? allLessons[currentIndex + 1]
      : null

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LearnHub</span>
          </Link>
          <div className="flex gap-4">
            <Link href={`/courses/${courseId}/lessons`}>
              <Button variant="ghost">Back to Course</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Lesson Content */}
        <LessonContent
          lesson={lesson}
          courseId={courseId}
          userId={user.id}
        />

        {/* Quiz Section */}
        {quiz && (
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Practice Quiz
            </h2>
            <p className="text-muted-foreground">
              Test your understanding of this lesson
            </p>
            <Link href={`/courses/${courseId}/lessons/${lessonId}/quiz`}>
              <Button>Take Quiz</Button>
            </Link>
          </Card>
        )}

        {/* AI Assistant */}
        <Card className="p-6 space-y-4 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Need help with this lesson?
            </h3>
          </div>
          <p className="text-muted-foreground">
            Our AI Learning Assistant is here to answer questions and explain concepts
          </p>
          <Link href="/ai-assistant">
            <Button variant="outline">Ask AI Assistant</Button>
          </Link>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 pt-8 border-t border-border">
          {previousLesson ? (
            <Link
              href={`/courses/${courseId}/lessons/${previousLesson.id}`}
              className="flex-1"
            >
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <ChevronLeft className="w-4 h-4" />
                Previous Lesson
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/courses/${courseId}/lessons/${nextLesson.id}`}
              className="flex-1"
            >
              <Button className="w-full justify-end gap-2">
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  )
}
