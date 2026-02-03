'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'
import CourseCard from '@/components/courses/course-card'

interface SearchPageClientProps {
  initialCourses: any[]
  initialQuery?: string
  initialCategory?: string
}

export default function SearchPageClient({
  initialCourses,
  initialQuery = '',
  initialCategory = '',
}: SearchPageClientProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || 'All'
  )

  const categories = [
    'All',
    'Programming',
    'Web Development',
    'Data Science',
    'Design',
    'Business',
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (selectedCategory !== 'All') params.set('category', selectedCategory)
    router.push(`/search?${params.toString()}`)
  }

  const handleClearSearch = () => {
    setQuery('')
    setSelectedCategory('All')
    router.push('/search')
  }

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Search Courses</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Find the perfect course to expand your skills
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses..."
              className="pr-10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <Button type="submit" size="icon">
            <Search className="w-4 h-4" />
          </Button>
        </form>

        {/* Active Filters */}
        {(query || selectedCategory !== 'All') && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Filters:</span>
            {query && (
              <Badge variant="secondary" className="gap-1">
                {query}
                <button
                  onClick={() => setQuery('')}
                  className="ml-1 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="ml-1 hover:opacity-70"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {(query || selectedCategory !== 'All') && (
              <button
                onClick={handleClearSearch}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className="whitespace-nowrap"
            onClick={() => {
              setSelectedCategory(category)
              const params = new URLSearchParams()
              if (query) params.set('q', query)
              if (category !== 'All') params.set('category', category)
              router.push(`/search?${params.toString()}`)
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Results */}
      {initialCourses && initialCourses.length > 0 ? (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Found {initialCourses.length} course
            {initialCourses.length !== 1 ? 's' : ''}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <CourseCard course={course} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Card className="p-12 text-center space-y-4">
          <p className="text-lg font-semibold text-foreground">
            No courses found
          </p>
          <p className="text-muted-foreground">
            {query || selectedCategory !== 'All'
              ? 'Try adjusting your search or filters'
              : 'Start searching to discover courses'}
          </p>
          <Link href="/courses">
            <Button variant="outline">Browse All Courses</Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
