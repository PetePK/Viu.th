'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/navigation/Navigation';
import ContentCard from '@/components/content/ContentCard';
import ContentDetailModal from '@/components/modal/ContentDetailModal';
import { allContent } from '@/data/mockData';
import { Content } from '@/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    contentType: 'ทั้งหมด',
    genre: 'ทั้งหมด',
    year: 'ทั้งหมด'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update search query when URL changes
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  // Extract unique values for filters
  const contentTypes = useMemo(() => {
    const types = new Set(allContent.map(c => c.type));
    return ['ทั้งหมด', ...Array.from(types).sort()];
  }, []);

  const genres = useMemo(() => {
    const genreSet = new Set<string>();
    allContent.forEach(c => {
      c.genres?.forEach(g => genreSet.add(g));
    });
    return ['ทั้งหมด', ...Array.from(genreSet).sort()];
  }, []);

  const years = useMemo(() => {
    const yearSet = new Set(allContent.map(c => c.year).filter(Boolean));
    return ['ทั้งหมด', ...Array.from(yearSet).sort((a, b) => (b as number) - (a as number)).map(String)];
  }, []);

  // Search and filter logic
  const searchResults = useMemo(() => {
    let results = allContent;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(content => {
        return (
          content.title.toLowerCase().includes(query) ||
          content.description?.toLowerCase().includes(query) ||
          content.type.toLowerCase().includes(query) ||
          content.genres?.some(g => g.toLowerCase().includes(query)) ||
          content.year?.toString().includes(query)
        );
      });
    }

    // Apply content type filter
    if (selectedFilters.contentType !== 'ทั้งหมด') {
      results = results.filter(c => c.type === selectedFilters.contentType);
    }

    // Apply genre filter
    if (selectedFilters.genre !== 'ทั้งหมด') {
      results = results.filter(c => c.genres?.includes(selectedFilters.genre));
    }

    // Apply year filter
    if (selectedFilters.year !== 'ทั้งหมด') {
      results = results.filter(c => c.year === Number(selectedFilters.year));
    }

    return results;
  }, [searchQuery, selectedFilters]);

  const handleCardClick = (content: Content) => {
    setSelectedContent(content);
  };

  const clearFilters = () => {
    setSelectedFilters({
      contentType: 'ทั้งหมด',
      genre: 'ทั้งหมด',
      year: 'ทั้งหมด'
    });
  };

  const hasActiveFilters = selectedFilters.contentType !== 'ทั้งหมด' ||
                          selectedFilters.genre !== 'ทั้งหมด' ||
                          selectedFilters.year !== 'ทั้งหมด';

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff' }}>
      <Navigation />

      {/* Main Content */}
      <main style={{ paddingTop: '88px', paddingBottom: '80px' }}>
        <div className="w-full max-w-[1920px] mx-auto" style={{ padding: '0 var(--gutter)' }}>

          {/* Search Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
              ค้นหา
            </h1>

            {/* Search Input */}
            <div style={{ position: 'relative', maxWidth: '800px' }}>
              <input
                type="text"
                placeholder="ค้นหาซีรีส์, ภาพยนตร์, รายการ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 48px 16px 20px',
                  background: '#1A1A1A',
                  border: '2px solid rgba(255, 191, 0, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#FFBF00'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 191, 0, 0.3)'}
              />
              <svg
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '24px',
                  height: '24px',
                  color: '#FFBF00'
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Popular Searches */}
            {!searchQuery && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '14px', color: '#B3B3B3', marginBottom: '8px' }}>
                  คำค้นหายอดนิยม:
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['โรแมนติก', 'ซีรีส์เกาหลี', 'LGBTQ+', 'Running Man', 'วาไรตี้'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      style={{
                        padding: '8px 16px',
                        background: '#1A1A1A',
                        border: '1px solid rgba(255, 191, 0, 0.3)',
                        borderRadius: '20px',
                        color: '#B3B3B3',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#FFBF00';
                        e.currentTarget.style.color = '#FFBF00';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 191, 0, 0.3)';
                        e.currentTarget.style.color = '#B3B3B3';
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filters and Results */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Sidebar Filters - Desktop */}
            <aside
              className="hidden lg:block"
              style={{
                width: '280px',
                flexShrink: 0
              }}
            >
              <div
                style={{
                  background: '#1A1A1A',
                  borderRadius: '12px',
                  padding: '20px',
                  position: 'sticky',
                  top: '100px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                    ตัวกรอง
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      style={{
                        fontSize: '12px',
                        color: '#FFBF00',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      ล้างทั้งหมด
                    </button>
                  )}
                </div>

                {/* Content Type Filter */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#B3B3B3' }}>
                    ประเภทเนื้อหา
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {contentTypes.map((type) => (
                      <label
                        key={type}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: selectedFilters.contentType === type ? '#FFBF00' : '#fff'
                        }}
                      >
                        <input
                          type="radio"
                          name="contentType"
                          checked={selectedFilters.contentType === type}
                          onChange={() => setSelectedFilters(prev => ({ ...prev, contentType: type }))}
                          style={{ accentColor: '#FFBF00' }}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Genre Filter */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#B3B3B3' }}>
                    ประเภท
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                    {genres.map((genre) => (
                      <label
                        key={genre}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: selectedFilters.genre === genre ? '#FFBF00' : '#fff'
                        }}
                      >
                        <input
                          type="radio"
                          name="genre"
                          checked={selectedFilters.genre === genre}
                          onChange={() => setSelectedFilters(prev => ({ ...prev, genre }))}
                          style={{ accentColor: '#FFBF00' }}
                        />
                        {genre}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Year Filter */}
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#B3B3B3' }}>
                    ปีที่ออกอากาศ
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {years.map((year) => (
                      <label
                        key={year}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: selectedFilters.year === year ? '#FFBF00' : '#fff'
                        }}
                      >
                        <input
                          type="radio"
                          name="year"
                          checked={selectedFilters.year === year}
                          onChange={() => setSelectedFilters(prev => ({ ...prev, year }))}
                          style={{ accentColor: '#FFBF00' }}
                        />
                        {year}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden" style={{ width: '100%', marginBottom: '16px' }}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#1A1A1A',
                  border: '1px solid rgba(255, 191, 0, 0.3)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <span>ตัวกรอง</span>
                <svg
                  style={{ width: '20px', height: '20px', transform: isFilterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mobile Filters Dropdown */}
              {isFilterOpen && (
                <div
                  style={{
                    marginTop: '8px',
                    background: '#1A1A1A',
                    borderRadius: '12px',
                    padding: '20px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                      ตัวกรอง
                    </h2>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        style={{
                          fontSize: '12px',
                          color: '#FFBF00',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        ล้างทั้งหมด
                      </button>
                    )}
                  </div>

                  {/* Mobile filters - same structure as desktop */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#B3B3B3' }}>
                      ประเภทเนื้อหา
                    </h3>
                    <select
                      value={selectedFilters.contentType}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, contentType: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: '#2A2A2A',
                        border: '1px solid rgba(255, 191, 0, 0.3)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    >
                      {contentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#B3B3B3' }}>
                      ประเภท
                    </h3>
                    <select
                      value={selectedFilters.genre}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, genre: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: '#2A2A2A',
                        border: '1px solid rgba(255, 191, 0, 0.3)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    >
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#B3B3B3' }}>
                      ปีที่ออกอากาศ
                    </h3>
                    <select
                      value={selectedFilters.year}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, year: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: '#2A2A2A',
                        border: '1px solid rgba(255, 191, 0, 0.3)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Results Count */}
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '16px', color: '#B3B3B3' }}>
                  {searchQuery && (
                    <>ผลการค้นหา &quot;<span style={{ color: '#FFBF00' }}>{searchQuery}</span>&quot; - </>
                  )}
                  <span style={{ color: '#fff', fontWeight: '600' }}>
                    {searchResults.length} รายการ
                  </span>
                </p>
              </div>

              {/* Results Grid */}
              {searchResults.length > 0 ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px'
                  }}
                >
                  {searchResults.map((content) => (
                    <ContentCard
                      key={content.id}
                      content={content}
                      onCardClick={handleCardClick}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px 20px',
                    textAlign: 'center'
                  }}
                >
                  <svg
                    style={{ width: '120px', height: '120px', color: '#2A2A2A', marginBottom: '24px' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
                    ไม่พบผลการค้นหา
                  </h2>
                  <p style={{ fontSize: '16px', color: '#B3B3B3', marginBottom: '24px', maxWidth: '500px' }}>
                    {searchQuery
                      ? `ไม่พบเนื้อหาที่ตรงกับ "${searchQuery}" กรุณาลองใช้คำค้นหาอื่น หรือปรับตัวกรอง`
                      : 'กรุณากรอกคำค้นหาเพื่อค้นหาเนื้อหา'
                    }
                  </p>
                  {(searchQuery || hasActiveFilters) && (
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          style={{
                            padding: '12px 24px',
                            background: '#FFBF00',
                            color: '#0A0A0A',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                          ล้างการค้นหา
                        </button>
                      )}
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          style={{
                            padding: '12px 24px',
                            background: '#1A1A1A',
                            color: '#fff',
                            border: '1px solid rgba(255, 191, 0, 0.3)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#FFBF00';
                            e.currentTarget.style.color = '#FFBF00';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 191, 0, 0.3)';
                            e.currentTarget.style.color = '#fff';
                          }}
                        >
                          ล้างตัวกรอง
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Content Detail Modal */}
      {selectedContent && (
        <ContentDetailModal
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0A0A0A' }}><Navigation /></div>}>
      <SearchContent />
    </Suspense>
  );
}
