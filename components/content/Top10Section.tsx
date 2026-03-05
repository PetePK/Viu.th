'use client';

import ContentCard from './ContentCard';
import { Content } from '@/types';

interface Top10SectionProps {
  content: Content[];
  onContentClick: (content: Content) => void;
}

export default function Top10Section({ content, onContentClick }: Top10SectionProps) {
  return (
    <section className="top10-section">
      <div className="top10-layout">
        {/* Left: Title + Grid */}
        <div className="top10-main">
          <div className="top10-header">
            <h2 className="top10-heading">Top 10 เดือนนี้</h2>
            <span className="top10-hot-badge">HOT</span>
          </div>

          <div className="top10-grid">
            {content.slice(0, 10).map((item, index) => (
              <ContentCard
                key={item.id}
                content={item}
                onCardClick={onContentClick}
                rank={index + 1}
                fullWidth
              />
            ))}
          </div>
        </div>

        {/* Right: Ads */}
        <div className="top10-ads">
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

          <div className="top10-ad-card top10-ad-poster">
            <img src="/images/ads/iphone.jpg" alt="iPhone 15 Pro" />
            <div className="top10-ad-badge">AD</div>
          </div>

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

        @media (min-width: 1024px) {
          .top10-layout {
            flex-direction: row;
            gap: 24px;
          }
          .top10-main {
            flex: 1;
            min-width: 0;
          }
          .top10-ads {
            width: 20%;
            flex-shrink: 0;
          }
        }

        /* === Grid — fixed card size, blank space is fine === */
        .top10-grid {
          display: grid;
          grid-template-columns: repeat(2, clamp(140px, 19vw, 264px));
          gap: 12px;
        }

        @media (min-width: 576px) {
          .top10-grid {
            grid-template-columns: repeat(3, clamp(140px, 19vw, 264px));
            gap: 16px;
          }
        }

        @media (min-width: 768px) {
          .top10-grid {
            grid-template-columns: repeat(4, clamp(140px, 17vw, 264px));
          }
        }

        @media (min-width: 1024px) {
          .top10-grid {
            grid-template-columns: repeat(4, clamp(140px, 14vw, 264px));
            gap: 18px;
          }
        }

        @media (min-width: 1280px) {
          .top10-grid {
            grid-template-columns: repeat(5, clamp(140px, 12vw, 264px));
            gap: 20px;
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

        /* === Ads column === */
        .top10-ad-card {
          border-radius: 12px;
          overflow: hidden;
        }

        .top10-premium {
          background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0a1628 100%);
          border: 1px solid rgba(255, 191, 0, 0.2);
          padding: 16px 14px;
          position: relative;
          overflow: hidden;
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
          font-size: 10px;
          color: #FFBF00;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .top10-premium-title {
          font-size: 13px;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .top10-premium-desc {
          font-size: 9px;
          color: #B3B3B3;
          margin: 0 0 8px 0;
          line-height: 1.4;
          display: none;
        }

        .top10-premium-btn {
          width: 100%;
          padding: 8px 10px;
          background: linear-gradient(135deg, #FFBF00, #FF8C00);
          border: none;
          border-radius: 6px;
          color: #000;
          font-weight: 700;
          font-size: 11px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
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
          object-fit: contain;
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

        @media (max-width: 1023px) {
          .top10-ads {
            flex-direction: row;
            overflow-x: auto;
            scrollbar-width: none;
            gap: 16px;
          }
          .top10-ads::-webkit-scrollbar { display: none; }
          .top10-ad-card {
            flex: 0 0 clamp(260px, 60%, 320px);
          }
        }
      `}</style>
    </section>
  );
}
