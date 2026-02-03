'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // Supabase OAuth callback handler
    const handleCallback = async () => {
      // The session is automatically set by Supabase
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Completing sign in...
          </h2>
          <p className="text-muted-foreground">
            Please wait while we set up your account
          </p>
        </div>
      </Card>
    </div>
  )
}
