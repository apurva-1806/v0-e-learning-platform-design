import { getCurrentUser } from '@/lib/auth-actions'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from '@/components/dashboard/dashboard-client'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // Fetch user's enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch available courses for recommendations
  const { data: allCourses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .limit(6)

  return (
    <DashboardClient
      user={user}
      enrollments={enrollments || []}
      recommendedCourses={allCourses || []}
    />
  )
}
