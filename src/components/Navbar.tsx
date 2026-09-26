import { useApp } from '../context/AppContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const { state, toggleTheme } = useApp();

  return (
    <nav className={styles.navbar} id="main-navbar">
      <div className={styles.brand}>
        <span className={styles.title}>AnyDSA</span>
      </div>
      <button
        id="theme-toggle-btn"
        className={styles.themeBtn}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title={`Switch to ${state.theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {state.theme === 'dark' ? '☼' : '☾'}
      </button>
    </nav>
  );
}
