'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { navigationCategories } from '@/data/mockData';

export default function Navigation() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 200);
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleMobileSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? 'rgba(10, 10, 10, 0.95)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(4px)',
        }}
      >
        <div className="w-full max-w-[1920px] mx-auto" style={{ padding: '0 var(--gutter)' }}>
          <div className="flex items-center justify-between" style={{ height: '68px' }}>
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/viu-logo.svg"
                alt="Viu"
                width={80}
                height={30}
                style={{ height: '30px', width: 'auto' }}
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center" style={{ gap: '32px' }} ref={dropdownRef}>
              <Link
                href="/"
                className="text-white hover:opacity-80 transition-opacity"
                style={{ fontSize: '15px', fontWeight: 500 }}
              >
                หน้าแรก
              </Link>

              {navigationCategories.map((category) => (
                <div key={category.id} className="relative">
                  <button
                    className="flex items-center transition-opacity hover:opacity-80"
                    style={{ fontSize: '15px', fontWeight: 500, color: '#fff', gap: '4px' }}
                    onMouseEnter={() => setActiveDropdown(category.id)}
                    onClick={() => setActiveDropdown(activeDropdown === category.id ? null : category.id)}
                  >
                    {category.title}
                    <svg
                      className={`w-4 h-4 transition-transform ${activeDropdown === category.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeDropdown === category.id && category.subcategories && (
                    <div
                      className="absolute top-full left-0 mt-2 overflow-hidden animate-fadeIn"
                      style={{
                        width: '240px',
                        background: 'rgba(26, 26, 26, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '12px',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.path}
                          className="block transition-colors"
                          style={{ padding: '12px 20px', fontSize: '14px', color: '#B3B3B3' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.color = '#FFBF00';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#B3B3B3';
                          }}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center" style={{ gap: '16px' }}>
              {/* Language */}
              <Link
                href="/language"
                className="hidden md:flex flex-col items-center justify-center transition-opacity hover:opacity-70"
                style={{ gap: '4px' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span style={{ fontSize: '11px' }}>Language</span>
              </Link>

              {/* ประวัติ (History) */}
              <Link
                href="/history"
                className="hidden md:flex flex-col items-center justify-center transition-opacity hover:opacity-70"
                style={{ gap: '4px' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: '11px' }}>ประวัติ</span>
              </Link>

              {/* บุ๊กมาร์ก (Bookmark) */}
              <Link
                href="/bookmarks"
                className="hidden md:flex flex-col items-center justify-center transition-opacity hover:opacity-70"
                style={{ gap: '4px' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span style={{ fontSize: '11px' }}>บุ๊กมาร์ก</span>
              </Link>

              {/* ค้นหา (Search) */}
              <div className="hidden md:block">
                {isSearchOpen ? (
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="ค้นหาซีรีส์, ภาพยนตร์..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleSearchKeyPress}
                      className="focus:outline-none"
                      style={{
                        width: '280px',
                        padding: '8px 16px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => handleSearch(searchQuery)}
                      className="p-2 rounded-lg transition-colors hover:bg-white/10"
                      title="ค้นหา"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-2 rounded-lg transition-colors hover:bg-white/10"
                      title="ปิด"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="flex flex-col items-center justify-center transition-opacity hover:opacity-70"
                    style={{ gap: '4px' }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span style={{ fontSize: '11px' }}>ค้นหา</span>
                  </button>
                )}
              </div>

              {/* Profile */}
              <Link
                href="/profile"
                className="hidden md:flex flex-col items-center justify-center transition-opacity hover:opacity-70"
                style={{ gap: '4px' }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFBF00, #FFD700)',
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#0A0A0A' }}>
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span style={{ fontSize: '11px' }}>โปรไฟล์</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 animate-fadeIn"
            style={{ background: 'rgba(0,0,0,0.8)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className="fixed top-0 right-0 bottom-0 z-50 overflow-y-auto animate-slideUp"
            style={{ width: '320px', background: '#1A1A1A' }}
          >
            <div style={{ padding: '24px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '32px' }}>
                <Image src="/images/viu-logo.svg" alt="Viu" width={60} height={22} />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative" style={{ marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="ค้นหา..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleMobileSearch(searchQuery);
                    }
                  }}
                  className="w-full focus:outline-none"
                  style={{
                    padding: '12px 48px 12px 16px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleMobileSearch(searchQuery)}
                  aria-label="ค้นหา"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  <svg style={{ width: '20px', height: '20px', color: '#FFBF00' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              <Link
                href="/"
                className="block transition-colors"
                style={{ padding: '12px 0', fontSize: '18px', color: '#fff' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                หน้าแรก
              </Link>

              {navigationCategories.map((category) => (
                <div key={category.id} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ padding: '12px 0', fontSize: '16px', fontWeight: 600, color: '#FFBF00' }}>
                    {category.title}
                  </div>
                  {category.subcategories?.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.path}
                      className="block transition-colors hover:opacity-80"
                      style={{ padding: '8px 0 8px 16px', fontSize: '14px', color: '#B3B3B3' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
