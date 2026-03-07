'use client';

import { useState, useMemo } from 'react';
import Navigation from '@/components/navigation/Navigation';
import ContentDetailModal from '@/components/modal/ContentDetailModal';
import ReelsViewer from '@/components/reels/ReelsViewer';
import { allContent } from '@/data/mockData';
import { reelsData } from '@/data/reelsData';
import { Content } from '@/types';

type Step = 'intent' | 'continue' | 'categories' | 'browse';

// Genre config with gradient colors and icons
const GENRE_CONFIG: { id: string; name: string; gradient: string; emoji: string }[] = [
  { id: 'โรแมนติก', name: 'โรแมนติก', gradient: 'linear-gradient(135deg, #FF6B6B, #EE5A24)', emoji: '💕' },
  { id: 'ดราม่า', name: 'ดราม่า', gradient: 'linear-gradient(135deg, #6C5CE7, #341f97)', emoji: '🎭' },
  { id: 'แอคชั่น', name: 'แอคชั่น', gradient: 'linear-gradient(135deg, #FF9F43, #EE5A24)', emoji: '💥' },
  { id: 'ระทึกขวัญ', name: 'ระทึกขวัญ', gradient: 'linear-gradient(135deg, #2C3E50, #000000)', emoji: '😱' },
  { id: 'คอมเมดี้', name: 'คอมเมดี้', gradient: 'linear-gradient(135deg, #FECA57, #FF9F43)', emoji: '😂' },
  { id: 'LGBTQ+', name: 'LGBTQ+', gradient: 'linear-gradient(135deg, #FF6B6B, #6C5CE7, #48DBFB)', emoji: '🏳️‍🌈' },
  { id: 'แฟนตาซี', name: 'แฟนตาซี', gradient: 'linear-gradient(135deg, #0ABDE3, #6C5CE7)', emoji: '✨' },
  { id: 'ลึกลับ', name: 'ลึกลับ', gradient: 'linear-gradient(135deg, #576574, #222F3E)', emoji: '🔍' },
];

// Mock "continue watching" data
const CONTINUE_WATCHING = [
  { contentIndex: 10, episode: 5, progress: 65 },
  { contentIndex: 8,  episode: 12, progress: 30 },
  { contentIndex: 0,  episode: 20, progress: 85 },
  { contentIndex: 24, episode: 3, progress: 45 },
  { contentIndex: 11, episode: 8, progress: 15 },
  { contentIndex: 6,  episode: 10, progress: 55 },
];

export default function LandingPage() {
  const [step, setStep] = useState<Step>('intent');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [reelViewerIndex, setReelViewerIndex] = useState<number | null>(null);
  const [fadeKey, setFadeKey] = useState(0);

  // Transition helper
  const goToStep = (newStep: Step) => {
    setFadeKey(k => k + 1);
    setStep(newStep);
  };

  // Get genre content counts
  const genreCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const genre of GENRE_CONFIG) {
      counts[genre.id] = allContent.filter(c => c.genres?.includes(genre.id)).length;
    }
    return counts;
  }, []);

  // Get filtered content for selected genre
  const genreContent = useMemo(() => {
    if (!selectedGenre) return [];
    return allContent.filter(c => c.genres?.includes(selectedGenre));
  }, [selectedGenre]);

  // Get thumbnail previews for each genre (first 3 items)
  const genrePreviews = useMemo(() => {
    const previews: Record<string, string[]> = {};
    for (const genre of GENRE_CONFIG) {
      previews[genre.id] = allContent
        .filter(c => c.genres?.includes(genre.id))
        .slice(0, 3)
        .map(c => c.thumbnail);
    }
    return previews;
  }, []);

  const handleContentClick = (content: Content) => setSelectedContent(content);
  const handleCloseModal = () => setSelectedContent(null);

  return (
    <div className="min-h-screen bg-bg-darkest">
      <Navigation />

      <div className="landing-container" key={fadeKey}>
        {/* ============================================ */}
        {/* STEP 1: INTENT — Continue or Discover        */}
        {/* ============================================ */}
        {step === 'intent' && (
          <div className="intent-screen">
            <div className="intent-content">
              <div className="intent-logo">
                <img src="/images/viu-logo.svg" alt="Viu" style={{ height: 40 }} onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }} />
                <h1 className="intent-title">วันนี้อยากดูอะไร?</h1>
                <p className="intent-subtitle">เลือกสิ่งที่ใช่สำหรับคุณ</p>
              </div>

              <div className="intent-cards">
                {/* Continue Watching Card */}
                <button type="button" className="intent-card intent-card-continue" onClick={() => goToStep('continue')}>
                  <div className="intent-card-icon">
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="intent-card-title">ดูต่อจากที่ค้างไว้</h2>
                  <p className="intent-card-desc">กลับมาดูเรื่องที่คุณดูค้างไว้</p>
                  <div className="intent-card-preview">
                    {CONTINUE_WATCHING.slice(0, 3).map((item, i) => (
                      <img
                        key={i}
                        src={allContent[item.contentIndex]?.thumbnail}
                        alt=""
                        className="intent-preview-thumb"
                        style={{ zIndex: 3 - i, marginLeft: i > 0 ? '-12px' : 0 }}
                      />
                    ))}
                  </div>
                </button>

                {/* Discover Card */}
                <button type="button" className="intent-card intent-card-discover" onClick={() => goToStep('categories')}>
                  <div className="intent-card-icon intent-icon-gold">
                    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h2 className="intent-card-title">ค้นหาเรื่องใหม่</h2>
                  <p className="intent-card-desc">เลือกแนวที่ชอบ แล้วเราจะแนะนำให้</p>
                  <div className="intent-card-sparkles">
                    <span className="sparkle">✦</span>
                    <span className="sparkle s2">✦</span>
                    <span className="sparkle s3">✦</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* STEP: CONTINUE WATCHING                      */}
        {/* ============================================ */}
        {step === 'continue' && (
          <div className="continue-screen">
            <div className="step-header">
              <button type="button" className="back-btn" onClick={() => goToStep('intent')}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="step-title">ดูต่อจากที่ค้างไว้</h2>
            </div>

            <div className="continue-grid">
              {CONTINUE_WATCHING.map((item, i) => {
                const content = allContent[item.contentIndex];
                if (!content) return null;
                return (
                  <div key={i} className="continue-card" onClick={() => handleContentClick(content)}>
                    <div className="continue-card-img-wrap">
                      <img src={content.thumbnail} alt={content.title} className="continue-card-img" />
                      <div className="continue-card-overlay">
                        <div className="continue-play-icon">
                          <svg width="28" height="28" fill="#0A0A0A" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                      <div className="continue-progress-bar">
                        <div className="continue-progress-fill" style={{ width: `${item.progress}%` }} />
                      </div>
                    </div>
                    <div className="continue-card-info">
                      <h3 className="continue-card-title">{content.title}</h3>
                      <p className="continue-card-meta">ตอนที่ {item.episode} • ดูไปแล้ว {item.progress}%</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="continue-cta">
              <button type="button" className="cta-discover-btn" onClick={() => goToStep('categories')}>
                หรือค้นหาเรื่องใหม่?
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* STEP: CATEGORY SELECTION                     */}
        {/* ============================================ */}
        {step === 'categories' && (
          <div className="categories-screen">
            <div className="step-header">
              <button type="button" className="back-btn" onClick={() => goToStep('intent')}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="step-title">คุณอยากดูแนวไหน?</h2>
                <p className="step-subtitle">เลือกแนวที่สนใจ แล้วเราจะจัดให้</p>
              </div>
            </div>

            <div className="genre-grid">
              {GENRE_CONFIG.map((genre) => (
                <button
                  type="button"
                  key={genre.id}
                  className="genre-tile"
                  style={{ background: genre.gradient }}
                  onClick={() => {
                    setSelectedGenre(genre.id);
                    goToStep('browse');
                  }}
                >
                  <div className="genre-tile-bg">
                    {genrePreviews[genre.id]?.slice(0, 2).map((thumb, i) => (
                      <img
                        key={i}
                        src={thumb}
                        alt=""
                        className="genre-tile-thumb"
                        style={{ opacity: 0.2 - i * 0.05 }}
                      />
                    ))}
                  </div>
                  <span className="genre-emoji">{genre.emoji}</span>
                  <span className="genre-name">{genre.name}</span>
                  <span className="genre-count">{genreCounts[genre.id]} เรื่อง</span>
                </button>
              ))}
            </div>

            {/* Reels CTA — opens viewer directly */}
            <div className="reels-cta-section">
              <button type="button" className="reels-cta-card" onClick={() => setReelViewerIndex(0)}>
                <div className="reels-cta-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <line x1="2" y1="8" x2="22" y2="8" />
                    <line x1="8" y1="2" x2="8" y2="8" />
                    <line x1="16" y1="2" x2="16" y2="8" />
                    <polygon points="10,12 16,15 10,18" fill="#0A0A0A" stroke="none" />
                  </svg>
                </div>
                <div className="reels-cta-text">
                  <span className="reels-cta-title">เลื่อนดูคลิปสั้น</span>
                  <span className="reels-cta-desc">ดูตัวอย่างแบบสั้นๆ เลือกเรื่องที่ใช่</span>
                </div>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* STEP: BROWSE BY GENRE                       */}
        {/* ============================================ */}
        {step === 'browse' && selectedGenre && (
          <div className="browse-screen">
            <div className="step-header">
              <button type="button" className="back-btn" onClick={() => goToStep('categories')}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="step-title">
                  {GENRE_CONFIG.find(g => g.id === selectedGenre)?.emoji}{' '}
                  {selectedGenre}
                </h2>
                <p className="step-subtitle">{genreContent.length} เรื่องสำหรับคุณ</p>
              </div>
            </div>

            {/* Recommended Row */}
            <div className="browse-section">
              <h3 className="browse-section-title">แนะนำสำหรับคุณ</h3>
              <div className="browse-row">
                {genreContent.slice(0, 8).map((content) => (
                  <div key={content.id} className="browse-card" onClick={() => handleContentClick(content)}>
                    <div className="browse-card-img-wrap">
                      <img src={content.thumbnail} alt={content.title} className="browse-card-img" />
                      <div className="browse-card-hover">
                        <svg width="28" height="28" fill="#0A0A0A" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                      {content.rating && content.rating >= 4.5 && (
                        <div className="browse-card-badge">HOT</div>
                      )}
                    </div>
                    <h4 className="browse-card-title">{content.title}</h4>
                    <div className="browse-card-meta">
                      <span className="browse-card-type">{content.type}</span>
                      {content.rating && (
                        <span className="browse-card-rating">
                          <svg width="10" height="10" fill="#FFBF00" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {content.rating}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Content Grid */}
            <div className="browse-section">
              <h3 className="browse-section-title">ทั้งหมดในแนว {selectedGenre}</h3>
              <div className="browse-grid">
                {genreContent.map((content) => (
                  <div key={content.id} className="browse-card" onClick={() => handleContentClick(content)}>
                    <div className="browse-card-img-wrap">
                      <img src={content.thumbnail} alt={content.title} className="browse-card-img" />
                      <div className="browse-card-hover">
                        <svg width="28" height="28" fill="#0A0A0A" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="browse-card-title">{content.title}</h4>
                    <div className="browse-card-meta">
                      <span className="browse-card-type">{content.type}</span>
                      {content.episodes && <span>• {content.episodes} ตอน</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="browse-back-cta">
              <button type="button" className="cta-discover-btn" onClick={() => goToStep('categories')}>
                ดูแนวอื่น
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Content Detail Modal */}
      <ContentDetailModal content={selectedContent} onClose={handleCloseModal} />

      {/* Reels Viewer */}
      {reelViewerIndex !== null && (
        <ReelsViewer
          reels={reelsData}
          initialIndex={reelViewerIndex}
          onClose={() => setReelViewerIndex(null)}
          onWatchFull={() => {}}
        />
      )}

      <style jsx>{`
        /* ============================= */
        /* CONTAINER & ANIMATIONS        */
        /* ============================= */
        .landing-container {
          padding-top: 64px;
          min-height: 100vh;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes sparkleFloat {
          0%, 100% { opacity: 0.3; transform: translateY(0) scale(1); }
          50% { opacity: 1; transform: translateY(-8px) scale(1.2); }
        }

        /* ============================= */
        /* SHARED STEP HEADER            */
        /* ============================= */
        .step-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 24px var(--gutter) 8px;
        }
        .back-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          color: #fff; cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .back-btn:hover { background: rgba(255,255,255,0.15); }
        .step-title {
          font-size: 24px; font-weight: 800; color: #fff; margin: 0; line-height: 1.2;
        }
        .step-subtitle {
          font-size: 14px; color: var(--text-secondary); margin: 4px 0 0 0;
        }

        /* ============================= */
        /* STEP 1: INTENT SCREEN         */
        /* ============================= */
        .intent-screen {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 64px);
          padding: 24px var(--gutter);
        }
        .intent-content {
          max-width: 680px;
          width: 100%;
          text-align: center;
        }
        .intent-logo {
          margin-bottom: 40px;
        }
        .intent-title {
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          margin: 16px 0 8px;
          line-height: 1.2;
        }
        .intent-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
        }
        .intent-cards {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        .intent-card {
          flex: 1;
          max-width: 300px;
          padding: 32px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: var(--bg-card);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
          overflow: hidden;
        }
        .intent-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        }
        .intent-card-continue {
          border-color: rgba(255,255,255,0.12);
        }
        .intent-card-continue:hover {
          border-color: rgba(255,191,0,0.3);
          background: rgba(255,191,0,0.05);
        }
        .intent-card-discover {
          border-color: rgba(255,191,0,0.2);
          background: linear-gradient(145deg, rgba(255,191,0,0.08), rgba(255,191,0,0.02));
        }
        .intent-card-discover:hover {
          border-color: rgba(255,191,0,0.5);
          background: linear-gradient(145deg, rgba(255,191,0,0.15), rgba(255,191,0,0.05));
        }
        .intent-card-icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
        }
        .intent-icon-gold {
          background: rgba(255,191,0,0.15);
          color: #FFBF00;
        }
        .intent-card-title {
          font-size: 18px; font-weight: 700; color: #fff; margin: 0;
        }
        .intent-card-desc {
          font-size: 13px; color: var(--text-secondary); margin: 0;
        }
        .intent-card-preview {
          display: flex; align-items: center; justify-content: center; margin-top: 4px;
        }
        .intent-preview-thumb {
          width: 44px; height: 44px;
          border-radius: 10px;
          object-fit: cover;
          border: 2px solid var(--bg-card);
        }
        .intent-card-sparkles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .sparkle {
          position: absolute;
          color: #FFBF00;
          font-size: 14px;
          opacity: 0.3;
          animation: sparkleFloat 3s ease-in-out infinite;
          top: 20%; right: 20%;
        }
        .sparkle.s2 {
          top: 60%; right: 10%;
          animation-delay: 1s;
          font-size: 10px;
        }
        .sparkle.s3 {
          top: 30%; left: 15%;
          animation-delay: 2s;
          font-size: 12px;
        }

        /* ============================= */
        /* CONTINUE WATCHING SCREEN      */
        /* ============================= */
        .continue-screen {
          padding-bottom: 48px;
        }
        .continue-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          padding: 16px var(--gutter);
        }
        .continue-card {
          cursor: pointer;
          transition: transform 0.2s;
        }
        .continue-card:hover {
          transform: scale(1.03);
        }
        .continue-card-img-wrap {
          position: relative;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-card);
        }
        .continue-card-img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .continue-card-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .continue-card:hover .continue-card-overlay { opacity: 1; }
        .continue-play-icon {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(255,191,0,0.9);
          display: flex; align-items: center; justify-content: center;
        }
        .continue-progress-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 4px; background: rgba(255,255,255,0.2);
        }
        .continue-progress-fill {
          height: 100%;
          background: #FFBF00;
          border-radius: 0 2px 2px 0;
        }
        .continue-card-info { padding: 10px 4px; }
        .continue-card-title {
          font-size: 14px; font-weight: 600; color: #fff; margin: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .continue-card-meta {
          font-size: 12px; color: var(--text-secondary); margin: 4px 0 0;
        }
        .continue-cta {
          text-align: center;
          padding: 24px var(--gutter);
        }
        .cta-discover-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 12px 24px;
          background: transparent;
          border: 1px solid rgba(255,191,0,0.3);
          border-radius: 24px;
          color: #FFBF00;
          font-size: 14px; font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cta-discover-btn:hover {
          background: rgba(255,191,0,0.08);
          border-color: #FFBF00;
        }

        /* ============================= */
        /* CATEGORY SELECTION SCREEN     */
        /* ============================= */
        .categories-screen {
          padding-bottom: 48px;
        }
        .genre-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 16px var(--gutter);
        }
        .genre-tile {
          position: relative;
          padding: 28px 20px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          text-align: left;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-height: 120px;
        }
        .genre-tile:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .genre-tile-bg {
          position: absolute; inset: 0;
          display: flex;
          overflow: hidden;
        }
        .genre-tile-thumb {
          width: 50%;
          height: 100%;
          object-fit: cover;
        }
        .genre-emoji {
          font-size: 28px;
          position: relative;
          z-index: 1;
        }
        .genre-name {
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          position: relative;
          z-index: 1;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .genre-count {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          position: relative;
          z-index: 1;
          font-weight: 500;
        }

        /* Reels CTA */
        .reels-cta-section {
          padding: 8px var(--gutter) 16px;
        }
        .reels-cta-card {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,191,0,0.1), rgba(255,191,0,0.03));
          border: 1px solid rgba(255,191,0,0.2);
          cursor: pointer;
          transition: all 0.2s;
          color: #fff;
        }
        .reels-cta-card:hover {
          background: linear-gradient(135deg, rgba(255,191,0,0.15), rgba(255,191,0,0.05));
          border-color: rgba(255,191,0,0.4);
        }
        .reels-cta-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #FFBF00, #FF8C00);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .reels-cta-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .reels-cta-title {
          font-size: 15px; font-weight: 700; color: #fff;
        }
        .reels-cta-desc {
          font-size: 12px; color: var(--text-secondary);
        }

        /* ============================= */
        /* BROWSE BY GENRE SCREEN        */
        /* ============================= */
        .browse-screen {
          padding-bottom: 48px;
        }
        .browse-section {
          margin-bottom: 32px;
        }
        .browse-section-title {
          font-size: 18px; font-weight: 700; color: #fff;
          margin: 0 0 12px 0;
          padding: 0 var(--gutter);
        }

        /* Horizontal scrollable row */
        .browse-row {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 0 var(--gutter);
          scrollbar-width: none;
        }
        .browse-row::-webkit-scrollbar { display: none; }
        .browse-row .browse-card {
          flex: 0 0 200px;
        }

        /* Full grid */
        .browse-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
          padding: 0 var(--gutter);
        }

        .browse-card {
          cursor: pointer;
          transition: transform 0.2s;
        }
        .browse-card:hover { transform: scale(1.04); }
        .browse-card-img-wrap {
          position: relative;
          aspect-ratio: 16/9;
          border-radius: 10px;
          overflow: hidden;
          background: var(--bg-card);
        }
        .browse-card-img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .browse-card-hover {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .browse-card-hover svg {
          background: rgba(255,191,0,0.9);
          border-radius: 50%;
          padding: 8px;
          width: 44px; height: 44px;
        }
        .browse-card:hover .browse-card-hover { opacity: 1; }
        .browse-card-badge {
          position: absolute; top: 6px; right: 6px;
          padding: 3px 8px;
          background: linear-gradient(135deg, #FFBF00, #FF8C00);
          color: #0A0A0A;
          font-size: 10px; font-weight: 800;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }
        .browse-card-title {
          font-size: 13px; font-weight: 600; color: #fff;
          margin: 8px 0 2px; line-height: 1.3;
          overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
        .browse-card-meta {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: var(--text-secondary);
        }
        .browse-card-type {
          padding: 1px 6px;
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
          font-size: 10px;
        }
        .browse-card-rating {
          display: flex; align-items: center; gap: 3px;
          color: #FFBF00; font-weight: 600;
        }
        .browse-back-cta {
          text-align: center;
          padding: 16px var(--gutter);
        }

        /* ============================= */
        /* RESPONSIVE                    */
        /* ============================= */
        @media (max-width: 640px) {
          .intent-cards {
            flex-direction: column;
            align-items: center;
          }
          .intent-card {
            max-width: 100%;
            width: 100%;
          }
          .intent-title { font-size: 26px; }
          .genre-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .genre-tile {
            min-height: 100px;
            padding: 20px 16px;
          }
          .genre-name { font-size: 15px; }
          .genre-emoji { font-size: 22px; }
          .continue-grid {
            grid-template-columns: 1fr;
          }
          .browse-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        @media (min-width: 768px) {
          .genre-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .genre-tile { min-height: 140px; }
          .continue-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .browse-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .genre-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          .genre-tile {
            min-height: 160px;
            padding: 32px 24px;
          }
          .genre-name { font-size: 20px; }
          .continue-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .intent-title { font-size: 36px; }
        }
      `}</style>
    </div>
  );
}
