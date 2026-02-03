'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Users, Clock } from 'lucide-react'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  description: string
  category: string
  level: string
  rating?: number
  students?: number
  duration?: string
  thumbnail?: string
  price?: number
}

export default function FeaturedCourses({ courses }: { courses?: Course[] }) {
  const defaultCourses: Course[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Master React by building real-world applications',
      category: 'Web Development',
      level: 'Beginner',
      rating: 4.8,
      students: 12500,
      duration: '30 hours',
      price: 49.99,
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Deep dive into JavaScript concepts and patterns',
      category: 'Programming',
      level: 'Intermediate',
      rating: 4.9,
      students: 8300,
      duration: '40 hours',
      price: 59.99,
    },
    {
      id: '3',
      title: 'Web Design Bootcamp',
      description: 'Learn design principles and modern CSS techniques',
      category: 'Design',
      level: 'Beginner',
      rating: 4.7,
      students: 5200,
      duration: '25 hours',
      price: 39.99,
    },
    {
      id: '4',
      title: 'Node.js & Express',
      description: 'Build scalable backend applications with Node.js',
      category: 'Backend',
      level: 'Intermediate',
      rating: 4.6,
      students: 6800,
      duration: '35 hours',
      price: 54.99,
    },
  ]

  const displayCourses = courses || defaultCourses

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Featured Courses</h2>
          <p className="text-muted-foreground">Popular courses trending now</p>
        </div>
        <Link href="/courses">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            {/* Course Image Placeholder */}
            <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
              <div className="text-3xl">📚</div>
            </div>

            <div className="p-4 space-y-3">
              {/* Category Badge */}
              <Badge variant="secondary" className="w-fit">
                {course.category}
              </Badge>

              {/* Title */}
              <h3 className="font-semibold text-foreground line-clamp-2">{course.title}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>

              {/* Level */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-md text-foreground">
                  {course.level}
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating} ({course.students?.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Price & Button */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-bold text-foreground">${course.price}</span>
                <Link href={`/courses/${course.id}`}>
                  <Button size="sm" variant="outline">
                    Enroll
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
