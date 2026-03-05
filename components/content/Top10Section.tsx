'use client';

import { useState } from 'react';
import { Content } from '@/types';

interface Top10SectionProps {
  content: Content[];
  onContentClick: (content: Content) => void;
}

export default function Top10Section({ content, onContentClick }: Top10SectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardClick = (item: Content) => {
    setHoveredIndex(null);
    onContentClick(item);
  };

  return (
    <section className="top10-section">
      {/* 80/20 layout: Left = Top10, Right = Ads */}
      <div className="top10-layout">
        {/* Left Column ~80%: Title + Grid */}
        <div className="top10-main">
          {/* Section Title */}
          <div className="top10-header">
            <h2 className="top10-heading">Top 10 เดือนนี้</h2>
            <span className="top10-hot-badge">HOT</span>
          </div>

          {/* Cards Grid */}
          <div className="top10-grid">
            {content.slice(0, 10).map((item, index) => (
              <div
                key={item.id}
                className="top10-card"
                onClick={() => handleCardClick(item)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  zIndex: hoveredIndex === index ? 30 : 10,
                }}
              >
                {/* Thumbnail — square */}
                <div className="top10-thumb">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="top10-thumb-img"
                    />
                  ) : (
                    <div className="top10-thumb-placeholder">
                      <svg style={{ width: '40px', height: '40px', opacity: '0.2' }} fill="none" stroke="#FFFFFF" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Rank Number */}
                  <div className="top10-rank" style={{
                    color: index < 3 ? '#FFCC00' : 'rgba(255,255,255,0.7)',
                  }}>
                    {index + 1}
                  </div>

                  {/* Bottom gradient */}
                  <div className="top10-gradient" />

                  {/* Hover overlay */}
                  {hoveredIndex === index && (
                    <div className="top10-hover-overlay">
                      <div className="top10-play-circle">
                        <svg style={{ width: '24px', height: '24px', color: '#000', marginLeft: '3px' }} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title & genre — fixed height */}
                <div className="top10-info">
                  <h3 className="top10-title">{item.title}</h3>
                  <div className="top10-genre">
                    {item.genres?.slice(0, 2).join(' • ') || item.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column ~20%: Ads */}
        <div className="top10-ads">
          {/* Viu Premium Upgrade */}
          <div className="top10-ad-card top10-premium">
            <div className="top10-premium-glow" />
            <div className="top10-premium-label">Viu Premium</div>
            <h3 className="top10-premium-title">ดูไม่จำกัด ไม่มีโฆษณา</h3>
            <p className="top10-premium-desc">
              เข้าถึงซีรีส์และภาพยนตร์ทั้งหมด ดาวน์โหลดออฟไลน์ คุณภาพ Full HD
            </p>
            <button type="button" className="top10-premium-btn">
              สมัครเลย ฿119/เดือน
            </button>
          </div>

          {/* iPhone Ad */}
          <div className="top10-ad-card top10-ad-poster">
            <img src="/images/ads/iphone.jpg" alt="iPhone 15 Pro" />
            <div className="top10-ad-badge">AD</div>
          </div>

          {/* Dr.Pong Ad */}
          <div className="top10-ad-card top10-ad-poster">
            <img src="/images/ads/dr-pong.webp" alt="Dr.PONG" />
            <div className="top10-ad-badge">AD</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .top10-section {
          margin-bottom: 48px;
        }

        /* === 80/20 Layout === */
        .top10-layout {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 0 var(--gutter);
        }

        .top10-main {
          flex: 1;
          min-width: 0;
        }

        .top10-ads {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        @media (min-width: 768px) {
          .top10-layout {
            flex-direction: row;
            gap: 24px;
          }
          .top10-main {
            flex: 4;
          }
          .top10-ads {
            flex: 1;
            min-width: 0;
          }
        }

        /* === Header === */
        .top10-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .top10-heading {
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
        }

        .top10-hot-badge {
          background: linear-gradient(135deg, #FFBF00, #FF8C00);
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          color: #000;
          letter-spacing: 0.5px;
        }

        /* === Card === */
        .top10-card {
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        /* Thumbnail — square */
        .top10-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 10px;
          overflow: hidden;
          background-color: #2A2A2A;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .top10-card:hover .top10-thumb {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
        }

        .top10-thumb-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .top10-thumb-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Rank number */
        .top10-rank {
          position: absolute;
          bottom: -4px;
          right: 6px;
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
          font-size: 3.2em;
          line-height: 0.8;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          font-weight: 900;
          pointer-events: none;
          z-index: 5;
        }

        .top10-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
          pointer-events: none;
        }

        .top10-hover-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.3);
        }

        .top10-play-circle {
          width: 48px;
          height: 48px;
          background-color: rgba(255, 191, 0, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Title area — fixed height */
        .top10-info {
          padding: 6px 2px 0;
          height: 44px;
          overflow: hidden;
        }

        .top10-title {
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 700;
          margin: 0 0 2px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }

        .top10-genre {
          font-size: 10px;
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* === Ads column === */
        .top10-ad-card {
          border-radius: 12px;
          overflow: hidden;
        }

        .top10-premium {
          background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0a1628 100%);
          border: 1px solid rgba(255, 191, 0, 0.2);
          padding: 20px 16px;
          position: relative;
        }

        .top10-premium-glow {
          position: absolute;
          top: -30px;
          right: -30px;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255, 191, 0, 0.15) 0%, transparent 70%);
          border-radius: 50%;
        }

        .top10-premium-label {
          font-size: 12px;
          color: #FFBF00;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .top10-premium-title {
          font-size: 16px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .top10-premium-desc {
          font-size: 11px;
          color: #B3B3B3;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }

        .top10-premium-btn {
          width: 100%;
          padding: 10px 16px;
          background: linear-gradient(135deg, #FFBF00, #FF8C00);
          border: none;
          border-radius: 8px;
          color: #000;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .top10-premium-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(255, 191, 0, 0.3);
        }

        .top10-ad-poster {
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .top10-ad-poster img {
          width: 100%;
          height: auto;
          display: block;
        }

        .top10-ad-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          background-color: rgba(0,0,0,0.4);
          padding: 2px 6px;
          border-radius: 3px;
        }

        /* Mobile: hide ads, show below on small screens */
        @media (max-width: 767px) {
          .top10-ads {
            flex-direction: row;
            overflow-x: auto;
            scrollbar-width: none;
          }
          .top10-ads::-webkit-scrollbar { display: none; }
          .top10-ad-card {
            flex: 0 0 70%;
          }
        }
      `}</style>
    </section>
  );
}
