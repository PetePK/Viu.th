'use client';

import { useState, useMemo } from 'react';
import { Content } from '@/types';
import ContentCard from '@/components/content/ContentCard';
import ContentDetailModal from '@/components/modal/ContentDetailModal';

interface CategoryPageProps {
  title: string;
  description: string;
  allContent: Content[];
  filterFunction: (content: Content) => boolean;
}

type SortOption = 'popularity' | 'newest' | 'rating' | 'title';

export default function CategoryPage({ title, description, allContent, filterFunction }: CategoryPageProps) {
  const [selectedModal, setSelectedModal] = useState<Content | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [itemsToShow, setItemsToShow] = useState(24);

  // Get filtered content based on category
  const categoryContent = useMemo(() => {
    return allContent.filter(filterFunction);
  }, [allContent, filterFunction]);

  // Extract available years, genres from content
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    categoryContent.forEach(content => {
      if (content.year) years.add(content.year);
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [categoryContent]);

  const availableGenres = useMemo(() => {
    const genres = new Set<string>();
    categoryContent.forEach(content => {
      content.genres?.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  }, [categoryContent]);

  // Apply filters and sorting
  const filteredAndSortedContent = useMemo(() => {
    let filtered = [...categoryContent];

    // Apply year filter
    if (filterYear !== 'all') {
      filtered = filtered.filter(content => content.year === parseInt(filterYear));
    }

    // Apply genre filter
    if (filterGenre !== 'all') {
      filtered = filtered.filter(content => content.genres?.includes(filterGenre));
    }

    // Apply rating filter
    if (filterRating !== 'all') {
      const minRating = parseFloat(filterRating);
      filtered = filtered.filter(content => content.rating && content.rating >= minRating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        // Sort by rating (highest first), then by year
        filtered.sort((a, b) => {
          if (b.rating && a.rating) {
            if (b.rating !== a.rating) return b.rating - a.rating;
          }
          return (b.year || 0) - (a.year || 0);
        });
        break;
      case 'newest':
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title, 'th'));
        break;
    }

    return filtered;
  }, [categoryContent, filterYear, filterGenre, filterRating, sortBy]);

  const displayedContent = filteredAndSortedContent.slice(0, itemsToShow);
  const hasMore = itemsToShow < filteredAndSortedContent.length;

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 24);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#FFFFFF', paddingTop: '68px' }}>
      {/* Page Header */}
      <div style={{
        padding: '60px var(--gutter) 40px',
        background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.8) 0%, rgba(10, 10, 10, 0) 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ maxWidth: '1920px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: '700',
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #FFBF00, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {title}
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#B3B3B3',
            margin: '0',
            maxWidth: '800px'
          }}>
            {description}
          </p>
          <div style={{
            marginTop: '24px',
            padding: '12px 20px',
            background: 'rgba(255, 191, 0, 0.1)',
            borderRadius: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255, 191, 0, 0.2)'
          }}>
            <svg style={{ width: '20px', height: '20px', color: '#FFBF00' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span style={{ fontSize: '14px', color: '#FFBF00', fontWeight: '500' }}>
              พบทั้งหมด {filteredAndSortedContent.length} รายการ
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div style={{ padding: '32px var(--gutter)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ maxWidth: '1920px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center'
          }}>
            {/* Sort By */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '14px', color: '#B3B3B3', fontWeight: '500' }}>เรียงตาม:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                style={{
                  padding: '10px 16px',
                  background: '#1A1A1A',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: '160px'
                }}
              >
                <option value="popularity">ความนิยม</option>
                <option value="newest">ใหม่ล่าสุด</option>
                <option value="rating">คะแนนสูงสุด</option>
                <option value="title">ชื่อ (ก-ฮ)</option>
              </select>
            </div>

            {/* Year Filter */}
            {availableYears.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '14px', color: '#B3B3B3', fontWeight: '500' }}>ปี:</label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    background: '#1A1A1A',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none',
                    minWidth: '120px'
                  }}
                >
                  <option value="all">ทั้งหมด</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Genre Filter */}
            {availableGenres.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '14px', color: '#B3B3B3', fontWeight: '500' }}>ประเภท:</label>
                <select
                  value={filterGenre}
                  onChange={(e) => setFilterGenre(e.target.value)}
                  style={{
                    padding: '10px 16px',
                    background: '#1A1A1A',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    cursor: 'pointer',
                    outline: 'none',
                    minWidth: '160px'
                  }}
                >
                  <option value="all">ทั้งหมด</option>
                  {availableGenres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Rating Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '14px', color: '#B3B3B3', fontWeight: '500' }}>คะแนน:</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                style={{
                  padding: '10px 16px',
                  background: '#1A1A1A',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: '140px'
                }}
              >
                <option value="all">ทั้งหมด</option>
                <option value="4.5">4.5+ ดาว</option>
                <option value="4.0">4.0+ ดาว</option>
                <option value="3.5">3.5+ ดาว</option>
                <option value="3.0">3.0+ ดาว</option>
              </select>
            </div>

            {/* Reset Filters */}
            {(filterYear !== 'all' || filterGenre !== 'all' || filterRating !== 'all') && (
              <button
                onClick={() => {
                  setFilterYear('all');
                  setFilterGenre('all');
                  setFilterRating('all');
                }}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255, 191, 0, 0.1)',
                  border: '1px solid rgba(255, 191, 0, 0.3)',
                  borderRadius: '8px',
                  color: '#FFBF00',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 191, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 191, 0, 0.1)';
                }}
              >
                รีเซ็ตฟิลเตอร์
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div style={{ padding: 'var(--gutter)' }}>
        <div style={{ maxWidth: '1920px', margin: '0 auto' }}>
          {displayedContent.length > 0 ? (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '24px',
                marginBottom: '48px'
              }}>
                {displayedContent.map((content, index) => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    onCardClick={setSelectedModal}
                    index={index}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
                  <button
                    onClick={handleLoadMore}
                    style={{
                      padding: '16px 40px',
                      background: 'linear-gradient(135deg, #FFBF00, #FFD700)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#0A0A0A',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: '0 4px 12px rgba(255, 191, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 191, 0, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 191, 0, 0.3)';
                    }}
                  >
                    โหลดเพิ่มเติม ({filteredAndSortedContent.length - itemsToShow} รายการ)
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 24px',
              textAlign: 'center'
            }}>
              <svg
                style={{ width: '120px', height: '120px', color: '#2A2A2A', marginBottom: '24px' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#FFFFFF',
                marginBottom: '12px'
              }}>
                ไม่พบเนื้อหาที่ตรงกับการค้นหา
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#B3B3B3',
                marginBottom: '24px',
                maxWidth: '500px'
              }}>
                ลองปรับเปลี่ยนฟิลเตอร์หรือเลือกหมวดหมู่อื่น เพื่อค้นหาเนื้อหาที่คุณสนใจ
              </p>
              <button
                onClick={() => {
                  setFilterYear('all');
                  setFilterGenre('all');
                  setFilterRating('all');
                }}
                style={{
                  padding: '12px 32px',
                  background: 'rgba(255, 191, 0, 0.1)',
                  border: '1px solid rgba(255, 191, 0, 0.3)',
                  borderRadius: '8px',
                  color: '#FFBF00',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 191, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 191, 0, 0.1)';
                }}
              >
                รีเซ็ตฟิลเตอร์ทั้งหมด
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedModal && (
        <ContentDetailModal
          content={selectedModal}
          onClose={() => setSelectedModal(null)}
        />
      )}
    </div>
  );
}
