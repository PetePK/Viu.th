import { Category, Content } from '@/types';
import { allContent } from './mockData';
import { userPersonas } from './personas';

// Generate personalized home categories based on user persona
export function getPersonalizedCategories(personaId: string): Category[] {
  const persona = userPersonas[personaId];
  if (!persona) return getDefaultCategories();

  const categories: Category[] = [];

  // 1. RECOMMENDED FOR YOU (Personalized based on preferences)
  categories.push({
    id: 'recommended',
    title: 'แนะนำสำหรับคุณ',
    type: 'recommended',
    content: getRecommendedContent(persona),
  });

  // 2. TOP 10 THIS MONTH (Same for all personas)
  categories.push({
    id: 'top10',
    title: 'Top 10 เดือนนี้',
    type: 'top10',
    content: getTop10Content(),
  });

  // 3. NEXT SHOWS YOU MIGHT LIKE (Personalized)
  categories.push({
    id: 'next_shows',
    title: 'เรื่องต่อไปที่คุณน่าจะชอบ',
    type: 'personalized',
    content: getNextShowsYouMightLike(persona),
  });

  // 4-7. PERSONALIZED CATEGORY ROWS based on persona
  const personalizedRows = getPersonaSpecificRows(persona);
  categories.push(...personalizedRows);

  // 8. "BECAUSE YOU WATCHED..." rows
  const becauseYouWatchedRows = getBecauseYouWatchedRows(persona);
  categories.push(...becauseYouWatchedRows);

  return categories;
}

// Get recommended content based on persona preferences
function getRecommendedContent(persona: any): Content[] {
  const preferredGenres = persona.preferences.genres;
  const preferredTypes = persona.preferences.contentTypes;

  return allContent
    .filter(content => {
      const matchesGenre = content.genres?.some(g => preferredGenres.includes(g));
      const matchesType = preferredTypes.includes(content.type);
      return matchesGenre || matchesType;
    })
    .slice(0, 15);
}

// Top 10 content (same for all)
function getTop10Content(): Content[] {
  return [
    allContent[24],  // Taxi Driver 3
    allContent[6],   // Only Boo!
    allContent[11],  // Bloody Flower
    allContent[10],  // Love Phobia
    allContent[0],   // Love Alert
    allContent[8],   // Honour
    allContent[30],  // Family By Choice
    allContent[36],  // Running Man
    allContent[9],   // My Bias Is Showing
    allContent[29],  // Good Partner
  ];
}

// Next shows you might like
function getNextShowsYouMightLike(persona: any): Content[] {
  const preferredGenres = persona.preferences.genres;

  const filtered = allContent
    .filter(content => content.genres?.some(g => preferredGenres.includes(g)))
    .slice(5, 20);
  return [...filtered].reverse();
}

// Persona-specific content rows
function getPersonaSpecificRows(persona: any): Category[] {
  const rows: Category[] = [];

  switch (persona.id) {
    case 'kdrama_fan':
      rows.push({
        id: 'korean_romance',
        title: 'ซีรีส์เกาหลีโรแมนติก',
        type: 'standard',
        content: allContent.filter(c => c.type === 'ซีรีส์เกาหลี' && c.genres?.includes('โรแมนติก')).slice(0, 12),
      });
      rows.push({
        id: 'korean_dubbed',
        title: 'ซีรีส์พากย์ไทยยอดนิยม',
        type: 'standard',
        content: allContent.filter(c => c.type === 'ซีรีส์พากย์ไทย').slice(0, 15),
      });
      break;

    case 'action_lover':
      rows.push({
        id: 'action_series',
        title: 'ซีรีส์แอคชั่นระห่ำ',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('แอคชั่น')).slice(0, 12),
      });
      rows.push({
        id: 'thriller_mystery',
        title: 'ซีรีส์ระทึกขวัญลึกลับ',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('ระทึกขวัญ') || c.genres?.includes('ลึกลับ')).slice(0, 12),
      });
      rows.push({
        id: 'viu_original',
        title: 'Viu Original แอคชั่นสุดมัน',
        type: 'standard',
        content: allContent.filter(c => c.type === 'Viu Original').slice(0, 8),
      });
      rows.push({
        id: 'crime_series',
        title: 'อาชญากรรมและกฎหมาย',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('กฎหมาย') || c.genres?.includes('ระทึกขวัญ')).slice(0, 10),
      });
      break;

    case 'lgbtq_viewer':
      rows.push({
        id: 'lgbtq_thai',
        title: 'LGBTQ+ ซีรีส์ไทย',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('LGBTQ+') && c.type === 'ซีรีส์ไทย').slice(0, 12),
      });
      rows.push({
        id: 'lgbtq_korean',
        title: 'LGBTQ+ ซีรีส์เกาหลี',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('LGBTQ+') && c.type.includes('เกาหลี')).slice(0, 10),
      });
      rows.push({
        id: 'lgbtq_romance',
        title: 'โรแมนติก LGBTQ+ ยอดฮิต',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('LGBTQ+') && c.genres?.includes('โรแมนติก')).slice(0, 15),
      });
      rows.push({
        id: 'progressive_content',
        title: 'เนื้อหาก้าวหน้าและหลากหลาย',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('LGBTQ+') || c.genres?.includes('ดราม่า')).slice(0, 12),
      });
      break;

    case 'thai_drama_fan':
      rows.push({
        id: 'thai_series_new',
        title: 'ซีรีส์ไทยมาใหม่',
        type: 'standard',
        content: allContent.filter(c => c.type === 'ซีรีส์ไทย' && c.year && c.year >= 2025).slice(0, 12),
      });
      rows.push({
        id: 'thai_romance',
        title: 'ซีรีส์ไทยโรแมนติก',
        type: 'standard',
        content: allContent.filter(c => c.type === 'ซีรีส์ไทย' && c.genres?.includes('โรแมนติก')).slice(0, 12),
      });
      rows.push({
        id: 'thai_dubbed',
        title: 'ซีรีส์พากย์ไทยยอดนิยม',
        type: 'standard',
        content: allContent.filter(c => c.type.includes('พากย์ไทย')).slice(0, 15),
      });
      rows.push({
        id: 'thai_comedy',
        title: 'คอมเมดี้ไทยสุดฮา',
        type: 'standard',
        content: allContent.filter(c => c.type === 'ซีรีส์ไทย' && c.genres?.includes('คอมเมดี้')).slice(0, 10),
      });
      break;

    case 'family_viewer':
      rows.push({
        id: 'variety_shows',
        title: 'รายการวาไรตี้เกาหลี',
        type: 'standard',
        content: allContent.filter(c => c.type === 'วาไรตี้เกาหลี').slice(0, 15),
      });
      rows.push({
        id: 'family_friendly',
        title: 'ซีรีส์ครอบครัวอบอุ่น',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('ครอบครัว') || c.genres?.includes('คอมเมดี้')).slice(0, 12),
      });
      rows.push({
        id: 'light_romance',
        title: 'โรแมนติกคอมหวานใจ',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('โรแมนติก') && c.genres?.includes('คอมเมดี้')).slice(0, 12),
      });
      rows.push({
        id: 'variety_cooking',
        title: 'วาไรตี้ทำอาหารและท่องเที่ยว',
        type: 'standard',
        content: allContent.filter(c => c.type === 'วาไรตี้เกาหลี' && (c.genres?.includes('ทำอาหาร') || c.genres?.includes('ท่องเที่ยว'))).slice(0, 10),
      });
      break;

    case 'movie_binger':
      rows.push({
        id: 'action_movies',
        title: 'ภาพยนตร์แอคชั่นระห่ำ',
        type: 'standard',
        content: allContent.filter(c => c.type.includes('ภาพยนตร์') && c.genres?.includes('แอคชั่น')).slice(0, 15),
      });
      rows.push({
        id: 'korean_movies',
        title: 'ภาพยนตร์เกาหลีฮิต',
        type: 'standard',
        content: allContent.filter(c => c.type === 'ภาพยนตร์เกาหลี').slice(0, 12),
      });
      rows.push({
        id: 'thriller_movies',
        title: 'ภาพยนตร์ระทึกขวัญ',
        type: 'standard',
        content: allContent.filter(c => c.type.includes('ภาพยนตร์') && c.genres?.includes('ระทึกขวัญ')).slice(0, 12),
      });
      rows.push({
        id: 'romance_movies',
        title: 'ภาพยนตร์โรแมนติก',
        type: 'standard',
        content: allContent.filter(c => c.type.includes('ภาพยนตร์') && c.genres?.includes('โรแมนติก')).slice(0, 10),
      });
      break;

    case 'casual_browser':
      rows.push({
        id: 'trending_now',
        title: 'กำลังฮิตตอนนี้',
        type: 'standard',
        content: allContent.filter(c => c.rating && c.rating >= 4.5).slice(0, 15),
      });
      rows.push({
        id: 'easy_watch',
        title: 'ดูง่ายไม่ต้องคิดมาก',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('คอมเมดี้') || c.genres?.includes('โรแมนติก')).slice(0, 12),
      });
      rows.push({
        id: 'short_series',
        title: 'ซีรีส์สั้นจบไว',
        type: 'standard',
        content: allContent.filter(c => c.episodes && c.episodes <= 16).slice(0, 12),
      });
      rows.push({
        id: 'popular_all',
        title: 'ยอดนิยมทุกประเภท',
        type: 'standard',
        content: allContent.slice(0, 15),
      });
      break;

    case 'kpop_variety_fan':
      rows.push({
        id: 'variety_shows_all',
        title: 'รายการวาไรตี้เกาหลีทั้งหมด',
        type: 'standard',
        content: allContent.filter(c => c.type === 'วาไรตี้เกาหลี').slice(0, 20),
      });
      rows.push({
        id: 'reality_shows',
        title: 'รายการเรียลลิตี้',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('เรียลลิตี้') || c.type === 'วาไรตี้เกาหลี').slice(0, 12),
      });
      rows.push({
        id: 'music_shows',
        title: 'รายการดนตรีและ K-Pop',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('ดนตรี')).slice(0, 10),
      });
      rows.push({
        id: 'travel_variety',
        title: 'วาไรตี้ท่องเที่ยว',
        type: 'standard',
        content: allContent.filter(c => c.genres?.includes('ท่องเที่ยว')).slice(0, 10),
      });
      break;
  }

  return rows.filter(row => row.content.length > 0);
}

// "Because you watched..." rows
function getBecauseYouWatchedRows(persona: any): Category[] {
  const rows: Category[] = [];
  const recentlyWatched = persona.preferences.recentlyWatched;

  if (recentlyWatched && recentlyWatched.length > 0) {
    // Pick the first show they watched and create a "because you watched" row
    const watchedShow = recentlyWatched[0];
    const watchedContent = allContent.find(c => c.title === watchedShow);

    if (watchedContent && watchedContent.genres) {
      const similarContent = allContent.filter(c => {
        if (c.title === watchedShow) return false; // Don't include the same show
        return c.genres?.some(g => watchedContent.genres?.includes(g));
      }).slice(0, 12);

      if (similarContent.length > 0) {
        rows.push({
          id: `because_you_watched_${watchedContent.id}`,
          title: `เพราะคุณดู "${watchedShow}"`,
          type: 'personalized',
          reason: `Based on ${watchedShow}`,
          content: similarContent,
        });
      }
    }
  }

  return rows;
}

// Default categories (fallback)
function getDefaultCategories(): Category[] {
  return [
    {
      id: 'recommended',
      title: 'แนะนำสำหรับคุณ',
      type: 'recommended',
      content: allContent.slice(0, 15),
    },
    {
      id: 'top10',
      title: 'Top 10 เดือนนี้',
      type: 'top10',
      content: getTop10Content(),
    },
    {
      id: 'new_releases',
      title: 'ออกใหม่ล่าสุด',
      type: 'standard',
      content: allContent.filter(c => c.year === 2026).slice(0, 12),
    },
    {
      id: 'popular_series',
      title: 'ซีรีส์ยอดนิยม',
      type: 'standard',
      content: allContent.filter(c => c.rating && c.rating >= 4.5).slice(0, 15),
    },
  ];
}
