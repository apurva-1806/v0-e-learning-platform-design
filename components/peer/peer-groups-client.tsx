'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Users, UserPlus, MessageCircle, BookOpen, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface UserProfile {
  id: string
  email: string
  full_name: string
  role?: string
}

export default function PeerGroupsClient({ userProfile }: { userProfile?: UserProfile }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [friends, setFriends] = useState([
    {
      id: '1',
      name: 'Sarah Anderson',
      email: 'sarah@example.com',
      role: 'student',
      sharedCourses: 3,
      status: 'online',
      avatar: '👩‍💻',
      completionRate: 78
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: 'student',
      sharedCourses: 2,
      status: 'online',
      avatar: '👨‍💻',
      completionRate: 85
    },
    {
      id: '3',
      name: 'Emma Watson',
      email: 'emma@example.com',
      role: 'instructor',
      sharedCourses: 1,
      status: 'offline',
      avatar: '👩‍🏫',
      completionRate: 92
    },
  ])

  const [studyGroups, setStudyGroups] = useState([
    {
      id: 'g1',
      name: 'Web Development Masters',
      description: 'Learn React, Node.js and full-stack development together',
      members: 12,
      courses: ['React Basics', 'Advanced JavaScript'],
      progress: 65,
      image: '🚀',
    },
    {
      id: 'g2',
      name: 'Python Data Science',
      description: 'Master data analysis, ML, and AI concepts',
      members: 8,
      courses: ['Python 101', 'Data Science Fundamentals'],
      progress: 72,
      image: '📊',
    },
    {
      id: 'g3',
      name: 'AI & Machine Learning',
      description: 'Deep learning and neural networks study group',
      members: 15,
      courses: ['ML Algorithms', 'Deep Learning'],
      progress: 58,
      image: '🤖',
    },
  ])

  const [suggestedFriends] = useState([
    {
      id: '4',
      name: 'John Developer',
      email: 'john@example.com',
      role: 'student',
      avatar: '👨‍💼',
      mutualFriends: 3
    },
    {
      id: '5',
      name: 'Lisa Code',
      email: 'lisa@example.com',
      role: 'instructor',
      avatar: '👩‍🏫',
      mutualFriends: 2
    },
  ])

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Peer Groups & Friends</h1>
          <p className="text-muted-foreground">Connect with learners and join study groups</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Friends Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Friends</h2>
                <Badge variant="secondary">{friends.length}</Badge>
              </div>

              {/* Search */}
              <Input
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-input"
              />

              {/* Friends List */}
              <div className="space-y-3">
                {filteredFriends.map((friend) => (
                  <Card key={friend.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{friend.avatar}</div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">{friend.name}</p>
                            <span className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                          </div>
                          <p className="text-sm text-muted-foreground">{friend.email}</p>
                          <div className="flex gap-2 pt-1">
                            <Badge variant="outline" className="text-xs">
                              {friend.sharedCourses} shared courses
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {friend.completionRate}% done
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm">View Profile</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Study Groups Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Your Study Groups</h2>
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Group
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyGroups.map((group) => (
                  <Card key={group.id} className="p-5 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="text-4xl">{group.image}</div>
                        <Badge>{group.members} members</Badge>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Group Progress</span>
                          <span>{group.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${group.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {group.courses.map((course) => (
                          <Badge key={course} variant="secondary" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-transparent" size="sm" variant="outline">
                          View Group
                        </Button>
                        <Button className="flex-1" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Friends */}
            <Card className="p-5 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Suggested Friends
              </h3>

              <div className="space-y-3">
                {suggestedFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{friend.avatar}</div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-foreground">{friend.name}</p>
                        <p className="text-xs text-muted-foreground">{friend.mutualFriends} mutual</p>
                      </div>
                    </div>
                    <Button size="sm">
                      <UserPlus className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Leaderboard */}
            <Card className="p-5 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Top Performers
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'You', score: 2840, trend: '↑' },
                  { name: 'Sarah A.', score: 2920, trend: '↑' },
                  { name: 'Mike C.', score: 2750, trend: '↓' },
                ].map((performer, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-muted-foreground w-5">{idx + 1}.</span>
                      <span className="text-sm font-medium text-foreground">{performer.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{performer.score}</span>
                      <span className={performer.trend === '↑' ? 'text-green-500' : 'text-red-500'}>{performer.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-5 space-y-4 bg-gradient-to-br from-primary/10 to-primary/5">
              <h3 className="font-semibold text-foreground">Your Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold text-foreground">2,840</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Learning Streak</p>
                  <p className="text-2xl font-bold text-foreground">15 days</p>
                </div>
                <Button className="w-full">View Achievements</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
