import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AppState, Theme, ProblemNote } from '../types';

// ─── Storage Keys ─────────────────────────────────────────────────────────────
const KEYS = {
  SOLVED: 'anydsa_solved',
  BOOKMARKED: 'anydsa_bookmarked',
  NOTES: 'anydsa_notes',
  THEME: 'anydsa_theme',
} as const;

// ─── Context Interface ────────────────────────────────────────────────────────
interface AppContextValue {
  state: AppState;
  toggleSolved: (problemId: string) => void;
  toggleBookmark: (problemId: string) => void;
  setNote: (problemId: string, content: string) => void;
  toggleTheme: () => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveSet(key: string, value: Set<string>): void {
  localStorage.setItem(key, JSON.stringify([...value]));
}

function loadNotes(): Record<string, ProblemNote> {
  try {
    const raw = localStorage.getItem(KEYS.NOTES);
    return raw ? (JSON.parse(raw) as Record<string, ProblemNote>) : {};
  } catch {
    return {};
  }
}

function loadTheme(): Theme {
  const stored = localStorage.getItem(KEYS.THEME) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => ({
    solvedProblems: loadSet(KEYS.SOLVED),
    bookmarkedProblems: loadSet(KEYS.BOOKMARKED),
    notes: loadNotes(),
    theme: loadTheme(),
  }));

  // Sync theme attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem(KEYS.THEME, state.theme);
  }, [state.theme]);

  const toggleSolved = (id: string) => {
    setState(prev => {
      const next = new Set(prev.solvedProblems);
      next.has(id) ? next.delete(id) : next.add(id);
      saveSet(KEYS.SOLVED, next);
      return { ...prev, solvedProblems: next };
    });
  };

  const toggleBookmark = (id: string) => {
    setState(prev => {
      const next = new Set(prev.bookmarkedProblems);
      next.has(id) ? next.delete(id) : next.add(id);
      saveSet(KEYS.BOOKMARKED, next);
      return { ...prev, bookmarkedProblems: next };
    });
  };

  const setNote = (problemId: string, content: string) => {
    setState(prev => {
      const notes = {
        ...prev.notes,
        [problemId]: { problemId, content, updatedAt: new Date().toISOString() },
      };
      localStorage.setItem(KEYS.NOTES, JSON.stringify(notes));
      return { ...prev, notes };
    });
  };

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const resetProgress = () => {
    const empty = new Set<string>();
    saveSet(KEYS.SOLVED, empty);
    saveSet(KEYS.BOOKMARKED, empty);
    localStorage.setItem(KEYS.NOTES, '{}');
    setState(prev => ({ ...prev, solvedProblems: empty, bookmarkedProblems: empty, notes: {} }));
  };

  return (
    <AppContext.Provider value={{ state, toggleSolved, toggleBookmark, setNote, toggleTheme, resetProgress }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
