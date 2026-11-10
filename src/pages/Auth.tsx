import { useState, useEffect } from 'react';
import styles from './Auth.module.css';

interface Props {
  onBack: () => void;
  onLoginSuccess: (user: { id: string; email: string; name: string }) => void;
}

// RFC 5322 regex matching server validator
const RFC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function Auth({ onBack, onLoginSuccess }: Props) {
  const [isLogin, setIsLogin] = useState(false); // Default to register for new visitors
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const authErr = params.get('auth_error');
      if (authErr) return `Authentication Notice: ${authErr.replace(/\+/g, ' ')}`;
    } catch {}
    return null;
  });
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Clean auth_error query param from URL on mount
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('auth_error')) {
        url.searchParams.delete('auth_error');
        window.history.replaceState(null, '', url.toString());
      }
    } catch {}
  }, []);

  const handleGoogleLogin = async () => {
    setError(null);
    setNotice(null);
    try {
      // Direct redirect to initiate Google OAuth 2.0 flow
      window.location.href = '/api/auth/google';
    } catch (err: any) {
      setError(err.message || 'Failed to initiate Google Sign-In');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!RFC_EMAIL_REGEX.test(trimmedEmail)) {
      setError('Please provide a valid, RFC-compliant email address (e.g. user@domain.com)');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload: { email: string; password: string; name?: string } = {
        email: trimmedEmail,
        password
      };
      if (!isLogin && name.trim()) {
        payload.name = name.trim();
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let data: any = {};
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || `Server returned error (${res.status})`);
      }

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.authContainer} id="main-content">
      <button className={styles.backBtn} onClick={onBack} aria-label="Back to main practice page">
        <span>←</span> Back to Practice
      </button>

      <div className={styles.card}>
        {/* Segmented Tab Switcher */}
        <div className={styles.tabGroup} role="tablist" aria-label="Authentication Options">
          <button
            type="button"
            role="tab"
            aria-selected={isLogin}
            className={`${styles.tabBtn} ${isLogin ? styles.tabActive : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isLogin}
            className={`${styles.tabBtn} ${!isLogin ? styles.tabActive : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
          >
            Create Account
          </button>
        </div>

        <div className={styles.headerText}>
          <h1 className={styles.title}>{isLogin ? 'Welcome back' : 'Create an account'}</h1>
          <p className={styles.subtitle}>
            {isLogin
              ? 'Sign in to access your notes and synchronized problem progress.'
              : 'Save your solved problems, bookmarks, and structured notes to the cloud.'}
          </p>
        </div>

        {error && <div className={styles.error} role="alert">{error}</div>}
        {notice && <div className={styles.notice} role="status">{notice}</div>}

        {/* Continue with Google */}
        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
          aria-label="Continue with Google"
        >
          <svg className={styles.googleIcon} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Continue with Google
        </button>

        <div className={styles.divider}>
          <span>or with email</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Sahil Singh"
                autoComplete="name"
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="engineer@domain.com"
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              <button
                type="button"
                className={styles.togglePasswordBtn}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? '👁' : '👁‍🗨'}
              </button>
            </div>
            {!isLogin && (
              <div className={styles.passwordHint}>
                <span className={password.length >= 8 ? styles.hintValid : styles.hintMuted}>
                  {password.length >= 8 ? '✓' : '○'} At least 8 characters
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className={styles.guestNote}>
          Guest progress in this browser will automatically merge with your account upon sign in.
        </div>
      </div>
    </main>
  );
}
