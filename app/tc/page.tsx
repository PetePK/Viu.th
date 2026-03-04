'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/footer/Footer';
import HeroSection from '@/components/hero/HeroSection';
import ContentRow from '@/components/content/ContentRow';
import Top10Section from '@/components/content/Top10Section';
import ContentDetailModal from '@/components/modal/ContentDetailModal';
import ReelsSection from '@/components/reels/ReelsSection';
import ReelsViewer from '@/components/reels/ReelsViewer';
import ReelPreviewModal from '@/components/reels/ReelPreviewModal';
import { allContent } from '@/data/mockData';
import { defaultPersonaId } from '@/data/personas';
import { getPersonalizedCategories } from '@/data/personaCategories';
import { reelsData, ReelItem } from '@/data/reelsData';
import { Content } from '@/types';

export default function TCPage() {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [activePersona] = useState(defaultPersonaId);
  const [reelsViewerOpen, setReelsViewerOpen] = useState(false);
  const [reelsInitialIndex, setReelsInitialIndex] = useState(0);
  const [previewReel, setPreviewReel] = useState<ReelItem | null>(null);

  const homeCategories = getPersonalizedCategories(activePersona);

  const featuredContent = [
    allContent[8],   // Honour
    allContent[10],  // Love Phobia
    allContent[0],   // Love Alert
    allContent[11],  // Bloody Flower
    allContent[24],  // Taxi Driver 3
    allContent[55],  // Moon River
  ];

  const handleContentClick = (content: Content) => {
    setSelectedContent(content);
  };

  const handleCloseModal = () => {
    setSelectedContent(null);
  };

  const handleMoreInfo = (content: Content) => {
    setSelectedContent(content);
  };

  const handleReelClick = (index: number) => {
    setReelsInitialIndex(index);
    setReelsViewerOpen(true);
  };

  const handleWatchFull = (reel: ReelItem) => {
    setReelsViewerOpen(false);
    setPreviewReel(reel);
  };

  const handleCloseReelsViewer = () => {
    setReelsViewerOpen(false);
  };

  const handleClosePreviewModal = () => {
    setPreviewReel(null);
  };

  return (
    <div className="min-h-screen bg-bg-darkest">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        featuredContent={featuredContent}
        onMoreInfo={handleMoreInfo}
      />

      {/* Content Rows */}
      <div className="relative -mt-24 md:-mt-32 z-10 pb-16">
        {/* Short Reels Section - Featured prominently as first section */}
        <ReelsSection
          reels={reelsData}
          onReelClick={handleReelClick}
        />

        {/* Regular content categories */}
        {homeCategories.map((category) => {
          if (category.type === 'top10') {
            return (
              <Top10Section
                key={category.id}
                content={category.content}
                onContentClick={handleContentClick}
              />
            );
          }
          return (
            <ContentRow
              key={category.id}
              category={category}
              onContentClick={handleContentClick}
            />
          );
        })}
      </div>

      {/* Footer */}
      <Footer />

      {/* Content Detail Modal */}
      <ContentDetailModal content={selectedContent} onClose={handleCloseModal} />

      {/* Full-screen Reels Viewer */}
      {reelsViewerOpen && (
        <ReelsViewer
          reels={reelsData}
          initialIndex={reelsInitialIndex}
          onClose={handleCloseReelsViewer}
          onWatchFull={handleWatchFull}
        />
      )}

      {/* Reel Preview Modal (Watch Full Movie) */}
      <ReelPreviewModal
        reel={previewReel}
        onClose={handleClosePreviewModal}
      />
    </div>
  );
}
