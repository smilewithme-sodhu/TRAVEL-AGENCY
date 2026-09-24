import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWanderlust } from '../context/WanderlustContext';
import { DESTINATION_PACKAGES } from '../data/packageData';
import { ArrowLeft, Check, MapPin, MessageSquare, Phone, ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';

export const DestinationDetail = () => {
  const { id } = useParams();
  const { selectedDestination, selectedPackage, allPackages, navigateTo, toggleWishlist, savedWishlist, openWhatsApp, openPhoneCall, agencyPhone } = useWanderlust();
  
  // Instant scroll to top when landing on a destination page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // Find destination from context or URL param fallback
  const packagesList = (allPackages && allPackages.length > 0) ? allPackages : DESTINATION_PACKAGES;
  const dest = (id ? packagesList.find(p => 
      p.id?.toString().toLowerCase() === id.toString().toLowerCase() ||
      (p.title && p.title.toLowerCase().replace(/\s+/g, '-')) === id.toLowerCase() ||
      (p.name && p.name.toLowerCase().replace(/\s+/g, '-')) === id.toLowerCase()
    ) : null)
    || (selectedDestination && selectedDestination.id ? selectedDestination : null)
    || selectedPackage
    || packagesList[0]
    || {};

  const isSaved = savedWishlist?.includes(dest.id) || false;

  // Normalized package properties
  const title = dest.name || dest.title || 'Exotic Destination';
  const heroImage = dest.heroImage || dest.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80';
  const location = dest.location || dest.stateOrCountry || 'Travel Paradise';
  const category = dest.category || 'international';
  const tagline = dest.tagline || 'Experience an extraordinary bespoke journey tailored just for you.';
  const description = dest.description || 'Discover breathtaking landscapes, rich cultural heritage, and world-class stays curated by Gumnu JUM by Lisa Travels.';
  const whyVisit = dest.whyVisit || [
    { icon: '✨', title: 'Curated Experiences', desc: 'Private excursions and handpicked boutique stays.' },
    { icon: '🏔', title: 'Scenic Landscapes', desc: 'Breathtaking natural wonders and iconic viewpoints.' },
    { icon: '🏛', title: 'Rich Culture & Heritage', desc: 'Immersive local traditions and historic landmarks.' },
    { icon: '🌟', title: 'Unforgettable Memories', desc: 'Bespoke moments crafted for couples, families, and groups.' }
  ];
  const highlights = dest.highlights || dest.touristSpots || [
    { title: 'Iconic City & Landmark Tour', desc: 'Experience the world-renowned highlights with VIP access.' },
    { title: 'Scenic Sunset Excursion', desc: 'Private evening tour with panoramic photography spots.' },
    { title: 'Authentic Culinary Experience', desc: 'Indulge in authentic regional flavors and fine dining.' }
  ];
  const galleryImages = dest.galleryImages || [heroImage];

  return (
    <div className="bg-[#F8FAFC] pb-24 min-h-screen">
      
      {/* Full Bleed Hero Photo Header */}
      <div className="relative w-full h-[450px] lg:h-[500px] overflow-hidden bg-slate-900">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Deep Ocean Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#082F49] via-[#082F49]/60 to-transparent" />

        {/* Top Back Navigation Bar */}
        <div className="absolute top-6 left-6 z-10 flex gap-3">
          <button
            onClick={() => navigateTo('destinations')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft size={16} />
            <span>All Destinations</span>
          </button>
        </div>

        {/* Hero Headline Overlay */}
        <div className="absolute bottom-8 left-6 right-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`font-mono text-xs uppercase px-3 py-1 rounded-full font-bold tracking-wider shadow-sm ${
                category === 'domestic'
                  ? 'bg-[#0284C7] text-white'
                  : 'bg-[#F97316] text-white'
              }`}
            >
              {category === 'domestic' ? 'Domestic Escape (India)' : 'International Adventure'}
            </span>
            <span className="text-sky-200 font-semibold text-xs flex items-center gap-1.5">
              <MapPin size={14} className="text-[#38BDF8]" />
              {location}
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-md mb-2">
            {title}
          </h1>

          <p className="text-sky-100/90 text-sm sm:text-base max-w-2xl leading-relaxed font-medium">
            {tagline}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column (8 cols on lg) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-10">
          
          {/* About The Destination */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-100/80 shadow-sm space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[#0284C7] font-bold">
              DESTINATION NARRATIVE
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0C4A6E]">
              About {title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Why Travel Here Cards */}
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-[#0284C7] font-bold">
              KEY HIGHLIGHTS & ATTRACTIONS
            </div>
            <h3 className="font-display font-bold text-2xl text-[#0C4A6E]">
              Why Travel to {title}?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyVisit.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-sky-100/80 shadow-xs space-y-2 hover:border-sky-200 transition-colors"
                >
                  <div className="text-2xl mb-1">
                    {item.icon || '✨'}
                  </div>
                  <h4 className="font-display font-bold text-base text-[#0C4A6E]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc || item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Destination Highlights */}
          {highlights.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-100/80 shadow-sm space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-[#0284C7] font-bold">
                CURATED EXPERIENCES
              </div>
              <h3 className="font-display font-bold text-2xl text-[#0C4A6E]">
                Featured Highlights
              </h3>
              <div className="space-y-4">
                {highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      <Check size={14} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-base text-[#0C4A6E]">
                        {h.title || h.name || h}
                      </h5>
                      {h.desc && (
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {h.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cinematic Photo Gallery */}
          {galleryImages.length > 1 && (
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-[#0284C7] font-bold">
                CINEMATIC GALLERY
              </div>
              <h3 className="font-display font-bold text-2xl text-[#0C4A6E]">
                Glimpses of {title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galleryImages.map((imgUrl, idx) => (
                  <div key={idx} className="h-36 sm:h-44 rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
                    <img src={imgUrl} alt={`${title} photo ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column Sticky Booking Card (5 cols on lg) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 bg-[#082F49] text-white p-6 sm:p-8 rounded-3xl border border-[#0C4A6E] shadow-xl shadow-blue-950/20 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-sky-800/60">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-[#38BDF8]" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#38BDF8]">
                  GUMNU JUM CONCIERGE
                </span>
              </div>
              <button
                onClick={() => toggleWishlist(dest.id)}
                className="cursor-pointer text-slate-400 hover:text-white transition-colors"
                title="Save to wishlist"
              >
                <Heart size={20} fill={isSaved ? '#EF4444' : 'none'} className={isSaved ? 'text-red-500' : ''} />
              </button>
            </div>

            <h3 className="font-display font-bold text-2xl text-white">
              Plan Your Trip to {title}
            </h3>

            <p className="text-xs text-sky-100/80 leading-relaxed">
              Every vacation is hand-tailored by our travel consultants on WhatsApp based on your preferred dates, budget, and group size.
            </p>

            {/* Direct WhatsApp Action */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => openWhatsApp(dest, `Hello Gumnu JUM by Lisa Travels, I would like to plan a vacation to ${title}. Please share available dates, hotel stays, and a custom quote.`)}
                className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <MessageSquare size={18} className="fill-current" />
                <span>Plan on WhatsApp</span>
              </button>

              <button
                onClick={openPhoneCall}
                className="w-full py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone size={15} className="text-[#38BDF8]" />
                <span>Call Concierge: {agencyPhone}</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-4 border-t border-sky-800/60 space-y-2.5 text-xs text-sky-100/90">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#F97316] shrink-0" />
                <span>Handpicked Value & Boutique Stays</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#38BDF8] shrink-0" />
                <span>24/7 Dedicated Support On Trip</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
