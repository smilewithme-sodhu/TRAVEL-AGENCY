import React, { useState, useRef } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Upload, MapPin, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const TravelerGalleryCarousel = () => {
  const { galleryPhotos, setIsUploadModalOpen, navigateTo } = useWanderlust();
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Curated 6-8 photos for homepage preview
  const previewPhotos = galleryPhotos.slice(0, 8);

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
    <section className="bg-[#F8F9FA] py-16 sm:py-24 border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A455] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REAL TRAVELER STORIES & MEMORIES</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Captured Moments
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-lg font-medium">
              Authentic journeys shared by travelers across our bespoke private itineraries.
            </p>
          </div>

          {/* Carousel Arrows & Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer shadow-2xs"
                title="Previous Photos"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer shadow-2xs"
                title="Next Photos"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <Upload size={14} />
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
              className="w-72 sm:w-80 shrink-0 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer snap-start group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={photo.image}
                  alt={photo.tripTitle}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-[10px] text-[#C9A455] font-bold">
                    <MapPin size={12} />
                    <span className="font-mono uppercase">{photo.location}</span>
                  </div>
                  <h4 className="font-sans font-bold text-sm text-white line-clamp-1">
                    {photo.tripTitle}
                  </h4>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-500 italic line-clamp-2 leading-relaxed">
                  "{photo.caption}"
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                  <span className="font-bold text-slate-900">{photo.travelerName}</span>
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>View Full Traveler Gallery</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
};
