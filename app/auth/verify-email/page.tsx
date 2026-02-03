'use client'

import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyOtp } from '@/lib/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') || ''
  
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!code || code.length < 6) {
      setError('Please enter a valid verification code')
      setLoading(false)
      return
    }

    try {
      const result = await verifyOtp(email, code)
      
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/dashboard'), 2000)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <div className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Verify Your Email</h1>
            <p className="text-muted-foreground">
              We sent a verification code to {email}
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              {error}
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200">
              <p className="text-green-800">Email verified! Redirecting to dashboard...</p>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Verification Code</label>
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
                required
              />
              <p className="text-xs text-muted-foreground">Check your email for the code</p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !code}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>Didn't receive the code?</p>
            <button 
              className="text-primary hover:underline font-medium mt-2"
              onClick={() => setError('Resend functionality coming soon')}
            >
              Resend Code
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
