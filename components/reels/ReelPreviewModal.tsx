'use client';

import { useEffect, useMemo } from 'react';
import { ReelItem } from '@/data/reelsData';
import { getViuUrl } from '@/lib/viuUrl';
import { isTouchDevice } from '@/lib/deviceDetect';

interface ReelPreviewModalProps {
  reel: ReelItem | null;
  onClose: () => void;
}

export default function ReelPreviewModal({ reel, onClose }: ReelPreviewModalProps) {
  const shouldMute = typeof window !== 'undefined' ? isTouchDevice() : true;

  const getEmbedUrl = useMemo(() => {
    if (!reel) return '';
    const params = new URLSearchParams({
      autoplay: '1',
      mute: shouldMute ? '1' : '0',
      playsinline: '1',
      controls: '1',
      rel: '0',
      modestbranding: '1',
      showinfo: '0',
      enablejsapi: '1',
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    });
    return `https://www.youtube.com/embed/${reel.youtubeId}?${params.toString()}`;
  }, [reel, shouldMute]);

  useEffect(() => {
    if (reel) {
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [reel]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (reel) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [reel, onClose]);

  if (!reel) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: '0',
          background: 'rgba(0, 0, 0, 0.92)',
          zIndex: '200',
          animation: 'fadeIn 0.2s ease-in',
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        inset: '0',
        zIndex: '200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflowY: 'auto',
      }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            background: '#1A1A1A',
            borderRadius: '16px',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden',
            animation: 'scaleIn 0.3s ease-out',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 10,
              width: '40px',
              height: '40px',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              color: '#FFFFFF',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)'}
          >
            <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video header */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: '#000',
            overflow: 'hidden',
          }}>
            <iframe
              src={getEmbedUrl}
              title={reel.titleTh || reel.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />

            {/* Gradient overlay at bottom of video */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(to top, #1A1A1A 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Content section */}
          <div style={{
            padding: '0 28px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '-20px',
            position: 'relative',
            zIndex: 5,
          }}>
            {/* Title + CTA row */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h2 style={{
                  fontSize: '26px',
                  fontWeight: '800',
                  color: '#FFFFFF',
                  margin: '0 0 4px 0',
                  lineHeight: '1.2',
                }}>
                  {reel.titleTh || reel.title}
                </h2>
                {reel.titleTh && (
                  <p style={{
                    fontSize: '15px',
                    color: '#B3B3B3',
                    margin: 0,
                    fontWeight: '500',
                  }}>
                    {reel.title}
                  </p>
                )}
              </div>

              <a
                href={getViuUrl(reel)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  background: '#FFBF00',
                  color: '#0A0A0A',
                  fontSize: '15px',
                  fontWeight: '700',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFD700';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFBF00';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                เริ่มดูเลย
              </a>
            </div>

            {/* Meta info row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
            }}>
              <span style={{ color: '#10B981', fontWeight: '600' }}>{reel.year}</span>
              <span style={{ color: '#666' }}>•</span>
              <span style={{ color: '#B3B3B3' }}>{reel.episodes} ตอน</span>
              <span style={{ color: '#666' }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg style={{ width: '14px', height: '14px', color: '#FFBF00' }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span style={{ fontWeight: '600', color: '#FFFFFF' }}>{reel.rating}</span>
              </div>
              <span style={{ color: '#666' }}>•</span>
              <span style={{
                padding: '3px 10px',
                background: 'rgba(255, 191, 0, 0.15)',
                color: '#FFBF00',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '4px',
              }}>
                {reel.type}
              </span>
              {reel.status && (
                <>
                  <span style={{ color: '#666' }}>•</span>
                  <span style={{
                    padding: '3px 10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#B3B3B3',
                    fontSize: '12px',
                    fontWeight: '600',
                    borderRadius: '4px',
                  }}>
                    {reel.status}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#B3B3B3',
              margin: 0,
            }}>
              {reel.description}
            </p>

            {/* Genres */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: 0,
              }}>
                หมวดหมู่
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {reel.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '6px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 191, 0, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 191, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                เพิ่มในรายการ
              </button>

              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                แชร์
              </button>

              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                ถูกใจ
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
