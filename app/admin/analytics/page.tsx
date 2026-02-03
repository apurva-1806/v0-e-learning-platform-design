import { getCurrentUser } from '@/lib/auth-actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import AnalyticsClient from '@/components/admin/analytics-client'

export const metadata = {
  title: 'Analytics - LearnHub Admin',
}

export default async function AnalyticsPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // For now, allow all authenticated users to view analytics
  // Role-based access can be added to users table in the future

  // Fetch instructor's courses
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('instructor_id', user.id)

  // Fetch enrollments for these courses
  const courseIds = courses?.map((c) => c.id) || []
  const { data: enrollments } = courseIds.length > 0
    ? await supabase
        .from('enrollments')
        .select('*')
        .in('course_id', courseIds)
    : { data: [] }

  const totalStudents = enrollments?.length || 0
  const totalCourses = courses?.length || 0
  const avgEnrollmentsPerCourse =
    totalCourses > 0 ? Math.round(totalStudents / totalCourses) : 0

  return (
    <AdminLayout>
      <AnalyticsClient
        totalCourses={totalCourses}
        totalStudents={totalStudents}
        avgEnrollments={avgEnrollmentsPerCourse}
        courses={courses || []}
        enrollments={enrollments || []}
      />
    </AdminLayout>
  )
}
