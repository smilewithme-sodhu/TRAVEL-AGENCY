import React, { useState, useRef } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { ChevronLeft, ChevronRight, Sparkles, Maximize2, ArrowRight } from 'lucide-react';
import { PhotoLightbox } from './PhotoLightbox';

export const TravelerGalleryCarousel = () => {
  const { galleryPhotos, navigateTo } = useWanderlust();
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Photos for homepage preview (first 16 photos)
  const previewPhotos = (galleryPhotos && galleryPhotos.length > 0) ? galleryPhotos.slice(0, 16) : [];

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section className="bg-[#F8FAFC] py-16 sm:py-24 border-b border-sky-100/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#0284C7] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
              <span>TRAVELER MEMORIES</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0C4A6E] tracking-tight">
              Captured Moments
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-lg font-medium">
              Authentic journeys and memories shared by travelers on our tours.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full bg-white hover:bg-sky-50 border border-sky-100 text-[#0C4A6E] flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer shadow-xs"
              title="Previous Photos"
              aria-label="Previous photos"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full bg-white hover:bg-sky-50 border border-sky-100 text-[#0C4A6E] flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer shadow-xs"
              title="Next Photos"
              aria-label="Next photos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track - Pure Images, Words Removed */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-5 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {previewPhotos.map((photo, index) => (
            <div
              key={photo.id || index}
              onClick={() => setLightboxIndex(index)}
              className="w-64 sm:w-72 md:w-80 h-80 sm:h-96 shrink-0 bg-slate-100 rounded-3xl overflow-hidden border border-sky-100/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer snap-start group relative"
            >
              <img
                src={photo.image || photo.src}
                alt={photo.alt || "Traveler Memory"}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/gallery/daden-bhutia-beach.webp";
                }}
              />

              {/* Hover Zoom Overlay */}
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/90 text-slate-800 shadow-lg opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 flex items-center justify-center">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery Bottom CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigateTo('gallery')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0C4A6E] hover:bg-[#075985] text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer group"
          >
            <span>View All Traveler Photos in Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        isOpen={lightboxIndex !== null}
        photos={previewPhotos}
        currentIndex={lightboxIndex || 0}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex(prev => (prev > 0 ? prev - 1 : previewPhotos.length - 1))}
        onNext={() => setLightboxIndex(prev => (prev < previewPhotos.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
};
