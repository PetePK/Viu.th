import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/navigation/Navigation';
import CategoryPage from '@/components/category/CategoryPage';
import { allContent } from '@/data/mockData';
import { Content } from '@/types';

type PageProps = {
  params: Promise<{ category: string }>;
};

// Category configurations
const categoryConfig: Record<string, { title: string; description: string; filter: (content: Content) => boolean }> = {
  korean: {
    title: 'ซีรีส์เกาหลี',
    description: 'ซีรีส์เกาหลีคุณภาพสูง อัพเดตตอนใหม่เร็วที่สุด พร้อมคำบรรยายภาษาไทย',
    filter: (content) => content.type === 'ซีรีส์เกาหลี'
  },
  chinese: {
    title: 'ซีรีส์จีน',
    description: 'ซีรีส์จีนยอดนิยม เรื่องราวความรักและดราม่าที่น่าติดตาม',
    filter: (content) => content.type === 'ซีรีส์จีน' || content.type === 'ซีรีส์จีนพากย์ไทย'
  },
  thai: {
    title: 'ซีรีส์ไทย',
    description: 'ซีรีส์ไทยคุณภาพ Original Content จาก Viu และช่องดังในประเทศไทย',
    filter: (content) => content.type === 'ซีรีส์ไทย'
  },
  dubbed: {
    title: 'ซีรีส์พากย์ไทย',
    description: 'ซีรีส์ฮิตพากย์เสียงไทย ดูง่าย ฟังสนุก เข้าใจเนื้อเรื่องได้ชัดเจน',
    filter: (content) => content.type === 'ซีรีส์พากย์ไทย' || content.type === 'ซีรีส์จีนพากย์ไทย' || content.type.includes('พากย์ไทย')
  },
  asia: {
    title: 'ซีรีส์เอเชีย',
    description: 'ซีรีส์จากทั่วเอเชีย ญี่ปุ่น เกาหลี จีน ไต้หวัน และอื่นๆ',
    filter: (content) => {
      const asianTypes = ['ซีรีส์เกาหลี', 'ซีรีส์จีน', 'ซีรีส์ไทย', 'ซีรีส์จีนพากย์ไทย'];
      return asianTypes.some(type => content.type.includes(type));
    }
  },
  western: {
    title: 'ซีรีส์ฝรั่ง',
    description: 'ซีรีส์ฝรั่งคุณภาพสูง จากเครือข่ายดังทั่วโลก',
    filter: (content) => content.type.includes('ฝรั่ง') || content.type.includes('Western')
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const config = categoryConfig[category];

  return {
    title: config?.title || 'ซีรีส์',
    description: config?.description || 'ดูซีรีส์ออนไลน์คุณภาพสูง',
  };
}

export default async function SeriesCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const config = categoryConfig[category];

  // If category not found, show default
  if (!config) {
    return (
      <>
        <Navigation />
        <div style={{
          minHeight: '100vh',
          background: '#0A0A0A',
          color: '#FFFFFF',
          paddingTop: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '100px 24px'
        }}>
          <div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#FFBF00'
            }}>
              404
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#B3B3B3',
              marginBottom: '32px'
            }}>
              ไม่พบหมวดหมู่ที่คุณต้องการ
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #FFBF00, #FFD700)',
                borderRadius: '8px',
                color: '#0A0A0A',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              กลับหน้าแรก
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <CategoryPage
        title={config.title}
        description={config.description}
        allContent={allContent}
        filterFunction={config.filter}
      />
    </>
  );
}
