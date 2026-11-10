# AnyDSA Task & Progress Ledger

This document tracks all completed milestones, current production architecture, and critical guardrails to prevent regressions and repeat issues.

---

## 1. System Architecture & Tech Stack

- **Frontend:** React 19 + TypeScript + Vite (Single Page Application).
- **Domain API:** Express.js 5 + Zod schema validation (runs as Vercel Serverless Functions via `api/index.ts` & local dev server).
- **Database:** Managed Cloud PostgreSQL (Neon Serverless via `DATABASE_URL` / `POSTGRES_URL`) with `pg` connection pooling.
- **Testing:** Integration & lifecycle test suite (`server/test/integration.test.ts`) with in-memory fallback for local CI.
- **Hosting:** Vercel Production (`https://anydsa.vercel.app`) with automatic deployments from GitHub `main`.
- **Alternative Host:** Render Blueprint (`render.yaml`) with managed PostgreSQL database.

---

## 2. Completed Milestones

### Core Architecture & Backend
- [x] **3-Tier Separation:** Strict boundaries between Presentation (`src/`), Domain API (`server/services/`, `server/routes/`), and Persistence (`server/db.ts`, `server/migrations.ts`).
- [x] **Relational Schema Migrations:** Tables `users`, `sessions`, `notes`, `progress` with foreign key constraints and `ON DELETE CASCADE`.
- [x] **Optimistic Concurrency Control (OCC):** Note editing uses an integer `version` column. Concurrent updates trigger `HTTP 409 Conflict` with the current server record rather than silently overwriting.
- [x] **Atomic Transactions:** Progress updates and note changes execute within a single PostgreSQL transaction (`BEGIN` ... `COMMIT` / `ROLLBACK`).
- [x] **Centralized Error Handling:** All API errors pass through `server/middleware/errorHandler.ts` returning sanitized JSON payloads without leaking stack traces.
- [x] **Health Check Endpoint:** `GET /api/health` queries `SELECT 1` on PostgreSQL and reports live connection status.

### Authentication & Session Lifecycle
- [x] **Strict RFC Email Validation:** Email format validated against RFC 5322 on both client and server before touching the database.
- [x] **Password Security:** Passwords hashed with salted `bcrypt` (minimum 8 characters). Plaintext passwords never stored.
- [x] **Session Management:** Sessions issued via secure, `httpOnly`, `SameSite=Lax` cookies mapped to a server-side `sessions` table (24-hour TTL).
- [x] **Explicit Logout Lifecycle:**
  - `POST /api/auth/logout` invalidates and deletes the session in PostgreSQL.
  - Clears `session_id` cookie with `Cache-Control: no-store, no-cache, must-revalidate` headers.
  - Client-side state purge: resets in-memory React state, wipes `localStorage` and `sessionStorage`.
  - Replaces window history (`window.history.replaceState`) to prevent back-button access to authenticated state.

### Codebase Cleanup & Bloat Removal
- [x] **Removed SQLite:** Deleted local `data/` directory and `.sqlite` binaries in favor of cloud PostgreSQL.
- [x] **Removed Firebase:** Deleted `src/firebase.ts` and uninstalled `firebase` npm package (removed 88 sub-packages).
- [x] **Removed Dead Scripts:** Removed legacy `extract_pdf.cjs` and `pdf-parse` dependency.
- [x] **Fixed React / Oxlint Warnings:** Cleaned ref-in-render warning in `src/context/AppContext.tsx`.

### Cloud Deployment & Serverless Integration
- [x] **Vercel Serverless Function:** Built `api/index.ts` to bridge Express directly into Vercel Serverless execution.
- [x] **Vercel Framework Settings:** Configured native `vite` framework preset, `npm run build`, and `dist` output.
- [x] **Vercel Marketplace Neon Integration:** Provisioned serverless PostgreSQL database (`neon-orange-diamond`) and connected `DATABASE_URL` / `POSTGRES_URL`.
- [x] **Git Push Automation:** Enabled automatic Vercel production deployments on push to `main`.
- [x] **Live Verification:** Verified end-to-end user registration, login, note saving, and progress tracking on `https://anydsa.vercel.app`.

### Section Module Expansion
- [x] **DSA Section:** Pattern-wise algorithms (Two Pointers, Sliding Window, Trees, Graphs, DP, etc.).
- [x] **CS Fundamentals Section:** Subdivided into Computer Networks (CN), Operating Systems (OS), Object-Oriented Programming (OOPS), and Database Management Systems (DBMS).
  - **Comprehensive 25-Question DBMS Overhaul:**
    - Section 1: DBMS Fundamentals (Q1–Q7) — DBMS vs File System, Physical/Logical Data Independence, Schema vs Instance, Primary vs Candidate Keys, Referential Integrity & cascading actions, Students/Courses/Enrollment modeling, and Associative Entities.
    - Section 2: Normalization and Database Design (Q8–Q11) — Insertion/Update/Deletion Anomalies, 1NF/2NF/3NF/BCNF requirements with decomposition proofs, 3NF vs BCNF superkey criteria, and read vs write denormalization trade-offs.
    - Section 3: Transactions and Concurrency Control (Q12–Q19) — ACID properties, Lost Update race conditions & prevention, Serial vs Serializable schedules & precedence graphs, Dirty Reads & ANSI SQL isolation levels, Non-Repeatable Reads vs Phantoms, Deadlock detection via Wait-For Graphs (Coffman criteria), Two-Phase Locking (Basic/Strict/Rigorous 2PL), and MVCC vs Strict 2PL.
    - Section 4: Indexing and Query Optimization (Q20–Q23) — Indexing for slow queries & the Leftmost Prefix Rule, B+ Tree internals & low height fan-out advantages, Clustered vs Non-Clustered indexes & double lookups, and the 5 penalties of over-indexing.
    - Section 5: Database Recovery and Crash Management (Q24–Q25) — Log-based crash recovery (REDO committed work, UNDO uncommitted work, Checkpoint pruning), and Write-Ahead Logging (WAL) append-only durability.
- [x] **Top 50 SQL Interview Questions Curriculum (Beginner to Advanced):**
  - Section 1: SQL Basics (Q1–Q10) — Commands (DDL/DML/DQL/DCL/TCL), DELETE vs TRUNCATE vs DROP, WHERE vs HAVING, PRIMARY vs UNIQUE KEY, FOREIGN KEY, basic queries, LIKE patterns, DISTINCT, ORDER BY, NULL logic & COALESCE.
  - Section 2: Aggregate Functions & GROUP BY (Q11–Q17) — Aggregate definitions, department counts, department averages, HAVING filters, MAX/MIN, SUM, and nested aggregates.
  - Section 3: SQL Joins (Q18–Q25) — Inner, Left, Right, Full Outer (MySQL simulation), Cross, Self Joins, anti-joins with NULL checks, and employee pairs without duplicate symmetry.
  - Section 4: Subqueries and Nested Queries (Q26–Q32) — Scalar, multi-row, correlated subqueries, Nth highest salary calculations (LIMIT/OFFSET), and IN vs EXISTS short-circuiting.
  - Section 5: Advanced SQL Interview Questions (Q33–Q42) — MySQL 8.0 Window Functions, DENSE_RANK vs RANK vs ROW_NUMBER, PARTITION BY, Top-N per department, CTEs (WITH clause), LAG(), running totals, and CTE vs Subquery vs Temporary Table.
  - Section 6: Advanced SQL Problem-Solving (Q43–Q50) — Duplicate detection, deduplication via CTE + ROW_NUMBER + DELETE, salary parity, department percentage contributions, and mathematical median for even/odd counts.
- [x] **Student Reading Convenience Layout:**
  - Interactive assumed schema card for `Employees` & `Departments` with sample records and foreign key relationships.
  - Priority badge indicators (`🔥 Frequently Asked`, `⭐ Important`, `🚀 Advanced`).
  - Question-first layout with dedicated `👁️ View Answer` / `▲ Hide Answer` drawer displaying formatted explanations, MySQL queries, and interview points.
- [x] **LLD Section:** Low-Level Design & Machine Coding (Parking Lot, LRU Cache, Snake & Ladder, Tic-Tac-Toe, Rate Limiter, Elevator, BookMyShow, Splitwise, Vending Machine, Logging, Notifications, and GoF Design Patterns).
- [x] **Navbar Navigation Shift (Emoji-Free):** Shifted all study section tabs (`DSA`, `CS Fundamentals`, `SQL Top 50`, `LLD`) into the global sticky top Navbar with `useApp()` state sync. Removed redundant in-page tab controls and guaranteed zero emojis in the navbar links. Stripped emojis from CS Fundamentals subcategory pills for a sleek, distraction-free aesthetic.
- [x] **Section-Scoped Note Taking:** Restricted personal note taking (`📝` button and textarea) strictly to the DSA pattern section. Removed note buttons and panels from CS Fundamentals, SQL Top 50, and LLD sections while ensuring the `👁️ View Answer` solution drawer, solved toggles, and bookmarks remain fully functional across all sections.
- [x] **Dark Mode Contrast & Active Button Fix:** Resolved active tab / filter pill wash-out bug where active states turned blinding solid white with invisible white text in dark mode. Refactored `.activePill`, `.answerActive`, and `.activeSection` across `Home.module.css`, `ProblemRow.module.css`, and `Navbar.module.css` to use elevated dark surfaces (`var(--surface-3)`) and high-contrast text (`var(--text)`), ensuring consistent dark theme readability.
- [x] **Interactive Side-by-Side Study Mode (Non-DSA Sections):**
  - Created [`StudyView.tsx`](file:///c:/Users/sahil/OneDrive/Desktop/AnyDSA/src/components/StudyView.tsx) active across CS Fundamentals, SQL Top 50, and LLD sections.
  - Implemented 2-column split layout: Left side contains Question details, priority tags, and completion/bookmark actions; Right side contains Solution, MySQL queries, ASCII diagrams, and explanations.
  - Bottom sticky navigation bar with prominent `Next →` and `← Previous` arrow buttons, question counter (`Question X of Y`), dropdown jump selector, and keyboard arrow hotkeys (`←` and `→`).
  - Added view toggle (`Study Mode` vs `List View`) in [`Home.tsx`](file:///c:/Users/sahil/OneDrive/Desktop/AnyDSA/src/pages/Home.tsx) defaulting to Study Mode for all non-DSA sections.

---

## 3. Critical Guardrails (Never Repeat Past Mistakes)

To ensure past issues do not reoccur, follow these rules:

### Guardrail 1: Serverless Database Persistence
- **Rule:** Never rely on in-memory databases (`pg-mem`, SQLite in-memory, or global variables) for production user authentication or state.
- **Why:** Vercel Serverless Functions spin up independent, ephemeral containers. State saved in one container is invisible to another, leading to "user exists but cannot log in" errors.
- **Check:** Ensure `DATABASE_URL` or `POSTGRES_URL` is set in Vercel Project Environment Variables. In-memory engine is strictly restricted to automated unit tests (`NODE_ENV === 'test'`).

### Guardrail 2: Vercel Routing & SPA Catch-All
- **Rule:** Never allow catch-all rewrites (`/(.*)`) to intercept `/api` routes.
- **Why:** If `/api/*` rewrites to `/index.html`, API requests return static HTML, causing `Failed to execute 'json' on 'Response': Unexpected end of JSON input`.
- **Check:** In `vercel.json`, ensure `/api/:match*` routes to `/api` before the SPA fallback:
  ```json
  "rewrites": [
    { "source": "/api/:match*", "destination": "/api" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
  ```

### Guardrail 3: Safe Client-Side Response Parsing
- **Rule:** Never call `await res.json()` on fetch responses without checking the `Content-Type` header.
- **Why:** Non-JSON responses (500 HTML error pages, empty 404s, 405 Method Not Allowed) crash the frontend with parsing errors.
- **Check:** Inspect `res.headers.get('content-type')` before parsing JSON, or wrap JSON parsing in a try/catch with fallback to `res.text()`.

### Guardrail 4: Vercel CLI Configuration Pollution
- **Rule:** Do not let `vercel link` auto-inject `services` blocks into `vercel.json` for single-project Vite SPAs.
- **Why:** Injects ambiguous framework configurations and overrides standard Vite build outputs.
- **Check:** Keep `vercel.json` minimal (routing rules only). Framework configuration belongs in Vercel project settings (`framework: "vite"`).

### Guardrail 5: Concurrency and Race Conditions
- **Rule:** Always supply the expected `version` when submitting note updates (`PUT /api/notes/:problemId`).
- **Why:** Prevents multi-tab or concurrent session edits from overwriting each other.
- **Check:** If server returns `HTTP 409 Conflict`, reload the latest server state and notify the user.

---

## 4. Verification Checklist Before Any Deployment

Before promoting a release to production:
1. [ ] Run `npm run build` &rarr; ensure Vite and TypeScript compile with zero errors.
2. [ ] Run `npm test` &rarr; ensure all 8 integration, auth, and transaction tests pass.
3. [ ] Run `npm run lint` &rarr; verify Oxlint reports 0 errors.
4. [ ] Check `vercel api /v9/projects/anydsa` &rarr; verify `framework` remains `vite` and `gitProviderOptions.createDeployments` is `enabled`.
5. [ ] Verify `/api/health` returns `HTTP 200` with `database: postgresql_connected`.

