/**
 * Constructs a real Viu Thailand URL for watching content.
 *
 * Priority: explicit viuUrl > product ID from CDN thumbnail > search fallback.
 */
export function getViuUrl(item: { title: string; thumbnail?: string; viuUrl?: string }): string {
  // Use explicit Viu URL if provided
  if (item.viuUrl) {
    return item.viuUrl;
  }

  // Extract Viu product ID from CDN thumbnail URL
  // Pattern: https://prod-images.viu.com/{productId}/...
  const match = item.thumbnail?.match(/prod-images\.viu\.com\/(\d+)\//);
  if (match) {
    return `https://www.viu.com/ott/th/th/vod/${match[1]}/`;
  }

  // Fallback: search for the title on Viu
  return `https://www.viu.com/ott/th/th/search?q=${encodeURIComponent(item.title)}`;
}
