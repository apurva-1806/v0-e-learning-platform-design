# LearnHub - E-Learning Platform Features

## Overview
A comprehensive e-learning platform with 17 webpages, full CRUD operations, AI-powered learning assistant, focus analytics, and social peer networking.

## Core Features

### 1. Authentication & User Management
- **Pages**: `/auth/login`, `/auth/signup`
- **Features**:
  - Email/password signup with role selection (Student, Instructor, Admin)
  - Rate-limiting on email signup requests
  - Secure session management with Supabase Auth
  - Password validation (minimum 8 characters)

### 2. Course Management (CRUD)
- **Pages**: `/courses`, `/courses/[courseId]`, `/admin/courses/*, `/admin/courses/create`
- **Features**:
  - Browse all published courses with filtering
  - Instructor course creation with full CRUD operations
  - Course details with enrollment
  - Course categories: Web Development, Programming, Design, Backend
  - Difficulty levels: Beginner, Intermediate, Advanced

### 3. Learning System
- **Pages**: `/courses/[courseId]/lessons`, `/courses/[courseId]/lessons/[lessonId]`
- **Features**:
  - Structured lesson content with materials
  - Progress tracking per lesson
  - Course material attachments (PDFs, videos, etc.)
  - Lesson completion status tracking

### 4. Assessment & Quizzes
- **Pages**: `/courses/[courseId]/lessons/[lessonId]/quiz`
- **Features**:
  - Interactive quizzes with multiple questions
  - Score calculation and feedback
  - Quiz responses tracked in database
  - Difficulty-based scoring

### 5. AI Learning Assistant (Innovative Feature)
- **Pages**: `/ai-assistant`
- **Features**:
  - Real-time chat with AI tutor powered by OpenAI GPT-4
  - Context-aware responses based on current lesson
  - Streaming responses for smooth UX
  - Conversation history tracking
  - AI helps with questions, explanations, and guidance

### 6. Focus Analytics Dashboard (NEW)
- **Pages**: `/focus-analytics`
- **Features**:
  - Distraction Score (0-100) showing focus level
  - Focus Score based on completion rates
  - Weekly focus trend visualization
  - Best time to focus radar chart
  - Session completion analytics
  - Personalized focus improvement tips
  - Daily distraction tracking
  - Performance metrics:
    - Sessions Completed
    - Average Focus Time
    - Focus Level Badge (Excellent, Good, Fair, Needs Improvement)

### 7. Peer Groups & Social Network (NEW)
- **Pages**: `/peer-groups`
- **Features**:
  - Friend list with online status
  - Shared course tracking between friends
  - Study groups with group progress tracking
  - Study group creation and management
  - Group chat functionality
  - Suggested friends based on mutual interests
  - Leaderboard for top performers
  - Points and achievement system
  - Learning streaks tracking
  - Similar to Facebook/Udemy social features

### 8. User Dashboard
- **Pages**: `/dashboard`
- **Features**:
  - Overview of enrolled courses
  - Recent learning activity
  - Recommended courses based on progress
  - Quick access to in-progress courses

### 9. Profile & Settings
- **Pages**: `/profile`, `/settings`
- **Features**:
  - User profile information
  - Learning statistics
  - Account preferences
  - Notification settings

### 10. Progress Tracking
- **Pages**: `/progress`
- **Features**:
  - Overall learning progress
  - Course-wise completion rates
  - Time spent tracking
  - Milestone achievements
  - Learning goals

### 11. Search & Discovery
- **Pages**: `/search`
- **Features**:
  - Full-text search for courses
  - Filter by category, level, price
  - Sorting options (rating, popularity, recent)
  - Search suggestions

### 12. Admin Features
- **Pages**: `/admin/courses`, `/admin/analytics`, `/admin/settings`
- **Features**:
  - Course analytics for instructors
  - Student enrollment tracking
  - Course performance metrics
  - Instructor settings and profile

## Database Schema

### Tables
- `users` - User profiles with roles (student, instructor, admin)
- `courses` - Course information and metadata
- `enrollments` - Student course enrollments
- `lessons` - Course lessons/modules
- `lesson_progress` - Student progress per lesson
- `quizzes` - Quiz definitions
- `quiz_questions` - Quiz questions
- `quiz_responses` - Student quiz answers
- `quiz_answers` - Answer options
- `quiz_attempts` - Quiz attempt tracking
- `certificates` - Course completion certificates
- `course_materials` - Lesson attachments
- `ai_conversations` - AI chat history
- `ai_messages` - Individual AI messages

## Technology Stack
- **Frontend**: Next.js 16, React 19, Tailwind CSS v4
- **Backend**: Node.js, API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-4 Turbo via Vercel AI SDK 6
- **UI Components**: Shadcn/ui
- **Data Visualization**: Recharts

## Key URLs

### Public Pages
- `/` - Home page
- `/courses` - Course catalog
- `/search` - Course search

### Authenticated Pages
- `/dashboard` - Student dashboard
- `/courses/[id]` - Course details
- `/courses/[id]/lessons` - Course lessons
- `/courses/[id]/lessons/[id]/quiz` - Quiz page
- `/ai-assistant` - AI tutor chat
- `/focus-analytics` - Focus analytics dashboard (NEW)
- `/peer-groups` - Friends and study groups (NEW)
- `/progress` - Learning progress
- `/profile` - User profile
- `/settings` - User settings

### Instructor/Admin Pages
- `/admin/courses` - Manage courses
- `/admin/courses/create` - Create new course
- `/admin/analytics` - Course analytics
- `/admin/settings` - Instructor settings

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key
```

## Future Enhancements
- Real-time notifications for peer group activities
- Video streaming for course lessons
- Live instructor sessions
- Certificate issuing system
- Mobile app
- Advanced gamification features
- Machine learning for personalized recommendations
