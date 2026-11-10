import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import './index.css';

interface User {
  id: string;
  email: string;
  name: string;
}

type ViewState = 'home' | 'login' | 'privacy';

function MainLayout({
  view,
  setView,
  user,
  setUser
}: {
  view: ViewState;
  setView: (v: ViewState) => void;
  user: User | null;
  setUser: (u: User | null) => void;
}) {
  const { resetAllStateForLogout } = useApp();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Cache-Control': 'no-cache' }
      });
    } catch (err) {
      console.warn('Logout error:', err);
    }

    // Comprehensive client-side state reset
    resetAllStateForLogout();
    setUser(null);
    setView('home');

    // Prevent back-button or history re-navigation to authenticated state
    window.history.replaceState(null, '', '/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header role="banner">
        <Navbar
          onLoginClick={() => setView('login')}
          user={user}
          onLogout={handleLogout}
          onNavigateHome={() => setView('home')}
        />
      </header>

      <div style={{ flex: 1 }}>
        {view === 'login' && (
          <Auth
            onBack={() => setView('home')}
            onLoginSuccess={(loggedInUser) => {
              setUser(loggedInUser);
              setView('home');
            }}
            onOpenPrivacy={() => setView('privacy')}
          />
        )}
        {view === 'privacy' && (
          <PrivacyPolicy onBack={() => setView('home')} />
        )}
        {view === 'home' && <Home />}
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState<ViewState>(() => {
    try {
      if (window.location.pathname === '/privacy') return 'privacy';
    } catch {}
    return 'home';
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initial session hydration
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        return null;
      })
      .then(data => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <ErrorBoundary>
      <AppProvider isAuthenticated={Boolean(user)}>
        <MainLayout
          view={view}
          setView={setView}
          user={user}
          setUser={setUser}
        />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
