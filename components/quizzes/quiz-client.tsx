'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft } from 'lucide-react'

interface Question {
  id: string
  title: string
  description?: string
  question_type: string
  options: string[]
  correct_answer: string
  order: number
}

interface QuizClientProps {
  quiz: {
    id: string
    title: string
    description?: string
    passing_score: number
  }
  questions: Question[]
  lessonId: string
  courseId: string
  userId: string
}

export default function QuizClient({
  quiz,
  questions,
  lessonId,
  courseId,
  userId,
}: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = questions[currentQuestionIndex]
  const answered = answers[currentQuestion?.id]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        correctCount++
      }
    })
    const calculatedScore = Math.round(
      (correctCount / questions.length) * 100
    )
    setScore(calculatedScore)
    setSubmitted(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  if (submitted) {
    const passed = score >= quiz.passing_score
    return (
      <div className="space-y-8">
        <Card className="p-12 text-center space-y-6">
          <div className="flex justify-center">
            {passed ? (
              <CheckCircle2 className="w-20 h-20 text-green-500" />
            ) : (
              <XCircle className="w-20 h-20 text-red-500" />
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              {passed ? 'Great Job!' : 'Try Again'}
            </h1>
            <p className="text-lg text-muted-foreground">
              Your score: {score}%
            </p>
            <p className="text-muted-foreground">
              Passing score required: {quiz.passing_score}%
            </p>
          </div>

          <div className="space-y-4 pt-6">
            {passed && (
              <Button className="w-full">
                Continue to Next Lesson
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => window.location.reload()}
            >
              Retake Quiz
            </Button>
          </div>
        </Card>

        {/* Results Summary */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Answer Summary
          </h2>
          <div className="space-y-3">
            {questions.map((q, index) => {
              const isCorrect = answers[q.id] === q.correct_answer
              return (
                <div
                  key={q.id}
                  className="p-4 border border-border rounded-lg space-y-2"
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        Question {index + 1}: {q.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your answer: {answers[q.id]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 mt-1">
                          Correct answer: {q.correct_answer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
        {quiz.description && (
          <p className="text-muted-foreground">{quiz.description}</p>
        )}
      </Card>

      {/* Progress */}
      <Card className="p-4 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </Card>

      {/* Current Question */}
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1}
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            {currentQuestion.title}
          </h2>
          {currentQuestion.description && (
            <p className="text-muted-foreground">
              {currentQuestion.description}
            </p>
          )}
        </div>

        {/* Answer Options */}
        <RadioGroup value={answered || ''} onValueChange={handleAnswer}>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors"
              >
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          disabled={currentQuestionIndex === 0}
          onClick={handlePrevious}
          className="gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
          >
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
