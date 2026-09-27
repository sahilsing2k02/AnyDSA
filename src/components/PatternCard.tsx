import { useState, useMemo, useEffect } from 'react';
import type { Pattern } from '../types';
import { ProblemRow } from './ProblemRow';
import { useApp } from '../context/AppContext';
import { getProgressPercent } from '../utils/ui';
import styles from './PatternCard.module.css';

interface Props {
  pattern: Pattern;
  defaultOpen?: boolean;
}

export function PatternCard({ pattern, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const { state } = useApp();

  useEffect(() => {
    const handleOpen = (e: Event) => {
      if ((e as CustomEvent).detail === pattern.id) {
        setOpen(true);
      }
    };
    window.addEventListener('openPattern', handleOpen);
    return () => window.removeEventListener('openPattern', handleOpen);
  }, [pattern.id]);

  const solvedCount = useMemo(
    () => pattern.problems.filter(p => state.solvedProblems.has(p.id)).length,
    [pattern.problems, state.solvedProblems]
  );

  const total = pattern.problems.length;
  const percent = getProgressPercent(solvedCount, total);
  const allSolved = solvedCount === total && total > 0;

  return (
    <article
      className={`${styles.card} ${allSolved ? styles.completed : ''}`}
      id={`pattern-${pattern.id}`}
    >
      {/* Header */}
      <button
        className={styles.header}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        id={`pattern-toggle-${pattern.id}`}
      >
        <div className={styles.headerLeft}>
          <span className={styles.name}>{pattern.name}</span>
          <span className={styles.count}>{total} problems</span>
        </div>

        <div className={styles.headerRight}>
          {/* Progress bar */}
          <div className={styles.progressWrap}>
            <div
              className={styles.progressBar}
              style={{ width: `${percent}%` }}
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className={styles.progressLabel}>{solvedCount}/{total}</span>
          {allSolved && <span className={styles.doneBadge}>✓ Done</span>}
          <span className={`${styles.chevron} ${open ? styles.open : ''}`}>›</span>
        </div>
      </button>

      {/* Problem list */}
      {open && (
        <div className={styles.body}>
          <div className={styles.divider} />
          {pattern.problems.map((problem, i) => (
            <ProblemRow key={problem.id} problem={problem} index={i} />
          ))}
        </div>
      )}
    </article>
  );
}
