import { useState, useMemo } from 'react';
import { patterns as allPatterns } from '../data/patterns';
import { PatternCard } from '../components/PatternCard';
import { StatsBar } from '../components/StatsBar';
import { useApp } from '../context/AppContext';
import styles from './Home.module.css';

export function Home() {
  const { state } = useApp();
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const displayedPatterns = useMemo(() => {
    if (!showStarredOnly) return allPatterns;
    return allPatterns
      .map(pattern => ({
        ...pattern,
        problems: pattern.problems.filter(p => state.bookmarkedProblems.has(p.id))
      }))
      .filter(p => p.problems.length > 0);
  }, [showStarredOnly, state.bookmarkedProblems]);

  const hasResults = displayedPatterns.length > 0;

  return (
    <main className={styles.main} id="home-page">
      {/* Hero section */}
      <section className={styles.hero} id="hero-section">
        <h1 className={styles.heroTitle}>
          Master DSA{' '}
          <span className={styles.highlight}>Pattern by Pattern</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Curated problems organized by technique. Track your progress, bookmark favorites, and add personal notes.
        </p>
      </section>

      {/* Stats */}
      <StatsBar 
        patterns={allPatterns} 
        showStarredOnly={showStarredOnly} 
        onToggleStarred={() => setShowStarredOnly(prev => !prev)} 
      />


      {/* Pattern list */}
      <div className={styles.patternList} id="pattern-list">
        {hasResults ? (
          displayedPatterns.map((pattern, i) => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              defaultOpen={i === 0}
            />
          ))
        ) : (
          <div className={styles.empty} id="no-results">
            <p className={styles.emptyText}>No patterns available.</p>
          </div>
        )}
      </div>
    </main>
  );
}
