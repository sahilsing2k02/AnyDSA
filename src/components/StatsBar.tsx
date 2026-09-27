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
  const handleRandomClick = () => {
    const unsolved = patterns.flatMap(pattern => 
      pattern.problems
        .filter(p => !state.solvedProblems.has(p.id))
        .map(p => ({ patternId: pattern.id, problemId: p.id }))
    );

    if (unsolved.length === 0) {
      alert("Amazing! You've solved all problems.");
      return;
    }

    const randomPick = unsolved[Math.floor(Math.random() * unsolved.length)];
    
    // Open the pattern card
    window.dispatchEvent(new CustomEvent('openPattern', { detail: randomPick.patternId }));

    // Scroll to the problem row slightly after to allow render
    setTimeout(() => {
      const el = document.getElementById(`problem-${randomPick.problemId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Flash highlight
        el.style.backgroundColor = 'var(--surface-3)';
        el.style.transition = 'background-color 0.5s ease';
        setTimeout(() => { el.style.backgroundColor = ''; }, 1500);
      }
    }, 150);
  };

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

      <div className={styles.actionsGroup}>
        {/* Starred */}
        <button 
          className={`${styles.bookmark} ${showStarredOnly ? styles.bookmarkActive : ''}`} 
          onClick={onToggleStarred}
          title={showStarredOnly ? 'Show all problems' : 'Show only starred problems'}
        >
          <span className={styles.bookmarkIcon}>★</span>
          <span className={styles.bookmarkLabel}>{state.bookmarkedProblems.size} Starred</span>
        </button>

        {/* Random Pick */}
        <button 
          className={styles.randomBtn} 
          onClick={handleRandomClick}
          title="Pick a random unsolved problem"
        >
          <span className={styles.randomIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </span>
          <span className={styles.randomLabel}>Random</span>
        </button>
      </div>
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
