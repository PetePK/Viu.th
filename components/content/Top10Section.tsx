'use client';

import { useState } from 'react';
import { Content } from '@/types';

interface Top10SectionProps {
  content: Content[];
  onContentClick: (content: Content) => void;
}

export default function Top10Section({ content, onContentClick }: Top10SectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      {/* Main Layout: Cards Grid + Right Panel */}
      <div style={{
        display: 'flex',
        gap: '24px',
        padding: '0 var(--gutter)',
      }}>
        {/* Left: Top 10 Card Grid - 3 columns */}
        <div className="top10-grid" style={{ flex: '1' }}>
          {content.slice(0, 9).map((item, index) => (
            <div
              key={item.id}
              onClick={() => onContentClick(item)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                zIndex: hoveredIndex === index ? 30 : 10,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Card with 16:9 thumbnail */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#2A2A2A',
                boxShadow: hoveredIndex === index
                  ? '0 8px 25px rgba(0, 0, 0, 0.6)'
                  : '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}>
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <svg style={{ width: '40px', height: '40px', opacity: '0.2' }} fill="none" stroke="#FFFFFF" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Rank Number - bottom right */}
                <div style={{
                  position: 'absolute',
                  bottom: '-5px',
                  right: '8px',
                  fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                  fontSize: 'clamp(50px, 8vw, 90px)',
                  lineHeight: '0.8',
                  color: index < 3 ? '#FFCC00' : 'rgba(255,255,255,0.7)',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                  fontWeight: '900',
                  pointerEvents: 'none',
                  zIndex: 5,
                }}>
                  {index + 1}
                </div>

                {/* Bottom gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Hover overlay with play button */}
                {hoveredIndex === index && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.3)',
                  }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      backgroundColor: 'rgba(255, 191, 0, 0.9)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg style={{ width: '24px', height: '24px', color: '#000', marginLeft: '3px' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & tags below */}
              <div style={{ marginTop: '10px', padding: '0 4px' }}>
                <h3 style={{
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '700',
                  margin: '0 0 4px 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {item.title}
                </h3>
                <div style={{
                  fontSize: '12px',
                  color: '#888',
                }}>
                  {item.genres?.slice(0, 2).join(' • ') || item.type}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel: Upgrade + Ad Posters */}
        <div style={{
          width: '300px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
        className="hidden lg:flex"
        >
          {/* Viu Premium Upgrade */}
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0a1628 100%)',
            border: '1px solid rgba(255, 191, 0, 0.2)',
            padding: '28px 24px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(255, 191, 0, 0.15) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />
            <div style={{
              fontSize: '13px',
              color: '#FFBF00',
              fontWeight: '700',
              letterSpacing: '1px',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}>
              Viu Premium
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#FFFFFF',
              margin: '0 0 8px 0',
              lineHeight: '1.3',
            }}>
              ดูไม่จำกัด ไม่มีโฆษณา
            </h3>
            <p style={{
              fontSize: '13px',
              color: '#B3B3B3',
              margin: '0 0 20px 0',
              lineHeight: '1.5',
            }}>
              เข้าถึงซีรีส์และภาพยนตร์ทั้งหมด ดาวน์โหลดออฟไลน์ คุณภาพ Full HD
            </p>
            <button
              type="button"
              style={{
                width: '100%',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #FFBF00, #FF8C00)',
                border: 'none',
                borderRadius: '8px',
                color: '#000',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 191, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              สมัครเลย ฿119/เดือน
            </button>
          </div>

          {/* iPhone Ad Poster */}
          <div style={{
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <img
              src="/images/ads/iphone.jpg"
              alt="iPhone 15 Pro"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.5)',
              backgroundColor: 'rgba(0,0,0,0.4)',
              padding: '2px 6px',
              borderRadius: '3px',
            }}>
              AD
            </div>
          </div>

          {/* Dr.Pong Ad Poster */}
          <div style={{
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <img
              src="/images/ads/dr-pong.webp"
              alt="Dr.PONG"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
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
    </div>
  );
}
