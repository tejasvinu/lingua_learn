# Lingua-Learn

A language learning platform focused on short, effective speaking practice sessions designed to fit into users' daily routines.

## Features

- Morning "Sunrise Speak" and evening "Sunset Speak" 10-minute practice sessions
- AI-powered feedback on pronunciation and speaking skills
- Progress tracking and streak system
- Multiple language support with different proficiency levels
- Subscription tiers (Free, Premium, Pro) with different features

## Tech Stack

- **Frontend**: Next.js 15, React, TailwindCSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: JWT-based authentication

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lingua-learn.git
   cd lingua-learn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following content:
   ```
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/lingua_learn?retryWrites=true&w=majority
   
   # JWT Configuration
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=7d
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Languages
- `GET /api/languages` - Get all available languages
- `GET /api/languages/:id` - Get specific language

### User
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update user profile
- `GET /api/user/languages` - Get user's languages
- `POST /api/user/languages` - Add language to user's profile
- `PATCH /api/user/languages/:id` - Update language settings
- `DELETE /api/user/languages/:id` - Remove language from profile
- `GET /api/user/subscription` - Get user subscription
- `PATCH /api/user/subscription` - Update user subscription

### Exercises
- `GET /api/exercises` - Get exercises based on filters

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress` - Create new progress record

### Streaks
- `GET /api/streaks` - Get user streak data

## Database Models

- **User**: User account information and authentication
- **Language**: Available languages and subscription requirements
- **Exercise**: Speaking, listening, and vocabulary exercises
- **Progress**: User exercise completion and scoring
- **Streak**: User practice streaks and history

## License

This project is licensed under the MIT License.
