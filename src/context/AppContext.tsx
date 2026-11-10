import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react';
import type { AppState, Theme, ProblemNote, MainSection } from '../types';

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
  activeSection: MainSection;
  setActiveSection: (section: MainSection) => void;
  toggleSolved: (problemId: string) => Promise<void>;
  toggleBookmark: (problemId: string) => Promise<void>;
  setNote: (problemId: string, content: string) => Promise<void>;
  toggleTheme: () => void;
  resetProgress: () => Promise<void>;
  resetAllStateForLogout: () => void;
  exportUserData: () => void;
  importUserData: (jsonString: string) => Promise<{ success: boolean; message: string }>;
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

function getInitialSection(): MainSection {
  try {
    const params = new URLSearchParams(window.location.search);
    const sec = params.get('section')?.toLowerCase();
    if (sec === 'cs-fundamentals' || sec === 'sql' || sec === 'lld' || sec === 'dsa') {
      return sec as MainSection;
    }
  } catch {}
  return 'dsa';
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
  const [activeSection, setActiveSectionState] = useState<MainSection>(getInitialSection);

  const setActiveSection = (section: MainSection) => {
    setActiveSectionState(section);
    try {
      const url = new URL(window.location.href);
      if (section === 'dsa') {
        url.searchParams.delete('section');
      } else {
        url.searchParams.set('section', section);
      }
      window.history.pushState(null, '', url.toString());

      const titles: Record<MainSection, string> = {
        'dsa': 'AnyDSA — Pattern-wise DSA Problems',
        'cs-fundamentals': 'AnyDSA — CS Fundamentals Interview Guide',
        'sql': 'AnyDSA — Top 50 SQL Interview Questions',
        'lld': 'AnyDSA — Low-Level System Design (LLD)'
      };
      document.title = titles[section] || 'AnyDSA';
    } catch {}
  };

  // Fetch persisted data from PostgreSQL relational database when authenticated & merge guest data
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

          const guestSolved = loadSet(KEYS.SOLVED);
          const guestBookmarked = loadSet(KEYS.BOOKMARKED);
          const guestNotes = loadNotes();

          // Merge guest data into server data (guest migration)
          const solved = new Set<string>([...(progressData.solvedProblems || []), ...guestSolved]);
          const bookmarked = new Set<string>([...(progressData.bookmarkedProblems || []), ...guestBookmarked]);
          const notes: Record<string, ProblemNote> = { ...guestNotes, ...(notesData.notes || {}) };

          // Sync merged guest data up to server if new
          const hasNewGuestData = 
            guestSolved.size > 0 && Array.from(guestSolved).some(id => !progressData.solvedProblems?.includes(id)) ||
            guestBookmarked.size > 0 && Array.from(guestBookmarked).some(id => !progressData.bookmarkedProblems?.includes(id));

          if (hasNewGuestData) {
            fetch('/api/progress/atomic-sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                solvedProblems: Array.from(solved),
                bookmarkedProblems: Array.from(bookmarked)
              })
            }).catch(() => {});
          }

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
    setActiveSection('dsa');
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (err) {
      console.error('Error clearing client storage:', err);
    }
  };

  const exportUserData = () => {
    try {
      const exportObject = {
        app: 'AnyDSA',
        version: 1,
        exportedAt: new Date().toISOString(),
        solvedProblems: Array.from(state.solvedProblems),
        bookmarkedProblems: Array.from(state.bookmarkedProblems),
        notes: state.notes
      };

      const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `anydsa-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const importUserData = async (jsonString: string): Promise<{ success: boolean; message: string }> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: 'Invalid backup file format' };
      }

      const importedSolved = new Set<string>(Array.isArray(parsed.solvedProblems) ? parsed.solvedProblems : []);
      const importedBookmarked = new Set<string>(Array.isArray(parsed.bookmarkedProblems) ? parsed.bookmarkedProblems : []);
      const importedNotes: Record<string, ProblemNote> = (parsed.notes && typeof parsed.notes === 'object') ? parsed.notes : {};

      const nextSolved = new Set<string>([...state.solvedProblems, ...importedSolved]);
      const nextBookmarked = new Set<string>([...state.bookmarkedProblems, ...importedBookmarked]);
      const nextNotes = { ...state.notes, ...importedNotes };

      saveSet(KEYS.SOLVED, nextSolved);
      saveSet(KEYS.BOOKMARKED, nextBookmarked);
      saveNotes(nextNotes);

      setState(prev => ({
        ...prev,
        solvedProblems: nextSolved,
        bookmarkedProblems: nextBookmarked,
        notes: nextNotes
      }));

      // If authenticated, sync imported data to server
      if (isAuthRef.current) {
        fetch('/api/progress/atomic-sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            solvedProblems: Array.from(nextSolved),
            bookmarkedProblems: Array.from(nextBookmarked)
          })
        }).catch(() => {});
      }

      return {
        success: true,
        message: `Successfully imported ${importedSolved.size} solved and ${Object.keys(importedNotes).length} notes.`
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to parse JSON file' };
    }
  };

  return (
    <AppContext.Provider value={{
      state,
      activeSection,
      setActiveSection,
      toggleSolved,
      toggleBookmark,
      setNote,
      toggleTheme,
      resetProgress,
      resetAllStateForLogout,
      exportUserData,
      importUserData
    }}>
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
