import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import CourseCard from '@/components/courses/course-card'
import SearchPageClient from '@/components/search/search-page-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Courses - LearnHub',
  description: 'Find and discover courses',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const { q, category } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)

  if (q) {
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`)
  }

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  const { data: courses } = await query.order('created_at', {
    ascending: false,
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchPageClient
          initialCourses={courses || []}
          initialQuery={q}
          initialCategory={category}
        />
      </div>
    </main>
  )
}
