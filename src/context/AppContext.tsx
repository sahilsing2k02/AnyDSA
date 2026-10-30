import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react';
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
  toggleSolved: (problemId: string) => Promise<void>;
  toggleBookmark: (problemId: string) => Promise<void>;
  setNote: (problemId: string, content: string) => Promise<void>;
  toggleTheme: () => void;
  resetProgress: () => Promise<void>;
  resetAllStateForLogout: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Local Helpers ────────────────────────────────────────────────────────────
function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveSet(key: string, value: Set<string>): void {
  try {
    localStorage.setItem(key, JSON.stringify([...value]));
  } catch (err) {
    console.error('Failed to save set to localStorage:', err);
  }
}

function loadNotes(): Record<string, ProblemNote> {
  try {
    const raw = localStorage.getItem(KEYS.NOTES);
    return raw ? (JSON.parse(raw) as Record<string, ProblemNote>) : {};
  } catch {
    return {};
  }
}

function saveNotes(notes: Record<string, ProblemNote>): void {
  try {
    localStorage.setItem(KEYS.NOTES, JSON.stringify(notes));
  } catch (err) {
    console.error('Failed to save notes to localStorage:', err);
  }
}

function loadTheme(): Theme {
  const stored = localStorage.getItem(KEYS.THEME) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function AppProvider({ children, isAuthenticated }: { children: ReactNode; isAuthenticated?: boolean }) {
  const isAuthRef = useRef(isAuthenticated);

  useEffect(() => {
    isAuthRef.current = isAuthenticated;
  }, [isAuthenticated]);

  const [state, setState] = useState<AppState>(() => ({
    solvedProblems: loadSet(KEYS.SOLVED),
    bookmarkedProblems: loadSet(KEYS.BOOKMARKED),
    notes: loadNotes(),
    theme: loadTheme(),
  }));

  // Fetch persisted data from PostgreSQL relational database when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    let isMounted = true;
    const fetchUserData = async () => {
      try {
        const [progressRes, notesRes] = await Promise.all([
          fetch('/api/progress'),
          fetch('/api/notes')
        ]);

        if (progressRes.ok && notesRes.ok && isMounted) {
          const progressData = await progressRes.json();
          const notesData = await notesRes.json();

          const solved = new Set<string>(progressData.solvedProblems || []);
          const bookmarked = new Set<string>(progressData.bookmarkedProblems || []);
          const notes: Record<string, ProblemNote> = notesData.notes || {};

          saveSet(KEYS.SOLVED, solved);
          saveSet(KEYS.BOOKMARKED, bookmarked);
          saveNotes(notes);

          setState(prev => ({
            ...prev,
            solvedProblems: solved,
            bookmarkedProblems: bookmarked,
            notes: notes
          }));
        }
      } catch (err) {
        console.warn('API sync unavailable:', err);
      }
    };

    fetchUserData();
    return () => { isMounted = false; };
  }, [isAuthenticated]);

  // Sync theme attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem(KEYS.THEME, state.theme);
  }, [state.theme]);

  const toggleSolved = async (id: string) => {
    setState(prev => {
      const next = new Set(prev.solvedProblems);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveSet(KEYS.SOLVED, next);
      return { ...prev, solvedProblems: next };
    });

    if (isAuthRef.current) {
      try {
        await fetch('/api/progress/toggle-solved', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problemId: id })
        });
      } catch (err) {
        console.warn('Failed to sync solved state to server:', err);
      }
    }
  };

  const toggleBookmark = async (id: string) => {
    setState(prev => {
      const next = new Set(prev.bookmarkedProblems);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveSet(KEYS.BOOKMARKED, next);
      return { ...prev, bookmarkedProblems: next };
    });

    if (isAuthRef.current) {
      try {
        await fetch('/api/progress/toggle-bookmark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problemId: id })
        });
      } catch (err) {
        console.warn('Failed to sync bookmark state to server:', err);
      }
    }
  };

  const setNote = async (problemId: string, content: string) => {
    const currentNote = state.notes[problemId];
    const expectedVersion = currentNote?.version;

    if (isAuthRef.current) {
      try {
        const res = await fetch(`/api/notes/${problemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, version: expectedVersion })
        });

        if (res.status === 409) {
          const conflictData = await res.json();
          alert(`Conflict: This note was updated from another session (Version ${conflictData.currentData?.version}). The note has been reloaded with the latest version.`);
          if (conflictData.currentData) {
            setState(prev => {
              const updated = {
                ...prev.notes,
                [problemId]: {
                  problemId,
                  content: conflictData.currentData.content,
                  version: conflictData.currentData.version,
                  updatedAt: conflictData.currentData.updatedAt
                }
              };
              saveNotes(updated);
              return { ...prev, notes: updated };
            });
          }
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setState(prev => {
            const nextNotes = {
              ...prev.notes,
              [problemId]: {
                problemId,
                content: data.note.content,
                version: data.note.version,
                updatedAt: data.note.updatedAt
              }
            };
            saveNotes(nextNotes);
            return { ...prev, notes: nextNotes };
          });
          return;
        }
      } catch (err) {
        console.warn('Server note save failed, saving locally:', err);
      }
    }

    // Local fallback
    setState(prev => {
      const nextNotes = {
        ...prev.notes,
        [problemId]: {
          problemId,
          content,
          updatedAt: new Date().toISOString(),
          version: (currentNote?.version || 0) + 1
        },
      };
      saveNotes(nextNotes);
      return { ...prev, notes: nextNotes };
    });
  };

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  };

  const resetProgress = async () => {
    const empty = new Set<string>();
    const emptyNotes = {};
    saveSet(KEYS.SOLVED, empty);
    saveSet(KEYS.BOOKMARKED, empty);
    saveNotes(emptyNotes);
    setState(prev => ({ ...prev, solvedProblems: empty, bookmarkedProblems: empty, notes: emptyNotes }));

    if (isAuthRef.current) {
      try {
        await fetch('/api/progress/reset', { method: 'POST' });
      } catch (err) {
        console.warn('Failed to reset progress on server:', err);
      }
    }
  };

  const resetAllStateForLogout = () => {
    // Comprehensive client-side state reset
    setState({
      solvedProblems: new Set(),
      bookmarkedProblems: new Set(),
      notes: {},
      theme: loadTheme(),
    });
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (err) {
      console.error('Error clearing client storage:', err);
    }
  };

  return (
    <AppContext.Provider value={{ state, toggleSolved, toggleBookmark, setNote, toggleTheme, resetProgress, resetAllStateForLogout }}>
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
