import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const galleryDir = path.join(projectRoot, 'public/images/gallery');
const targetFile = path.join(projectRoot, 'src/data/galleryData.js');

if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

// Allowed image file extensions
const validExts = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);

const files = fs.readdirSync(galleryDir)
  .filter(f => validExts.has(path.extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

console.log(`Found ${files.length} images in ${galleryDir}`);

const galleryEntries = files.map((filename, index) => {
  // Use encoded path for web URL
  const encodedPath = `/images/gallery/${encodeURI(filename)}`;
  const ext = path.extname(filename).replace('.', '');
  // Alternate domestic & international or default
  const category = index % 2 === 0 ? 'domestic' : 'international';
  
  return {
    id: `traveler-img-${index + 1}`,
    image: encodedPath,
    src: encodedPath,
    category,
    alt: `Gumnu JUM Traveler Photo ${index + 1}`,
    title: `Traveler Photo ${index + 1}`,
    format: ext
  };
});

const fileHeader = `// AUTO-GENERATED & CURATED TRAVELER GALLERY DATASET (${files.length} Real Traveler Images)
// All photos live in 'public/images/gallery/'
// To add new photos: drop them in 'public/images/gallery/' and run 'node scripts/update-gallery.js'

export const CURATED_GALLERY_IMAGES = ${JSON.stringify(galleryEntries, null, 2)};

export const INITIAL_GALLERY_PHOTOS = CURATED_GALLERY_IMAGES;
`;

fs.writeFileSync(targetFile, fileHeader, 'utf8');
console.log(`Updated ${targetFile} successfully with ${files.length} images.`);
