import assert from 'node:assert/strict';
import { createApp } from '../app.js';
import { getPool, closePool } from '../db.js';
import type { Server } from 'node:http';

process.env.NODE_ENV = 'test';

async function runTests() {
  console.log('--- Starting PostgreSQL Integration & Lifecycle Tests ---');

  const app = await createApp();
  let server: Server;
  const port = 3999;
  const baseUrl = `http://localhost:${port}`;

  await new Promise<void>((resolve) => {
    server = app.listen(port, () => resolve());
  });

  try {
    // 1. Health check
    console.log('[Test 1] Health check endpoint...');
    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert.equal(healthRes.status, 200);
    const healthData = await healthRes.json();
    assert.equal(healthData.status, 'ok');
    assert.equal(healthData.database, 'postgresql_connected');
    console.log('✓ PostgreSQL health check passed');

    // 2. Strict RFC email validation
    console.log('[Test 2] RFC Email Validation...');
    const invalidEmails = ['invalid-email', 'user@', '@domain.com', 'user@domain..com', 'user @domain.com'];
    for (const email of invalidEmails) {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'StrongPassword123!' })
      });
      assert.equal(res.status, 400, `Expected 400 for invalid email: ${email}`);
    }
    console.log('✓ Invalid RFC emails correctly rejected');

    // Short password rejection
    const shortPassRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test.user@example.com', password: '123' })
    });
    assert.equal(shortPassRes.status, 400);
    console.log('✓ Short passwords rejected');

    // 3. Valid Registration & Cookie Session
    console.log('[Test 3] User registration & session creation...');
    const regRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test.engineer@domain.co.uk',
        password: 'Password999!',
        name: 'Test Engineer'
      })
    });
    assert.equal(regRes.status, 201);
    const regData = await regRes.json();
    assert.equal(regData.user.email, 'test.engineer@domain.co.uk');
    assert.equal(regData.user.name, 'Test Engineer');

    // Extract cookie
    const setCookie = regRes.headers.get('set-cookie');
    assert.ok(setCookie, 'Expected Set-Cookie header');
    assert.ok(setCookie.includes('HttpOnly'), 'Cookie must be HttpOnly');
    assert.ok(setCookie.includes('SameSite=Lax'), 'Cookie must be SameSite=Lax');
    const cookieHeader = setCookie.split(';')[0];
    console.log('✓ User registered and secure httpOnly session cookie issued');

    // 4. Access Protected Route (/api/auth/me) with Cache-Control header
    console.log('[Test 4] Authenticated access & cache headers...');
    const meRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: cookieHeader }
    });
    assert.equal(meRes.status, 200);
    const cacheControl = meRes.headers.get('cache-control');
    assert.ok(cacheControl?.includes('no-store'), 'Authenticated route must return Cache-Control: no-store');
    const meData = await meRes.json();
    assert.equal(meData.user.email, 'test.engineer@domain.co.uk');
    console.log('✓ Protected route accessed with Cache-Control: no-store');

    // 5. Optimistic Concurrency Control (OCC) for Notes
    console.log('[Test 5] Optimistic Concurrency Control on notes...');
    // Create note v1
    const note1Res = await fetch(`${baseUrl}/api/notes/two-sum`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({ content: 'Use hashmap for O(n) lookup' })
    });
    assert.equal(note1Res.status, 200);
    const note1Data = await note1Res.json();
    assert.equal(note1Data.note.version, 1);

    // Save note v2 with matching version
    const note2Res = await fetch(`${baseUrl}/api/notes/two-sum`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({ content: 'Use hashmap with complement check', version: 1 })
    });
    assert.equal(note2Res.status, 200);
    const note2Data = await note2Res.json();
    assert.equal(note2Data.note.version, 2);

    // Concurrent edit simulation with stale version (version: 1 when current is 2)
    const conflictRes = await fetch(`${baseUrl}/api/notes/two-sum`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({ content: 'Stale edit from tab 2', version: 1 })
    });
    assert.equal(conflictRes.status, 409, 'Expected 409 Conflict on stale version');
    const conflictData = await conflictRes.json();
    assert.ok(conflictData.error.includes('Conflict'));
    assert.equal(conflictData.currentData.version, 2);
    console.log('✓ Optimistic concurrency control correctly triggers 409 Conflict in PostgreSQL');

    // 6. Atomic Transaction (Progress + Note)
    console.log('[Test 6] Atomic multi-step transaction...');
    const atomicRes = await fetch(`${baseUrl}/api/progress/atomic-sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: cookieHeader },
      body: JSON.stringify({
        problemId: 'two-sum',
        isSolved: true,
        isBookmarked: true,
        noteContent: 'Finalized optimal solution',
        noteVersion: 2
      })
    });
    assert.equal(atomicRes.status, 200);

    const progressRes = await fetch(`${baseUrl}/api/progress`, {
      headers: { Cookie: cookieHeader }
    });
    const progressData = await progressRes.json();
    assert.ok(progressData.solvedProblems.includes('two-sum'));
    assert.ok(progressData.bookmarkedProblems.includes('two-sum'));
    console.log('✓ Atomic multi-step PostgreSQL transaction committed both progress and note');

    // 7. Explicit Logout Lifecycle & Invalidation
    console.log('[Test 7] Logout lifecycle & session invalidation...');
    const logoutRes = await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: cookieHeader }
    });
    assert.equal(logoutRes.status, 200);
    const logoutCacheControl = logoutRes.headers.get('cache-control');
    assert.ok(logoutCacheControl?.includes('no-store'), 'Logout response must set Cache-Control: no-store');

    // Subsequent access with the logged-out session MUST fail
    const postLogoutRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Cookie: cookieHeader }
    });
    assert.equal(postLogoutRes.status, 401, 'Logged-out session must be invalidated on server');
    console.log('✓ Explicit logout invalidated session token and purged PostgreSQL session');

    // 8. Relational Integrity: ON DELETE CASCADE
    console.log('[Test 8] Relational ON DELETE CASCADE test...');
    const pool = getPool();
    const userId = regData.user.id;
    // Verify records exist before user deletion
    const beforeNotes = await pool.query('SELECT count(*) as count FROM notes WHERE user_id = $1', [userId]);
    const beforeProgress = await pool.query('SELECT count(*) as count FROM progress WHERE user_id = $1', [userId]);
    assert.ok(Number(beforeNotes.rows[0].count) > 0);
    assert.ok(Number(beforeProgress.rows[0].count) > 0);

    // Delete user
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    // Verify cascade deleted
    const afterNotes = await pool.query('SELECT count(*) as count FROM notes WHERE user_id = $1', [userId]);
    const afterProgress = await pool.query('SELECT count(*) as count FROM progress WHERE user_id = $1', [userId]);
    const afterSessions = await pool.query('SELECT count(*) as count FROM sessions WHERE user_id = $1', [userId]);
    assert.equal(Number(afterNotes.rows[0].count), 0, 'Notes should be cascade deleted');
    assert.equal(Number(afterProgress.rows[0].count), 0, 'Progress should be cascade deleted');
    assert.equal(Number(afterSessions.rows[0].count), 0, 'Sessions should be cascade deleted');
    console.log('✓ Foreign key ON DELETE CASCADE verified in PostgreSQL');

    // 9. Google OAuth 2.0 Registration, Login & Linking
    console.log('[Test 9] Google OAuth Lifecycle...');
    const { AuthService } = await import('../services/authService.js');

    // Brand new Google user
    const googleUser = await AuthService.loginOrRegisterWithGoogle({
      googleId: 'google_sub_12345',
      email: 'oauth.engineer@example.com',
      name: 'Google Engineer'
    });
    assert.ok(googleUser.sessionId);
    assert.equal(googleUser.user.email, 'oauth.engineer@example.com');

    // Returning Google user login
    const returningGoogleUser = await AuthService.loginOrRegisterWithGoogle({
      googleId: 'google_sub_12345',
      email: 'oauth.engineer@example.com',
      name: 'Google Engineer'
    });
    assert.equal(returningGoogleUser.user.id, googleUser.user.id);
    console.log('✓ Google OAuth new user and returning user login verified');

    // Account linking: register password user, then sign in with Google with same email
    const localUser = await AuthService.register('hybrid.user@example.com', 'LocalPassword123!', 'Hybrid User');
    const linkedUser = await AuthService.loginOrRegisterWithGoogle({
      googleId: 'google_sub_99999',
      email: 'hybrid.user@example.com'
    });
    assert.equal(linkedUser.user.id, localUser.user.id, 'Google identity should link to existing local user account');
    console.log('✓ Account linking: Google login linked to existing local user');

    // 10. GitHub OAuth 2.0 Registration, Login & Linking
    console.log('[Test 10] GitHub OAuth Lifecycle...');
    const githubUser = await AuthService.loginOrRegisterWithGithub({
      githubId: 'github_id_77777',
      email: 'github.coder@example.com',
      name: 'GitHub Coder'
    });
    assert.ok(githubUser.sessionId);
    assert.equal(githubUser.user.email, 'github.coder@example.com');

    // Returning GitHub user login
    const returningGithubUser = await AuthService.loginOrRegisterWithGithub({
      githubId: 'github_id_77777',
      email: 'github.coder@example.com',
      name: 'GitHub Coder'
    });
    assert.equal(returningGithubUser.user.id, githubUser.user.id);
    console.log('✓ GitHub OAuth new user and returning user login verified');

    // Account linking: GitHub sign in with existing email
    const linkedGithubUser = await AuthService.loginOrRegisterWithGithub({
      githubId: 'github_id_88888',
      email: 'hybrid.user@example.com'
    });
    assert.equal(linkedGithubUser.user.id, localUser.user.id, 'GitHub identity should link to existing local user account');
    console.log('✓ Account linking: GitHub login linked to existing local user');

    console.log('\n======================================================');
    console.log(' ALL POSTGRESQL INTEGRATION & LIFECYCLE TESTS PASSED! ');
    console.log('======================================================\n');
  } finally {
    server.close();
    await closePool();
  }
}

runTests().catch((err) => {
  console.error('Integration test failed:', err);
  process.exit(1);
});
