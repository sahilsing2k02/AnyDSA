import { useMemo } from 'react';
import type { Pattern } from '../types';
import { useApp } from '../context/AppContext';
import { getProgressPercent } from '../utils/ui';
import styles from './StatsBar.module.css';

interface Props {
  patterns: Pattern[];
  showStarredOnly?: boolean;
  onToggleStarred?: () => void;
}

export function StatsBar({ patterns, showStarredOnly, onToggleStarred }: Props) {
  const { state } = useApp();

  const { totalProblems, totalSolved, easyTotal, easyDone, mediumTotal, mediumDone, hardTotal, hardDone } = useMemo(() => {
    let totalProblems = 0, totalSolved = 0;
    let easyTotal = 0, easyDone = 0;
    let mediumTotal = 0, mediumDone = 0;
    let hardTotal = 0, hardDone = 0;

    for (const pattern of patterns) {
      for (const problem of pattern.problems) {
        totalProblems++;
        const solved = state.solvedProblems.has(problem.id);
        if (solved) totalSolved++;

        if (problem.difficulty === 'Easy') { easyTotal++; if (solved) easyDone++; }
        if (problem.difficulty === 'Medium') { mediumTotal++; if (solved) mediumDone++; }
        if (problem.difficulty === 'Hard') { hardTotal++; if (solved) hardDone++; }
      }
    }

    return { totalProblems, totalSolved, easyTotal, easyDone, mediumTotal, mediumDone, hardTotal, hardDone };
  }, [patterns, state.solvedProblems]);

  const overallPercent = getProgressPercent(totalSolved, totalProblems);

  return (
    <div className={styles.statsBar} id="stats-bar">
      {/* Overall ring */}
      <div className={styles.overall}>
        <svg className={styles.ring} viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r="22" className={styles.ringBg} />
          <circle
            cx="28" cy="28" r="22"
            className={styles.ringFill}
            style={{
              strokeDasharray: `${138.23 * overallPercent / 100} 138.23`,
              strokeDashoffset: 0,
            }}
          />
        </svg>
        <div className={styles.ringLabel}>
          <span className={styles.ringPct}>{overallPercent}%</span>
        </div>
        <div className={styles.overallText}>
          <span className={styles.overallTitle}>Overall</span>
          <span className={styles.overallSub}>{totalSolved}/{totalProblems} solved</span>
        </div>
      </div>

      <div className={styles.separator} />

      {/* Per-difficulty stats */}
      <div className={styles.diffStats}>
        <DiffStat label="Easy" done={easyDone} total={easyTotal} color="var(--color-easy)" />
        <DiffStat label="Medium" done={mediumDone} total={mediumTotal} color="var(--color-medium)" />
        <DiffStat label="Hard" done={hardDone} total={hardTotal} color="var(--color-hard)" />
      </div>

      <div className={styles.separator} />

      {/* Starred */}
      <button 
        className={`${styles.bookmark} ${showStarredOnly ? styles.bookmarkActive : ''}`} 
        onClick={onToggleStarred}
        title={showStarredOnly ? 'Show all problems' : 'Show only starred problems'}
      >
        <span className={styles.bookmarkIcon}>★</span>
        <span className={styles.bookmarkLabel}>{state.bookmarkedProblems.size} Starred</span>
      </button>
    </div>
  );
}

function DiffStat({ label, done, total, color }: { label: string; done: number; total: number; color: string }) {
  const pct = getProgressPercent(done, total);
  return (
    <div className={styles.diffStat}>
      <span className={styles.diffLabel} style={{ color }}>
        {label}
      </span>
      <div className={styles.diffBar}>
        <div className={styles.diffBarFill} style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className={styles.diffCount} style={{ color }}>
        {done}/{total}
      </span>
    </div>
  );
}
