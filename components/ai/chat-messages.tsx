'use client'

import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Brain, User } from 'lucide-react'
import type { UIMessage } from 'ai'

interface ChatMessagesProps {
  messages: UIMessage[]
}

function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="space-y-4 py-4">
      {messages.map((message, index) => {
        const isUser = message.role === 'user'
        const text = getMessageText(message)

        return (
          <div
            key={index}
            className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!isUser && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
              </div>
            )}

            <Card
              className={`max-w-xl px-4 py-2 ${
                isUser
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-accent text-foreground'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{text}</p>
            </Card>

            {isUser && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            )}
          </div>
        )
      })}

      <div ref={messagesEndRef} />
    </div>
  )
}
