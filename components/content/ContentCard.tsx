'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Content } from '@/types';

interface ContentCardProps {
  content: Content;
  onCardClick: (content: Content) => void;
  rank?: number;
  index?: number;
}

export default function ContentCard({ content, onCardClick, rank }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Show preview after 0.5 second hover
    hoverTimeoutRef.current = setTimeout(() => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX
        });
        setShowPreview(true);
      }
    }, 500);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPreview(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        flexShrink: '0',
        width: '220px',
        cursor: 'pointer'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onCardClick(content)}
    >
      {/* Main Card */}
      <div
        style={{
          position: 'relative',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          zIndex: isHovered ? '30' : '10',
          transition: 'all 0.3s'
        }}
      >
        {/* Card Container with 16:9 aspect ratio */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#2A2A2A',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Top 10 Rank Badge */}
          {rank !== undefined && (
            <div style={{
              position: 'absolute',
              bottom: '-5px',
              right: '5px',
              zIndex: '20',
              fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
              fontSize: '100px',
              lineHeight: '0.8',
              color: '#FFCC00',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              pointerEvents: 'none'
            }}>
              {rank}
            </div>
          )}

          {/* Thumbnail Image */}
          {content.thumbnail ? (
            <img
              src={content.thumbnail}
              alt={content.title}
              style={{
                position: 'absolute',
                inset: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{
              position: 'absolute',
              inset: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg
                style={{ width: '60px', height: '60px', opacity: '0.2' }}
                fill="none"
                stroke="#FFFFFF"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Hover Overlay */}
          {isHovered && (
            <div style={{
              position: 'absolute',
              inset: '0',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
              animation: 'fadeIn 0.2s ease-in'
            }}>
              {/* Play Icon */}
              <div style={{
                position: 'absolute',
                inset: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: 'rgba(255, 191, 0, 0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'scaleIn 0.2s ease-out'
                }}>
                  <svg
                    style={{ width: '40px', height: '40px', color: '#0A0A0A' }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hover Preview Panel (Desktop Only) */}
        {showPreview && typeof document !== 'undefined' && createPortal(
          <div style={{
            position: 'absolute',
            top: `${coords.top - 20}px`,
            left: `${coords.left - 20}px`,
            width: '400px',
            backgroundColor: '#1A1A1A',
            borderRadius: '12px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)',
            overflow: 'hidden',
            animation: 'scaleIn 0.2s ease-out',
            zIndex: 99999,
            transform: 'scale(1.05)'
          }} 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onCardClick(content)}
          className="hidden lg:block">
            {/* Video Preview */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: '#2A2A2A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Thumbnail in hover preview */}
              {content.thumbnail ? (
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  style={{
                    position: 'absolute',
                    inset: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <svg
                  style={{ width: '80px', height: '80px', opacity: '0.2' }}
                  fill="none"
                  stroke="#FFFFFF"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}

              {/* Video Overlay with Buttons */}
              <div style={{
                position: 'absolute',
                inset: '0',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <button
                    type="button"
                    aria-label="Play"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onCardClick(content);
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <svg style={{ width: '20px', height: '20px', color: '#000000', marginLeft: '2px' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    aria-label="Add to list"
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '2px solid #FFFFFF',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'transparent',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Info */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Title */}
              <h3 style={{
                fontWeight: '700',
                fontSize: '14px',
                color: '#FFFFFF',
                margin: '0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical'
              }}>{content.title}</h3>

              {/* Meta Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
                color: '#B3B3B3'
              }}>
                {content.year && <span style={{ color: '#10B981', fontWeight: '600' }}>{content.year}</span>}
                {content.episodes && (
                  <>
                    <span>•</span>
                    <span>{content.episodes} ตอน</span>
                  </>
                )}
                {content.rating && (
                  <>
                    <span>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg style={{ width: '12px', height: '12px', color: '#FFBF00' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{content.rating}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Description */}
              {content.description && (
                <p style={{
                  fontSize: '12px',
                  color: '#B3B3B3',
                  margin: '0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical'
                }}>
                  {content.description}
                </p>
              )}

              {/* Genres */}
              {content.genres && content.genres.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {content.genres.slice(0, 3).map((genre, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        fontSize: '11px',
                        color: '#FFFFFF'
                      }}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
      </div>

      {/* Title & Tags */}
      <div style={{ marginTop: '12px', padding: '0 4px' }}>
        <h3 style={{
          color: '#fff',
          fontSize: '14px',
          fontWeight: 'bold',
          margin: '0 0 4px 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {content.title}
        </h3>
        <div style={{
          color: '#aaa',
          fontSize: '12px',
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap'
        }}>
          {content.genres && content.genres.length > 0
            ? content.genres.slice(0, 2).join(' • ')
            : content.type}
        </div>
      </div>
    </div>
  );
}
