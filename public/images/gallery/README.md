# Traveler Gallery Images Directory

This folder is dedicated **exclusively** to traveler and customer trip photos shown in the Gumnu JUM Traveler Gallery and homepage carousel.

## Folder Separation
- `public/images/gallery/` (This folder): All real traveler photos, vacation memories, and trip moments.
- `public/images/destinations/`: Destination catalog photos (hero.jpg, glimpse-1.jpg, etc.).
- `public/images/`: Global brand assets only (hero banner `hero.png`, logos, and founder portrait).

## How to Add New Gallery Photos
1. Drop any image (`.jpg`, `.jpeg`, `.png`, `.webp`) directly into this `public/images/gallery/` folder.
2. In your terminal, run:
   ```bash
   npm run update-gallery
   ```
   *(or `node scripts/update-gallery.js`)*

The script will instantly detect all images in this folder and update `src/data/galleryData.js`.
