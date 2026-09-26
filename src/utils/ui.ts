import type { Difficulty, Platform } from '../types';

export const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  Easy: 'var(--color-easy)',
  Medium: 'var(--color-medium)',
  Hard: 'var(--color-hard)',
};

export const PLATFORM_ICON: Record<Platform, string> = {
  LeetCode: '🟧',
  GeeksForGeeks: '🟩',
  HackerRank: '🟦',
  Codeforces: '🟥',
  Other: '🔗',
};

export const PLATFORM_COLOR: Record<Platform, string> = {
  LeetCode: '#FFA116',
  GeeksForGeeks: '#2F8D46',
  HackerRank: '#2EC866',
  Codeforces: '#1F8ACB',
  Other: '#6B7280',
};

export function formatProgress(solved: number, total: number): string {
  return `${solved} / ${total}`;
}

export function getProgressPercent(solved: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((solved / total) * 100);
}
