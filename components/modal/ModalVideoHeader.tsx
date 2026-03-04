'use client';

import { useCallback } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { Content } from '@/types';

interface ModalVideoHeaderProps {
  content: Content;
}

export default function ModalVideoHeader({ content }: ModalVideoHeaderProps) {
  const handleYouTubeReady = useCallback((event: YouTubeEvent) => {
    const player = event.target;
    player.unMute();
    player.setVolume(80);
    player.playVideo();
  }, []);

  return (
    <div className="modal-video-header">
      {content.youtubeTrailerId ? (
        <div className="modal-video-container">
          <YouTube
            videoId={content.youtubeTrailerId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                mute: 0,
                rel: 0,
                modestbranding: 1,
                playsinline: 1,
                ...(content.youtubeTrailerStart
                  ? { start: content.youtubeTrailerStart }
                  : {}),
              },
            }}
            onReady={handleYouTubeReady}
            style={{ position: 'absolute', inset: 0 }}
            iframeClassName="modal-yt-iframe"
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
