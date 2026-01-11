# Application tracker

A web application for keeping track of job/internship applications and staying consistent in the applying process.

## Features

### Current Features

- Add new job applications with details:
  - Position title
  - Company name
  - Application date
  - Application status
  - Job posting URL
  - Notes
- View all applications in a list
- Edit and delete applications

### Planned features

- Applications dashboard
- Authentication with email
- Search applications
- Calendar view
- Update application's status individually
- Set reminders for follow-ups and to-dos

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- SQLite with Prisma ORM

## Installation

1. Clone the repository

```bash
git clone https://github.com/maijaelinalaine/application-tracker.git
cd application-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Set up database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Run the development server:

```bash
npm run dev
```

5. Open (http://localhost:3000) in your browser
