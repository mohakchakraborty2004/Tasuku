<div align="center">
  <img height="200" src="./public/logo.png"  />
</div>

# Tasuku

Tasuku is a modern todo application that helps users create daily todo lists and track their progress with a visual graph similar to GitHub's contribution graph. The app encourages consistency and accountability through a color-coded tracking system and social media integration.

## Unique Selling Points

- **Focus on Completion**: You can create only one list at a time and cannot proceed to make another list before completing the previous one, encouraging task completion and accountability
- **AI-Generated Post**: An AI agent analyzes your completed tasks and automatically generates social media-ready posts to share your accomplishments
- **Visual Progress Tracking**: Monitor your consistency with a GitHub-like contribution graph that shows your daily activity
- **Color-Coded System**: Easily identify task completion status through intuitive color coding

## Features

- **Daily Todo Lists**: Create and manage daily tasks
- **Visual Progress Tracking**: View your consistency with a GitHub-like contribution graph
- **Color-Coded System**: Easily identify task completion status
- **Social Media Integration**: Share your progress with friends
- **User Authentication**: Secure account creation and login
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with components from Radix UI
- **Animation**: Framer Motion
- **Icons**: Lucide React, Tabler Icons

## Project Structure

```
tasuku/
├── .env                   # Environment variables (not committed to git)
├── .gitignore             # Git ignore file
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project documentation
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── public/                # Static files
│   └── favicon.ico        # Favicon
├── src/                   # Source code
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   │   └── auth/      # Authentication API routes
│   │   ├── dashboard/     # Dashboard pages
│   │   │   ├── home/      # Home page
│   │   │   └── todo/      # Todo page
│   │   ├── components/    # Shared components
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Root page
│   │   └── provider.tsx   # Provider components
│   ├── db/                # Database related files
│   │   └── prisma/        # Prisma configuration
│   │       ├── migrations/    # Database migrations
│   │       └── schema.prisma  # Prisma schema
│   ├── lib/               # Utility functions
│   │   ├── actions/       # Server actions
│   │   └── utils.ts       # Utility functions
│   └── ui/                # UI components
│       ├── completedTasks.tsx
│       ├── contribution-graph.tsx
│       ├── createTodo.tsx
│       ├── dashboard.tsx
│       ├── deleteTasks.tsx
│       ├── feature-card.tsx
│       ├── graph.tsx
│       ├── homePage.tsx
│       ├── landing.tsx
│       ├── sidebar.tsx
│       ├── task-completion-summary.tsx
│       └── tsuku-logo.tsx
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tasuku.git
   cd tasuku
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/tasuku"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Schema

The application uses Prisma ORM with PostgreSQL. The main models include:

- User: User profile information
- Todo: Task information including title, description, and completion status
- CompletionHistory: Records of task completion for the contribution graph

## Future Improvements

- **100 Days, 100 Lists Challenge**: Feature where users tell the agent what they want to accomplish over 100 days, and it builds customized daily lists for them
- **Monthly Task Consolidation**: Automatically transfer all incomplete tasks into a single list at the end of each month for better task management
- **Enhanced UI/UX**: Implement a more polished user interface and additional functionalities for a seamless experience
- **Advanced Analytics**: Provide users with detailed insights about their productivity patterns
- **Team Collaboration**: Add features to allow teams to work together on shared lists
- **Offline Support**: Enable the app to work without an internet connection

## Deployment

This application can be deployed on platforms like Vercel, Netlify, or any other platform that supports Next.js applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

