import { UserPersona } from '@/types';

// Default user persona for the prototype
export const userPersonas: Record<string, UserPersona> = {
  kdrama_fan: {
    id: 'kdrama_fan',
    name: 'K-Drama Enthusiast',
    description: 'Loves Korean dramas, especially romance and melodramas',
    preferences: {
      genres: ['โรแมนติก', 'ดราม่า', 'ประวัติศาสตร์'],
      contentTypes: ['ซีรีส์เกาหลี', 'ซีรีส์พากย์ไทย'],
      recentlyWatched: ['Love Phobia เอไอไขรัก', 'Honour ทนายสามสาวฉาว', 'The Heirs ศึกหัวใจ นายพันล้าน'],
    },
  },
};

// Default persona for demo
export const defaultPersonaId = 'kdrama_fan';
