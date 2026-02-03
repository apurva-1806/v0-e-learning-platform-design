'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Award, BookOpen, Zap } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface ProfileClientProps {
  user: SupabaseUser
  profile: any
  enrollmentsCount: number
  completedLessonsCount: number
}

export default function ProfileClient({
  user,
  profile,
  enrollmentsCount,
  completedLessonsCount,
}: ProfileClientProps) {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4 flex-1">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                {user.user_metadata?.full_name || 'Learner'}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          {profile?.role && (
            <Badge className="text-base capitalize">
              {profile.role}
            </Badge>
          )}
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Courses Enrolled</p>
              <p className="text-3xl font-bold text-foreground">
                {enrollmentsCount}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Lessons Completed</p>
              <p className="text-3xl font-bold text-foreground">
                {completedLessonsCount}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Learning Streak</p>
              <p className="text-3xl font-bold text-foreground">
                {profile?.learning_streak || 0} days
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Details */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Account Information
        </h2>
        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Email</label>
            <p className="font-medium text-foreground">{user.email}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Role</label>
            <p className="font-medium text-foreground capitalize">
              {profile?.role || 'Student'}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Member Since</label>
            <p className="font-medium text-foreground">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Last Sign In
            </label>
            <p className="font-medium text-foreground">
              {user.last_sign_in_at
                ? new Date(user.last_sign_in_at).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
