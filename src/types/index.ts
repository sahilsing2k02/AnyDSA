// ─── Domain Types ────────────────────────────────────────────────────────────

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Platform = 'LeetCode' | 'GeeksForGeeks' | 'HackerRank' | 'Codeforces' | 'Other';

export interface ProblemLink {
  platform: Platform;
  url: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  links: ProblemLink[];
  tags?: string[];
}

export interface Pattern {
  id: string;
  name: string;
  description: string;
  icon: string;
  problems: Problem[];
}

// ─── UI / State Types ─────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light';

export interface ProblemNote {
  problemId: string;
  content: string;
  updatedAt: string;
}

export interface AppState {
  solvedProblems: Set<string>;
  bookmarkedProblems: Set<string>;
  notes: Record<string, ProblemNote>;
  theme: Theme;
}

export type FilterDifficulty = 'All' | Difficulty;
export type FilterStatus = 'All' | 'Solved' | 'Unsolved' | 'Starred';
