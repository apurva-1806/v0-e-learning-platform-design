'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Plus, Edit2, Trash2 } from 'lucide-react'
import AdminLayout from './admin-layout'

interface AdminCoursesClientProps {
  courses: any[]
}

export default function AdminCoursesClient({ courses }: AdminCoursesClientProps) {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Course Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Create and manage your courses
            </p>
          </div>
          <Link href="/admin/courses/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>

        {/* Courses List */}
        {courses && courses.length > 0 ? (
          <div className="space-y-4">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="p-6 flex justify-between items-start hover:shadow-md transition-shadow"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-foreground text-lg">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                    <Badge
                      variant={course.is_published ? 'default' : 'secondary'}
                    >
                      {course.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground pt-2">
                    <span>{course.students_count || 0} students</span>
                    <span>{course.category}</span>
                    <span>{course.difficulty_level}</span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/courses/${course.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      // Delete will be handled with a modal
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                No courses yet
              </h3>
              <p className="text-muted-foreground">
                Create your first course to get started
              </p>
            </div>
            <Link href="/admin/courses/create">
              <Button>Create Your First Course</Button>
            </Link>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
