import { getCurrentUser } from '@/lib/auth-actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PeerGroupsClient from '@/components/peer/peer-groups-client'

export const metadata = {
  title: 'Peer Groups - LearnHub',
  description: 'Connect with friends and study groups',
}

export default async function PeerGroupsPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createClient()

  // Fetch user's peer groups and friends
  const { data: userProfile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return <PeerGroupsClient userProfile={userProfile} />
}
