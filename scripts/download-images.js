const https = require('https');
const fs = require('fs');
const path = require('path');

// Images to download from Viu CDN
const images = [
  { id: '1', url: 'https://prod-images.viu.com/2838332431/803d2b841ce27abcea9a141f88bcb77805ebfc86' },
  { id: '2', url: 'https://prod-images.viu.com/939465844/9172d7cc6f43a72edac957fa38f5be8055089653' },
  { id: '3', url: 'https://prod-images.viu.com/550790472/89c4c7ba90d47e92cec0c58d9fa58d89e04a9be4' },
  { id: '4', url: 'https://prod-images.viu.com/2334849628/c11b524c4ac3722643b72bf109fc3c171a94ccb4' },
  { id: '5', url: 'https://prod-images.viu.com/4223592522/f094ef06b118b1a4d1ea786c6807876912cb14f9' },
  { id: '6', url: 'https://prod-images.viu.com/391/391_1710320831_391_1710313815_p21708489688_viu_sg_1710305773_391_p21708489688.jpg' },
  { id: '7', url: 'https://prod-images.viu.com/391/p21724056644_viu_sg_1726032632.jpg' },
  { id: '8', url: 'https://prod-images.viu.com/391/p21734424173_viu_sg_1734495174.jpg' },
  { id: '9', url: 'https://prod-images.viu.com/391/p21730267848_viu_sg_1730348104.jpg' },
  { id: '10', url: 'https://prod-images.viu.com/391/p21734424174_viu_sg_1734495200.jpg' },
  { id: '11', url: 'https://prod-images.viu.com/391/p21682422374_viu_sg_1682490746.jpg' },
  { id: '12', url: 'https://prod-images.viu.com/391/p21691845231_viu_sg_1691924400.jpg' },
  { id: '13', url: 'https://prod-images.viu.com/391/p21699123456_viu_sg_1699200000.jpg' },
  { id: '14', url: 'https://prod-images.viu.com/391/p21705123456_viu_sg_1705200000.jpg' },
  { id: '15', url: 'https://prod-images.viu.com/391/p21710123456_viu_sg_1710200000.jpg' },
  { id: '16', url: 'https://prod-images.viu.com/391/p21715123456_viu_sg_1715200000.jpg' },
  { id: '17', url: 'https://prod-images.viu.com/391/p21689012345_viu_sg_1689100000.jpg' },
  { id: '18', url: 'https://prod-images.viu.com/391/p21675012345_viu_sg_1675100000.jpg' },
  { id: '19', url: 'https://prod-images.viu.com/391/p21720123456_viu_sg_1720200000.jpg' },
  { id: '20', url: 'https://prod-images.viu.com/391/p21668012345_viu_sg_1668100000.jpg' },
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'content');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(imageObj) {
  return new Promise((resolve, reject) => {
    const extension = imageObj.url.endsWith('.jpg') ? '.jpg' : '.webp';
    const filename = `${imageObj.id}${extension}`;
    const filepath = path.join(outputDir, filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ Skipped (exists): ${filename}`);
      resolve(filename);
      return;
    }

    console.log(`Downloading: ${filename}...`);

    const file = fs.createWriteStream(filepath);

    https.get(imageObj.url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log(`Starting download of ${images.length} images...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const img of images) {
    try {
      await downloadImage(img);
      successCount++;
    } catch (error) {
      console.error(`✗ Error downloading image ${img.id}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n===================`);
  console.log(`Download complete!`);
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`===================`);
}

downloadAll().catch(console.error);
