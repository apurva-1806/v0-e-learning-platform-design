import { getCurrentUser } from '@/lib/auth-actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Award, TrendingUp } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Progress - LearnHub',
  description: 'Track your learning progress',
}

export default async function ProgressPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // Fetch user's enrollments with progress
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('student_id', user.id)

  // Fetch completed lessons for statistics
  const { data: completedLessons } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('student_id', user.id)
    .eq('is_completed', true)

  // Calculate total lessons
  const { data: allLessons } = await supabase
    .from('lessons')
    .select('*')

  const totalLessons = allLessons?.length || 0
  const completedCount = completedLessons?.length || 0
  const overallProgress =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  // Calculate course averages
  const courseProgress = enrollments?.map((enrollment) => {
    const courseLessons = allLessons?.filter(
      (l) => l.course_id === enrollment.course_id
    ) || []
    const completed = completedLessons?.filter(
      (lp) =>
        lp.student_id === user.id &&
        courseLessons.some((l) => l.id === lp.lesson_id)
    ) || []

    return {
      ...enrollment,
      progress:
        courseLessons.length > 0
          ? Math.round((completed.length / courseLessons.length) * 100)
          : 0,
    }
  })

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
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Your Learning Progress
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your progress across all courses
          </p>
        </div>

        {/* Overall Statistics */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-3xl font-bold text-foreground">
                  {overallProgress}%
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                <p className="text-3xl font-bold text-foreground">
                  {completedCount}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                <p className="text-3xl font-bold text-foreground">
                  {enrollments?.length || 0}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Course Progress */}
        {courseProgress && courseProgress.length > 0 ? (
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Course Progress
            </h2>

            <div className="space-y-4">
              {courseProgress.map((enrollment) => (
                <Link
                  key={enrollment.id}
                  href={`/courses/${enrollment.course_id}`}
                >
                  <div className="p-4 border border-border rounded-lg hover:bg-accent transition-colors space-y-3 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">
                          {enrollment.courses.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {enrollment.courses.category} •{' '}
                          {enrollment.courses.difficulty_level}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {enrollment.progress}%
                        </p>
                      </div>
                    </div>

                    <Progress value={enrollment.progress} />

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        {Math.round(
                          (enrollment.progress / 100) *
                            (allLessons?.filter(
                              (l) => l.course_id === enrollment.course_id
                            ).length || 0)
                        )}{' '}
                        lessons completed
                      </span>
                      <span>
                        Started{' '}
                        {new Date(enrollment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        ) : (
          <Card className="p-12 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                No courses yet
              </h3>
              <p className="text-muted-foreground">
                Enroll in a course to start tracking your progress
              </p>
            </div>
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </Card>
        )}
      </div>
    </main>
  )
}
