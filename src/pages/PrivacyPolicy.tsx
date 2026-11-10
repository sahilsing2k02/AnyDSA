interface Props {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: Props) {
  return (
    <main
      id="main-content"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 1.2rem 4rem',
        color: 'var(--text)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: 1.65
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text-muted)',
          padding: '0.45rem 0.9rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '1.5rem'
        }}
      >
        ← Back to Practice
      </button>

      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Effective Date: November 2026
      </p>

      <section style={{ marginBottom: '1.8rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Information We Collect</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          AnyDSA is designed to give you complete ownership of your learning progress. We only collect:
        </p>
        <ul style={{ color: 'var(--text-muted)', fontSize: '0.95rem', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Local Data:</strong> Solved problems, bookmarked favorites, and personal study notes stored in your browser's local storage.</li>
          <li><strong>Account Data:</strong> If you choose to register an account, we securely store your email address, an encrypted password hash (bcrypt), and sync your problem progress and notes to our database.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '1.8rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Cookies &amp; Storage</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          We use secure, HTTP-only authentication session cookies exclusively to maintain your login session across visits. We do not use third-party tracking, advertising, or cross-site profiling cookies.
        </p>
      </section>

      <section style={{ marginBottom: '1.8rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Data Portability &amp; Deletion</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          You can export your complete problem progress, bookmarks, and notes at any time in standard JSON format using the Export feature in the application footer. You can reset or delete your account data directly from your account settings.
        </p>
      </section>

      <section style={{ marginBottom: '1.8rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>4. Contact</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          If you have questions or feedback regarding this policy, reach out via our GitHub repository or support channels.
        </p>
      </section>
    </main>
  );
}
