import { useApp } from '../context/AppContext';
import styles from './Navbar.module.css';

interface Props {
  onLoginClick?: () => void;
  user?: { email: string, name: string } | null;
  onLogout?: () => void;
}

export function Navbar({ onLoginClick, user, onLogout }: Props) {
  const { state, toggleTheme } = useApp();

  return (
    <nav className={styles.navbar} id="main-navbar">
      <div className={styles.brand}>
        <span className={styles.title}>AnyDSA</span>
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
