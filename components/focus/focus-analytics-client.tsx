'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { TrendingUp, Clock, Zap, AlertCircle, CheckCircle } from 'lucide-react'

interface Session {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  progress_percentage: number
  last_accessed_at: string
}

export default function FocusAnalyticsClient({ initialSessions }: { initialSessions: Session[] }) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | '3months'>('week')

  // Calculate distraction score (0-100, higher is better focus)
  const focusMetrics = useMemo(() => {
    const totalSessions = initialSessions.length
    const completedSessions = initialSessions.filter((s) => s.completed).length
    const avgProgress = initialSessions.reduce((sum, s) => sum + s.progress_percentage, 0) / (totalSessions || 1)
    
    // Distraction score: based on completion rate and progress
    const distractionScore = Math.round((completedSessions / (totalSessions || 1)) * 100)
    const focusScore = Math.round(avgProgress)
    
    return {
      distractionScore,
      focusScore,
      totalSessions,
      completedSessions,
      avgProgress: Math.round(avgProgress),
      sessionCompletionRate: Math.round((completedSessions / (totalSessions || 1)) * 100)
    }
  }, [initialSessions])

  // Generate chart data
  const weeklyData = [
    { day: 'Mon', focus: 75, distractions: 8 },
    { day: 'Tue', focus: 82, distractions: 5 },
    { day: 'Wed', focus: 65, distractions: 12 },
    { day: 'Thu', focus: 88, distractions: 3 },
    { day: 'Fri', focus: 70, distractions: 10 },
    { day: 'Sat', focus: 45, distractions: 18 },
    { day: 'Sun', focus: 90, distractions: 2 },
  ]

  const radarData = [
    { category: 'Morning', score: 85 },
    { category: 'Afternoon', score: 72 },
    { category: 'Evening', score: 88 },
    { category: 'Late Night', score: 45 },
  ]

  const getFocusLevel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-500' }
    if (score >= 60) return { label: 'Good', color: 'text-blue-500' }
    if (score >= 40) return { label: 'Fair', color: 'text-yellow-500' }
    return { label: 'Needs Improvement', color: 'text-red-500' }
  }

  const focusLevel = getFocusLevel(focusMetrics.focusScore)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Focus Analytics</h1>
          <p className="text-muted-foreground">Track your learning focus and distraction patterns</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['week', 'month', '3months'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              onClick={() => setTimeRange(range)}
              className="capitalize"
            >
              {range === '3months' ? '3 Months' : range}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Focus Score */}
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Focus Score</p>
                <p className="text-3xl font-bold text-foreground">{focusMetrics.focusScore}</p>
              </div>
              <TrendingUp className={`w-5 h-5 ${focusLevel.color}`} />
            </div>
            <Badge className={focusLevel.color}>{focusLevel.label}</Badge>
          </Card>

          {/* Distraction Score */}
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Distraction Rate</p>
                <p className="text-3xl font-bold text-foreground">{100 - focusMetrics.distractionScore}%</p>
              </div>
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-xs text-muted-foreground">Distractions detected during sessions</p>
          </Card>

          {/* Sessions Completed */}
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
                <p className="text-3xl font-bold text-foreground">{focusMetrics.completedSessions}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">of {focusMetrics.totalSessions} total sessions</p>
          </Card>

          {/* Avg Session Time */}
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Avg Focus Time</p>
                <p className="text-3xl font-bold text-foreground">45m</p>
              </div>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground">per learning session</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Focus Trend */}
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Weekly Focus Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="focus" fill="#3b82f6" name="Focus Score" />
                <Bar dataKey="distractions" fill="#ef4444" name="Distractions" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Best Time to Focus */}
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Best Time to Focus</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                <Radar name="Focus Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Focus Tips */}
        <Card className="p-6 space-y-4 border-l-4 border-l-blue-500">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Optimize Your Focus</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Your best focus time is in the evening - schedule important lessons then</li>
                <li>• Try 45-minute focused sessions with 5-minute breaks</li>
                <li>• Use the AI Assistant when you feel distracted to stay engaged</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
