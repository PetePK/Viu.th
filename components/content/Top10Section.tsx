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
    <div style={{ marginBottom: '48px' }}>
      {/* Section Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        padding: '0 var(--gutter)',
      }}>
        <h2 style={{
          fontSize: 'clamp(22px, 3.5vw, 28px)',
          fontWeight: '800',
          color: '#FFFFFF',
          margin: '0',
        }}>
          Top 10 เดือนนี้
        </h2>
        <div style={{
          background: 'linear-gradient(135deg, #FFBF00, #FF8C00)',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '700',
          color: '#000',
          letterSpacing: '0.5px',
        }}>
          HOT
        </div>
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
            {/* Thumbnail — locked 16:9 */}
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

      {/* Ad Strip below the grid — aligned with page gutter */}
      <div className="top10-ads-strip">
        {/* Viu Premium Upgrade */}
        <div className="top10-ad-card top10-premium-card">
          <div className="top10-premium-glow" />
          <div style={{
            fontSize: '13px',
            color: '#FFBF00',
            fontWeight: '700',
            letterSpacing: '1px',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}>
            Viu Premium
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#FFFFFF',
            margin: '0 0 6px 0',
            lineHeight: '1.3',
          }}>
            ดูไม่จำกัด ไม่มีโฆษณา
          </h3>
          <p style={{
            fontSize: '12px',
            color: '#B3B3B3',
            margin: '0 0 14px 0',
            lineHeight: '1.5',
          }}>
            เข้าถึงซีรีส์และภาพยนตร์ทั้งหมด ดาวน์โหลดออฟไลน์ คุณภาพ Full HD
          </p>
          <button
            type="button"
            className="top10-premium-btn"
          >
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

      <style jsx>{`
        .top10-card {
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        /* Thumbnail container — strict 16:9 */
        .top10-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
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

        /* Rank number — sized relative to card, not viewport */
        .top10-rank {
          position: absolute;
          bottom: -4px;
          right: 6px;
          font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
          font-size: 3.5em;
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
          width: 52px;
          height: 52px;
          background-color: rgba(255, 191, 0, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Title area — fixed height so all cards are equal */
        .top10-info {
          padding: 8px 4px 0;
          height: 48px;
          overflow: hidden;
        }

        .top10-title {
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 2px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
        }

        .top10-genre {
          font-size: 11px;
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* === Ad Strip — horizontal row below grid === */
        .top10-ads-strip {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          padding: 24px var(--gutter) 0;
        }

        .top10-ad-card {
          border-radius: 12px;
          overflow: hidden;
        }

        .top10-premium-card {
          background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0a1628 100%);
          border: 1px solid rgba(255, 191, 0, 0.2);
          padding: 20px 18px;
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

        .top10-premium-btn {
          width: 100%;
          padding: 10px 20px;
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
          height: 100%;
          object-fit: cover;
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

        /* Mobile: stack ads vertically */
        @media (max-width: 639px) {
          .top10-ads-strip {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .top10-ad-poster {
            max-height: 200px;
          }
        }
      `}</style>
    </div>
  );
}
