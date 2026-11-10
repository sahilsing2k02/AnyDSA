import { useState } from 'react';
import type { Problem, Platform } from '../types';
import { useApp } from '../context/AppContext';
import { DIFFICULTY_COLOR } from '../utils/ui';
import { LeetCodeLogo, GFGLogo } from './PlatformLogos';
import styles from './ProblemRow.module.css';

interface Props {
  problem: Problem;
  index: number;
}

function PlatformLink({ platform, url }: { platform: Platform; url: string }) {
  const isLC = platform === 'LeetCode';
  const isGFG = platform === 'GeeksForGeeks';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      id={`link-${url.slice(-20).replace(/\W/g, '')}`}
      className={`${styles.platformLink} ${isLC ? styles.lc : isGFG ? styles.gfg : styles.other}`}
      title={`Solve on ${platform}`}
      aria-label={`Open on ${platform}`}
    >
      {isLC && <LeetCodeLogo size={18} />}
      {isGFG && <GFGLogo size={18} />}
      {!isLC && !isGFG && <span className={styles.otherDot}>↗</span>}
    </a>
  );
}

export function ProblemRow({ problem, index }: Props) {
  const { state, toggleSolved, toggleBookmark, setNote, activeSection } = useApp();
  const [noteOpen, setNoteOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [noteText, setNoteText] = useState(state.notes[problem.id]?.content ?? '');

  const isSolved = state.solvedProblems.has(problem.id);
  const isBookmarked = state.bookmarkedProblems.has(problem.id);
  const hasNote = !!state.notes[problem.id]?.content;
  const showNotes = activeSection === 'dsa';

  const handleNoteSave = () => {
    setNote(problem.id, noteText);
    setNoteOpen(false);
  };

  return (
    <div
      className={styles.row}
      id={`problem-${problem.id}`}
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <div className={styles.main}>
        {/* Solved checkbox */}
        <button
          id={`solve-btn-${problem.id}`}
          className={`${styles.checkBtn} ${isSolved ? styles.checked : ''}`}
          onClick={() => toggleSolved(problem.id)}
          aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
        >
          <span className={styles.checkIcon}>{isSolved ? '✓' : ''}</span>
        </button>

        {/* Title & Priority Tags */}
        <div className={styles.contentWrap}>
          <span className={styles.title}>
            {problem.title}
          </span>
          {problem.tags && problem.tags.length > 0 && (
            <div className={styles.tagList}>
              {problem.tags.map(t => (
                <span
                  key={t}
                  className={`${styles.tagBadge} ${
                    t.includes('🔥')
                      ? styles.tagHot
                      : t.includes('⭐')
                      ? styles.tagStar
                      : t.includes('Advanced') || t.includes('🚀')
                      ? styles.tagAdv
                      : ''
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Difficulty badge */}
        <span
          className={styles.badge}
          style={{
            color: DIFFICULTY_COLOR[problem.difficulty],
          }}
        >
          {problem.difficulty}
        </span>

        <div className={styles.actions}>
          {problem.answer && (
            <button
              className={`${styles.answerBtn} ${answerOpen ? styles.answerActive : ''}`}
              onClick={() => setAnswerOpen(v => !v)}
              title={answerOpen ? "Hide answer" : "View explanation and answer"}
            >
              {answerOpen ? '▲ Hide Answer' : '👁️ View Answer'}
            </button>
          )}

          {/* Platform links */}
          <div className={styles.links}>
            {problem.links.map(link => (
              <PlatformLink key={link.platform} platform={link.platform} url={link.url} />
            ))}
          </div>

          {/* Bookmark */}
          <button
            id={`bookmark-btn-${problem.id}`}
            className={`${styles.starBtn} ${isBookmarked ? styles.starred : ''}`}
            onClick={() => toggleBookmark(problem.id)}
            title={isBookmarked ? 'Unstar' : 'Star this problem'}
            aria-label="Star"
          >
            {isBookmarked ? '★' : '☆'}
          </button>

          {/* Note button (DSA Section only) */}
          {showNotes && (
            <button
              id={`note-btn-${problem.id}`}
              className={`${styles.iconBtn} ${hasNote ? styles.hasNote : ''}`}
              onClick={() => {
                setNoteText(state.notes[problem.id]?.content ?? '');
                setNoteOpen(v => !v);
              }}
              title="Add / Edit note"
              aria-label="Note"
            >
              {hasNote ? '📝' : '🗒️'}
            </button>
          )}
        </div>
      </div>

      {/* Answer / Solution panel */}
      {answerOpen && problem.answer && (
        <div className={styles.answerPanel} id={`answer-panel-${problem.id}`}>
          <div className={styles.answerHeader}>
            <span className={styles.answerBadge}>💡 Solution & Explanation</span>
          </div>
          <div className={styles.answerBody}>
            {problem.answer}
          </div>
        </div>
      )}

      {/* Note panel (DSA Section only) */}
      {showNotes && noteOpen && (
        <div className={styles.notePanel} id={`note-panel-${problem.id}`}>
          <textarea
            className={styles.noteInput}
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder="Write your notes, approach, or solution…"
            rows={3}
            autoFocus
          />
          <div className={styles.noteBtns}>
            <button className={styles.saveBtn} onClick={handleNoteSave} id={`save-note-btn-${problem.id}`}>
              Save
            </button>
            <button className={styles.cancelBtn} onClick={() => setNoteOpen(false)} id={`cancel-note-btn-${problem.id}`}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
