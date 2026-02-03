import { getCurrentUser } from '@/lib/auth-actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'
import ProfileClient from '@/components/profile/profile-client'

export const metadata = {
  title: 'Your Profile - LearnHub',
}

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // Fetch user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch user's statistics
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*')
    .eq('student_id', user.id)

  const { data: completedLessons } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('student_id', user.id)
    .eq('is_completed', true)

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
            <Link href="/settings">
              <Button variant="ghost">Settings</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProfileClient
          user={user}
          profile={profile}
          enrollmentsCount={enrollments?.length || 0}
          completedLessonsCount={completedLessons?.length || 0}
        />
      </div>
    </main>
  )
}
