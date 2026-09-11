import React from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { MapPin, ArrowRight, Heart, Sparkles } from 'lucide-react';

export const PackageCard = ({ pkg }) => {
  const { navigateTo, savedWishlist, toggleWishlist } = useWaypoint();
  const isSaved = savedWishlist.includes(pkg.id);

  return (
    <div
      onClick={() => navigateTo('detail', pkg)}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Card Hero Image Container */}
        <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900">
          <img
            src={pkg.heroImage}
            alt={pkg.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

          {/* Category Tag Badge */}
          <div className="absolute top-3.5 left-3.5">
            <span className="font-mono text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[#C9A455] border border-[#C9A455]/30 shadow-xs">
              {pkg.category === 'domestic' ? 'Domestic Escape' : 'International Tour'}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(pkg.id);
            }}
            title="Save to wishlist"
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 backdrop-blur-md flex items-center justify-center text-white transition-transform active:scale-90 cursor-pointer shadow-xs"
          >
            <Heart size={16} fill={isSaved ? '#EF4444' : 'none'} className={isSaved ? 'text-red-500' : 'text-white'} />
          </button>

          {/* Location on Image Bottom */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 text-xs text-sky-200 font-bold mb-0.5">
              <MapPin size={13} className="text-[#C9A455]" />
              <span className="font-mono uppercase text-[11px] tracking-wide">{pkg.location}</span>
            </div>
            <h3 className="font-sans font-extrabold text-xl text-white line-clamp-1">
              {pkg.name}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
            {pkg.tagline}
          </p>

          {/* Highlights Preview */}
          {pkg.highlights && pkg.highlights.length > 0 && (
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-700 font-semibold truncate">
              <Sparkles size={13} className="text-[#C9A455] shrink-0" />
              <span className="truncate">{pkg.highlights[0]?.title || pkg.highlights[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="p-5 pt-0">
        <div className="w-full py-2.5 px-4 rounded-xl bg-slate-50 group-hover:bg-[#0F172A] group-hover:text-white text-slate-900 font-extrabold text-xs transition-colors duration-200 flex items-center justify-between">
          <span>Explore Itinerary</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
