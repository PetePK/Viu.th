'use client';

import { useRef, useState, useEffect } from 'react';
import ContentCard from './ContentCard';
import { Category, Content } from '@/types';

interface ContentRowProps {
  category: Category;
  onContentClick: (content: Content) => void;
}

export default function ContentRow({ category, onContentClick }: ContentRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Prevent horizontal scroll from capturing vertical scroll
  const handleWheel = (e: React.WheelEvent) => {
    // If it's a vertical scroll (normal mouse wheel), don't let the container capture it
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      // This is vertical scroll, let it pass through to page scroll
      return;
    }
    // If it's horizontal scroll (shift+wheel), let the container handle it
  };

  return (
    <div style={{ position: 'relative', marginBottom: '32px' }}>
      {/* Title Section */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '16px',
        padding: '0 var(--gutter)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{
              fontSize: 'clamp(20px, 3vw, 24px)',
              fontWeight: '700',
              color: '#FFFFFF',
              margin: '0'
            }}>
              {category.title}
            </h2>
          </div>

          {/* Personalized Reason */}
          {category.reason && (
            <p style={{
              fontSize: '14px',
              color: '#B3B3B3',
              margin: '0'
            }}>{category.reason}</p>
          )}
        </div>

        {/* View All Link */}
        <button
          type="button"
          style={{
            fontSize: '14px',
            color: '#B3B3B3',
            fontWeight: '500',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#FFBF00'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#B3B3B3'}
          aria-label="View all"
        >
          ดูทั้งหมด →
        </button>
      </div>

      {/* Scroll Container with Navigation */}
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              bottom: '0',
              zIndex: '20',
              width: '64px',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: '24px',
              background: 'linear-gradient(to right, rgba(10, 10, 10, 1) 0%, transparent 100%)',
              opacity: isHovered ? '1' : '0',
              transition: 'opacity 0.3s',
              border: 'none',
              cursor: 'pointer'
            }}
            className="hidden lg:flex"
            aria-label="Scroll left"
          >
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(26, 26, 26, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(38, 38, 38, 0.95)';
              e.currentTarget.style.borderColor = 'rgba(255, 191, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
            >
              <svg style={{ width: '24px', height: '24px', color: '#FFFFFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        {/* Content Carousel */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            padding: '0 var(--gutter) 0 0',
            marginLeft: 'var(--gutter)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="hide-scrollbar"
        >
          {category.content.map((item, index) => (
            <ContentCard
              key={item.id}
              content={item}
              onCardClick={onContentClick}
              rank={category.type === 'top10' ? index + 1 : undefined}
              index={index}
            />
          ))}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '0',
              top: '0',
              bottom: '0',
              zIndex: '20',
              width: '64px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '24px',
              background: 'linear-gradient(to left, rgba(10, 10, 10, 1) 0%, transparent 100%)',
              opacity: isHovered ? '1' : '0',
              transition: 'opacity 0.3s',
              border: 'none',
              cursor: 'pointer'
            }}
            className="hidden lg:flex"
            aria-label="Scroll right"
          >
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(26, 26, 26, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(38, 38, 38, 0.95)';
              e.currentTarget.style.borderColor = 'rgba(255, 191, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
            >
              <svg style={{ width: '24px', height: '24px', color: '#FFFFFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
