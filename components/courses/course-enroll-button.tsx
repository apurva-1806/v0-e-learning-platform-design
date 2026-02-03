'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface CourseEnrollButtonProps {
  courseId: string
  isEnrolled: boolean
  user: User | null
}

export default function CourseEnrollButton({
  courseId,
  isEnrolled,
  user,
}: CourseEnrollButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleEnroll = async () => {
    if (!user) {
      router.push('/auth/signup')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.from('enrollments').insert({
        course_id: courseId,
        student_id: user.id,
        enrollment_status: 'active',
        progress_percentage: 0,
      })

      if (error) throw error

      router.refresh()
      router.push(`/courses/${courseId}/lessons`)
    } catch (error) {
      console.error('Enrollment error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isEnrolled) {
    return null
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={loading}
      className="w-full"
      size="lg"
    >
      {loading ? 'Enrolling...' : 'Enroll Now'}
    </Button>
  )
}
