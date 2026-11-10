import { useState, useEffect, useCallback } from 'react';
import type { Problem } from '../types';
import { useApp } from '../context/AppContext';
import { DIFFICULTY_COLOR } from '../utils/ui';
import styles from './StudyView.module.css';

interface Props {
  problems: Problem[];
  sectionName: string;
}

export function StudyView({ problems, sectionName }: Props) {
  const { state, toggleSolved, toggleBookmark } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Clamp index if problem list changes (e.g. changing subcategory filters)
  useEffect(() => {
    setCurrentIndex(0);
  }, [problems.length, sectionName]);

  const total = problems.length;
  const safeIndex = Math.min(currentIndex, Math.max(0, total - 1));
  const currentProblem: Problem | undefined = problems[safeIndex];

  const isSolved = currentProblem ? state.solvedProblems.has(currentProblem.id) : false;
  const isBookmarked = currentProblem ? state.bookmarkedProblems.has(currentProblem.id) : false;

  const handleNext = useCallback(() => {
    if (safeIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [safeIndex, total]);

  const handlePrev = useCallback(() => {
    if (safeIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [safeIndex]);

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'n') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'p') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!currentProblem || total === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>📖</span>
        <p className={styles.emptyText}>No questions available in this selection.</p>
      </div>
    );
  }

  const solvedInSet = problems.filter(p => state.solvedProblems.has(p.id)).length;
  const progressPercent = total > 0 ? Math.round((solvedInSet / total) * 100) : 0;

  return (
    <div className={styles.studyContainer} id="study-view-container">
      {/* Top Header / Context bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span className={styles.sectionBadge}>{sectionName}</span>
          <span className={styles.questionCounter}>
            Question {safeIndex + 1} of {total}
          </span>
        </div>

        <div className={styles.topBarRight}>
          <div className={styles.setProgressBarWrap} title={`${solvedInSet} of ${total} completed (${progressPercent}%)`}>
            <div className={styles.setProgressBar} style={{ width: `${progressPercent}%` }} />
          </div>
          <span className={styles.setProgressLabel}>{solvedInSet}/{total} completed</span>

          {/* Jump to question dropdown */}
          <select
            className={styles.jumpSelect}
            value={safeIndex}
            onChange={e => setCurrentIndex(Number(e.target.value))}
            aria-label="Jump to question"
            title="Jump to question"
          >
            {problems.map((p, idx) => (
              <option key={p.id} value={idx}>
                {idx + 1}. {state.solvedProblems.has(p.id) ? '✓ ' : ''}{p.title.slice(0, 48)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2-Column Split: Question on Left, Answer on Right */}
      <div className={styles.studyGrid}>
        {/* Left Column: Question */}
        <section className={styles.questionColumn} aria-label="Question Details">
          <div className={styles.columnHeader}>
            <span className={styles.columnBadge}>Question</span>
            <div className={styles.metaRow}>
              <span
                className={styles.difficultyBadge}
                style={{ color: DIFFICULTY_COLOR[currentProblem.difficulty] }}
              >
                {currentProblem.difficulty}
              </span>

              {/* Priority and Topic Tags */}
              {currentProblem.tags && currentProblem.tags.length > 0 && (
                <div className={styles.tagList}>
                  {currentProblem.tags.map(tag => (
                    <span
                      key={tag}
                      className={`${styles.tag} ${
                        tag.includes('🔥')
                          ? styles.tagHot
                          : tag.includes('⭐')
                          ? styles.tagStar
                          : tag.includes('Advanced') || tag.includes('🚀')
                          ? styles.tagAdv
                          : ''
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.questionCard}>
            <h2 className={styles.questionTitle}>{currentProblem.title}</h2>
          </div>

          {/* Action buttons (Solve, Bookmark, External Link) */}
          <div className={styles.actionRow}>
            <button
              className={`${styles.actionBtn} ${isSolved ? styles.solvedBtn : ''}`}
              onClick={() => toggleSolved(currentProblem.id)}
              id={`study-solve-btn-${currentProblem.id}`}
              title={isSolved ? "Mark as uncompleted" : "Mark as completed"}
            >
              <span className={styles.btnIcon}>{isSolved ? '✓' : '○'}</span>
              <span>{isSolved ? 'Completed' : 'Mark Completed'}</span>
            </button>

            <button
              className={`${styles.actionBtn} ${isBookmarked ? styles.bookmarkedBtn : ''}`}
              onClick={() => toggleBookmark(currentProblem.id)}
              id={`study-bookmark-btn-${currentProblem.id}`}
              title={isBookmarked ? "Remove bookmark" : "Bookmark this question"}
            >
              <span className={styles.btnIcon}>{isBookmarked ? '★' : '☆'}</span>
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            {currentProblem.links && currentProblem.links.length > 0 && (
              <a
                href={currentProblem.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.extLink}
                title="Open documentation / external practice"
              >
                Reference Docs ↗
              </a>
            )}
          </div>

          <div className={styles.hintBox}>
            <span className={styles.hintIcon}>💡</span>
            <span className={styles.hintText}>
              Study tip: Try reasoning through your approach before reviewing the solution on the right. When ready, click <strong>Next →</strong> to continue.
            </span>
          </div>
        </section>

        {/* Right Column: Answer / Solution */}
        <section className={styles.answerColumn} aria-label="Solution & Explanation">
          <div className={styles.columnHeader}>
            <span className={styles.columnBadgeAnswer}>Solution & Explanation</span>
          </div>

          <div className={styles.answerScrollArea}>
            {currentProblem.answer ? (
              <div className={styles.answerContent}>
                {currentProblem.answer}
              </div>
            ) : (
              <div className={styles.noAnswer}>
                Detailed solution notes coming soon for this problem.
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Bottom Sticky Navigation with Previous & Next Arrows */}
      <footer className={styles.bottomNav} aria-label="Question Navigation">
        <button
          className={styles.prevBtn}
          onClick={handlePrev}
          disabled={safeIndex === 0}
          title="Go to previous question (Left Arrow or P)"
          id="study-prev-btn"
        >
          <span>←</span>
          <span>Previous</span>
        </button>

        <div className={styles.navCenter}>
          <span className={styles.navCounter}>
            {safeIndex + 1} / {total}
          </span>
        </div>

        <button
          className={styles.nextBtn}
          onClick={handleNext}
          disabled={safeIndex >= total - 1}
          title="Advance to next question (Right Arrow or N)"
          id="study-next-btn"
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </footer>
    </div>
  );
}
