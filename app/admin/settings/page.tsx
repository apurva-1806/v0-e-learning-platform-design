import { getCurrentUser } from '@/lib/auth-actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export const metadata = {
  title: 'Settings - LearnHub Admin',
}

export default async function AdminSettingsPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // Fetch user profile from users table
  const { data: userProfile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile and preferences
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-foreground">
            Profile
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground">Name</Label>
              <Input defaultValue={userProfile?.full_name || ''} />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Email</Label>
              <Input type="email" defaultValue={user.email || ''} disabled />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Bio</Label>
              <Textarea
                placeholder="Tell students about yourself"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Expertise</Label>
              <Input placeholder="e.g., Web Development, Python, Design" />
            </div>

            <Button className="w-full">Save Profile</Button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Notifications
          </h2>
          <p className="text-muted-foreground text-sm">
            Notification settings for your courses and students
          </p>
          <Button variant="outline" className="w-full bg-transparent">
            Manage Notifications
          </Button>
        </Card>
      </div>
    </AdminLayout>
  )
}
