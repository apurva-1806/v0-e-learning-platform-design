import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'
import { redirect } from 'next/navigation'
import QuizClient from '@/components/quizzes/quiz-client'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  return {
    title: 'Quiz - LearnHub',
  }
}

export default async function QuizPage({
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

  // Fetch quiz
  const { data: quiz } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lessonId)
    .single()

  if (!quiz) {
    redirect(`/courses/${courseId}/lessons/${lessonId}`)
  }

  // Fetch quiz questions
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quiz.id)
    .order('order', { ascending: true })

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LearnHub</span>
          </Link>
          <Link href={`/courses/${courseId}/lessons/${lessonId}`}>
            <Button variant="ghost">Back to Lesson</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <QuizClient
          quiz={quiz}
          questions={questions || []}
          lessonId={lessonId}
          courseId={courseId}
          userId={user.id}
        />
      </div>
    </main>
  )
}
