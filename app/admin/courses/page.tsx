import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth-actions'
import { redirect } from 'next/navigation'
import AdminCoursesClient from '@/components/admin/admin-courses-client'

export const metadata = {
  title: 'Manage Courses - LearnHub Admin',
}

export default async function AdminCoursesPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // For now, allow all authenticated users to create courses
  // Role-based access can be added to users table in the future

  // Fetch courses created by this instructor
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('instructor_id', user.id)
    .order('created_at', { ascending: false })

  return <AdminCoursesClient courses={courses || []} />
}
