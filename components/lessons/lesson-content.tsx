'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Check } from 'lucide-react'

interface LessonContentProps {
  lesson: {
    id: string
    title: string
    description: string
    content: string
    video_url?: string
    order: number
  }
  courseId: string
  userId: string
}

export default function LessonContent({
  lesson,
  courseId,
  userId,
}: LessonContentProps) {
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleMarkComplete = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.from('lesson_progress').insert({
        student_id: userId,
        lesson_id: lesson.id,
        course_id: courseId,
        is_completed: true,
        completed_at: new Date().toISOString(),
      })

      if (error) throw error
      setCompleted(true)
    } catch (error) {
      console.error('Error marking lesson as complete:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <Card className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          {lesson.title}
        </h1>
        <p className="text-lg text-muted-foreground">
          {lesson.description}
        </p>
      </Card>

      {/* Video */}
      {lesson.video_url && (
        <Card className="p-0 overflow-hidden">
          <div className="aspect-video bg-black">
            <iframe
              src={lesson.video_url}
              className="w-full h-full"
              allowFullScreen
              title={lesson.title}
            />
          </div>
        </Card>
      )}

      {/* Content */}
      <Card className="p-6 space-y-4 prose prose-invert max-w-none">
        <div className="text-foreground whitespace-pre-wrap">
          {lesson.content}
        </div>
      </Card>

      {/* Complete Button */}
      {!completed && (
        <Card className="p-6 bg-primary/5 border-primary/20">
          <Button
            onClick={handleMarkComplete}
            disabled={loading}
            className="gap-2"
          >
            <Check className="w-4 h-4" />
            {loading ? 'Marking as complete...' : 'Mark as Complete'}
          </Button>
        </Card>
      )}

      {completed && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-2 text-green-800">
            <Check className="w-5 h-5" />
            <p className="font-medium">Lesson completed! Great job!</p>
          </div>
        </Card>
      )}
    </div>
  )
}
