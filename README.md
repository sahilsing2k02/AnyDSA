# AnyDSA - Full-Stack DSA Problem & Note Tracker

A full-stack web application for DSA pattern mastery, progress tracking, and note-taking built with a 3-tier architecture adhering to core system design principles (reliability, data consistency, security, and separation of concerns).

## Architecture (3-Tier)

1. **Presentation Layer (Frontend UI)**:
   - React 19 + TypeScript + Vite.
   - Responsive problem rows, pattern cards, and live progress dashboards.
   - Comprehensive client-side state wipe on logout (in-memory state, caches, `localStorage`, `sessionStorage`, and history replacement).
2. **Domain API Layer (Backend Services)**:
   - Express server with Zod schema validation at all API boundaries.
   - Strict RFC-compliant email validation.
   - Password hashing via bcrypt (`bcryptjs`).
   - Secure session management using `httpOnly`, `SameSite=Lax` cookies.
   - Optimistic Concurrency Control (OCC) on note edits (`version` tracking).
   - Centralized error handling returning sanitized JSON payloads without leaking stack traces.
3. **Persistence Layer (Relational Database)**:
   - Relational SQLite database (`node:sqlite` in WAL mode).
   - Foreign keys enforced with `ON DELETE CASCADE`.
   - Atomic database transactions (`BEGIN` / `COMMIT` / `ROLLBACK`) for multi-step operations.
   - Connection retry mechanism and `/api/health` diagnostic endpoint.

## Setup & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Self-Checking Integration Tests
```bash
npm test
```
Tests RFC email validation, bcrypt hashing, session cookies, cache headers, OCC conflict detection, atomic transactions, logout invalidation, and `ON DELETE CASCADE`.

### 3. Start Development Servers
In separate terminals:

**Backend API Server (Port 3001):**
```bash
npm run server
```

**Frontend Dev Server (Port 5173):**
```bash
npm run dev
```

The Vite dev server automatically proxies `/api` requests to `http://localhost:3001`.
