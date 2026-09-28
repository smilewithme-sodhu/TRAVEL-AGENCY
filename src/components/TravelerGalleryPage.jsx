import React, { useState } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Sparkles, Maximize2, Camera } from 'lucide-react';
import { PhotoLightbox } from './PhotoLightbox';

export const TravelerGalleryPage = () => {
  const { galleryPhotos } = useWanderlust();
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const photosList = galleryPhotos && galleryPhotos.length > 0 ? galleryPhotos : [];
  const filteredPhotos = filter === 'all'
    ? photosList
    : photosList.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#0284C7] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>AUTHENTIC TRAVELER MEMORIES • GUMNU JUM</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-[#0C4A6E]">
            Traveler Gallery
          </h1>
          <p className="text-slate-500 text-sm mt-2 max-w-xl font-medium">
            Explore authentic captures and moments from our travelers across domestic & international journeys.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-sky-100">
            {['all', 'domestic', 'international'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#0C4A6E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0C4A6E]'
                }`}
              >
                {cat === 'all' ? 'All Photos' : cat === 'domestic' ? 'Domestic (India)' : 'International'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid - Pure Photography, Words Removed */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id || index}
              onClick={() => setLightboxIndex(index)}
              className="relative aspect-square sm:aspect-[4/5] bg-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden border border-sky-100/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <img
                src={photo.image || photo.src}
                alt={photo.alt || `Traveler Photo ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/gallery/aruna-rai-cruise.webp";
                }}
              />

              {/* Hover Zoom Overlay */}
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/25 transition-colors duration-300 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/90 text-slate-800 shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 flex items-center justify-center">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-sky-100 shadow-sm">
          <Camera size={48} className="text-slate-300 mx-auto mb-4" />
          <h3 className="font-display font-bold text-xl text-[#0C4A6E]">
            No photos found in this category
          </h3>
          <p className="text-xs text-slate-500 mt-1">Try switching back to "All Photos".</p>
        </div>
      )}

      {/* Lightbox Modal */}
      <PhotoLightbox
        isOpen={lightboxIndex !== null}
        photos={filteredPhotos}
        currentIndex={lightboxIndex || 0}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredPhotos.length - 1))}
        onNext={() => setLightboxIndex(prev => (prev < filteredPhotos.length - 1 ? prev + 1 : 0))}
      />

    </div>
  );
};
