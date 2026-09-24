import React, { useState, useRef } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Upload, MapPin, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const TravelerGalleryCarousel = () => {
  const { galleryPhotos, setIsUploadModalOpen, navigateTo } = useWanderlust();
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Curated photos for homepage preview
  const previewPhotos = (galleryPhotos && galleryPhotos.length > 0) ? galleryPhotos.slice(0, 12) : [];

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
              <span>REAL TRAVELER STORIES & MEMORIES</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0C4A6E] tracking-tight">
              Captured Moments
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-lg font-medium">
              Authentic journeys shared by travelers on our Gumnu JUM private and group tours.
            </p>
          </div>

          {/* Carousel Arrows & Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full bg-white hover:bg-sky-50 border border-sky-100 text-[#0C4A6E] flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer shadow-xs"
                title="Previous Photos"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full bg-white hover:bg-sky-50 border border-sky-100 text-[#0C4A6E] flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer shadow-xs"
                title="Next Photos"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-sky-50 border border-sky-100 text-[#0C4A6E] text-xs font-bold transition-colors cursor-pointer"
            >
              <Upload size={14} className="text-[#0284C7]" />
              <span>Share Your Photo</span>
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={carouselRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-5 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {previewPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => navigateTo('gallery')}
              className="w-72 sm:w-80 shrink-0 bg-white rounded-3xl overflow-hidden border border-sky-100/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer snap-start group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={photo.image || photo.src}
                  alt={photo.tripTitle || photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-[10px] text-[#38BDF8] font-bold">
                    <MapPin size={12} />
                    <span className="font-mono uppercase">{photo.location}</span>
                  </div>
                  <h4 className="font-sans font-bold text-sm text-white line-clamp-1">
                    {photo.tripTitle || photo.title}
                  </h4>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-500 italic line-clamp-2 leading-relaxed">
                  "{photo.caption || 'Unforgettable journey with Gumnu JUM Travels!'}"
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                  <span className="font-bold text-[#0C4A6E]">{photo.travelerName || photo.traveler}</span>
                  <span className="font-mono text-[10px] text-slate-400">{photo.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery Bottom CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigateTo('gallery')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0C4A6E] hover:bg-[#075985] text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>View All 65+ Traveler Memories in Gallery</span>
          </button>
        </div>

      </div>
    </section>
  );
};
