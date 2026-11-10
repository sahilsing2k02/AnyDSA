import { useRef } from 'react';
import { useApp } from '../context/AppContext';

interface Props {
  onOpenPrivacy: () => void;
}

export function Footer({ onOpenPrivacy }: Props) {
  const { exportUserData, importUserData } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const res = await importUserData(text);
      alert(res.message);
    } catch {
      alert('Failed to read backup file.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem 1.5rem',
        marginTop: 'auto',
        background: 'var(--surface-1)',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <strong style={{ color: 'var(--text)', fontWeight: 700 }}>AnyDSA</strong> — Pattern-wise Interview Preparation
          <div style={{ marginTop: '0.25rem', fontSize: '0.78rem' }}>
            Built for focused practice and persistent interview study notes.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Data Portability (Backup / Restore) */}
          <button
            onClick={exportUserData}
            title="Export your progress, bookmarks, and notes as JSON"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text)',
              padding: '4px 10px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📥 Export Backup
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import an existing AnyDSA JSON backup file"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text)',
              padding: '4px 10px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📤 Import Backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            aria-label="Upload JSON backup"
          />

          <button
            onClick={onOpenPrivacy}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '0.8rem',
              padding: 0
            }}
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
}

