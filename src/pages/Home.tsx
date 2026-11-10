import { useState, useMemo } from 'react';
import type { MainSection, CSFundCategory } from '../types';
import { patterns as dsaPatterns } from '../data/patterns';
import { csFundamentals } from '../data/csFundamentals';
import { sqlQuestions } from '../data/sqlQuestions';
import { lldQuestions } from '../data/lldQuestions';
import { PatternCard } from '../components/PatternCard';
import { StatsBar } from '../components/StatsBar';
import { useApp } from '../context/AppContext';
import styles from './Home.module.css';

export function Home() {
  const { state } = useApp();
  const [activeSection, setActiveSection] = useState<MainSection>('dsa');
  const [csCategory, setCsCategory] = useState<CSFundCategory>('all');
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  // Select base pattern set depending on active section
  const currentSectionPatterns = useMemo(() => {
    switch (activeSection) {
      case 'dsa':
        return dsaPatterns;
      case 'cs-fundamentals': {
        if (csCategory === 'all') return csFundamentals;
        return csFundamentals.filter(p => p.id === `cs-${csCategory}`);
      }
      case 'sql':
        return sqlQuestions;
      case 'lld':
        return lldQuestions;
      default:
        return dsaPatterns;
    }
  }, [activeSection, csCategory]);

  // Apply starred filter
  const displayedPatterns = useMemo(() => {
    if (!showStarredOnly) return currentSectionPatterns;
    return currentSectionPatterns
      .map(pattern => ({
        ...pattern,
        problems: pattern.problems.filter(p => state.bookmarkedProblems.has(p.id))
      }))
      .filter(p => p.problems.length > 0);
  }, [showStarredOnly, currentSectionPatterns, state.bookmarkedProblems]);

  const hasResults = displayedPatterns.length > 0;

  return (
    <main className={styles.main} id="home-page">
      {/* Hero section */}
      <section className={styles.hero} id="hero-section">
        {activeSection === 'dsa' && (
          <>
            <h1 className={styles.heroTitle}>
              Master DSA <span className={styles.highlight}>Pattern by Pattern</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Curated problems organized by technique. Track your progress, bookmark favorites, and add personal notes.
            </p>
          </>
        )}

        {activeSection === 'cs-fundamentals' && (
          <>
            <h1 className={styles.heroTitle}>
              CS Fundamentals <span className={styles.highlight}>Interview Guide</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Core theory, architectural trade-offs, and in-depth answers across CN, OS, OOPS, and DBMS.
            </p>
          </>
        )}

        {activeSection === 'sql' && (
          <>
            <h1 className={styles.heroTitle}>
              SQL 50 <span className={styles.highlight}>Interview Mastery</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Top 50 curated SQL questions covering joins, window functions, aggregations, and subqueries with full solutions.
            </p>
          </>
        )}

        {activeSection === 'lld' && (
          <>
            <h1 className={styles.heroTitle}>
              Low-Level Design <span className={styles.highlight}>& Machine Coding</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Popular real-world system designs, GoF design patterns, class diagrams, and concurrency solutions.
            </p>
          </>
        )}
      </section>

      {/* Main Section Switcher Tabs */}
      <nav className={styles.sectionNav} aria-label="Study Sections">
        <button
          className={`${styles.sectionTab} ${activeSection === 'dsa' ? styles.activeTab : ''}`}
          onClick={() => { setActiveSection('dsa'); setShowStarredOnly(false); }}
        >
          <span>⚡</span>
          <span>DSA Patterns</span>
        </button>

        <button
          className={`${styles.sectionTab} ${activeSection === 'cs-fundamentals' ? styles.activeTab : ''}`}
          onClick={() => { setActiveSection('cs-fundamentals'); setShowStarredOnly(false); }}
        >
          <span>💻</span>
          <span>CS Fundamentals</span>
        </button>

        <button
          className={`${styles.sectionTab} ${activeSection === 'sql' ? styles.activeTab : ''}`}
          onClick={() => { setActiveSection('sql'); setShowStarredOnly(false); }}
        >
          <span>🗄️</span>
          <span>SQL Top 50</span>
        </button>

        <button
          className={`${styles.sectionTab} ${activeSection === 'lld' ? styles.activeTab : ''}`}
          onClick={() => { setActiveSection('lld'); setShowStarredOnly(false); }}
        >
          <span>🏗️</span>
          <span>LLD & Patterns</span>
        </button>
      </nav>

      {/* CS Fundamentals Subcategory Filter Pills */}
      {activeSection === 'cs-fundamentals' && (
        <div className={styles.subCategoryNav} aria-label="CS Fundamentals Categories">
          <button
            className={`${styles.subCategoryPill} ${csCategory === 'all' ? styles.activePill : ''}`}
            onClick={() => setCsCategory('all')}
          >
            All Subjects
          </button>
          <button
            className={`${styles.subCategoryPill} ${csCategory === 'cn' ? styles.activePill : ''}`}
            onClick={() => setCsCategory('cn')}
          >
            🌐 Computer Networks
          </button>
          <button
            className={`${styles.subCategoryPill} ${csCategory === 'os' ? styles.activePill : ''}`}
            onClick={() => setCsCategory('os')}
          >
            💻 Operating Systems
          </button>
          <button
            className={`${styles.subCategoryPill} ${csCategory === 'oops' ? styles.activePill : ''}`}
            onClick={() => setCsCategory('oops')}
          >
            🧩 OOPS
          </button>
          <button
            className={`${styles.subCategoryPill} ${csCategory === 'dbms' ? styles.activePill : ''}`}
            onClick={() => setCsCategory('dbms')}
          >
            🗄️ DBMS
          </button>
        </div>
      )}

      {/* Stats bar dynamic to active section */}
      <StatsBar 
        patterns={currentSectionPatterns} 
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
            <span className={styles.emptyIcon}>⭐</span>
            <p className={styles.emptyText}>No starred items found in this section.</p>
            {showStarredOnly && (
              <button className={styles.emptyReset} onClick={() => setShowStarredOnly(false)}>
                Show All Items
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
