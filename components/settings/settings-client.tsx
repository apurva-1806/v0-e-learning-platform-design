'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Bell, Lock, Palette, LogOut } from 'lucide-react'
import { useState } from 'react'
import { signOut } from '@/lib/auth-actions'
import type { User } from '@supabase/supabase-js'

interface SettingsClientProps {
  user: User
}

export default function SettingsClient({ user }: SettingsClientProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    shareProgress: false,
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your preferences and account settings
        </p>
      </div>

      {/* Notification Settings */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Notifications
          </h2>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-foreground font-medium">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Get email updates about new courses and lessons
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <Label className="text-foreground font-medium">
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Receive in-browser notifications
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={() => handleToggle('pushNotifications')}
            />
          </div>
        </div>
      </Card>

      {/* Display Settings */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Palette className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Display</h2>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-foreground font-medium">
                Dark Mode
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Use dark theme for the interface
              </p>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
            />
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Privacy</h2>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-foreground font-medium">
                Share Progress
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Allow other learners to see your progress
              </p>
            </div>
            <Switch
              checked={settings.shareProgress}
              onCheckedChange={() => handleToggle('shareProgress')}
            />
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 space-y-4 border-red-200 bg-red-50/50">
        <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>

        <div className="space-y-4 pt-4 border-t border-red-200">
          <div className="space-y-2">
            <Label className="text-red-900 font-medium">Sign Out</Label>
            <p className="text-sm text-red-800 mb-4">
              Sign out of your account on this device
            </p>
            <Button
              variant="outline"
              className="border-red-200 text-red-900 hover:bg-red-100 bg-transparent"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
