'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

interface CourseCardProps {
  course: {
    id: string
    title: string
    description: string
    category: string
    difficulty_level: string
    rating?: number
    students_count?: number
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="bg-gradient-to-br from-primary/10 to-primary/5 h-32"></div>
      
      <div className="p-4 flex flex-col flex-1 space-y-3">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {course.category}
          </Badge>
          <Badge className={`text-xs ${getDifficultyColor(course.difficulty_level)}`}>
            {course.difficulty_level}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 mt-auto">
          {course.rating && (
            <>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating.toFixed(1)}</span>
              </div>
              {course.students_count && (
                <>
                  <span>•</span>
                  <span>{course.students_count.toLocaleString()} students</span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
