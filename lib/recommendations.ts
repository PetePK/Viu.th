import { Content } from '@/types';

export function getRecommendations(
  current: Content,
  allContent: Content[],
  limit = 12
): Content[] {
  const scored = allContent
    .filter((c) => c.id !== current.id)
    .map((c) => {
      let score = 0;

      // Same type +3
      if (c.type === current.type) score += 3;

      // Genre overlap +2 each
      if (current.genres && c.genres) {
        for (const genre of current.genres) {
          if (c.genres.includes(genre)) score += 2;
        }
      }

      // Same year +1
      if (c.year && current.year && c.year === current.year) score += 1;

      // High rating bonus
      if (c.rating && c.rating >= 4.5) score += 0.5;

      return { content: c, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.content);
}
