export interface ReelItem {
  id: string;
  title: string;
  titleTh?: string;
  youtubeId: string;
  thumbnail: string;
  description: string;
  genres: string[];
  year: number;
  episodes?: number;
  rating: number;
  type: string;
  status?: string;
}

export const reelsData: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Go Ahead!',
    titleTh: 'ถักทอด้วยใจ',
    youtubeId: 'mvsSPnTLjVs',
    thumbnail: `https://img.youtube.com/vi/mvsSPnTLjVs/maxresdefault.jpg`,
    description: 'เรื่องราวของสามเด็กจากครอบครัวที่แตกสลาย ที่เลือกเป็นครอบครัวให้กันและกัน เติบโตมาด้วยกันผ่านทุกข์และสุข',
    genres: ['ดราม่า', 'ครอบครัว', 'โรแมนติก'],
    year: 2020,
    episodes: 46,
    rating: 4.9,
    type: 'ซีรีส์จีน',
    status: 'ตอนจบ',
  },
  {
    id: 'reel-2',
    title: 'Youth of May',
    titleTh: 'รักในวันที่พฤษภา',
    youtubeId: 'Uoc_3N0Vo4I',
    thumbnail: `https://img.youtube.com/vi/Uoc_3N0Vo4I/maxresdefault.jpg`,
    description: 'ความรักของหนุ่มสาวในช่วงเหตุการณ์ทางการเมืองเดือนพฤษภาคม 1980 ที่เมืองกวางจู ความรักที่สวยงามท่ามกลางความโกลาหล',
    genres: ['ดราม่า', 'โรแมนติก', 'ประวัติศาสตร์'],
    year: 2021,
    episodes: 12,
    rating: 4.7,
    type: 'ซีรีส์เกาหลี',
    status: 'ตอนจบ',
  },
  {
    id: 'reel-3',
    title: 'Falling Into Your Smile',
    titleTh: 'ลุ้นรักนักแข่งอีสปอร์ต',
    youtubeId: 'dwKaCSWbSKA',
    thumbnail: `https://img.youtube.com/vi/dwKaCSWbSKA/maxresdefault.jpg`,
    description: 'สาวเกมเมอร์สุดเก่งที่ก้าวเข้าสู่ทีม E-Sports ชายล้วน พบกับกัปตันทีมสุดเท่ ความรักเบ่งบานบนเวทีแข่ง',
    genres: ['โรแมนติก', 'คอมเมดี้', 'กีฬา'],
    year: 2021,
    episodes: 31,
    rating: 4.5,
    type: 'ซีรีส์จีน',
    status: 'ตอนจบ',
  },
  {
    id: 'reel-4',
    title: 'My Magic Prophecy',
    titleTh: 'ทำนายทายทัพ',
    youtubeId: 'vowe0tx6BZg',
    thumbnail: `https://img.youtube.com/vi/vowe0tx6BZg/maxresdefault.jpg`,
    description: 'คำทำนายที่พลิกชีวิต เมื่อพลังเหนือธรรมชาติเข้ามาเปลี่ยนทุกอย่าง ความสนุกและเรื่องราวที่คาดไม่ถึง',
    genres: ['แฟนตาซี', 'คอมเมดี้'],
    year: 2025,
    episodes: 12,
    rating: 4.3,
    type: 'ซีรีส์ไทย',
    status: 'ตอนจบ',
  },
  {
    id: 'reel-5',
    title: 'Reply 1988',
    titleTh: 'ย้อนวันรัก 1988',
    youtubeId: 'RPeRg8EmEyk',
    thumbnail: `https://img.youtube.com/vi/RPeRg8EmEyk/maxresdefault.jpg`,
    description: 'เรื่องราวของ 5 ครอบครัวที่อาศัยอยู่ในซอยเดียวกันในปี 1988 มิตรภาพ ความรัก และความทรงจำที่อบอุ่นหัวใจ',
    genres: ['ดราม่า', 'โรแมนติก', 'ครอบครัว'],
    year: 2015,
    episodes: 20,
    rating: 4.9,
    type: 'ซีรีส์เกาหลี',
    status: 'ตอนจบ',
  },
];
