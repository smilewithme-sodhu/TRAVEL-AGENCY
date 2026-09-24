import React, { useState } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Upload, MapPin, Camera, Sparkles } from 'lucide-react';

export const TravelerGalleryPage = () => {
  const { galleryPhotos, setIsUploadModalOpen } = useWanderlust();
  const [filter, setFilter] = useState('all');

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
            Explore authentic photos captured by travelers across our domestic & international journeys.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filters */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-sky-100">
            {['all', 'domestic', 'international'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#0A3161] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0A3161]'
                }`}
              >
                {cat === 'all' ? 'All Photos' : cat === 'domestic' ? 'Domestic (India)' : 'International'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FACC15] hover:bg-yellow-400 text-[#0A3161] font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            <Upload size={16} />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-3xl overflow-hidden border border-sky-100/80 shadow-xs hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Container */}
              <div className="relative w-full h-72 overflow-hidden bg-slate-100">
                <img
                  src={photo.image || photo.src}
                  alt={photo.tripTitle || photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Category Tag */}
                <span
                  className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${
                    photo.category === 'domestic'
                      ? 'bg-[#0284C7] text-white'
                      : 'bg-[#F97316] text-white'
                  }`}
                >
                  {photo.category === 'domestic' ? 'India' : 'International'}
                </span>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#0284C7] font-semibold mb-1">
                    <MapPin size={14} className="shrink-0" />
                    <span>{photo.location}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#0C4A6E] line-clamp-1">
                    {photo.tripTitle || photo.title}
                  </h3>

                  <p className="text-xs text-slate-500 italic line-clamp-2 leading-relaxed mt-1">
                    "{photo.caption || 'Unforgettable journey arranged by Gumnu JUM Travels!'}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0A3161]">
                    {photo.travelerName || photo.traveler}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 font-semibold">
                    {photo.date || 'VERIFIED'}
                  </span>
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
          <p className="text-xs text-slate-500 mt-1">Try switching categories or uploading your vacation photo!</p>
        </div>
      )}

    </div>
  );
};
