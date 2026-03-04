'use client';

import { Content } from '@/types';
import { getViuUrl } from '@/lib/viuUrl';

interface ModalActionButtonsProps {
  content: Content;
  isBookmarked: boolean;
  isLiked: boolean;
  onToggleBookmark: () => void;
  onToggleLike: () => void;
}

export default function ModalActionButtons({
  content,
  isBookmarked,
  isLiked,
  onToggleBookmark,
  onToggleLike,
}: ModalActionButtonsProps) {
  return (
    <div className="modal-actions">
      <a href={getViuUrl(content)} target="_blank" rel="noopener noreferrer" className="modal-play-btn">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
        เล่นเลย
      </a>

      <button
        type="button"
        className={`modal-circle-btn ${isBookmarked ? 'active' : ''}`}
        onClick={onToggleBookmark}
        aria-label={isBookmarked ? 'Remove from my list' : 'Add to my list'}
      >
        {isBookmarked ? (
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
      </button>

      <button
        type="button"
        className={`modal-circle-btn ${isLiked ? 'active' : ''}`}
        onClick={onToggleLike}
        aria-label={isLiked ? 'Unlike' : 'Like'}
      >
        {isLiked ? (
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017a1.5 1.5 0 01-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        ) : (
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
