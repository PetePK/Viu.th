import fs from 'fs';
import path from 'path';
import ytdl from '@distube/ytdl-core';

// Configuration
const VIDEOS_TO_DOWNLOAD = [
  {
    url: 'https://www.youtube.com/watch?v=mvsSPnTLjVs',
    filename: 'strong-woman-do-bong-soon.mp4',
  },
  {
    url: 'https://www.youtube.com/watch?v=7cdgeekXPIo',
    filename: 'true-beauty.mp4',
  },
  {
    url: 'https://www.youtube.com/watch?v=YTgx25e8ey',
    filename: 'hotel-del-luna.mp4',
  },
  {
    url: 'https://www.youtube.com/watch?v=KbWi3VW6QuM',
    filename: 'twinkling-watermelon.mp4',
  },
  {
    url: 'https://www.youtube.com/watch?v=nwWDLx0T4tU',
    filename: 'moon-lovers-scarlet-heart-ryeo.mp4',
  },
  {
    url: 'https://www.youtube.com/watch?v=Nx1tn2-MGD4',
    filename: 'the-heirs.mp4',
  },
  {
    url: 'https://www.youtube.com/watch?v=RPeRg8EmEyk',
    filename: 'reply-1988.mp4',
  },
  {
    url: 'https://www.youtube.com/watch?v=8UGne0li-jQ',
    filename: 'taxi-driver-2.mp4',
  },
  {
    url: 'https://www.youtube.com/watch?v=uF1ki60xh1I',
    filename: 'dr-romantic.mp4',
  },
  {
    url: 'https://www.youtube.com/watch?v=mvsSPnTLjVs',
    filename: 'go-ahead.mp4',
  },
];

const outputDir = path.join(__dirname, '..', 'public', 'videos');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

interface DownloadOptions {
  url: string;
  filename: string;
  quality?: 'highest' | 'lowest';
}

async function downloadVideo(options: DownloadOptions): Promise<string> {
  const { url, filename, quality = 'highest' } = options;
  const filepath = path.join(outputDir, filename);

  // Skip if already exists
  if (fs.existsSync(filepath)) {
    console.log(`✓ Skipped (exists): ${filename}`);
    return filename;
  }

  // Validate YouTube URL
  if (!ytdl.validateURL(url)) {
    throw new Error(`Invalid YouTube URL: ${url}`);
  }

  return new Promise((resolve, reject) => {
    console.log(`Downloading: ${filename}...`);

    try {
      // Get video info first
      ytdl.getInfo(url).then((info) => {
        console.log(`  Title: ${info.videoDetails.title}`);
        console.log(`  Duration: ${info.videoDetails.lengthSeconds}s`);

        // Download video with highest quality (video + audio)
        const video = ytdl(url, {
          quality: quality,
          filter: 'audioandvideo',
        });

        const writeStream = fs.createWriteStream(filepath);

        video.pipe(writeStream);

        // Track progress
        let downloadedBytes = 0;
        video.on('progress', (chunkLength, downloaded, total) => {
          downloadedBytes = downloaded;
          const percent = ((downloaded / total) * 100).toFixed(2);
          process.stdout.write(`  Progress: ${percent}% (${downloaded}/${total} bytes)\r`);
        });

        video.on('end', () => {
          console.log('\n');
        });

        writeStream.on('finish', () => {
          console.log(`✓ Downloaded: ${filename}`);
          resolve(filename);
        });

        video.on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });

        writeStream.on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      }).catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}

async function downloadAll() {
  console.log(`Starting download of ${VIDEOS_TO_DOWNLOAD.length} video(s)...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const video of VIDEOS_TO_DOWNLOAD) {
    try {
      await downloadVideo(video);
      successCount++;
    } catch (error) {
      console.error(`✗ Error downloading ${video.filename}:`, (error as Error).message);
      errorCount++;
    }
  }

  console.log(`\n===================`);
  console.log(`Download complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`===================`);
}

// Run the script
if (require.main === module) {
  downloadAll().catch(console.error);
}

export { downloadVideo, downloadAll };
