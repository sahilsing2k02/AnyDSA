import { useApp } from '../context/AppContext';
import type { MainSection } from '../types';
import styles from './Navbar.module.css';

interface Props {
  onLoginClick?: () => void;
  user?: { email: string; name: string } | null;
  onLogout?: () => void;
  onNavigateHome?: () => void;
}

const SECTIONS: { id: MainSection; label: string }[] = [
  { id: 'dsa', label: 'DSA' },
  { id: 'cs-fundamentals', label: 'CS Fundamentals' },
  { id: 'sql', label: 'SQL Top 50' },
  { id: 'lld', label: 'LLD' },
];

export function Navbar({ onLoginClick, user, onLogout, onNavigateHome }: Props) {
  const { state, toggleTheme, activeSection, setActiveSection } = useApp();

  const handleSectionClick = (sectionId: MainSection) => {
    setActiveSection(sectionId);
    onNavigateHome?.();
  };

  return (
    <nav className={styles.navbar} id="main-navbar">
      <div 
        className={styles.brand} 
        onClick={() => handleSectionClick('dsa')}
        role="button"
        tabIndex={0}
        title="Go to AnyDSA Home"
      >
        <span className={styles.title}>AnyDSA</span>
      </div>

      {/* Navigation Sections without Emojis */}
      <div className={styles.navSections} role="tablist" aria-label="Study Sections">
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              className={`${styles.sectionLink} ${isActive ? styles.activeSection : ''}`}
              onClick={() => handleSectionClick(id)}
              id={`nav-section-${id}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className={styles.navRight}>
        {user ? (
          <div className={styles.userMenu}>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={onLoginClick}>Sign In</button>
        )}

        <button
          id="theme-toggle-btn"
          className={styles.themeBtn}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${state.theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {state.theme === 'dark' ? '☼' : '☾'}
        </button>
      </div>
    </nav>
  );
}
