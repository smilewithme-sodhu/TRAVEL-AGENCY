import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { MapPin, ArrowRight, Heart, Sparkles, Flame } from 'lucide-react';

export const PackageCard = React.memo(({ pkg }) => {
  const { navigateTo, savedWishlist, toggleWishlist } = useWanderlust();
  const isSaved = savedWishlist?.includes(pkg.id);

  const title = pkg.name || pkg.title || 'Exotic Destination';
  const heroImage = pkg.heroImage || pkg.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80';
  const location = pkg.location || 'Explore Journey';
  const category = pkg.category || 'international';
  const tagline = pkg.tagline || 'Experience an extraordinary bespoke journey tailored just for you.';

  // Highlight popular FOMO destinations
  const isHighDemand = ['sikkim', 'bali', 'dubai', 'thailand', 'kashmir', 'kerala', 'vietnam'].includes(pkg.id?.toString().toLowerCase());

  return (
    <div
      onClick={() => navigateTo('detail', pkg)}
      className="group bg-white rounded-3xl overflow-hidden border border-sky-100/80 shadow-xs hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Card Hero Image Container */}
        <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={heroImage}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
          />
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />

          {/* Category Tag Badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            <span className={`font-mono text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full shadow-xs ${
              category === 'domestic'
                ? 'bg-[#0284C7] text-white'
                : 'bg-[#F97316] text-white'
            }`}>
              {category === 'domestic' ? 'Domestic Escape' : 'International Tour'}
            </span>

            {/* FOMO Demand Tag */}
            {isHighDemand && (
              <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FACC15] text-[#0A3161] shadow-xs flex items-center gap-1">
                <Flame size={11} className="fill-current text-[#EA580C]" />
                <span>Fast Filling</span>
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(pkg.id);
            }}
            title="Save to wishlist"
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 backdrop-blur-md flex items-center justify-center text-white transition-transform active:scale-90 cursor-pointer shadow-xs"
          >
            <Heart size={16} fill={isSaved ? '#EF4444' : 'none'} className={isSaved ? 'text-red-500' : 'text-white'} />
          </button>

          {/* Location on Image Bottom */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 text-xs text-sky-200 font-bold mb-0.5">
              <MapPin size={13} className="text-[#38BDF8]" />
              <span className="font-mono uppercase text-[11px] tracking-wide">{location}</span>
            </div>
            <h3 className="font-sans font-extrabold text-xl text-white line-clamp-1">
              {title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
            {tagline}
          </p>

          {/* Highlights Preview */}
          {pkg.highlights && pkg.highlights.length > 0 && (
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-[#0C4A6E] font-semibold truncate">
              <Sparkles size={13} className="text-[#F97316] shrink-0" />
              <span className="truncate">{pkg.highlights[0]?.title || pkg.highlights[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="p-5 pt-0">
        <div className="w-full py-2.5 px-4 rounded-xl bg-sky-50 group-hover:bg-[#0A3161] group-hover:text-white text-[#0A3161] font-extrabold text-xs transition-colors duration-200 flex items-center justify-between">
          <span>Explore Itinerary</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.pkg.id === nextProps.pkg.id;
});
