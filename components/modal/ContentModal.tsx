'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Content } from '@/types';
import { getViuUrl } from '@/lib/viuUrl';

interface ContentModalProps {
  content: Content | null;
  onClose: () => void;
}

export default function ContentModal({ content, onClose }: ContentModalProps) {
  useEffect(() => {
    if (content) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [content]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (content) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [content, onClose]);

  if (!content) return null;

  const handlePlayClick = () => {
    window.open(getViuUrl(content), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto bg-black/90 backdrop-blur-sm p-0 md:p-8">
      <div className="relative w-full md:max-w-4xl lg:max-w-5xl bg-viu-bg md:rounded-xl shadow-2xl md:my-8 min-h-screen md:min-h-0">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Image/Video Section */}
        <div className="relative aspect-video bg-black md:rounded-t-xl overflow-hidden">
          <Image
            src={`https://placehold.co/1920x1080/1E1B16/FFBF00?text=${encodeURIComponent(content.title)}`}
            alt={content.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 80vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-viu-bg via-transparent to-transparent" />

          {/* Action Buttons Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handlePlayClick}
              className="px-6 md:px-8 py-3 bg-viu-gold text-black font-bold rounded-lg hover:bg-viu-gold/90 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Play Now
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex-1 sm:flex-none w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/20"
                aria-label="Add to My List"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <button
                type="button"
                className="flex-1 sm:flex-none w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all border border-white/20"
                aria-label="Like"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-6 md:p-8 space-y-6 max-h-[50vh] md:max-h-none overflow-y-auto">
          {/* Title and Meta */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{content.title}</h2>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              {content.rating && (
                <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {content.rating}
                </span>
              )}
              {content.year && <span className="text-gray-400">{content.year}</span>}
              {content.episodes && (
                <span className="text-gray-400">{content.episodes} Episodes</span>
              )}
              {content.status && (
                <span className="px-3 py-1 bg-viu-gold text-black text-xs font-bold rounded">
                  {content.status}
                </span>
              )}
            </div>

            {content.description && (
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {content.description}
              </p>
            )}
          </div>

          {/* Genres */}
          {content.genres && content.genres.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {content.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-sm rounded-lg transition-colors cursor-pointer"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Type */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Type:</span>
            <span className="px-3 py-1.5 bg-gray-800 text-sm rounded-lg">{content.type}</span>
          </div>

          {/* Episodes List (if applicable) */}
          {content.episodes && content.episodes > 0 && (
            <div className="border-t border-gray-800 pt-6 space-y-4">
              <h3 className="text-lg md:text-xl font-bold">Episodes</h3>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {Array.from({ length: Math.min(content.episodes, 10) }, (_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 md:gap-4 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800 cursor-pointer transition-all group"
                  >
                    <div className="relative w-28 md:w-32 aspect-video flex-shrink-0 bg-gray-800 rounded overflow-hidden">
                      <Image
                        src={`https://placehold.co/320x180/1E1B16/FFBF00?text=EP${i + 1}`}
                        alt={`Episode ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm md:text-base truncate">Episode {i + 1}</h4>
                      <p className="text-xs md:text-sm text-gray-400">45 min</p>
                    </div>
                  </div>
                ))}
                {content.episodes > 10 && (
                  <button
                    type="button"
                    className="w-full py-3 text-center text-viu-gold hover:text-viu-gold/80 font-medium transition-colors"
                  >
                    View All {content.episodes} Episodes →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
