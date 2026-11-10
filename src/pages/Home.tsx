import { useState, useMemo } from 'react';
import type { CSFundCategory, SqlCategory } from '../types';
import { patterns as dsaPatterns } from '../data/patterns';
import { csFundamentals } from '../data/csFundamentals';
import { sqlQuestions } from '../data/sqlQuestions';
import { lldQuestions } from '../data/lldQuestions';
import { PatternCard } from '../components/PatternCard';
import { StudyView } from '../components/StudyView';
import { StatsBar } from '../components/StatsBar';
import { useApp } from '../context/AppContext';
import styles from './Home.module.css';

export function Home() {
  const { state, activeSection } = useApp();
  const [csCategory, setCsCategory] = useState<CSFundCategory>('all');
  const [sqlCategory, setSqlCategory] = useState<SqlCategory>('all');
  const [schemaOpen, setSchemaOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'study' | 'list'>('study');

  // Search & Filter state synced with URL query params
  const [searchQuery, setSearchQuery] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get('q') || '';
    } catch { return ''; }
  });
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>(() => {
    try {
      const diff = new URLSearchParams(window.location.search).get('difficulty');
      return (diff === 'Easy' || diff === 'Medium' || diff === 'Hard') ? diff : 'all';
    } catch { return 'all'; }
  });
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved' | 'bookmarked' | 'notes'>(() => {
    try {
      const st = new URLSearchParams(window.location.search).get('status');
      return (st === 'solved' || st === 'unsolved' || st === 'bookmarked' || st === 'notes') ? st : 'all';
    } catch { return 'all'; }
  });

  const syncFiltersToUrl = (q: string, diff: string, st: string) => {
    try {
      const url = new URL(window.location.href);
      if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
      if (diff !== 'all') url.searchParams.set('difficulty', diff); else url.searchParams.delete('difficulty');
      if (st !== 'all') url.searchParams.set('status', st); else url.searchParams.delete('status');
      window.history.replaceState(null, '', url.toString());
    } catch {}
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    syncFiltersToUrl(val, difficultyFilter, statusFilter);
  };

  const handleDifficultyChange = (diff: 'all' | 'Easy' | 'Medium' | 'Hard') => {
    setDifficultyFilter(diff);
    syncFiltersToUrl(searchQuery, diff, statusFilter);
  };

  const handleStatusChange = (st: 'all' | 'solved' | 'unsolved' | 'bookmarked' | 'notes') => {
    setStatusFilter(st);
    syncFiltersToUrl(searchQuery, difficultyFilter, st);
  };

  const isStudySection = activeSection !== 'dsa';

  // Select base pattern set depending on active section
  const currentSectionPatterns = useMemo(() => {
    switch (activeSection) {
      case 'dsa':
        return dsaPatterns;
      case 'cs-fundamentals': {
        if (csCategory === 'all') return csFundamentals;
        return csFundamentals.filter(p => p.id === `cs-${csCategory}`);
      }
      case 'sql': {
        if (sqlCategory === 'all') return sqlQuestions;
        return sqlQuestions.filter(p => p.category === sqlCategory);
      }
      case 'lld':
        return lldQuestions;
      default:
        return dsaPatterns;
    }
  }, [activeSection, csCategory, sqlCategory]);

  // Apply search & multi-criteria filters
  const displayedPatterns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return currentSectionPatterns
      .map(pattern => {
        const patternNameMatches = pattern.name.toLowerCase().includes(q);

        const filteredProblems = pattern.problems.filter(problem => {
          // Search query check
          if (q) {
            const titleMatches = problem.title.toLowerCase().includes(q);
            const tagMatches = problem.tags?.some(tag => tag.toLowerCase().includes(q));
            if (!titleMatches && !tagMatches && !patternNameMatches) return false;
          }

          // Difficulty filter check
          if (difficultyFilter !== 'all' && problem.difficulty !== difficultyFilter) {
            return false;
          }

          // Status filter check
          if (statusFilter === 'solved' && !state.solvedProblems.has(problem.id)) return false;
          if (statusFilter === 'unsolved' && state.solvedProblems.has(problem.id)) return false;
          if (statusFilter === 'bookmarked' && !state.bookmarkedProblems.has(problem.id)) return false;
          if (statusFilter === 'notes' && !state.notes[problem.id]?.content) return false;

          return true;
        });

        return {
          ...pattern,
          problems: filteredProblems
        };
      })
      .filter(p => p.problems.length > 0);
  }, [currentSectionPatterns, searchQuery, difficultyFilter, statusFilter, state.solvedProblems, state.bookmarkedProblems, state.notes]);

  const hasResults = displayedPatterns.length > 0;

  const totalMatchingProblems = useMemo(() => {
    return displayedPatterns.reduce((acc, p) => acc + p.problems.length, 0);
  }, [displayedPatterns]);

  const allSectionProblems = useMemo(() => {
    return displayedPatterns.flatMap(p => p.problems);
  }, [displayedPatterns]);

  const sectionTitle = useMemo(() => {
    switch (activeSection) {
      case 'cs-fundamentals':
        return csCategory === 'all' ? 'CS Fundamentals' : `CS Fundamentals: ${csCategory.toUpperCase()}`;
      case 'sql':
        return sqlCategory === 'all' ? 'SQL Top 50' : sqlCategory === 'theory' ? 'SQL Theory' : 'SQL Commands';
      case 'lld':
        return 'Low-Level Design';
      default:
        return 'DSA Patterns';
    }
  }, [activeSection, csCategory, sqlCategory]);

  return (
    <main className={`${styles.main} ${isStudySection && viewMode === 'study' ? styles.mainWide : ''}`} id="home-page">
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

      {/* CS Fundamentals Subcategory Filter Pills (No Emojis) */}
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
            Computer Networks
          </button>
          <button
            className={`${styles.subCategoryPill} ${csCategory === 'os' ? styles.activePill : ''}`}
            onClick={() => setCsCategory('os')}
          >
            Operating Systems
          </button>
          <button
            className={`${styles.subCategoryPill} ${csCategory === 'oops' ? styles.activePill : ''}`}
            onClick={() => setCsCategory('oops')}
          >
            OOPS
          </button>
          <button
            className={`${styles.subCategoryPill} ${csCategory === 'dbms' ? styles.activePill : ''}`}
            onClick={() => setCsCategory('dbms')}
          >
            DBMS
          </button>
        </div>
      )}

      {/* SQL Subcategory Filter Pills (Theory vs SQL Commands) */}
      {activeSection === 'sql' && (
        <div className={styles.subCategoryNav} aria-label="SQL Subcategories">
          <button
            className={`${styles.subCategoryPill} ${sqlCategory === 'all' ? styles.activePill : ''}`}
            onClick={() => setSqlCategory('all')}
          >
            All Questions (50)
          </button>
          <button
            className={`${styles.subCategoryPill} ${sqlCategory === 'theory' ? styles.activePill : ''}`}
            onClick={() => setSqlCategory('theory')}
          >
            Theory (15)
          </button>
          <button
            className={`${styles.subCategoryPill} ${sqlCategory === 'commands' ? styles.activePill : ''}`}
            onClick={() => setSqlCategory('commands')}
          >
            SQL Commands (35)
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
        showStarredOnly={statusFilter === 'bookmarked'} 
        onToggleStarred={() => handleStatusChange(statusFilter === 'bookmarked' ? 'all' : 'bookmarked')} 
      />

      {/* Filter and Instant Search Toolbar */}
      <div className={styles.filterToolbar} role="search" aria-label="Filter problems">
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">🔍</span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder={`Search ${sectionTitle} problems, tags, patterns...`}
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            aria-label="Search problems by title, tag, or pattern"
          />
        </div>

        <div className={styles.filterControls}>
          <select
            className={styles.filterSelect}
            value={difficultyFilter}
            onChange={e => handleDifficultyChange(e.target.value as any)}
            aria-label="Filter by difficulty"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={e => handleStatusChange(e.target.value as any)}
            aria-label="Filter by problem status"
          >
            <option value="all">All Status</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
            <option value="bookmarked">Starred</option>
            <option value="notes">Has Notes</option>
          </select>

          <span className={styles.resultsCount}>
            {totalMatchingProblems} {totalMatchingProblems === 1 ? 'problem' : 'problems'}
          </span>
        </div>
      </div>

      {/* View Mode Switcher for Study Sections (CS Fundamentals, SQL, LLD) */}
      {isStudySection && (
        <div className={styles.viewModeToggleRow}>
          <div className={styles.viewModeGroup} role="group" aria-label="Study Layout Mode">
            <button
              className={`${styles.viewModeBtn} ${viewMode === 'study' ? styles.viewModeActive : ''}`}
              onClick={() => setViewMode('study')}
              title="One-by-one Study Mode with side-by-side solution"
            >
              <span>📖 Study Mode</span>
            </button>
            <button
              className={`${styles.viewModeBtn} ${viewMode === 'list' ? styles.viewModeActive : ''}`}
              onClick={() => setViewMode('list')}
              title="Browse all questions as a list"
            >
              <span>📋 List View</span>
            </button>
          </div>
        </div>
      )}

      {/* Study Mode View (Question Left, Answer Right, Next Arrow) */}
      {isStudySection && viewMode === 'study' ? (
        <StudyView
          problems={allSectionProblems}
          sectionName={sectionTitle}
        />
      ) : (
        /* Pattern list (DSA & List View fallback) */
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
              <span className={styles.emptyIcon}>🔍</span>
              <p className={styles.emptyText}>No problems match your current search or filter criteria.</p>
              {(searchQuery || difficultyFilter !== 'all' || statusFilter !== 'all') && (
                <button
                  className={styles.emptyReset}
                  onClick={() => {
                    handleSearchChange('');
                    handleDifficultyChange('all');
                    handleStatusChange('all');
                  }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
