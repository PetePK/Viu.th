'use client';

import { useState, useEffect } from 'react';
import { Content } from '@/types';
import { getViuUrl } from '@/lib/viuUrl';

interface HeroSectionProps {
  featuredContent: Content[];
  onMoreInfo?: (content: Content) => void;
}

export default function HeroSection({ featuredContent, onMoreInfo }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentContent = featuredContent[currentIndex];

  useEffect(() => {
    // Auto-rotate hero every 10 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [featuredContent.length]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '70vh',
      minHeight: '400px',
      maxHeight: '700px',
      backgroundColor: '#0A0A0A'
    }}>
      {/* Background: YouTube Video or Thumbnail Image */}
      <div style={{
        position: 'absolute',
        inset: '0',
        backgroundColor: '#2A2A2A'
      }}>
        {currentContent.thumbnail ? (
          <img
            src={currentContent.thumbnail}
            alt={currentContent.title}
            style={{
              position: 'absolute',
              inset: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : null}

        {/* Gradient Overlays - Always show for text readability */}
        <div style={{
          position: 'absolute',
          inset: '0',
          background: 'linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.7) 30%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          inset: '0',
          background: 'linear-gradient(to right, rgba(10, 10, 10, 0.8) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Content Panel (Bottom Left) */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        padding: '32px var(--gutter)',
        zIndex: '10'
      }}>
        <div style={{ maxWidth: '550px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              padding: '6px 12px',
              backgroundColor: '#FFBF00',
              color: '#0A0A0A',
              fontSize: '12px',
              fontWeight: '700',
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {currentContent.type}
            </span>
            {currentContent.status && (
              <span style={{
                padding: '6px 12px',
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: '700',
                borderRadius: '4px'
              }}>
                {currentContent.status}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: '900',
            lineHeight: '1.1',
            color: '#FFFFFF',
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            margin: '0'
          }}>
            {currentContent.title}
          </h1>

          {/* Meta Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            color: '#B3B3B3'
          }}>
            {currentContent.year && (
              <span style={{ fontWeight: '600' }}>{currentContent.year}</span>
            )}
            {currentContent.episodes && (
              <>
                <span>•</span>
                <span>{currentContent.episodes} ตอน</span>
              </>
            )}
            {currentContent.rating && (
              <>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg style={{ width: '16px', height: '16px', color: '#FFBF00' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span style={{ fontWeight: '600' }}>{currentContent.rating}</span>
                </div>
              </>
            )}
          </div>

          {/* Description */}
          {currentContent.description && (
            <p style={{
              fontSize: '14px',
              lineHeight: '1.5',
              color: '#B3B3B3',
              maxWidth: '500px',
              margin: '0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical'
            }}>
              {currentContent.description}
            </p>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '4px' }}>
            <a
              href={getViuUrl(currentContent)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 24px',
                backgroundColor: '#FFBF00',
                color: '#0A0A0A',
                fontSize: '14px',
                fontWeight: '700',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              เล่นเลย
            </a>

            <button
              type="button"
              onClick={() => onMoreInfo?.(currentContent)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 24px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '700',
                borderRadius: '4px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ข้อมูลเพิ่มเติม
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '24px',
        display: 'flex',
        gap: '6px',
        zIndex: '10'
      }}>
        {featuredContent.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            style={{
              height: '3px',
              width: index === currentIndex ? '40px' : '24px',
              backgroundColor: index === currentIndex ? '#FFBF00' : 'rgba(255, 255, 255, 0.3)',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: '0'
            }}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
