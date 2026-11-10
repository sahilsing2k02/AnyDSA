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
  const [schemaOpen, setSchemaOpen] = useState(true);
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
              Top 50 SQL <span className={styles.highlight}>Interview Questions & Answers</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Curated for SDE-1 interviews, fresher placements, and technical assessments. Starts with basic SQL syntax and moves to joins, aggregations, subqueries, CTEs, and window functions in MySQL 8.0 syntax.
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

      {/* SQL Schema Reference Card & Priority Tags */}
      {activeSection === 'sql' && (
        <section className={styles.sqlSchemaCard} aria-label="SQL Schema Reference">
          <div className={styles.sqlSchemaHeader}>
            <div className={styles.sqlSchemaTitleWrap}>
              <span className={styles.sqlSchemaIcon}>📋</span>
              <div>
                <h3 className={styles.sqlSchemaTitle}>Assumed Database Schema & Context</h3>
                <p className={styles.sqlSchemaSubtitle}>
                  Throughout Q1–Q50, queries operate on these relational MySQL 8.0 tables:
                </p>
              </div>
            </div>
            <div className={styles.sqlHeaderActions}>
              <div className={styles.sqlPriorityLegend}>
                <span className={styles.pillHot}>🔥 Frequently Asked</span>
                <span className={styles.pillStar}>⭐ Important</span>
                <span className={styles.pillAdv}>🚀 Advanced</span>
              </div>
              <button 
                className={styles.toggleSchemaBtn}
                onClick={() => setSchemaOpen(v => !v)}
                title={schemaOpen ? "Collapse tables" : "Expand tables"}
              >
                {schemaOpen ? 'Hide Tables ▲' : 'View Tables ▼'}
              </button>
            </div>
          </div>

          {schemaOpen && (
            <div className={styles.sqlTablesGrid}>
              <div className={styles.sqlTableWrapper}>
                <div className={styles.tableName}>
                  <span>Employees</span>
                  <span className={styles.tableMeta}>emp_id PK, dept_id FK, manager_id FK</span>
                </div>
                <div className={styles.tableScroll}>
                  <table className={styles.schemaTable}>
                    <thead>
                      <tr>
                        <th>emp_id</th>
                        <th>name</th>
                        <th>salary</th>
                        <th>dept_id</th>
                        <th>manager_id</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>1</td><td>Rahul</td><td>60000</td><td>101</td><td>NULL</td></tr>
                      <tr><td>2</td><td>Aman</td><td>45000</td><td>102</td><td>1</td></tr>
                      <tr><td>3</td><td>Priya</td><td>75000</td><td>101</td><td>1</td></tr>
                      <tr><td>4</td><td>Neha</td><td>50000</td><td>103</td><td>2</td></tr>
                      <tr><td>5</td><td>Karan</td><td>60000</td><td>102</td><td>2</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={styles.sqlTableWrapper}>
                <div className={styles.tableName}>
                  <span>Departments</span>
                  <span className={styles.tableMeta}>dept_id PK</span>
                </div>
                <div className={styles.tableScroll}>
                  <table className={styles.schemaTable}>
                    <thead>
                      <tr>
                        <th>dept_id</th>
                        <th>dept_name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>101</td><td>IT</td></tr>
                      <tr><td>102</td><td>HR</td></tr>
                      <tr><td>103</td><td>Finance</td></tr>
                      <tr><td>104</td><td>Marketing</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </section>
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
