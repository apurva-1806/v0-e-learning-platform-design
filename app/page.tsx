import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth-actions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, BookOpen, Brain, Zap } from 'lucide-react'

export default async function HomePage() {
  const user = await getCurrentUser()

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LearnHub</span>
          </div>
          <div className="flex gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 space-y-8">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
            Learn Smarter with AI-Powered Guidance
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Master new skills through interactive courses, personalized learning paths, and an intelligent AI tutor that adapts to your pace.
          </p>
          <div className="flex gap-4 pt-4">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Go to Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/signup">
                  <Button size="lg" className="gap-2">
                    Start Learning Free <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button size="lg" variant="outline">
                    Browse Courses
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Choose LearnHub?
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 border border-border">
            <Brain className="w-12 h-12 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">AI Learning Assistant</h3>
            <p className="text-muted-foreground">
              Get personalized help from our intelligent tutor that understands your learning style
            </p>
          </Card>

          <Card className="p-6 space-y-4 border border-border">
            <Zap className="w-12 h-12 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Adaptive Learning</h3>
            <p className="text-muted-foreground">
              Content and difficulty adjust to match your progress and knowledge level
            </p>
          </Card>

          <Card className="p-6 space-y-4 border border-border">
            <BookOpen className="w-12 h-12 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Comprehensive Courses</h3>
            <p className="text-muted-foreground">
              From programming to design, master skills with structured, expert-created courses
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="max-w-7xl mx-auto px-4 py-20">
          <Card className="p-12 space-y-6 bg-primary/5 border border-primary/20">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of students learning with AI-powered guidance
              </p>
              <Link href="/auth/signup">
                <Button size="lg">Create Your Free Account</Button>
              </Link>
            </div>
          </Card>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 LearnHub. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
