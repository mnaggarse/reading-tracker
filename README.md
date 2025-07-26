# ReadTracker - Reading Progress Tracker

A modern, intuitive reading tracker application built with Next.js, React, and Supabase. Track your reading progress, set goals, and build your personal digital library.

## Features

- 📚 **Book Management**: Add books from Google Books API or manually
- 📊 **Progress Tracking**: Visual progress bars and page-based tracking
- 🎯 **Reading Goals**: Set and monitor daily, weekly, and yearly reading goals
- 🔐 **Google Authentication**: Secure authentication with Google OAuth via Supabase
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Supabase Auth with Google OAuth
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account
- Google OAuth credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd reading-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Supabase**

   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Go to Authentication > Providers and enable Google OAuth
   - Configure Google OAuth with your Google Cloud Console credentials

4. **Set up Google OAuth**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `https://your-project.supabase.co/auth/v1/callback`

5. **Configure environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

6. **Run the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
reading-tracker/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Protected dashboard with books
│   ├── login/            # Google authentication page
│   ├── signup/
│   ├── profile/
│   ├── add-book/
│   └── layout.tsx        # Root layout with AuthProvider
├── components/           # Reusable components
│   ├── ui/              # shadcn/ui components
│   ├── book-card.tsx    # Individual book display
│   ├── navigation.tsx   # Navigation component
│   └── protected-route.tsx # Route protection
├── lib/                 # Utility functions and configurations
│   ├── auth-context.tsx # Authentication context
│   ├── supabase.ts      # Supabase client
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Authentication Flow

1. **Home Page**: Landing page with features and signup/login options
2. **Google OAuth**: Single-click authentication with Google account
3. **Protected Routes**: Dashboard, profile, and add-book pages require authentication
4. **Session Management**: Automatic session persistence and logout functionality

## Key Features

### Home Page

- Hero section with call-to-action
- Feature highlights
- Testimonials
- Responsive navigation

### Dashboard

- Book organization by reading status
- Progress tracking with visual indicators
- Quick access to add books
- User profile dropdown

### Book Management

- Search Google Books API
- Manual book entry
- Progress updates with modal
- Book categorization (Currently Reading, Not Started, Completed)

### User Profile

- Reading statistics
- Goal tracking
- Recent activity
- User information display from Google account

## Environment Variables

| Variable                        | Description                   | Required |
| ------------------------------- | ----------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL     | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes      |

## Supabase Configuration

### Google OAuth Setup

1. **In Supabase Dashboard**:

   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google Client ID and Client Secret

2. **In Google Cloud Console**:

   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret to Supabase

3. **Redirect URLs**:
   - Add your app URL to authorized redirect URIs in Google Console
   - For development: `http://localhost:3000/dashboard`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
