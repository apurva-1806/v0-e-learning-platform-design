import { getCurrentUser } from '@/lib/auth-actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import FocusAnalyticsClient from '@/components/focus/focus-analytics-client'

export const metadata = {
  title: 'Focus Analytics - LearnHub',
  description: 'Track your distraction score and focus habits',
}

export default async function FocusAnalyticsPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // Fetch user's learning sessions and focus data
  const { data: sessions } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', user.id)
    .order('last_accessed_at', { ascending: false })
    .limit(100)

  return <FocusAnalyticsClient initialSessions={sessions || []} />
}
