import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Compass, ArrowRight, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * HERO BACKGROUND IMAGE CONFIGURATION:
 */
export const HERO_BACKGROUND_IMAGE = '/images/WhatsApp Image 2026-09-23 at 12.57.37 PM.jpeg';

export const HeroFlightPath = () => {
  const { navigateTo, openWhatsApp } = useWanderlust();

  return (
    <section className="relative w-full min-h-[84vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0C4A6E]">
      {/* 1. Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BACKGROUND_IMAGE}
          alt="Gumnu JUM Travel Adventure"
          className="w-full h-full object-cover object-center scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
          loading="eager"
          fetchPriority="high"
        />
        {/* Crisp Ocean Navy atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C4A6E] via-[#0C4A6E]/55 to-[#0C4A6E]/20 backdrop-brightness-[0.96]" />
      </div>

      {/* 2. Main Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center space-y-8 animate-fadeIn">
        
        {/* Micro Tag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/25 shadow-lg shadow-black/20">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white font-bold">
            Gumnu JUM by Lisa Travels | Explore • Experience • Create Memories
          </span>
        </div>

        {/* Master Cinematic Headline */}
        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl drop-shadow-md">
          Dream Destination, <span className="text-[#F97316] italic font-serif">Budget Friendly</span>.
        </h1>

        {/* Supporting Subtext */}
        <p className="text-base sm:text-lg text-sky-100 font-sans max-w-2xl leading-relaxed drop-shadow-xs font-medium">
          Affordable Travel, Unforgettable Experiences.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('destinations')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-sm transition-all duration-300 shadow-xl shadow-orange-950/30 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Explore Destinations</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => openWhatsApp(null, "Hello Gumnu JUM, I would like to plan my upcoming holiday journey.")}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/30 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366] fill-current" />
            <span>Plan with Concierge</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-8 border-t border-white/20 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-3 gap-6 text-slate-200 text-xs">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0" />
            <span className="font-semibold">100% Customized Journeys</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F97316] shrink-0" />
            <span className="font-semibold">Handpicked Value Stays</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2">
            <Compass className="w-4 h-4 text-[#38BDF8] shrink-0" />
            <span className="font-semibold">24/7 Dedicated Support</span>
          </div>
        </div>

      </div>
    </section>
  );
};
