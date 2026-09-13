import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Compass, ArrowRight, MessageSquare, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

/**
 * HERO BACKGROUND IMAGE CONFIGURATION:
 * Replace this path with your own image asset in the project (e.g., '/assets/hero.jpg')
 */
export const HERO_BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85';

export const HeroFlightPath = () => {
  const { navigateTo, openWhatsApp } = useWanderlust();

  return (
    <section className="relative w-full min-h-[82vh] lg:min-h-[86vh] flex items-center justify-center overflow-hidden bg-[#0F172A]">
      {/* 1. Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BACKGROUND_IMAGE}
          alt="Wanderlust Luxury Travel Experience"
          className="w-full h-full object-cover object-center scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
          loading="eager"
          fetchPriority="high"
        />
        {/* Subtle, atmospheric gradient overlay - preserves image vibrancy while ensuring readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-[#0F172A]/30 backdrop-brightness-[0.92]" />
      </div>

      {/* 2. Main Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center space-y-8 animate-fadeIn">
        
        {/* Luxury Tag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-[#C9A455]/40 shadow-lg shadow-black/20">
          <span className="w-2 h-2 rounded-full bg-[#C9A455] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#E2E8F0] font-bold">
            CURATED LUXURY & BESPOKE TRAVEL
          </span>
        </div>

        {/* Master Cinematic Headline */}
        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl drop-shadow-md">
          Go somewhere you'll <span className="text-[#C9A455] italic font-serif">actually</span> remember.
        </h1>

        {/* Supporting Subtext */}
        <p className="text-base sm:text-lg text-slate-200 font-sans max-w-2xl leading-relaxed drop-shadow-xs font-medium">
          Handcrafted itineraries, private coastal villas, and personalized concierge care. We design unforgettable holidays tailored precisely to your style.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('destinations')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C9A455] hover:bg-[#b89547] text-[#0F172A] font-extrabold text-sm transition-all duration-300 shadow-xl shadow-amber-950/20 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => openWhatsApp(null, "Hello Wanderlust, I would like to plan my upcoming holiday journey.")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366] fill-current" />
            <span>Plan with Concierge</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-8 border-t border-white/15 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-3 gap-6 text-slate-300 text-xs">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A455] shrink-0" />
            <span className="font-semibold">100% Customized Journeys</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A455] shrink-0" />
            <span className="font-semibold">5-Star Handpicked Stays</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2">
            <Compass className="w-4 h-4 text-[#C9A455] shrink-0" />
            <span className="font-semibold">24/7 Dedicated Concierge</span>
          </div>
        </div>

      </div>
    </section>
  );
};
