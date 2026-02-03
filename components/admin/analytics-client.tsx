'use client'

import { Card } from '@/components/ui/card'
import { BarChart3, Users, BookOpen, TrendingUp } from 'lucide-react'

interface AnalyticsClientProps {
  totalCourses: number
  totalStudents: number
  avgEnrollments: number
  courses: any[]
  enrollments: any[]
}

export default function AnalyticsClient({
  totalCourses,
  totalStudents,
  avgEnrollments,
  courses,
  enrollments,
}: AnalyticsClientProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track your course performance and student engagement
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Courses</p>
            <BookOpen className="w-5 h-5 text-primary opacity-50" />
          </div>
          <p className="text-3xl font-bold text-foreground">{totalCourses}</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <Users className="w-5 h-5 text-primary opacity-50" />
          </div>
          <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Avg per Course</p>
            <TrendingUp className="w-5 h-5 text-primary opacity-50" />
          </div>
          <p className="text-3xl font-bold text-foreground">{avgEnrollments}</p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Engagement Rate</p>
            <BarChart3 className="w-5 h-5 text-primary opacity-50" />
          </div>
          <p className="text-3xl font-bold text-foreground">
            {totalCourses > 0 ? Math.round((totalStudents / (totalCourses * 10)) * 100) : 0}
            %
          </p>
        </Card>
      </div>

      {/* Course Performance */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Course Performance
        </h2>
        <div className="space-y-3 pt-4">
          {courses && courses.length > 0 ? (
            courses.map((course) => {
              const courseEnrollments = enrollments.filter(
                (e) => e.course_id === course.id
              ).length
              return (
                <div
                  key={course.id}
                  className="flex justify-between items-center p-3 border border-border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {course.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {courseEnrollments} students enrolled
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="w-32 h-2 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${Math.min(
                            (courseEnrollments / Math.max(totalStudents, 1)) *
                              100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No courses yet
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
