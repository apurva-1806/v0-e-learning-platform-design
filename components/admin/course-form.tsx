'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CourseFormProps {
  userId: string
  courseId?: string
  initialData?: any
}

export default function CourseForm({
  userId,
  courseId,
  initialData,
}: CourseFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    long_description: initialData?.long_description || '',
    category: initialData?.category || '',
    difficulty_level: initialData?.difficulty_level || 'Beginner',
    duration_hours: initialData?.duration_hours || '',
    instructor_name: initialData?.instructor_name || '',
    instructor_bio: initialData?.instructor_bio || '',
  })

  const categories = [
    'Programming',
    'Web Development',
    'Data Science',
    'Design',
    'Business',
  ]

  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const courseData = {
        ...formData,
        instructor_id: userId,
        is_published: false,
        duration_hours: formData.duration_hours
          ? parseInt(formData.duration_hours)
          : null,
      }

      if (courseId) {
        // Update existing course
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', courseId)

        if (error) throw error
      } else {
        // Create new course
        const { data, error } = await supabase
          .from('courses')
          .insert([courseData])
          .select()

        if (error) throw error
        if (data) {
          router.push(`/admin/courses/${data[0].id}/edit`)
        }
      }

      router.refresh()
      router.push('/admin/courses')
    } catch (error) {
      console.error('Error saving course:', error)
      alert('Error saving course. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Course Title
          </label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Introduction to React"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Short Description
          </label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the course"
            rows={3}
            required
          />
        </div>

        {/* Long Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Long Description
          </label>
          <Textarea
            name="long_description"
            value={formData.long_description}
            onChange={handleChange}
            placeholder="Detailed course description"
            rows={5}
          />
        </div>

        {/* Category & Difficulty */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Category
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                handleSelectChange('category', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Difficulty Level
            </label>
            <Select
              value={formData.difficulty_level}
              onValueChange={(value) =>
                handleSelectChange('difficulty_level', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((diff) => (
                  <SelectItem key={diff} value={diff}>
                    {diff}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Duration (hours)
          </label>
          <Input
            name="duration_hours"
            type="number"
            value={formData.duration_hours}
            onChange={handleChange}
            placeholder="e.g., 20"
            min="0"
          />
        </div>

        {/* Instructor Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Instructor Name
            </label>
            <Input
              name="instructor_name"
              value={formData.instructor_name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Instructor Bio
            </label>
            <Input
              name="instructor_bio"
              value={formData.instructor_bio}
              onChange={handleChange}
              placeholder="Your expertise"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading
              ? 'Saving...'
              : courseId
                ? 'Update Course'
                : 'Create Course'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
