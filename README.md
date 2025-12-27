# Tasky(Task Manager App)

A task management application built with Next.js, Supabase, and TypeScript. Users can create accounts, manage their tasks with full CRUD operations, and filter tasks by status.

## Features
- 🔐 **Authentication**: Secure sign-up, login, and logout using Supabase Auth
- ✅ **Task Management**: Create, read, update, and delete tasks
- 🎯 **Task Filtering**: Filter tasks by status (todo, in-progress, done)
- 🔒 **Row Level Security**: Users can only see and manage their own tasks
- 🎨 **Modern UI**: Clean interface built with React and Tailwind CSS

## Tech Stack
- **Frontend**: Next.js 16 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- Git installed on your machine

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/3lesang/tasky.git
cd tasky
```

### 2. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the values with your actual Supabase credentials.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Authentication

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Access your account with your credentials
3. **Forgot Password**: Recovery password
3. **Logout**: Securely log out from the application

### Task Management

1. **Create Task**: Click "Add Task" button and fill in the task details
2. **View Tasks**: All your tasks are displayed on the main dashboard
3. **Edit Task**: Click the edit icon on any task to modify its details
4. **Delete Task**: Click the delete icon to remove a task
5. **Filter Tasks**: Use the filter dropdown to view tasks by status (All, Todo, In Progress, Done)
6. **Update Status**: Change task status directly from the task card


## Bonus Features Implemented
- ✅ Task search functionality
- ✅ Pagination for large task lists
- ✅ "Mark all done" bulk action
- ✅ Loading states and error handling
- ✅ Toast notifications for user actions

## Testing

### Manual Testing Checklist

- [ ] Sign up with a new account
- [ ] Log in with existing credentials
- [ ] Create a new task
- [ ] Edit an existing task
- [ ] Delete a task
- [ ] Filter tasks by status
- [ ] Log out and verify session is cleared
- [ ] Verify tasks are user-specific (create second account)

## Contact

Sang Le - [@3lesang](https://twitter.com/3lesang) - 3lesang@gmail.com

Project Link: [https://github.com/3lesang/tasky](https://github.com/3lesang/tasky)

Live Demo: [https://tasky-lilac-two.vercel.app](https://tasky-lilac-two.vercel.app)

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Vercel](https://vercel.com)

---

Built with ❤️ using Next.js and Supabase