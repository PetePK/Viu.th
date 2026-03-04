'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Content } from '@/types';
import { allContent } from '@/data/mockData';
import { getRecommendations } from '@/lib/recommendations';
import { useUserInteractions } from '@/lib/useUserInteractions';
import ModalVideoHeader from './ModalVideoHeader';
import ModalActionButtons from './ModalActionButtons';
import ModalContentInfo from './ModalContentInfo';
import ModalEpisodeSection from './ModalEpisodeSection';
import ModalMoreLikeThis from './ModalMoreLikeThis';

interface ContentDetailModalProps {
  content: Content | null;
  onClose: () => void;
}

type Tab = 'episodes' | 'moreLikeThis';

export default function ContentDetailModal({ content, onClose }: ContentDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('episodes');
  const [currentContent, setCurrentContent] = useState<Content | null>(content);
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useUserInteractions();

  // Sync with prop
  useEffect(() => {
    setCurrentContent(content);
    setActiveTab('episodes');
  }, [content]);

  // Lock body scroll
  useEffect(() => {
    if (currentContent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [currentContent]);

  // Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (currentContent) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [currentContent, onClose]);

  const handleSelectRecommendation = useCallback((item: Content) => {
    setCurrentContent(item);
    setActiveTab('episodes');
    // Scroll modal to top
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, []);

  if (!currentContent) return null;

  const recommendations = getRecommendations(currentContent, allContent);
  const hasEpisodes =
    (currentContent.episodeList && currentContent.episodeList.length > 0) ||
    (currentContent.episodes && currentContent.episodes > 0);

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* Modal scroll container */}
      <div className="modal-scroll-container" ref={modalRef}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video Header */}
          <ModalVideoHeader content={currentContent} />

          {/* Title + Actions overlay on video */}
          <div className="modal-title-overlay">
            <h2 className="modal-title">{currentContent.title}</h2>
            <ModalActionButtons
              content={currentContent}
              isBookmarked={isBookmarked(currentContent.id)}
              isLiked={isLiked(currentContent.id)}
              onToggleBookmark={() => toggleBookmark(currentContent.id)}
              onToggleLike={() => toggleLike(currentContent.id)}
            />
          </div>

          {/* Content Info (two-column) */}
          <div className="modal-body">
            <ModalContentInfo content={currentContent} />

            {/* Tab Navigation */}
            <div className="modal-tabs">
              {hasEpisodes && (
                <button
                  type="button"
                  className={`modal-tab ${activeTab === 'episodes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('episodes')}
                >
                  ตอนทั้งหมด
                </button>
              )}
              <button
                type="button"
                className={`modal-tab ${activeTab === 'moreLikeThis' ? 'active' : ''}`}
                onClick={() => setActiveTab('moreLikeThis')}
              >
                คล้ายกับเรื่องนี้
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'episodes' && hasEpisodes && (
              <ModalEpisodeSection content={currentContent} />
            )}
            {activeTab === 'moreLikeThis' && (
              <ModalMoreLikeThis
                recommendations={recommendations}
                onSelectContent={handleSelectRecommendation}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
