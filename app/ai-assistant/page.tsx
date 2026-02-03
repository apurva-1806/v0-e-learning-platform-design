import { getCurrentUser } from '@/lib/auth-actions'
import { redirect } from 'next/navigation'
import AIAssistantClient from '@/components/ai/ai-assistant-client'

export const metadata = {
  title: 'AI Learning Assistant - LearnHub',
  description: 'Get personalized help from our AI tutor',
}

export default async function AIAssistantPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <AIAssistantClient user={user} />
}
