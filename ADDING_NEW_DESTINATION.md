# HOW TO ADD A NEW DESTINATION — Gumnu JUM by Lisa Travels

> Follow these steps every time you want to add a new travel destination. No developer needed!

---

## STEP 1 — Create the Image Folder

Inside `public/images/destinations/` create a new folder named after your destination (lowercase, no spaces):

```
public/images/destinations/
  └── maldives/        ← example
```

---

## STEP 2 — Add Your Images

Put these images inside the folder. Rename your photos to match **exactly**:

| Filename | What It Is |
|----------|------------|
| `hero.webp` | Main banner image (wide landscape, 1600px wide) |
| `glimpse-1.webp` | Gallery photo 1 |
| `glimpse-2.webp` | Gallery photo 2 |
| `glimpse-3.webp` | Gallery photo 3 |
| `glimpse-4.webp` | Gallery photo 4 |
| `spot-NAME.webp` | One image per tourist spot (name it anything descriptive) |

> **Accepted formats:** `.webp` (best), `.jpg`, `.jpeg`, `.png`
> **Best size:** Hero = 1600×900px · Gallery = 1200×800px · Spot = 800×600px

---

## STEP 3 — Copy This Template into `src/data/destinationData.ts`

Open `src/data/destinationData.ts` and paste this block inside the `TRAVEL_PACKAGES` array (before the last `]`):

```typescript
  {
    id: 'pkg-SLUG',                        // unique ID — e.g. 'pkg-maldives'
    slug: 'SLUG-description',              // URL slug — e.g. 'maldives-luxury-atolls'
    name: 'DESTINATION NAME',             // full package name
    tagline: 'Short exciting tagline',    // shown on the card
    overview: 'Full paragraph overview of the destination.',
    location: 'City 1, City 2 & City 3',
    stateOrCountry: 'Country Name',

    // CATEGORY: 'domestic' or 'international'
    category: 'international',

    // VIBE (pick any combo): 'mountains' | 'beach' | 'romantic' | 'luxury' | 'adventure'
    vibe: ['beach', 'luxury', 'romantic'],

    rating: 4.90,          // out of 5
    reviewCount: 200,      // estimated bookings / reviews

    bestSeason: 'November to April (Dry Season)',

    // ── IMAGES ──────────────────────────────────────────────────────────────
    heroImage: '/images/destinations/SLUG/hero.webp',
    galleryImages: [
      '/images/destinations/SLUG/glimpse-1.webp',
      '/images/destinations/SLUG/glimpse-2.webp',
      '/images/destinations/SLUG/glimpse-3.webp',
      '/images/destinations/SLUG/glimpse-4.webp',
    ],

    // ── WHY VISIT (4 bullet points) ──────────────────────────────────────────
    whyVisit: [
      'Highlight 1 — make it exciting',
      'Highlight 2 — a must-do experience',
      'Highlight 3 — unique to this destination',
      'Highlight 4 — luxury or romance angle'
    ],

    // ── INCLUDED FEATURES (4 bullets) ────────────────────────────────────────
    includedFeatures: [
      'Hotel type and rating',
      'Transport included',
      'Visa / permit help if international',
      '24/7 dedicated WhatsApp Concierge support'
    ],

    // ── TOURIST SPOTS (add 2 to 4) ────────────────────────────────────────────
    touristSpots: [
      {
        id: 'spot-SPOTNAME',
        name: 'Name of Tourist Spot',
        tagline: 'One dramatic sentence about this spot',
        shortDescription: 'Two sentences explaining what it is.',
        fullDescription: 'Full 3-4 sentence description of the experience, what you\'ll see, do, and feel.',
        image: '/images/destinations/SLUG/spot-SPOTNAME.webp',
        highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Tickets Included / Free Entry etc.',
        tag: 'Tag Label'            // shown as a badge on the card
      },
      {
        id: 'spot-SPOTNAME2',
        name: 'Second Tourist Spot',
        tagline: 'One dramatic sentence',
        shortDescription: 'Two sentences.',
        fullDescription: 'Full description.',
        image: '/images/destinations/SLUG/spot-SPOTNAME2.webp',
        highlights: ['Highlight 1', 'Highlight 2', 'Highlight 3'],
        recommendedHours: 'Full Day',
        entryInfo: 'Entry Info',
        tag: 'Tag Label'
      }
    ]
  },
```

---

## STEP 4 — Replace All SLUG Placeholders

Find and replace every occurrence of `SLUG` with your actual destination folder name. Example:
- `SLUG` → `maldives`
- `pkg-SLUG` → `pkg-maldives`

---

## STEP 5 — Save, Check & Commit

```powershell
# In the project folder:
git add .
git commit -m "feat: add Maldives destination package"
git push
```

Vercel auto-deploys in ~2 minutes. Done! ✅

---

## QUICK REFERENCE — Existing Destination Folders

| Folder | Destination |
|--------|-------------|
| `dubai/` | Dubai — UAE |
| `thailand/` | Thailand |
| `vietnam/` | Vietnam |
| `bali/` | Bali — Indonesia |
| `azerbaijan/` | Azerbaijan |
| `singapore/` | Singapore |
| `malaysia/` | Malaysia |
| `srilanka/` | Sri Lanka |
| `europe/` | Europe Grand Tour |
| `egypt/` | Egypt |
| `almaty/` | Almaty — Kazakhstan |
| `bhutan/` | Bhutan |
| `sikkim/` | Sikkim — India |
| `goa/` | Goa — India |
| `andaman/` | Andaman Islands — India |
| `rajasthan/` | Rajasthan — India |
| `kerala/` | Kerala — India |
| `ladakh/` | Ladakh — India |
| `darjeeling/` | Darjeeling — India |
| `srinagar/` | Srinagar — India |
| `manali/` | Manali — India |
| `kashmir/` | Kashmir — India |
| `mountabu/` | Mount Abu — India |

---

## NEED HELP?

Contact your tech partner:
**Tenverse Technology** — Official Software Architecture Partner of Gumnu JUM by Lisa Travels
