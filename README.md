# FMAE-TMS

Full-stack Team Management System scaffolded as a production-grade app.

## Structure
- `/backend`: Express + TypeScript backend with Prisma + PostgreSQL
- `/frontend`: Next.js App Router UI with Tailwind CSS

## Features
- JWT auth with refresh tokens
- Role-based access (Super Admin, Competition Admin, Finance Admin, Team)
- User management, competition lifecycle, registration approvals
- Submission upload abstraction, track event values
- Payment status and leaderboard computations
- Team and admin dashboards

## Setup

### Backend
1. Copy `backend/.env.example` to `backend/.env` and fill database credentials.
2. Install dependencies:
   ```powershell
   cd backend
   npm install
   ```
3. Generate Prisma client and migrate:
   ```powershell
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Start backend:
   ```powershell
   npm run dev
   ```

### Frontend
1. Copy `frontend/.env.example` to `frontend/.env.local` and adjust `NEXT_PUBLIC_API_URL` if needed.
2. Install dependencies:
   ```powershell
   cd frontend
   npm install
   ```
3. Start dev server:
   ```powershell
   npm run dev
   ```

## Notes
- Storage is mocked using an S3 abstraction.
- Email notifications are mocked in the backend.
- Redis is included as an env config abstraction but not yet used in code.
- API endpoints are exposed under `/api/*` in the backend.
