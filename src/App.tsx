import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import './index.css';

interface User {
  id: string;
  email: string;
  name: string;
}

function MainLayout({
  view,
  setView,
  user,
  setUser
}: {
  view: 'home' | 'login';
  setView: (v: 'home' | 'login') => void;
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
    <>
      <Navbar
        onLoginClick={() => setView('login')}
        user={user}
        onLogout={handleLogout}
      />
      {view === 'login' ? (
        <Auth
          onBack={() => setView('home')}
          onLoginSuccess={(loggedInUser) => {
            setUser(loggedInUser);
            setView('home');
          }}
        />
      ) : (
        <Home />
      )}
    </>
  );
}

function App() {
  const [view, setView] = useState<'home' | 'login'>('home');
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
    <AppProvider isAuthenticated={Boolean(user)}>
      <MainLayout
        view={view}
        setView={setView}
        user={user}
        setUser={setUser}
      />
    </AppProvider>
  );
}

export default App;
