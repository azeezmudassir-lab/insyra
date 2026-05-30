# Insyra: SaaS School Management System

This document outlines the implementation plan for building the "Insyra" SaaS school management system with the tagline "Control. Clarity. Performance."

## User Review Required

> [!IMPORTANT]
> The backend requires a PostgreSQL database to be running on your system. Do you already have a PostgreSQL instance running, or should I use an embedded/in-memory SQLite database temporarily for development and testing, or do you have a specific database connection string I should use?

> [!WARNING]
> Building a complete, production-ready SaaS application with all these roles, dashboards, and authentication from scratch is a significant undertaking. We will build a functional prototype/minimum viable product (MVP) capturing all requested features (UI flow, mocked dashboards where complex, functioning database schema) first, which we can iterate on.

## Open Questions

- **Authentication**: Should I use a standard JWT-based custom authentication for this implementation, or integrate a third-party provider? (I will plan for standard JWT custom auth for now as per a typical from-scratch build).
- **Backend ORM**: I plan to use **Prisma ORM** with PostgreSQL as it handles multi-tenancy gracefully with `school_id` filtering. Are you comfortable with Prisma, or prefer another tool?

## Proposed Architecture

- **Frontend**: React (using Vite for fast build), Tailwind CSS for styling, React Router for navigation, Recharts for analytics dashboards.
- **Backend**: Node.js with Express.js.
- **Database**: PostgreSQL (using Prisma ORM).
- **Multi-tenancy**: Application-level isolation where every tenant-specific table has a `school_id` column.

## Proposed Changes

### Phase 1: Project Setup and UI Foundation
- Initialize Vite React application with Tailwind CSS in `frontend/`.
- Initialize Node.js Express backend in `backend/`.
- Set up PostgreSQL schema with Prisma (Tables: `User` (roles: SUPER_ADMIN, SCHOOL_ADMIN, TEACHER, PARENT), `School`, `Student`, `Class`, `Attendance`, `Marks`).
- Setup shared Tailwind configuration for brand colors (`#0B3C5D` primary, `#2ECC71` secondary).

### Phase 2: Public Landing Page & Onboarding
- Build the Landing Page component with Hero, Features, How It Works, Pricing, Testimonials, and Footer.
- Build the Registration Page for new schools (collecting school name, email, phone, password, number of students) and generating a unique School ID.

### Phase 3: Authentication & Authorization
- Implement Backend Auth endpoints (login, register).
- Implement JWT middleware for role-based access.
- Build Frontend Login page handling 4 roles and redirecting to the appropriate dashboard.

### Phase 4: Dashboards Implementation
- **Super Admin Dashboard**: View list of registered schools.
- **Principal Dashboard**: Dashboard overview with dummy or seeded data showing total students, top/bottom performers, and attendance overview.
- **Teacher Dashboard**: View assigned classes, interface for marking attendance and entering marks.
- **Parent Dashboard**: View specific child's attendance and performance.

### Phase 5: Analytics
- Integrate Recharts to display pie charts (attendance) and bar graphs (marks) within the Dashboards.

## Verification Plan

### Automated Tests
- Basic API endpoint testing using a script or tests to ensure authentication and data isolation (multi-tenancy) works.

### Manual Verification
1. Open the landing page and verify brand styling and responsiveness.
2. Register a new school and verify the record is created in PostgreSQL.
3. Log in as Super Admin and see the new school.
4. Log in as Principal of the new school and verify dashboard analytics.
5. Log in as Teacher and Parent to view their respective constrained views.
