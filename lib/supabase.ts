/**
 * Supabase Integration for Video Storage
 *
 * This file handles Supabase bucket integration for storing video content.
 * Currently configured for future use when videos are uploaded to Supabase storage.
 */

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  bucketName: 'viu-videos',
};

/**
 * Get video URL from Supabase bucket
 * @param contentId - Content ID
 * @param type - 'teaser' or 'episode'
 * @param episodeNumber - Episode number (only for type='episode')
 * @returns Video URL or null if not configured
 */
export function getVideoUrl(
  contentId: string,
  type: 'teaser' | 'episode' = 'teaser',
  episodeNumber?: number
): string | null {
  // Check if Supabase is configured
  if (!supabaseConfig.url || !supabaseConfig.anonKey) {
    console.log('Supabase not configured. Using placeholder.');
    return null;
  }

  // Construct video path
  const fileName = type === 'teaser'
    ? `${contentId}-teaser.mp4`
    : `${contentId}-episode-${episodeNumber}.mp4`;

  return `${supabaseConfig.url}/storage/v1/object/public/${supabaseConfig.bucketName}/${fileName}`;
}

export default {
  getVideoUrl,
  supabaseConfig,
};
