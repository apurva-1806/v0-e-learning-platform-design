import { getCurrentUser } from '@/lib/auth-actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import CourseForm from '@/components/admin/course-form'

export const metadata = {
  title: 'Create Course - LearnHub Admin',
}

export default async function CreateCoursePage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/login')
  }

  // For now, allow all authenticated users to create courses
  // Role-based access can be added to users table in the future

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Create New Course
          </h1>
          <p className="text-muted-foreground mt-2">
            Create a comprehensive course with lessons and content
          </p>
        </div>

        <CourseForm userId={user.id} />
      </div>
    </AdminLayout>
  )
}
