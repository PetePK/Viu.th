'use client';

import { useMemo } from 'react';
import { Content } from '@/types';
import { isTouchDevice } from '@/lib/deviceDetect';

interface ModalVideoHeaderProps {
  content: Content;
}

export default function ModalVideoHeader({ content }: ModalVideoHeaderProps) {
  const shouldMute = typeof window !== 'undefined' ? isTouchDevice() : true;

  const embedUrl = useMemo(() => {
    if (!content.youtubeTrailerId) return '';
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
    if (content.youtubeTrailerStart) {
      params.set('start', String(content.youtubeTrailerStart));
    }
    return `https://www.youtube.com/embed/${content.youtubeTrailerId}?${params.toString()}`;
  }, [content.youtubeTrailerId, content.youtubeTrailerStart, shouldMute]);

  return (
    <div className="modal-video-header">
      {content.youtubeTrailerId ? (
        <div className="modal-video-container">
          <iframe
            src={embedUrl}
            title={content.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="modal-yt-iframe"
          />
        </div>
      ) : content.thumbnail ? (
        <img
          src={content.thumbnail}
          alt={content.title}
          className="modal-video-thumbnail"
        />
      ) : (
        <div className="modal-video-placeholder">
          <svg
            width="64"
            height="64"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ opacity: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="modal-video-gradient" />
    </div>
  );
}
