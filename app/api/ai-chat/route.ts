import { streamText, convertToModelMessages } from 'ai'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { messages, courseId, lessonId } = await req.json()

    // Get lesson context if provided
    let lessonContext = ''
    if (courseId && lessonId) {
      const supabase = await createClient()
      const { data: lesson } = await supabase
        .from('lessons')
        .select('title, description, content')
        .eq('id', lessonId)
        .single()

      if (lesson) {
        lessonContext = `Current lesson: ${lesson.title}\n\nLesson content:\n${lesson.content?.substring(0, 500) || lesson.description}`
      }
    }

    const result = streamText({
      model: 'openai/gpt-4-turbo',
      system: `You are LearnHub's AI Learning Assistant, an expert tutor dedicated to helping students learn effectively. 

Your role is to:
1. Answer questions about course material clearly and thoroughly
2. Explain complex concepts using analogies and examples
3. Provide hints and guidance without immediately giving away answers
4. Encourage critical thinking and deeper understanding
5. Track what the student is struggling with and provide targeted help
6. Suggest related concepts they should learn
7. Be encouraging and supportive

${lessonContext ? `\nCurrent lesson context:\n${lessonContext}` : ''}

Always be patient, clear, and adapt your explanations to the student's level of understanding.`,
      messages: await convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('AI chat error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process AI request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
