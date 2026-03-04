'use client';

import { useState } from 'react';
import { Content, Episode } from '@/types';

interface ModalEpisodeSectionProps {
  content: Content;
}

const EPISODES_PER_PAGE = 10;

export default function ModalEpisodeSection({ content }: ModalEpisodeSectionProps) {
  const [visibleCount, setVisibleCount] = useState(EPISODES_PER_PAGE);
  const episodes = content.episodeList || [];

  if (episodes.length === 0 && (!content.episodes || content.episodes === 0)) {
    return null;
  }

  const displayEpisodes = episodes.slice(0, visibleCount);
  const hasMore = visibleCount < episodes.length;

  return (
    <div className="modal-episodes">
      <div className="modal-episodes-header">
        <h3 className="modal-section-title">ตอนทั้งหมด</h3>
        <span className="modal-episodes-count">{episodes.length} ตอน</span>
      </div>

      <div className="modal-episodes-list">
        {displayEpisodes.map((ep) => (
          <EpisodeCard key={ep.number} episode={ep} />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          className="modal-show-more"
          onClick={() => setVisibleCount((prev) => prev + EPISODES_PER_PAGE)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
}

function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="modal-episode-card">
      <div className="modal-episode-number">{episode.number}</div>

      <div className="modal-episode-thumb">
        <img
          src={episode.thumbnail}
          alt={`ตอนที่ ${episode.number}`}
          loading="lazy"
        />
        <div className="modal-episode-play-icon">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>

      <div className="modal-episode-info">
        <div className="modal-episode-title-row">
          <h4 className="modal-episode-title">{episode.title}</h4>
          <span className="modal-episode-duration">{episode.duration}</span>
        </div>
        <p className="modal-episode-desc">{episode.description}</p>
      </div>
    </div>
  );
}
