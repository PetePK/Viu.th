'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/footer/Footer';
import HeroSection from '@/components/hero/HeroSection';
import ContentRow from '@/components/content/ContentRow';
import Top10Section from '@/components/content/Top10Section';
import ContentDetailModal from '@/components/modal/ContentDetailModal';
import { allContent } from '@/data/mockData';
import { defaultPersonaId } from '@/data/personas';
import { getPersonalizedCategories } from '@/data/personaCategories';
import { Content } from '@/types';

export default function HomePage() {
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  // Active persona (hardcoded for prototype, can be changed for testing different personas)
  // Try: 'kdrama_fan', 'action_lover', 'lgbtq_viewer', 'thai_drama_fan', 'family_viewer'
  const [activePersona] = useState(defaultPersonaId);

  // Get personalized categories based on active persona
  const homeCategories = getPersonalizedCategories(activePersona);

  // Featured content for hero section (verified high-quality Viu images)
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

  return (
    <div className="min-h-screen bg-bg-darkest">
      {/* Navigation */}
      <Navigation />

      {/* Page Content Wrapper — aligns hero, content, footer */}
      <div className="page-content">
        {/* Hero Section with Video Autoplay */}
        <HeroSection
          featuredContent={featuredContent}
          onMoreInfo={handleMoreInfo}
        />

        {/* Content Rows - Overlapping hero section */}
        <div className="relative -mt-24 md:-mt-32 z-10 pb-16">
        {homeCategories.map((category) => {
          // Render Top 10 with dedicated section
          if (category.type === 'top10') {
            return (
              <Top10Section
                key={category.id}
                content={category.content}
                onContentClick={handleContentClick}
              />
            );
          }
          // Insert AIS Fibre ad before ซีรีส์เกาหลีโรแมนติก
          if (category.id === 'korean_romance') {
            return (
              <div key={`ad-ais-${category.id}`}>
                <div style={{
                  padding: '0 var(--gutter)',
                  marginBottom: '32px',
                }}>
                  <div style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                  }}>
                    <img
                      src="/images/ads/ais-fibre.jpg"
                      alt="AIS Fibre"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '10px',
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.5)',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      padding: '2px 6px',
                      borderRadius: '3px',
                    }}>
                      AD
                    </div>
                  </div>
                </div>
                <ContentRow
                  category={category}
                  onContentClick={handleContentClick}
                />
              </div>
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
      </div>

      {/* Content Detail Modal */}
      <ContentDetailModal content={selectedContent} onClose={handleCloseModal} />
    </div>
  );
}
