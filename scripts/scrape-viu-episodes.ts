/**
 * Generate episode data for all content items.
 * Since Viu API is currently unavailable (maintenance/500),
 * this generates realistic episode data with proper Thai naming.
 *
 * Usage: pnpm scrape:episodes
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Types ───────────────────────────────────────────────────────────────────

interface EpisodeData {
  number: number;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
}

interface ContentExtras {
  episodes: EpisodeData[];
  cast?: string[];
  longDescription?: string;
  contentRating?: string;
  tags?: string[];
}

interface ContentEntry {
  id: string;
  title: string;
  episodes?: number;
  thumbnail: string;
  type: string;
  genres?: string[];
  description?: string;
}

// ─── Parse mockData ──────────────────────────────────────────────────────────

function parseContentFromMockData(): ContentEntry[] {
  const mockDataPath = path.resolve(__dirname, '../data/mockData.ts');
  const raw = fs.readFileSync(mockDataPath, 'utf-8');

  const entries: ContentEntry[] = [];
  const blocks = raw.split(/\n  \{/);

  for (const block of blocks) {
    const idMatch = block.match(/id:\s*'(\d+)'/);
    if (!idMatch) continue;

    const titleMatch = block.match(/title:\s*['"](.+?)['"]\s*,/);
    const episodesMatch = block.match(/episodes:\s*(\d+)/);
    const thumbnailMatch = block.match(/thumbnail:\s*['"](.+?)['"]\s*,/);
    const typeMatch = block.match(/type:\s*['"](.+?)['"]\s*,/);
    const descMatch = block.match(/description:\s*['"](.+?)['"]\s*,/);
    const genresMatch = block.match(/genres:\s*\[([^\]]+)\]/);

    const genres = genresMatch
      ? genresMatch[1].match(/'([^']+)'/g)?.map((g) => g.replace(/'/g, ''))
      : [];

    if (titleMatch && thumbnailMatch && typeMatch) {
      entries.push({
        id: idMatch[1],
        title: titleMatch[1],
        episodes: episodesMatch ? parseInt(episodesMatch[1]) : undefined,
        thumbnail: thumbnailMatch[1],
        type: typeMatch[1],
        genres: genres || [],
        description: descMatch ? descMatch[1] : '',
      });
    }
  }

  return entries;
}

// ─── Episode Title Templates by Genre ────────────────────────────────────────

const romanticTitles = [
  'จุดเริ่มต้นของหัวใจ', 'ลิขิตรักที่ไม่คาดคิด', 'ความลับในใจ',
  'สัญญาณรัก', 'หัวใจที่ค้นพบ', 'เมื่อหัวใจเรียกร้อง',
  'ความรู้สึกที่ซ่อนไว้', 'สายลมแห่งรัก', 'จังหวะหัวใจ',
  'ร่มเงาแห่งความรัก', 'คำสัญญาของหัวใจ', 'ทางที่หัวใจเลือก',
  'เงาของความรัก', 'วันที่หัวใจเปลี่ยน', 'ความจริงในใจ',
  'รักที่ไม่อาจลืม', 'ปลายทางของหัวใจ', 'ลมหายใจแห่งรัก',
  'เส้นทางสู่หัวใจ', 'ความรักที่รอคอย', 'สิ่งที่หัวใจบอก',
  'แสงสว่างในความรัก', 'คู่ชะตาลิขิต', 'ช่วงเวลาแห่งรัก',
  'หัวใจที่สั่นไหว', 'นิรันดร์แห่งรัก', 'ดาวแห่งความรัก',
  'ฝันที่เป็นจริง', 'ทำนองรัก', 'คำตอบของหัวใจ',
  'โชคชะตาของเรา', 'จดหมายรัก', 'มนต์เสน่ห์',
  'ดอกไม้แห่งรัก', 'สายใยหัวใจ', 'ปาฏิหาริย์ของรัก',
  'ลมพัดผ่านใจ', 'ฤดูกาลแห่งรัก', 'ความทรงจำอันแสนหวาน',
  'ใจที่เปิด', 'ฝนตกใจเต้น', 'โลกของเรา',
  'แรงดึงดูดแห่งหัวใจ', 'สายรุ้งหลังฝน', 'เสียงเรียกจากหัวใจ',
  'กลิ่นอายรัก', 'เรื่องราวของเรา', 'วันพรุ่งนี้ที่สดใส',
  'ความลับของดวงดาว', 'เพลงรักจากหัวใจ', 'ตอนจบที่สวยงาม',
];

const dramaTitles = [
  'ความจริงที่ซ่อนเร้น', 'การเปิดเผย', 'เส้นทางชีวิต',
  'ทางแยก', 'สัจธรรมแห่งชีวิต', 'แรงต้าน',
  'ความหวังใหม่', 'เมื่อความจริงปรากฏ', 'เสียงจากอดีต',
  'ร่องรอยที่ทิ้งไว้', 'บทเรียนชีวิต', 'สิ่งที่ต้องเลือก',
  'ดวงตาที่ไม่โกหก', 'ช่วงเวลาแห่งการเปลี่ยนแปลง', 'ก้าวข้าม',
  'หลังพายุ', 'ความแข็งแกร่ง', 'เปลวไฟแห่งความมุ่งมั่น',
  'แสงสว่างปลายอุโมงค์', 'ทางออก', 'การต่อสู้',
  'ความเข้มแข็ง', 'เบื้องหลังรอยยิ้ม', 'คำสัญญา',
  'น้ำตาและรอยยิ้ม', 'จุดเปลี่ยน', 'การเริ่มต้นใหม่',
  'สิ่งที่สูญเสีย', 'ตัวตนที่แท้จริง', 'เมื่อความหวังกลับมา',
  'เงาของอดีต', 'อนาคตที่รอคอย', 'หนทางที่เลือก',
  'ความลับของเวลา', 'ชะตากรรม', 'การยืนหยัด',
  'บทสรุป', 'ก้าวต่อไป', 'ความจริงเปลี่ยนทุกสิ่ง',
  'ถนนสายนี้', 'โลกที่เปลี่ยนไป', 'ตอนจบที่เลือกเอง',
  'ดวงดาวส่องทาง', 'หัวใจที่กล้าหาญ', 'ภาพที่สมบูรณ์',
  'ความหวังที่ไม่มีวันดับ', 'บาดแผลและการเยียวยา', 'ช่วงชีวิต',
  'กำลังใจ', 'ผู้ชนะ', 'ก้าวสุดท้าย',
];

const thrillerTitles = [
  'เงาในความมืด', 'ความลับที่ซ่อนอยู่', 'ร่องรอย',
  'ผู้ต้องสงสัย', 'เกมอำมหิต', 'หลักฐานที่หายไป',
  'ดักแด้', 'ความหวาดระแวง', 'จุดตาย',
  'เขาวงกต', 'แผนลวง', 'ตัวล่อ',
  'เหยื่อ', 'คดีปริศนา', 'เบาะแส',
  'พยานปากสำคัญ', 'ร่องรอยเลือด', 'การไล่ล่า',
  'ความมืดมน', 'ศพที่หายไป', 'ปริศนาคดีฆาตกรรม',
  'คำสารภาพ', 'แรงจูงใจ', 'หลุมพราง',
  'ทางตัน', 'การไขปริศนา', 'หลบซ่อน',
  'เงามรณะ', 'ผู้ล่า', 'เหนือเมฆ',
  'เกมซ่อนเงื่อน', 'ข้อสรุป', 'ช่วงเวลาแห่งความตาย',
  'มุมมืด', 'ปริศนาที่ไขไม่ได้', 'ตัวเชื่อม',
  'กับดัก', 'ความลับของคืนนั้น', 'ใครคือฆาตกร',
  'สุดยอดแผน', 'เบื้องหลังที่แท้จริง', 'จุดจบ',
  'ผู้ถูกกล่าวหา', 'เงื่อนงำ', 'คดีที่ไม่จบ',
  'แรงแค้น', 'ความยุติธรรม', 'การพิพากษา',
  'เปิดโปง', 'เดิมพันชีวิต',
];

const actionTitles = [
  'ปฏิบัติการเดือด', 'เกมพลิกชะตา', 'ผู้กล้า',
  'ศึกชิงอำนาจ', 'การต่อสู้', 'เป้าหมาย',
  'การโจมตี', 'ด่านมรณะ', 'หนีตาย',
  'กลับมาสู้', 'ปฏิบัติการกู้ชีพ', 'หลุมดำ',
  'แนวรบ', 'ป้อมปราการ', 'ภารกิจลับ',
  'ผู้พิทักษ์', 'สงครามในเงา', 'อาวุธลับ',
  'การแก้แค้น', 'ศึกหมัดเด็ด', 'กรงเล็บ',
  'สมรภูมิ', 'เหล็กไฟ', 'ยอดนักรบ',
  'ตำนานนักสู้', 'ปฏิบัติการข้ามแดน', 'ยุทธการสุดท้าย',
  'การหลบหนี', 'อำนาจมืด', 'พายุเหล็ก',
  'การตามล่า', 'ล่าข้ามโลก', 'จุดระเบิด',
  'ผู้รอดชีวิต', 'ปฏิบัติการชิงตัว', 'จุดแตกหัก',
  'ด่วนมรณะ', 'สายลับ', 'กลยุทธ์',
  'ฮีโร่', 'ผู้พิชิต', 'ตำนานนักฆ่า',
  'การกลับมา', 'เหนือกฎ', 'สัญญาณอันตราย',
  'พลังที่ซ่อนเร้น', 'ปฏิบัติการพิเศษ', 'การป้องกัน',
  'ศึกสุดท้าย', 'ตัดสินใจ',
];

const fantasyTitles = [
  'โลกที่ไม่รู้จัก', 'ดินแดนมหัศจรรย์', 'พลังลึกลับ',
  'คำสาปโบราณ', 'ประตูมิติ', 'เวทมนตร์ตื่น',
  'ผู้ถูกเลือก', 'ตำนานโบราณ', 'อัศจรรย์',
  'จักรวาลคู่ขนาน', 'เพชรแห่งพลัง', 'นิมิต',
  'การเดินทางข้ามเวลา', 'โลกสะท้อน', 'มนตร์ดำ',
  'ผู้พิทักษ์แห่งแสง', 'มรดกเวทย์', 'ตำนานราชันย์',
  'อาณาจักรลับ', 'พรสวรรค์', 'ภูตผีวิญญาณ',
  'ต้นกำเนิด', 'ดาบศักดิ์สิทธิ์', 'มังกรเพลิง',
  'การตื่นของเทพ', 'เทพนิยาย', 'โลกใต้พิภพ',
  'ผู้กล้าหาญ', 'สงครามเทพ', 'มหาเวท',
  'อำนาจเหนือธรรมชาติ', 'คำทำนาย', 'กุญแจแห่งโชคชะตา',
  'มิติมืด', 'ดวงตาแห่งเทพ', 'เส้นทางแห่งวิญญาณ',
  'ราชาแห่งเวทมนตร์', 'ป่าต้องมนตร์', 'จักรพรรดิ',
  'ชะตาของผู้ถูกเลือก', 'สงครามอมตะ', 'ตำนานเทพเจ้า',
  'การเดินทางครั้งสุดท้าย', 'แสงสว่างแห่งความหวัง', 'จุดจบของเทพ',
  'อาณาจักรมืด', 'การกลับมาของฮีโร่', 'ราชินีแห่งเวท',
  'เพลงแห่งดวงดาว', 'โลกจินตนาการ',
];

const varietyTitles = [
  'ภารกิจพิเศษ', 'ทริปสุดฮา', 'เกมสุดป่วน',
  'ความท้าทายใหม่', 'รอบพิเศษ', 'แขกรับเชิญสุดเซอร์ไพรส์',
  'ภารกิจลับ', 'เกมทดสอบ', 'ท่องเที่ยวสุดฟิน',
  'เมนูพิเศษ', 'เปิดบ้าน', 'ย้อนวันวาน',
  'ลุ้นรางวัล', 'ของกินสุดพิเศษ', 'ความทรงจำ',
  'เกมตอบคำถาม', 'แข่งขัน', 'สนุกสุดขีด',
  'การเดินทาง', 'แคมป์สุดฮา', 'เปิดใจ',
  'ฮีโร่ประจำสัปดาห์', 'งานเลี้ยง', 'วันพักผ่อน',
  'พิชิตภารกิจ', 'เบื้องหลัง', 'ลุยเดี่ยว',
  'ทีมเวิร์ค', 'ช่วงพิเศษ', 'ย้อนความทรงจำ',
];

const comedyTitles = [
  'เรื่องวุ่นๆ', 'ป่วนทั้งบ้าน', 'กลับหัวกลับหาง',
  'สับขาหลอก', 'แผนลวง', 'เข้าใจผิด',
  'ดราม่าเต็มร้าน', 'สุดยอดแผนป่วน', 'วุ่นรักวุ่นใจ',
  'กลยุทธ์สุดฮา', 'พลิกล็อค', 'หมดแผน',
  'ปาร์ตี้ป่วน', 'แอบ(ไม่)แอบ', 'เหตุการณ์ไม่คาดคิด',
  'แผนสำรอง', 'ตลกร้าย', 'สนุกสุดเหวี่ยง',
  'คืนวุ่นวาย', 'พลิกสถานการณ์', 'เกมสลับตัว',
  'ป่วนรัก', 'ก๊อปแคท', 'พี่เอ๋ย',
  'หัวร้อน', 'เรื่องจริงไม่อิงนิยาย', 'ป่วนกันไปวันๆ',
  'ฮากระจาย', 'เรื่องชาวบ้าน', 'สุดท้ายก็ยอม',
];

function getTitlePool(genres: string[]): string[] {
  const pool: string[] = [];
  for (const genre of genres) {
    if (genre.includes('โรแมนติก')) pool.push(...romanticTitles);
    if (genre.includes('ดราม่า')) pool.push(...dramaTitles);
    if (genre.includes('ระทึกขวัญ') || genre.includes('ลึกลับ')) pool.push(...thrillerTitles);
    if (genre.includes('แอคชั่น')) pool.push(...actionTitles);
    if (genre.includes('แฟนตาซี')) pool.push(...fantasyTitles);
    if (genre.includes('วาไรตี้')) pool.push(...varietyTitles);
    if (genre.includes('คอมเมดี้')) pool.push(...comedyTitles);
  }
  if (pool.length === 0) pool.push(...dramaTitles, ...romanticTitles);
  return pool;
}

// ─── Cast Data (realistic for each type) ─────────────────────────────────────

const thaiActors = [
  'มาริโอ้ เมาเร่อ', 'ณเดชน์ คูกิมิยะ', 'เบลล่า ราณี แคมเปน',
  'ใหม่ ดาวิกา โฮร์เน่', 'เจมส์ จิรายุ ตั้งศรีสุข', 'คิมเบอร์ลี่ แอน เทียมศิริ',
  'มิว ศุภศิษฏ์ จงชีวีวัฒน์', 'กลัฟ คณาวุฒิ ไตรพิพัฒนพงษ์',
  'ไบร์ท วชิรวิชญ์ ชีวอารี', 'วิน เมธวิน โอภาสเอี่ยมขจร',
  'นนน กรภัทร์ เกิดพันธุ์', 'ชิม่อน เรืองปิยะ', 'เอิร์ท พิรพัฒน์',
  'มิกซ์ สหภาพ', 'พีพี กฤษฏ์', 'บิวกิ้น พุฒิพงศ์',
  'ออฟ จุมพล', 'กัน อรรถพันธ์', 'เต้ย จรินทร์พร', 'แมท ภีรนีย์',
];

const koreanActors = [
  'ซงจุงกิ', 'จอนจีฮยอน', 'พัคมินยอง', 'อีมินโฮ',
  'คิมซูฮยอน', 'จอนโซมิน', 'อีกวางซู', 'ซงจีฮโย',
  'นัมกุงมิน', 'จีชางอุค', 'คิมโกอึน', 'ชาอึนอู',
  'พัคโบยอง', 'ยุนอา', 'ฮวังจองอึม', 'โจอินซอง',
  'พัคซอจุน', 'ซอเยจี', 'อีจงซอก', 'ฮันโซฮี',
];

const chineseActors = [
  'หยางมี่', 'จ้าวลี่อิ๋ง', 'หลิวอี้เฟย', 'หวังอี้ป๋อ',
  'เซียวจ้าน', 'ถังเยี่ยน', 'จางเจ๋อฮั่น', 'กงจวิ้น',
  'หยางจื่อ', 'ติงอวี่ซี', 'เฉินเฟยหยู่', 'หลิวห่าวหรัน',
  'ไป๋ลู่', 'จางซินเฉิง', 'สวีไค', 'หยางหยาง',
  'ดิลราบา ดิลมูรัต', 'จูอี้หลง', 'เกาเหว่ยกวง', 'หวังเฮ่อตี้',
];

function getRandomCast(type: string): string[] {
  let pool: string[];
  if (type.includes('ไทย')) pool = thaiActors;
  else if (type.includes('เกาหลี') || type === 'Viu Original') pool = koreanActors;
  else if (type.includes('จีน')) pool = chineseActors;
  else pool = [...koreanActors, ...thaiActors];

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3 + Math.floor(Math.random() * 3));
}

// ─── Content Ratings ─────────────────────────────────────────────────────────

function getContentRating(genres: string[]): string {
  if (genres.some(g => g.includes('ระทึกขวัญ') || g.includes('แอคชั่น'))) return 'PG-15';
  if (genres.some(g => g.includes('เยาวชน'))) return 'PG-13';
  return 'PG-13';
}

// ─── Episode Generator ──────────────────────────────────────────────────────

function generateEpisodes(content: ContentEntry): ContentExtras {
  const count = content.episodes || 10;
  const titlePool = getTitlePool(content.genres || []);
  const isVariety = content.type.includes('วาไรตี้');

  // Use thumbnail variations for episode thumbnails
  const baseThumbnail = content.thumbnail;

  // Seeded-ish random for consistency
  const seed = parseInt(content.id) * 137;
  const pseudoRandom = (i: number) => {
    const x = Math.sin(seed + i * 97) * 10000;
    return x - Math.floor(x);
  };

  const usedTitles = new Set<string>();
  const episodes: EpisodeData[] = [];

  for (let i = 0; i < count; i++) {
    // Pick a unique title from pool
    let title: string;
    if (isVariety) {
      const epNum = i + 1;
      title = `EP.${epNum}`;
      // Add a subtitle for variety shows
      const subIdx = Math.floor(pseudoRandom(i) * varietyTitles.length);
      title += ` ${varietyTitles[subIdx]}`;
    } else {
      const poolIdx = Math.floor(pseudoRandom(i) * titlePool.length);
      title = titlePool[poolIdx];
      if (usedTitles.has(title)) {
        // Find next unused
        for (let j = 0; j < titlePool.length; j++) {
          const candidate = titlePool[(poolIdx + j) % titlePool.length];
          if (!usedTitles.has(candidate)) {
            title = candidate;
            break;
          }
        }
      }
      usedTitles.add(title);
    }

    // Duration: variety 60-90min, drama 40-65min
    const baseDuration = isVariety ? 60 : 40;
    const durationRange = isVariety ? 30 : 25;
    const duration = baseDuration + Math.floor(pseudoRandom(i + 100) * durationRange);

    // Description
    const desc = `${content.title} ตอนที่ ${i + 1} - ${title}`;

    episodes.push({
      number: i + 1,
      title,
      thumbnail: baseThumbnail,
      duration: `${duration} นาที`,
      description: desc,
    });
  }

  const cast = getRandomCast(content.type);
  const contentRating = getContentRating(content.genres || []);
  const longDescription = content.description
    ? `${content.description} ติดตามชมทุกตอนได้ที่ Viu Thailand`
    : undefined;
  const tags = content.genres ? [...content.genres] : undefined;

  return { episodes, cast, longDescription, contentRating, tags };
}

// ─── Output Writer ───────────────────────────────────────────────────────────

function escapeStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
}

function writeEpisodeData(results: Map<string, ContentExtras>) {
  const outputPath = path.resolve(__dirname, '../data/episodeData.ts');

  const lines: string[] = [];
  lines.push(`import { Episode } from '@/types';`);
  lines.push(``);
  lines.push(`// Auto-generated by scripts/scrape-viu-episodes.ts`);
  lines.push(`// Last updated: ${new Date().toISOString().split('T')[0]}`);
  lines.push(``);
  lines.push(`export interface ContentExtras {`);
  lines.push(`  episodes: Episode[];`);
  lines.push(`  cast?: string[];`);
  lines.push(`  longDescription?: string;`);
  lines.push(`  contentRating?: string;`);
  lines.push(`  tags?: string[];`);
  lines.push(`}`);
  lines.push(``);
  lines.push(`export const episodeData: Record<string, ContentExtras> = {`);

  for (const [id, data] of results) {
    lines.push(`  '${id}': {`);
    lines.push(`    episodes: [`);
    for (const ep of data.episodes) {
      lines.push(`      { number: ${ep.number}, title: '${escapeStr(ep.title)}', thumbnail: '${escapeStr(ep.thumbnail)}', duration: '${ep.duration}', description: '${escapeStr(ep.description)}' },`);
    }
    lines.push(`    ],`);

    if (data.cast && data.cast.length > 0) {
      lines.push(`    cast: [${data.cast.map(c => `'${escapeStr(c)}'`).join(', ')}],`);
    }
    if (data.longDescription) {
      lines.push(`    longDescription: '${escapeStr(data.longDescription)}',`);
    }
    if (data.contentRating) {
      lines.push(`    contentRating: '${data.contentRating}',`);
    }
    if (data.tags && data.tags.length > 0) {
      lines.push(`    tags: [${data.tags.map(t => `'${escapeStr(t)}'`).join(', ')}],`);
    }

    lines.push(`  },`);
  }

  lines.push(`};`);
  lines.push(``);

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`\n✅ Written ${results.size} entries to ${outputPath}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  console.log('🎬 Generating episode data...\n');

  const contents = parseContentFromMockData();
  console.log(`Found ${contents.length} content items\n`);

  const results = new Map<string, ContentExtras>();

  for (const content of contents) {
    const data = generateEpisodes(content);
    results.set(content.id, data);
    console.log(`[${content.id}] ${content.title} → ${data.episodes.length} episodes`);
  }

  writeEpisodeData(results);
}

main();
