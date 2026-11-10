import { Router } from 'express';
import crypto from 'node:crypto';
import { z } from 'zod';
import { AuthService } from '../services/authService.js';
import { requireAuth } from '../middleware/auth.js';
import { ValidationError } from '../errors.js';

export const authRouter = Router();

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

function getGoogleRedirectUri(req: any): string {
  if (process.env.GOOGLE_REDIRECT_URI) return process.env.GOOGLE_REDIRECT_URI;
  const host = req.get('x-forwarded-host') || req.get('host');
  const protocol = req.get('x-forwarded-proto') || (req.secure ? 'https' : 'http');
  return `${protocol}://${host}/api/auth/google/callback`;
}

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
const GITHUB_EMAILS_URL = 'https://api.github.com/user/emails';

function getGithubRedirectUri(req: any): string {
  if (process.env.GITHUB_REDIRECT_URI) return process.env.GITHUB_REDIRECT_URI;
  const host = req.get('x-forwarded-host') || req.get('host');
  const protocol = req.get('x-forwarded-proto') || (req.secure ? 'https' : 'http');
  return `${protocol}://${host}/api/auth/github/callback`;
}

const registerSchema = z.object({
  email: z.string().trim(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  name: z.string().trim().optional()
});

const loginSchema = z.object({
  email: z.string().trim(),
  password: z.string().min(1, 'Password is required')
});

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000,
  path: '/'
};

authRouter.post('/register', async (req, res, next) => {
  try {
    const parse = registerSchema.safeParse(req.body);
    if (!parse.success) {
      throw new ValidationError(parse.error.issues.map(i => i.message).join(', '));
    }

    const { email, password, name } = parse.data;
    const result = await AuthService.register(email, password, name);

    res.cookie('session_id', result.sessionId, COOKIE_OPTIONS);
    res.status(201).json({
      user: result.user
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
      throw new ValidationError(parse.error.issues.map(i => i.message).join(', '));
    }

    const { email, password } = parse.data;
    const result = await AuthService.login(email, password);

    res.cookie('session_id', result.sessionId, COOKIE_OPTIONS);
    res.json({
      user: result.user
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/logout', async (req, res, next) => {
  try {
    const sessionId = req.cookies?.session_id || (req.headers['authorization']?.startsWith('Bearer ') ? req.headers['authorization'].slice(7) : undefined);
    if (sessionId) {
      await AuthService.logout(sessionId);
    }

    // Clear cookie and set strict cache prevention headers
    res.clearCookie('session_id', COOKIE_OPTIONS);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (err) {
    next(err);
  }
});

authRouter.get('/me', requireAuth, (req, res) => {
  res.json({
    user: req.user
  });
});

// ─── Google OAuth 2.0 ──────────────────────────────────────────────────────────
authRouter.get('/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return res.status(503).json({
      error: 'Google OAuth is not configured on this deployment yet (missing GOOGLE_CLIENT_ID).'
    });
  }

  const state = crypto.randomBytes(32).toString('hex');
  res.cookie('oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 10 * 60 * 1000,
    path: '/'
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getGoogleRedirectUri(req),
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'online',
    prompt: 'select_account'
  });

  res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
});

authRouter.get('/google/callback', async (req, res, next) => {
  try {
    const { code, state, error: oauthError } = req.query;
    const storedState = req.cookies?.oauth_state;
    res.clearCookie('oauth_state', { path: '/' });

    if (oauthError) {
      return res.redirect('/?auth_error=' + encodeURIComponent(String(oauthError)));
    }
    if (!code || !state || !storedState || state !== storedState) {
      return res.redirect('/?auth_error=Invalid+or+expired+OAuth+session');
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return res.redirect('/?auth_error=Google+OAuth+credentials+not+configured');
    }

    const redirectUri = getGoogleRedirectUri(req);
    const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: String(code),
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    if (!tokenRes.ok) {
      return res.redirect('/?auth_error=Failed+to+exchange+Google+token');
    }

    const tokens = (await tokenRes.json()) as { access_token?: string };
    if (!tokens.access_token) {
      return res.redirect('/?auth_error=Missing+access+token');
    }

    const profileRes = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    if (!profileRes.ok) {
      return res.redirect('/?auth_error=Failed+to+fetch+profile+from+Google');
    }

    const profile = (await profileRes.json()) as { sub?: string; email?: string; name?: string };
    if (!profile.sub || !profile.email) {
      return res.redirect('/?auth_error=Email+was+not+provided+by+Google');
    }

    const result = await AuthService.loginOrRegisterWithGoogle({
      googleId: profile.sub,
      email: profile.email,
      name: profile.name
    });

    res.cookie('session_id', result.sessionId, COOKIE_OPTIONS);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

// ─── GitHub OAuth 2.0 ──────────────────────────────────────────────────────────
authRouter.get('/github', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(503).json({
      error: 'GitHub OAuth is not configured on this deployment yet (missing GITHUB_CLIENT_ID).'
    });
  }

  const state = crypto.randomBytes(32).toString('hex');
  res.cookie('github_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 10 * 60 * 1000,
    path: '/'
  });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getGithubRedirectUri(req),
    scope: 'user:email',
    state
  });

  res.redirect(`${GITHUB_AUTH_URL}?${params.toString()}`);
});

authRouter.get('/github/callback', async (req, res, next) => {
  try {
    const { code, state, error: oauthError } = req.query;
    const storedState = req.cookies?.github_oauth_state;
    res.clearCookie('github_oauth_state', { path: '/' });

    if (oauthError) {
      return res.redirect('/?auth_error=' + encodeURIComponent(String(oauthError)));
    }
    if (!code || !state || !storedState || state !== storedState) {
      return res.redirect('/?auth_error=Invalid+or+expired+GitHub+OAuth+state');
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return res.redirect('/?auth_error=GitHub+OAuth+credentials+not+configured');
    }

    const redirectUri = getGithubRedirectUri(req);
    const tokenRes = await fetch(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: String(code),
        redirect_uri: redirectUri
      })
    });

    if (!tokenRes.ok) {
      return res.redirect('/?auth_error=Failed+to+exchange+GitHub+token');
    }

    const tokens = (await tokenRes.json()) as { access_token?: string; error?: string };
    if (!tokens.access_token) {
      return res.redirect('/?auth_error=' + encodeURIComponent(tokens.error || 'Missing+access+token'));
    }

    // Fetch GitHub user profile
    const userRes = await fetch(GITHUB_USER_URL, {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
        'User-Agent': 'AnyDSA-App',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!userRes.ok) {
      return res.redirect('/?auth_error=Failed+to+fetch+profile+from+GitHub');
    }

    const ghUser = (await userRes.json()) as { id?: number | string; email?: string; name?: string; login?: string };
    let primaryEmail = ghUser.email;

    // If user's primary email is private in GitHub profile, fetch from emails endpoint
    if (!primaryEmail) {
      const emailsRes = await fetch(GITHUB_EMAILS_URL, {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'User-Agent': 'AnyDSA-App',
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (emailsRes.ok) {
        const emails = (await emailsRes.json()) as Array<{ email: string; primary: boolean; verified: boolean }>;
        if (Array.isArray(emails)) {
          const found = emails.find(e => e.primary && e.verified) || emails.find(e => e.verified) || emails[0];
          primaryEmail = found?.email;
        }
      }
    }

    if (!ghUser.id || !primaryEmail) {
      return res.redirect('/?auth_error=A+verified+email+is+required+from+GitHub');
    }

    const result = await AuthService.loginOrRegisterWithGithub({
      githubId: String(ghUser.id),
      email: primaryEmail,
      name: ghUser.name || ghUser.login || primaryEmail.split('@')[0]
    });

    res.cookie('session_id', result.sessionId, COOKIE_OPTIONS);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});
