'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { ReelItem } from '@/data/reelsData';
import { getViuUrl } from '@/lib/viuUrl';

interface ReelsViewerProps {
  reels: ReelItem[];
  initialIndex: number;
  onClose: () => void;
  onWatchFull: (reel: ReelItem) => void;
}

export default function ReelsViewer({ reels, initialIndex, onClose }: ReelsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchOverlayRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastNavTime = useRef(0);
  const libraryRef = useRef<HTMLDivElement>(null);

  const currentReel = reels[currentIndex];

  const goToReel = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= reels.length || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    setShowComments(false);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [reels.length, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goToReel(currentIndex - 1);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goToReel(currentIndex + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, onClose, goToReel]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Scroll/wheel navigation on the whole backdrop
  useEffect(() => {
    const THRESHOLD = 80;
    const COOLDOWN = 500;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastNavTime.current < COOLDOWN) return;

      wheelAccum.current += e.deltaY;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => { wheelAccum.current = 0; }, 150);

      if (wheelAccum.current > THRESHOLD) {
        wheelAccum.current = 0;
        lastNavTime.current = now;
        goToReel(currentIndex + 1);
      } else if (wheelAccum.current < -THRESHOLD) {
        wheelAccum.current = 0;
        lastNavTime.current = now;
        goToReel(currentIndex - 1);
      }
    };

    const el = containerRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      if (el) el.removeEventListener('wheel', handleWheel);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, [currentIndex, goToReel]);

  // Touch navigation — attached to the transparent overlay ON TOP of the video
  useEffect(() => {
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToReel(currentIndex + 1);
        else goToReel(currentIndex - 1);
      }
    };

    // Attach to the overlay so it captures touch on top of the iframe
    const el = touchOverlayRef.current;
    if (el) {
      el.addEventListener('touchstart', handleTouchStart, { passive: true });
      el.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    return () => {
      if (el) {
        el.removeEventListener('touchstart', handleTouchStart);
        el.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex, goToReel]);

  // Auto-scroll library to current reel
  useEffect(() => {
    if (showLibrary && libraryRef.current) {
      const activeItem = libraryRef.current.querySelector(`[data-reel-index="${currentIndex}"]`);
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentIndex, showLibrary]);

  const handleYouTubeReady = useCallback((event: YouTubeEvent) => {
    playerRef.current = event.target;
    event.target.playVideo();
  }, []);

  const toggleLike = () => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(currentReel.id)) next.delete(currentReel.id);
      else next.add(currentReel.id);
      return next;
    });
  };

  const toggleBookmark = () => {
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(currentReel.id)) next.delete(currentReel.id);
      else next.add(currentReel.id);
      return next;
    });
  };

  const handleLibrarySelect = (index: number) => {
    goToReel(index);
    setShowLibrary(false);
  };

  const isLiked = liked.has(currentReel.id);
  const isBookmarked = bookmarked.has(currentReel.id);

  return (
    <div ref={containerRef} className="rv-backdrop">
      {/* Top bar: close + library */}
      <div className="rv-top-bar">
        <button type="button" onClick={onClose} className="rv-close-btn" aria-label="Close">
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button type="button" onClick={() => setShowLibrary(!showLibrary)} className={`rv-library-btn ${showLibrary ? 'active' : ''}`} aria-label="Show all reels">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Full-width video area */}
      <div className="rv-main">
        {/* Navigation arrows (tablet/desktop) */}
        {currentIndex > 0 && (
          <button type="button" onClick={() => goToReel(currentIndex - 1)} className="rv-nav-btn rv-nav-up" aria-label="Previous reel">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
        {currentIndex < reels.length - 1 && (
          <button type="button" onClick={() => goToReel(currentIndex + 1)} className="rv-nav-btn rv-nav-down" aria-label="Next reel">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {/* Progress dots (tablet/desktop) */}
        <div className="rv-dots">
          {reels.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToReel(idx)}
              className={`rv-dot ${idx === currentIndex ? 'active' : ''}`}
              aria-label={`Go to reel ${idx + 1}`}
            />
          ))}
        </div>

        {/* Video container — full width */}
        <div className="rv-video-container">
          {/* YouTube Video */}
          <div key={currentReel.youtubeId} className="rv-video-inner">
            <YouTube
              videoId={currentReel.youtubeId}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 1,
                  mute: 1,
                  rel: 0,
                  modestbranding: 1,
                  playsinline: 1,
                  controls: 0,
                  showinfo: 0,
                  fs: 0,
                },
              }}
              onReady={handleYouTubeReady}
              className="rv-yt-wrapper"
              iframeClassName="reels-yt-iframe"
            />
          </div>

          {/* Transparent touch overlay — captures swipe on top of iframe */}
          <div ref={touchOverlayRef} className="rv-touch-overlay" />

          {/* Gradient overlays */}
          <div className="rv-gradient-bottom" />
          <div className="rv-gradient-top" />

          {/* Right Side Action Bar */}
          <div className="rv-actions">
            <button type="button" onClick={toggleLike} className="rv-action-btn">
              <div className={`rv-action-circle ${isLiked ? 'liked' : ''}`}>
                <svg width="24" height="24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="rv-action-label">{isLiked ? 'ชอบแล้ว' : 'ชอบ'}</span>
            </button>

            <button type="button" onClick={() => setShowComments(!showComments)} className="rv-action-btn">
              <div className={`rv-action-circle ${showComments ? 'active' : ''}`}>
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="rv-action-label">ความเห็น</span>
            </button>

            <button type="button" onClick={toggleBookmark} className="rv-action-btn">
              <div className={`rv-action-circle ${isBookmarked ? 'bookmarked' : ''}`}>
                <svg width="22" height="22" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <span className="rv-action-label">{isBookmarked ? 'บันทึกแล้ว' : 'บันทึก'}</span>
            </button>

            <button type="button" className="rv-action-btn">
              <div className="rv-action-circle">
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <span className="rv-action-label">แชร์</span>
            </button>
          </div>

          {/* Bottom Content Info */}
          <div className="rv-info">
            <div className="rv-info-badges">
              <span className="rv-type-badge">{currentReel.type}</span>
              {currentReel.status && (
                <span className="rv-status-badge">{currentReel.status}</span>
              )}
            </div>

            <h2 className="rv-info-title">{currentReel.titleTh || currentReel.title}</h2>

            {currentReel.titleTh && (
              <p className="rv-info-subtitle">{currentReel.title}</p>
            )}

            <div className="rv-info-meta">
              <span className="rv-info-year">{currentReel.year}</span>
              <span>•</span>
              <span>{currentReel.episodes} ตอน</span>
              <span>•</span>
              <span className="rv-info-rating">
                <svg width="12" height="12" fill="#FFBF00" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {currentReel.rating}
              </span>
            </div>

            <p className="rv-info-desc">{currentReel.description}</p>

            <div className="rv-info-genres">
              {currentReel.genres.map((genre, idx) => (
                <span key={idx} className="rv-genre-tag">{genre}</span>
              ))}
            </div>

            <a href={getViuUrl(currentReel)} target="_blank" rel="noopener noreferrer" className="rv-watch-btn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              ดูเรื่องนี้เลย
            </a>
          </div>
        </div>
      </div>

      {/* Library panel — slide-in from right */}
      {showLibrary && (
        <div className="rv-library-overlay" onClick={() => setShowLibrary(false)}>
          <div className="rv-library" ref={libraryRef} onClick={(e) => e.stopPropagation()}>
            <div className="rv-library-header">
              <h3>คลิปทั้งหมด</h3>
              <button type="button" onClick={() => setShowLibrary(false)} className="rv-library-close">×</button>
            </div>
            <div className="rv-library-list">
              {reels.map((reel, idx) => (
                <button
                  key={reel.id}
                  type="button"
                  data-reel-index={idx}
                  className={`rv-library-item ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => handleLibrarySelect(idx)}
                >
                  <div className="rv-library-thumb">
                    <img src={reel.thumbnail} alt={reel.title} />
                    {idx === currentIndex && (
                      <div className="rv-library-playing">
                        <svg width="16" height="16" fill="#FFBF00" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="rv-library-info">
                    <span className="rv-library-num">{idx + 1}</span>
                    <div>
                      <p className="rv-library-name">{reel.titleTh || reel.title}</p>
                      <p className="rv-library-meta">{reel.type} • {reel.genres[0]}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Comments panel */}
      {showComments && (
        <div className="rv-comments">
          <div className="rv-comments-header">
            <h3>ความคิดเห็น</h3>
            <button type="button" onClick={() => setShowComments(false)} className="rv-comments-close">×</button>
          </div>
          <div className="rv-comments-list">
            {[
              { user: 'kookiefan_99', text: 'เรื่องนี้สนุกมากกก ดูแล้วดูอีก', time: '2 ชม.' },
              { user: 'dramaqueen_th', text: 'ตัวอย่างทำได้ดีมาก อยากดูแล้ว!', time: '5 ชม.' },
              { user: 'series_addict', text: 'นักแสดงเล่นดีมาก ชอบทุกตัวละคร', time: '1 วัน' },
            ].map((comment, idx) => (
              <div key={idx} className="rv-comment">
                <div className="rv-comment-avatar">{comment.user[0].toUpperCase()}</div>
                <div>
                  <div className="rv-comment-meta">
                    <span className="rv-comment-user">{comment.user}</span>
                    <span className="rv-comment-time">{comment.time}</span>
                  </div>
                  <p className="rv-comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rv-comments-input">
            <input type="text" placeholder="เขียนความคิดเห็น..." />
            <button type="button">ส่ง</button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ===== Full-screen backdrop ===== */
        .rv-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: #000; display: flex;
          align-items: center; justify-content: center;
        }

        /* ===== Top bar ===== */
        .rv-top-bar {
          position: absolute; top: 0; left: 0; right: 0; z-index: 110;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%);
        }
        .rv-close-btn, .rv-library-btn {
          width: 40px; height: 40px;
          background: rgba(255,255,255,0.1); backdrop-filter: blur(12px);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.15); cursor: pointer; color: #fff;
          transition: background 0.2s;
        }
        .rv-close-btn:hover, .rv-library-btn:hover { background: rgba(255,255,255,0.2); }
        .rv-library-btn.active { background: rgba(255,191,0,0.25); border-color: rgba(255,191,0,0.4); color: #FFBF00; }

        /* ===== Main — FULL WIDTH, FULL HEIGHT ===== */
        .rv-main {
          position: relative;
          width: 100%; height: 100%;
        }

        /* ===== Video container — fills entire screen ===== */
        .rv-video-container {
          position: relative; width: 100%; height: 100%;
          overflow: hidden;
        }
        .rv-video-inner {
          position: absolute; inset: 0;
          animation: reelFadeIn 0.3s ease-out;
        }

        /* ===== Transparent touch overlay (captures swipe on video) ===== */
        .rv-touch-overlay {
          position: absolute; inset: 0; z-index: 4;
          /* Transparent, sits above iframe but below UI elements */
        }

        /* ===== Gradient overlays ===== */
        .rv-gradient-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
          pointer-events: none; z-index: 5;
        }
        .rv-gradient-top {
          position: absolute; top: 0; left: 0; right: 0; height: 15%;
          background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%);
          pointer-events: none; z-index: 5;
        }

        /* ===== Right-side action bar ===== */
        .rv-actions {
          position: absolute; right: 10px; bottom: 160px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          z-index: 10;
        }
        .rv-action-btn {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          background: none; border: none; cursor: pointer; transition: transform 0.2s;
        }
        .rv-action-btn:hover { transform: scale(1.15); }
        .rv-action-circle {
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.1); backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.15); color: #fff;
          transition: all 0.2s;
        }
        .rv-action-circle.liked {
          background: rgba(255,59,48,0.2); border-color: rgba(255,59,48,0.4); color: #FF3B30;
        }
        .rv-action-circle.active {
          background: rgba(255,191,0,0.15); border-color: rgba(255,191,0,0.3); color: #FFBF00;
        }
        .rv-action-circle.bookmarked {
          background: rgba(255,191,0,0.2); border-color: rgba(255,191,0,0.4); color: #FFBF00;
        }
        .rv-action-label { font-size: 10px; color: #fff; font-weight: 600; }

        /* ===== Bottom info overlay ===== */
        .rv-info {
          position: absolute; bottom: 0; left: 0; right: 64px;
          padding: 16px 14px; z-index: 10;
          display: flex; flex-direction: column; gap: 6px;
          animation: reelSlideUp 0.4s ease-out;
        }
        .rv-info-badges { display: flex; align-items: center; gap: 8px; }
        .rv-type-badge {
          padding: 4px 10px; background: #FFBF00; color: #0A0A0A;
          font-size: 11px; font-weight: 700; border-radius: 4px;
        }
        .rv-status-badge {
          padding: 4px 10px; background: rgba(255,255,255,0.15);
          color: #fff; font-size: 11px; font-weight: 600;
          border-radius: 4px; backdrop-filter: blur(8px);
        }
        .rv-info-title {
          font-size: 18px; font-weight: 800; color: #fff; margin: 0;
          line-height: 1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }
        .rv-info-subtitle { font-size: 12px; color: rgba(255,255,255,0.7); margin: 0; font-weight: 500; }
        .rv-info-meta {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: rgba(255,255,255,0.7);
        }
        .rv-info-year { font-weight: 600; }
        .rv-info-rating { display: flex; align-items: center; gap: 3px; font-weight: 600; }
        .rv-info-desc {
          font-size: 12px; line-height: 1.5; color: rgba(255,255,255,0.65); margin: 0;
          overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
        .rv-info-genres { display: flex; gap: 6px; flex-wrap: wrap; }
        .rv-genre-tag {
          padding: 3px 10px; background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px); border-radius: 12px;
          font-size: 10px; color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .rv-watch-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 20px; background: #FFBF00; color: #0A0A0A;
          font-size: 13px; font-weight: 700; border-radius: 8px;
          border: none; cursor: pointer; transition: all 0.2s;
          margin-top: 2px; width: fit-content; text-decoration: none;
        }
        .rv-watch-btn:hover { background: #FFD700; transform: scale(1.03); }

        /* ===== Navigation arrows (hidden on mobile) ===== */
        .rv-nav-btn {
          display: none; position: absolute; z-index: 10;
          width: 44px; height: 44px;
          background: rgba(255,255,255,0.08); backdrop-filter: blur(12px);
          border-radius: 50%; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.12); cursor: pointer; color: #fff;
          transition: background 0.2s;
        }
        .rv-nav-btn:hover { background: rgba(255,255,255,0.15); }
        .rv-nav-up { top: 50%; left: 24px; transform: translateY(-70%); }
        .rv-nav-down { top: 50%; left: 24px; transform: translateY(30%); }

        /* ===== Progress dots (hidden on mobile) ===== */
        .rv-dots {
          display: none; position: absolute; z-index: 10;
          top: 50%; right: 12px; transform: translateY(-50%);
          flex-direction: column; gap: 6px;
        }
        .rv-dot {
          width: 4px; height: 8px; border-radius: 2px;
          background: rgba(255,255,255,0.3); border: none; padding: 0;
          cursor: pointer; transition: all 0.3s ease;
        }
        .rv-dot.active { height: 20px; background: #FFBF00; }

        /* ===== Library panel ===== */
        .rv-library-overlay {
          position: absolute; inset: 0; z-index: 130;
          background: rgba(0,0,0,0.5);
          animation: fadeIn 0.2s ease-out;
        }
        .rv-library {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: 300px; max-width: 85vw;
          background: rgba(20,20,20,0.97); backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255,255,255,0.08);
          display: flex; flex-direction: column;
          animation: slideInRight 0.3s ease-out;
        }
        .rv-library-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .rv-library-header h3 { font-size: 16px; font-weight: 700; color: #fff; margin: 0; }
        .rv-library-close {
          background: none; border: none; color: #B3B3B3; cursor: pointer;
          font-size: 24px; line-height: 1;
        }
        .rv-library-list {
          flex: 1; overflow-y: auto; padding: 8px 0;
        }
        .rv-library-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 16px; width: 100%;
          background: none; border: none; cursor: pointer;
          transition: background 0.2s; text-align: left;
        }
        .rv-library-item:hover { background: rgba(255,255,255,0.05); }
        .rv-library-item.active { background: rgba(255,191,0,0.1); }
        .rv-library-thumb {
          width: 48px; height: 72px; border-radius: 6px;
          overflow: hidden; flex-shrink: 0; position: relative;
        }
        .rv-library-thumb img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .rv-library-playing {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
        }
        .rv-library-info {
          display: flex; align-items: center; gap: 10px;
          min-width: 0;
        }
        .rv-library-num {
          font-size: 14px; font-weight: 700;
          color: rgba(255,255,255,0.4); flex-shrink: 0; width: 20px; text-align: center;
        }
        .rv-library-item.active .rv-library-num { color: #FFBF00; }
        .rv-library-name {
          font-size: 13px; font-weight: 600; color: #fff; margin: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .rv-library-item.active .rv-library-name { color: #FFBF00; }
        .rv-library-meta {
          font-size: 11px; color: rgba(255,255,255,0.5); margin: 2px 0 0 0;
        }

        /* ===== Comments panel ===== */
        .rv-comments {
          position: absolute; bottom: 0;
          left: 0; right: 0;
          height: 50vh;
          background: rgba(26,26,26,0.95); backdrop-filter: blur(20px);
          border-radius: 16px 16px 0 0; z-index: 120;
          animation: reelSlideUp 0.3s ease-out;
          display: flex; flex-direction: column;
        }
        .rv-comments-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .rv-comments-header h3 { font-size: 16px; font-weight: 700; color: #fff; margin: 0; }
        .rv-comments-close {
          background: none; border: none; color: #B3B3B3; cursor: pointer;
          font-size: 24px; line-height: 1;
        }
        .rv-comments-list {
          flex: 1; padding: 20px; display: flex; flex-direction: column;
          gap: 16px; overflow-y: auto;
        }
        .rv-comment { display: flex; gap: 12px; }
        .rv-comment-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,191,0,0.2); display: flex;
          align-items: center; justify-content: center;
          font-size: 14px; color: #FFBF00; font-weight: 700; flex-shrink: 0;
        }
        .rv-comment-meta { display: flex; align-items: center; gap: 8px; }
        .rv-comment-user { font-size: 13px; font-weight: 600; color: #fff; }
        .rv-comment-time { font-size: 11px; color: #666; }
        .rv-comment-text { font-size: 13px; color: #B3B3B3; margin: 4px 0 0 0; }
        .rv-comments-input {
          padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.1);
          display: flex; gap: 8px;
        }
        .rv-comments-input input {
          flex: 1; padding: 10px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px; color: #fff; font-size: 13px; outline: none;
        }
        .rv-comments-input button {
          padding: 10px 16px; background: #FFBF00; color: #0A0A0A;
          border: none; border-radius: 20px; font-size: 13px;
          font-weight: 700; cursor: pointer;
        }

        /* ======================================= */
        /* TABLET (768px+)                         */
        /* ======================================= */
        @media (min-width: 768px) {
          .rv-nav-btn { display: flex; }
          .rv-dots { display: flex; }
          .rv-actions { right: 16px; gap: 18px; }
          .rv-action-circle { width: 46px; height: 46px; }
          .rv-info { padding: 24px 20px; right: 80px; gap: 8px; }
          .rv-info-title { font-size: 22px; }
          .rv-info-desc { font-size: 13px; }
        }

        /* ======================================= */
        /* DESKTOP (1024px+)                       */
        /* ======================================= */
        @media (min-width: 1024px) {
          .rv-nav-up { left: 32px; }
          .rv-nav-down { left: 32px; }
          .rv-dots { right: 16px; }
          .rv-info { padding: 28px 24px; }
          .rv-info-title { font-size: 24px; }
          .rv-watch-btn { padding: 12px 24px; font-size: 14px; }
          .rv-library { width: 340px; }
        }

        /* ======================================= */
        /* LANDSCAPE iPad (1024px+, height ≤ 900)  */
        /* ======================================= */
        @media (min-width: 1024px) and (max-height: 900px) {
          .rv-info { gap: 4px; padding: 16px 20px; }
          .rv-info-title { font-size: 20px; }
          .rv-info-desc { -webkit-line-clamp: 1; }
          .rv-info-genres { display: none; }
          .rv-watch-btn { padding: 8px 18px; font-size: 13px; }
          .rv-action-circle { width: 40px; height: 40px; }
          .rv-actions { gap: 14px; bottom: 140px; }
        }

        /* ======================================= */
        /* ANIMATIONS                              */
        /* ======================================= */
        @keyframes reelFadeIn {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes reelSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <style jsx global>{`
        .rv-yt-wrapper {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
        }
        .reels-yt-iframe {
          position: absolute;
          top: 50%; left: 50%;
          width: 100%; height: 100%;
          min-width: 100%; min-height: 100%;
          transform: translate(-50%, -50%);
          border: none; object-fit: cover;
        }
      `}</style>
    </div>
  );
}
