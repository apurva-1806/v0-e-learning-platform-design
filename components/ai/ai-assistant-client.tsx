'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import Link from 'next/link'
import { BookOpen, Send, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import type { User } from '@supabase/supabase-js'
import ChatMessages from './chat-messages'

interface AIAssistantClientProps {
  user: User
}

export default function AIAssistantClient({ user }: AIAssistantClientProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      transport: new DefaultChatTransport({
        api: '/api/ai-chat',
      }),
    })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LearnHub</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4 py-8">
        {/* Header */}
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col justify-center items-center space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                AI Learning Assistant
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Ask any questions about your courses. I'm here to help you learn better, explain complex concepts, and guide you through challenging topics.
              </p>
            </div>

            {/* Quick Tips */}
            <div className="grid md:grid-cols-2 gap-4 w-full">
              <Card className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Ask Questions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ask anything related to your course material and I'll provide detailed explanations.
                </p>
              </Card>
              <Card className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Get Hints
                </h3>
                <p className="text-sm text-muted-foreground">
                  Request hints for problems without giving away complete solutions.
                </p>
              </Card>
              <Card className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Clarify Concepts
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ask me to explain concepts in different ways until you understand.
                </p>
              </Card>
              <Card className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Explore Further
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ask recommendations for related topics to deepen your knowledge.
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {messages.length > 0 && (
          <ChatMessages messages={messages} />
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 border-t border-border bg-background">
        <div className="max-w-4xl w-full mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything about your courses..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? 'AI is thinking...' : 'Press Enter or click send'}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
