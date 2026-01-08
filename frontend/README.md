# Hospital Appointment Management System

## Overview
A role-based SaaS system to manage appointments and cases between users, doctors, and administrators.

## Tech Stack
- Backend: Node.js, Express, PostgreSQL, Prisma
- Frontend: React (Vite), Tailwind CSS
- Auth: JWT, bcrypt

## Roles
- ADMIN: Full system control
- USER: Creates and manages own appointments
- DOCTOR: Handles assigned appointments and cases

## Setup Instructions

### Backend
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
