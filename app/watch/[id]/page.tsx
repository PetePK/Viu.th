'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { allContent } from '@/data/mockData';
import { Content } from '@/types';
import Navigation from '@/components/navigation/Navigation';

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const contentId = params.id as string;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [showEpisodes, setShowEpisodes] = useState(true);

  const content = allContent.find(c => c.id === contentId);
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  // Get similar content based on matching genres
  const similarContent = content
    ? allContent.filter(c => {
        if (c.id === content.id) return false;
        if (!c.genres || !content.genres) return false;
        return c.genres.some(genre => content.genres?.includes(genre));
      }).slice(0, 6)
    : [];

  // Generate mock episodes
  const episodes = content?.episodes
    ? Array.from({ length: content.episodes }, (_, i) => ({
        number: i + 1,
        duration: '45 นาที',
        thumbnail: '#2A2A2A'
      }))
    : [];

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideTimeout);
    };
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  if (!content) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>ไม่พบเนื้อหา</h1>
          <p style={{ color: '#B3B3B3', marginBottom: '32px' }}>ขออภัย ไม่พบเนื้อหาที่คุณต้องการ</p>
          <button
            type="button"
            onClick={() => router.push('/')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#FFBF00',
              color: '#0A0A0A',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEpisodeClick = (episodeNum: number) => {
    setCurrentEpisode(episodeNum);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleSimilarClick = (similarContent: Content) => {
    router.push(`/watch/${similarContent.id}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A' }}>
      {/* Navigation */}
      <Navigation />

      <div style={{ paddingTop: '68px' }}>
        {/* Video Player Section */}
        <div style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '600px'
        }}>
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              zIndex: '50',
              width: '48px',
              height: '48px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              opacity: showControls ? '1' : '0'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'}
            aria-label="Go back"
          >
            <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Video Element / Placeholder */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1280px',
            aspectRatio: '16/9',
            backgroundColor: '#2A2A2A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Video Placeholder Icon */}
            <svg
              style={{ width: '120px', height: '120px', opacity: '0.3' }}
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

            {/* Video Element (hidden but functional) */}
            <video
              ref={videoRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: 0
              }}
              onClick={togglePlay}
              playsInline
            >
              <source src={videoUrl} type="video/mp4" />
            </video>

            {/* Center Play Button (when paused) */}
            {!isPlaying && (
              <div style={{
                position: 'absolute',
                inset: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
              }}>
                <button
                  type="button"
                  onClick={togglePlay}
                  style={{
                    width: '96px',
                    height: '96px',
                    backgroundColor: 'rgba(255, 191, 0, 0.9)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  aria-label="Play video"
                >
                  <svg style={{ width: '48px', height: '48px', color: '#0A0A0A', marginLeft: '4px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
              </div>
            )}

            {/* Video Controls */}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                transition: 'opacity 0.3s',
                opacity: showControls ? '1' : '0',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Content Title */}
                <div>
                  <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{content.title}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#B3B3B3' }}>
                    <span>{content.type}</span>
                    {content.episodes && (
                      <>
                        <span>•</span>
                        <span>ตอนที่ {currentEpisode}</span>
                      </>
                    )}
                    {content.year && (
                      <>
                        <span>•</span>
                        <span>{content.year}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    transition: 'height 0.2s'
                  }}
                  onClick={handleProgressClick}
                  onMouseEnter={(e) => e.currentTarget.style.height = '8px'}
                  onMouseLeave={(e) => e.currentTarget.style.height = '6px'}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: '#FFBF00',
                      borderRadius: '3px',
                      width: `${progress}%`,
                      transition: 'width 0.1s'
                    }}
                  />
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Left Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Play/Pause */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'transparent',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>

                    {/* Volume */}
                    <button
                      type="button"
                      onClick={toggleMute}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'transparent',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      ) : (
                        <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      )}
                    </button>

                    {/* Time */}
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Fullscreen */}
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'transparent',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      aria-label="Fullscreen"
                    >
                      <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={{
          maxWidth: '1920px',
          margin: '0 auto',
          padding: 'var(--gutter)'
        }}>
          {/* Main Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '32px'
          }} className="md:grid-cols-[1fr_400px]">
            {/* Left Column - Content Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Title and Meta */}
              <div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  color: '#FFFFFF'
                }}>
                  {content.title}
                </h2>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  marginBottom: '16px'
                }}>
                  {content.year && (
                    <span style={{
                      color: '#10B981',
                      fontWeight: '600',
                      fontSize: '16px'
                    }}>
                      {content.year}
                    </span>
                  )}
                  {content.rating && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg style={{ width: '16px', height: '16px', color: '#FFBF00' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span style={{ fontSize: '16px', fontWeight: '600' }}>{content.rating}</span>
                    </div>
                  )}
                  <span style={{ color: '#B3B3B3', fontSize: '16px' }}>{content.type}</span>
                  {content.status && (
                    <>
                      <span style={{ color: '#666' }}>•</span>
                      <span style={{ color: '#B3B3B3', fontSize: '16px' }}>{content.status}</span>
                    </>
                  )}
                </div>

                {/* Genres */}
                {content.genres && content.genres.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                    {content.genres.map((genre, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: 'rgba(255, 191, 0, 0.1)',
                          border: '1px solid rgba(255, 191, 0, 0.3)',
                          borderRadius: '20px',
                          fontSize: '14px',
                          color: '#FFBF00',
                          fontWeight: '500'
                        }}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                {content.description && (
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#B3B3B3',
                    margin: '0'
                  }}>
                    {content.description}
                  </p>
                )}
              </div>

              {/* Recommendations Section - Mobile */}
              <div className="md:hidden">
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  color: '#FFFFFF'
                }}>
                  คล้ายกับเรื่องนี้
                </h3>

                <div style={{
                  display: 'flex',
                  gap: '16px',
                  overflowX: 'auto',
                  paddingBottom: '16px'
                }}>
                  {similarContent.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSimilarClick(item)}
                      style={{
                        flexShrink: '0',
                        width: '180px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '2/3',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#2A2A2A',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg
                          style={{ width: '48px', height: '48px', opacity: '0.2' }}
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
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#FFFFFF',
                        margin: '0 0 6px 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {item.title}
                      </h4>
                      <div style={{ fontSize: '12px', color: '#B3B3B3' }}>
                        {item.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Episode Selector (Desktop) */}
            {episodes.length > 0 && (
              <div className="hidden md:block">
                <div style={{
                  backgroundColor: '#1A1A1A',
                  borderRadius: '12px',
                  padding: '24px',
                  position: 'sticky',
                  top: '100px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px'
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      margin: '0'
                    }}>
                      ตอนทั้งหมด
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowEpisodes(!showEpisodes)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: '#FFFFFF'
                      }}
                      aria-label={showEpisodes ? 'Hide episodes' : 'Show episodes'}
                    >
                      <svg
                        style={{
                          width: '20px',
                          height: '20px',
                          transform: showEpisodes ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s'
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {showEpisodes && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      maxHeight: '600px',
                      overflowY: 'auto'
                    }}>
                      {episodes.map((episode) => (
                        <div
                          key={episode.number}
                          onClick={() => handleEpisodeClick(episode.number)}
                          style={{
                            display: 'flex',
                            gap: '16px',
                            padding: '12px',
                            borderRadius: '8px',
                            backgroundColor: currentEpisode === episode.number ? 'rgba(255, 191, 0, 0.1)' : 'transparent',
                            border: currentEpisode === episode.number ? '2px solid #FFBF00' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (currentEpisode !== episode.number) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentEpisode !== episode.number) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {/* Episode Thumbnail */}
                          <div style={{
                            width: '120px',
                            aspectRatio: '16/9',
                            borderRadius: '6px',
                            backgroundColor: '#2A2A2A',
                            flexShrink: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                          }}>
                            <svg
                              style={{ width: '32px', height: '32px', opacity: '0.3' }}
                              fill="none"
                              stroke="#FFFFFF"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {currentEpisode === episode.number && (
                              <div style={{
                                position: 'absolute',
                                top: '6px',
                                right: '6px',
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#FFBF00',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <svg style={{ width: '14px', height: '14px', color: '#0A0A0A' }} fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Episode Info */}
                          <div style={{ flex: '1' }}>
                            <div style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: currentEpisode === episode.number ? '#FFBF00' : '#FFFFFF',
                              marginBottom: '6px'
                            }}>
                              ตอนที่ {episode.number}
                            </div>
                            <div style={{
                              fontSize: '14px',
                              color: '#B3B3B3'
                            }}>
                              {episode.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Episodes Grid - Mobile */}
          {episodes.length > 0 && (
            <div className="md:hidden" style={{ marginTop: '32px' }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '24px',
                color: '#FFFFFF'
              }}>
                ตอนทั้งหมด
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '16px'
              }}>
                {episodes.map((episode) => (
                  <div
                    key={episode.number}
                    onClick={() => handleEpisodeClick(episode.number)}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '8px',
                      backgroundColor: '#2A2A2A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px',
                      border: currentEpisode === episode.number ? '2px solid #FFBF00' : '2px solid transparent'
                    }}>
                      <svg
                        style={{ width: '32px', height: '32px', opacity: '0.3' }}
                        fill="none"
                        stroke="#FFFFFF"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {currentEpisode === episode.number && (
                        <div style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#FFBF00',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <svg style={{ width: '14px', height: '14px', color: '#0A0A0A' }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: currentEpisode === episode.number ? '#FFBF00' : '#FFFFFF',
                      marginBottom: '4px'
                    }}>
                      ตอนที่ {episode.number}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#B3B3B3'
                    }}>
                      {episode.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations Section - Desktop */}
          {similarContent.length > 0 && (
            <div className="hidden md:block" style={{ marginTop: '64px' }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '32px',
                color: '#FFFFFF'
              }}>
                คล้ายกับเรื่องนี้
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '24px'
              }}>
                {similarContent.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSimilarClick(item)}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '2/3',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#2A2A2A',
                      marginBottom: '16px',
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
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      margin: '0 0 8px 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {item.title}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: '#B3B3B3'
                    }}>
                      {item.year && <span>{item.year}</span>}
                      {item.rating && (
                        <>
                          <span>•</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg style={{ width: '14px', height: '14px', color: '#FFBF00' }} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{item.rating}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
