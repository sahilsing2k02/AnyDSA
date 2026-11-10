import { useState, useEffect } from 'react';
import styles from './Auth.module.css';

interface Props {
  onBack: () => void;
  onLoginSuccess: (user: { id: string; email: string; name: string }) => void;
  onOpenPrivacy?: () => void;
}

// RFC 5322 regex matching server validator
const RFC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

function calculatePasswordStrength(pwd: string): { score: number; label: string } {
  if (!pwd) return { score: 0, label: '' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
  return { score: Math.min(score, 5), label: labels[score] || 'Strong' };
}

export function Auth({ onBack, onLoginSuccess, onOpenPrivacy }: Props) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const authErr = params.get('auth_error');
      if (authErr) return `Notice: ${authErr.replace(/\+/g, ' ')}`;
    } catch {}
    return null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('auth_error')) {
        url.searchParams.delete('auth_error');
        window.history.replaceState(null, '', url.toString());
      }
    } catch {}
  }, []);

  const handleGoogleLogin = () => {
    setError(null);
    window.location.href = '/api/auth/google';
  };

  const handleGithubNotice = () => {
    setError('GitHub authentication will be available once GITHUB_CLIENT_ID is configured.');
  };

  const handleAppleNotice = () => {
    setError('Apple ID authentication will be available once APPLE_CLIENT_ID is configured.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!RFC_EMAIL_REGEX.test(trimmedEmail)) {
      setError('Please provide a valid, RFC-compliant email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!isLogin && !agreeTerms) {
      setError('Please accept the terms of service and privacy policy to continue.');
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

  const { score: strengthScore, label: strengthLabel } = calculatePasswordStrength(password);

  return (
    <main className={styles.authContainer} id="main-content">
      <button className={styles.backBtn} onClick={onBack} aria-label="Back to main practice page">
        <span>←</span> Back to Practice
      </button>

      <div className={styles.card}>
        {/* Top Tab Pill Switcher */}
        <div className={styles.tabSwitch} role="tablist" aria-label="Sign In or Create Account">
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

        {/* Header Block matching Reference Image */}
        <div className={styles.headerBlock}>
          <span className={styles.eyebrow}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </span>
          <h1 className={styles.title}>
            {isLogin ? 'Welcome Back' : 'Get started'}
          </h1>
          <p className={styles.subtitle}>
            {isLogin
              ? 'Access your digital workspace.'
              : 'Create your free account'}
          </p>
        </div>

        {error && <div className={styles.error} role="alert">{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">
              {isLogin ? 'Email / Username' : 'Work Email'}
            </label>
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
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className={styles.togglePasswordBtn}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁' : '👁‍🗨'}
              </button>
            </div>

            {/* Segmented Password Strength Bar (Reference Feature) */}
            {!isLogin && password.length > 0 && (
              <div className={styles.strengthWrapper}>
                <div className={styles.strengthHeader}>
                  <span className={styles.strengthLabel}>Password Strength</span>
                  <span className={styles.strengthRating}>{strengthLabel}</span>
                </div>
                <div className={styles.strengthTrack} aria-label={`Password strength: ${strengthLabel}`}>
                  {[1, 2, 3, 4, 5].map(idx => (
                    <div
                      key={idx}
                      className={`${styles.strengthSegment} ${strengthScore >= idx ? styles.strengthActive : ''}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Option Row: Remember Me / Forgot Password OR Terms Checkbox */}
          {isLogin ? (
            <div className={styles.optionsRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className={styles.forgotLink}
                onClick={() => {
                  setIsLogin(false);
                  setError(null);
                }}
              >
                Forgot password?
              </button>
            </div>
          ) : (
            <div className={styles.optionsRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  required
                />
                <span>
                  I agree to{' '}
                  <button
                    type="button"
                    className={styles.termsLink}
                    onClick={onOpenPrivacy}
                  >
                    terms of service &amp; privacy policies
                  </button>
                </span>
              </label>
            </div>
          )}

          {/* Glowing Luminous Pill Submit Button */}
          <button
            type="submit"
            className={styles.luminousSubmitBtn}
            disabled={loading}
          >
            {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Social SSO Divider */}
        <div className={styles.ssoDivider}>
          <span>Social SSO</span>
        </div>

        {/* Social SSO Row: Google, GitHub, Apple */}
        <div className={styles.ssoRow}>
          <button
            type="button"
            className={styles.ssoBtn}
            onClick={handleGoogleLogin}
            aria-label="Continue with Google"
            title="Continue with Google"
          >
            <svg className={styles.ssoIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.24 10.285V13.4h6.887C18.2 16.14 15.645 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.61 0 3.09.62 4.23 1.635l2.42-2.42C17.275 3.69 14.895 3 12.24 3 7.275 3 3.24 7.035 3.24 12s4.035 9 9 9c5.205 0 8.655-3.66 8.655-8.82 0-.645-.06-1.125-.165-1.895H12.24z"/>
            </svg>
            Google
          </button>

          <button
            type="button"
            className={styles.ssoBtn}
            onClick={handleGithubNotice}
            aria-label="Continue with GitHub"
            title="Continue with GitHub"
          >
            <svg className={styles.ssoIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Github
          </button>

          <button
            type="button"
            className={styles.ssoBtn}
            onClick={handleAppleNotice}
            aria-label="Continue with Apple"
            title="Continue with Apple"
          >
            <svg className={styles.ssoIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.41c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.73 1.4-.59.68-1.11 1.77-.97 2.83 1.04.08 2.1-.51 2.74-1.29z"/>
            </svg>
            Apple
          </button>
        </div>
      </div>
    </main>
  );
}
