import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const PhotoLightbox = ({ isOpen, photos, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];
  const imgSrc = typeof currentPhoto === 'string' ? currentPhoto : (currentPhoto.image || currentPhoto.src);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Bar Controls */}
      <div 
        className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-sm">
          {currentIndex + 1} / {photos.length}
        </span>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-md"
          title="Close (Esc)"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 z-10 shadow-xl hover:scale-105"
        title="Previous photo"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Image */}
      <div 
        className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imgSrc}
          alt="Traveler Gallery Photo"
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl transition-transform duration-300"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 z-10 shadow-xl hover:scale-105"
        title="Next photo"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
