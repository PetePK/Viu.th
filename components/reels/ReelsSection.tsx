'use client';

import { ReelItem } from '@/data/reelsData';

interface ReelsSectionProps {
  reels: ReelItem[];
  onReelClick: (index: number) => void;
}

export default function ReelsSection({ reels, onReelClick }: ReelsSectionProps) {
  return (
    <div className="reels-section">
      {/* Section Header */}
      <div className="reels-header">
        <div className="reels-header-left">
          <div className="reels-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <line x1="2" y1="8" x2="22" y2="8" />
              <line x1="8" y1="2" x2="8" y2="8" />
              <line x1="16" y1="2" x2="16" y2="8" />
              <polygon points="10,12 16,15 10,18" fill="#0A0A0A" stroke="none" />
            </svg>
          </div>
          <h2 className="reels-title">คลิปตัวอย่าง</h2>
          <span className="reels-badge">NEW</span>
        </div>
      </div>

      {/* Layout: Left half reels, Right half AIS ad */}
      <div className="reels-layout">
        {/* Left: Reels Grid — takes up to 50% */}
        <div className="reels-grid">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="reel-card-wrap"
              onClick={() => onReelClick(index)}
            >
              <div className="reel-card">
                <img src={reel.thumbnail} alt={reel.title} className="reel-card-img" />
                <div className="reel-card-gradient" />

                <div className="reel-card-play">
                  <div className="reel-card-play-circle">
                    <svg width="22" height="22" fill="#0A0A0A" viewBox="0 0 20 20" style={{ marginLeft: '2px' }}>
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>

                <div className="reel-card-badge">
                  {reel.type === 'ซีรีส์จีน' ? '🇨🇳' : reel.type === 'ซีรีส์ไทย' ? '🇹🇭' : '🇰🇷'} {reel.genres[0]}
                </div>

                <div className="reel-card-info">
                  <h3 className="reel-card-name">{reel.titleTh || reel.title}</h3>
                  <div className="reel-card-meta">
                    <svg width="11" height="11" fill="#FFBF00" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{reel.rating}</span>
                    <span>•</span>
                    <span>{reel.episodes} ตอน</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: AIS Fibre poster — same block from Top10, uncropped */}
        <div className="reels-ad-wrap">
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
          }}>
            <img
              src="/images/ads/ais-fibre.jpg"
              alt="AIS Fibre"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '10px',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.5)',
              backgroundColor: 'rgba(0,0,0,0.4)',
              padding: '2px 6px',
              borderRadius: '3px',
            }}>
              AD
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reels-section {
          position: relative;
          margin-bottom: 40px;
          padding: 24px 0;
          background: linear-gradient(180deg, rgba(255,191,0,0.03) 0%, transparent 100%);
        }
        .reels-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 20px; padding: 0 var(--gutter);
        }
        .reels-header-left { display: flex; align-items: center; gap: 10px; }
        .reels-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, #FFBF00, #FF8C00);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .reels-title { font-size: 20px; font-weight: 700; color: #fff; margin: 0; }
        .reels-badge {
          padding: 3px 10px;
          background: linear-gradient(135deg, #FFBF00, #FF8C00);
          color: #0A0A0A; font-size: 10px; font-weight: 800;
          border-radius: 12px; letter-spacing: 1px; text-transform: uppercase;
          animation: reel-pulse 2s ease-in-out infinite;
        }
        /* === 60/40 Layout === */
        .reels-layout {
          display: flex;
          align-items: flex-end;
          gap: 24px;
          padding: 0 var(--gutter);
        }

        /* === Reels Grid — horizontal scroll, single row === */
        .reels-grid {
          flex: 6;
          display: flex;
          gap: 10px;
          min-width: 0;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .reels-grid::-webkit-scrollbar { display: none; }
        .reel-card-wrap {
          cursor: pointer; transition: transform 0.3s ease;
          flex: 0 0 130px;
          scroll-snap-align: start;
        }
        .reel-card-wrap:hover { transform: scale(1.04); }
        .reel-card {
          position: relative; width: 100%; aspect-ratio: 9/16;
          border-radius: 12px; overflow: hidden;
          background: #2A2A2A; border: 1px solid rgba(255,255,255,0.08);
        }
        .reel-card-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .reel-card-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 40%, transparent 70%);
        }
        .reel-card-play {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center; opacity: 0.9;
        }
        .reel-card-play-circle {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,191,0,0.85);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px);
        }
        .reel-card-badge {
          position: absolute; top: 8px; left: 8px;
          padding: 3px 8px; background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px); border-radius: 6px;
          font-size: 10px; color: #FFBF00; font-weight: 600;
        }
        .reel-card-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px; }
        .reel-card-name {
          font-size: 12px; font-weight: 700; color: #fff;
          margin: 0 0 4px 0; overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          line-height: 1.3;
        }
        .reel-card-meta {
          display: flex; align-items: center; gap: 4px;
          font-size: 10px; color: rgba(255,255,255,0.7);
        }

        /* === AIS Ad — ~40% of width, aligned to bottom === */
        .reels-ad-wrap {
          display: none;
          flex: 4;
          align-self: flex-end;
        }

        /* === Tablet (768px+): show ad, bigger cards === */
        @media (min-width: 768px) {
          .reels-grid { gap: 14px; }
          .reel-card-wrap { flex: 0 0 150px; }
          .reels-title { font-size: 22px; }
          .reel-card-name { font-size: 13px; }
          .reel-card-meta { font-size: 11px; }
          .reels-ad-wrap { display: block; }
        }

        /* === Desktop (1024px+) === */
        @media (min-width: 1024px) {
          .reels-layout { gap: 32px; }
          .reels-grid { gap: 16px; }
          .reel-card-wrap { flex: 0 0 160px; }
        }

        @keyframes reel-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
