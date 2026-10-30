import { useState } from 'react';
import styles from './Auth.module.css';

interface Props {
  onBack: () => void;
  onLoginSuccess: (user: { id: string; email: string; name: string }) => void;
}

// RFC 5322 regex matching server validator
const RFC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function Auth({ onBack, onLoginSuccess }: Props) {
  const [isLogin, setIsLogin] = useState(false); // Default to register for new users
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
    <main className={styles.authContainer}>
      <button className={styles.backBtn} onClick={onBack}>
        ← Back to App
      </button>

      <div className={styles.card}>
        <h1 className={styles.title}>{isLogin ? 'Welcome back' : 'Create an account'}</h1>
        <p className={styles.subtitle}>
          {isLogin
            ? 'Sign in to access your notes and synchronized progress.'
            : 'Register to persist your notes and problem tracking in the relational database.'}
        </p>

        {error && <div className={styles.error}>{error}</div>}

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
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password (min 8 chars)</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className={styles.switchMode} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </main>
  );
}
