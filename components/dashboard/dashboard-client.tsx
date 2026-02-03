'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut } from '@/lib/auth-actions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, LogOut, MessageCircle, Settings } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import CourseCard from '@/components/courses/course-card'

interface DashboardProps {
  user: User
  enrollments: any[]
  recommendedCourses: any[]
}

export default function DashboardClient({
  user,
  enrollments,
  recommendedCourses,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState('my-courses')

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LearnHub</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.user_metadata?.full_name || user.email}
            </span>
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'Learner'}!
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey with AI-powered guidance
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="my-courses">My Courses</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="ai-assistant">
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-courses" className="space-y-4">
              {enrollments.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Your Courses
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrollments.map((enrollment) => (
                      <Link
                        key={enrollment.id}
                        href={`/courses/${enrollment.courses.id}`}
                      >
                        <CourseCard course={enrollment.courses} />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="p-12 text-center space-y-4">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      No courses yet
                    </h3>
                    <p className="text-muted-foreground">
                      Explore our course catalog to start learning
                    </p>
                  </div>
                  <Link href="/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="recommended" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Recommended for You
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedCourses.map((course) => (
                  <Link key={course.id} href={`/courses/${course.id}`}>
                    <CourseCard course={course} />
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai-assistant" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                AI Learning Assistant
              </h2>
              <Card className="p-8 text-center space-y-4">
                <MessageCircle className="w-16 h-16 text-primary mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Ask Your AI Tutor
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Get personalized help, clarification on concepts, and learning recommendations
                  </p>
                </div>
                <Link href="/ai-assistant">
                  <Button>Open AI Assistant</Button>
                </Link>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
