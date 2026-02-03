'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(email: string, password: string, fullName: string, role: string = 'student') {
  const supabase = await createClient()

  // Validate input
  if (!email || !password || !fullName || !role) {
    return { error: 'All fields are required' }
  }

  // Validate role
  const validRoles = ['student', 'instructor', 'admin']
  if (!validRoles.includes(role)) {
    return { error: 'Invalid role selected' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long' }
  }

  if (!email.includes('@')) {
    return { error: 'Please enter a valid email address' }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      // Return the error message as-is for client-side handling
      return { error: error.message }
    }

    // Create user in users table
    if (data.user) {
      const { error: userError } = await supabase.from('users').insert({
        id: data.user.id,
        email,
        full_name: fullName,
        password,
        role,
      })

      if (userError) {
        return { error: userError.message }
      }
    }

    return { success: true }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
    return { error: errorMessage }
  }
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}

export async function getSession() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getSession()

  if (error || !data.session) {
    return null
  }

  return data.session
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    return null
  }

  return data.user
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function verifyOtp(email: string, token: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })

  if (error) {
    return { error: error.message }
  }

  // Create user in users table if not exists
  if (data.user) {
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', data.user.id)
      .single()

    if (!existingUser) {
      await supabase.from('users').insert({
        id: data.user.id,
        email: data.user.email || '',
        full_name: data.user.user_metadata?.full_name || 'User',
        role: 'student',
      })
    }
  }

  return { success: true }
}
