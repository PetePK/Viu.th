import { Metadata } from 'next';
import Navigation from '@/components/navigation/Navigation';
import CategoryPage from '@/components/category/CategoryPage';
import { allContent } from '@/data/mockData';
import { Content } from '@/types';

type PageProps = {
  params: Promise<{ category: string }>;
};

// Category configurations
const categoryConfig: Record<string, { title: string; description: string; filter: (content: Content) => boolean }> = {
  new: {
    title: 'รายการออกใหม่',
    description: 'รายการใหม่ล่าสุดที่คุณไม่ควรพลาด อัพเดตทุกสัปดาห์',
    filter: (content) => {
      const isShow = content.type.includes('วาไรตี้') || content.type.includes('รายการ');
      const isNew = content.status === 'กำลังออกอากาศ' || content.status === 'ใหม่' || (content.year !== undefined && content.year >= 2026);
      return isShow && !!isNew;
    }
  },
  variety: {
    title: 'รายการวาไรตี้',
    description: 'รายการวาไรตี้สุดฮา รายการเกม และรายการเรียลลิตี้จากทั่วเอเชีย',
    filter: (content) => content.type.includes('วาไรตี้')
  },
  original: {
    title: 'Viu Original',
    description: 'Original Series และ Exclusive Content จาก Viu คุณภาพพรีเมียม',
    filter: (content) => content.type === 'Viu Original' || content.type.includes('Original')
  },
  k1: {
    title: 'K1 Headlines',
    description: 'ข่าวสารและไฮไลท์จากวงการ K-Pop และดาราเกาหลี',
    filter: (content) => content.type.includes('K1') || content.type.includes('ข่าว')
  },
  highlight: {
    title: 'Highlight',
    description: 'ไฮไลท์และช่วงเด็ดจากรายการดังต่างๆ',
    filter: (content) => content.type.includes('Highlight') || content.type.includes('ไฮไลท์')
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const config = categoryConfig[category];

  return {
    title: config?.title || 'รายการ',
    description: config?.description || 'ดูรายการวาไรตี้และ Original Content',
  };
}

export default async function ShowsCategoryPage({ params }: PageProps) {
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
            <a
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
            </a>
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
