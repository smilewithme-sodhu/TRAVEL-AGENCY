import React, { useState } from 'react';
import { DESTINATION_PACKAGES } from '../../data/packageData';
import { WhatsAppConciergeButton } from '../ui/WhatsAppConciergeButton';
import { Compass, MapPin, Sparkles, Star, Check } from 'lucide-react';

export const ExplorePage = () => {
  const [filter, setFilter] = useState('all');

  const filteredPackages =
    filter === 'all'
      ? DESTINATION_PACKAGES
      : DESTINATION_PACKAGES.filter((p) => p.category === filter);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
            Member Travel Collection
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover handpicked domestic and international journeys eligible for qualifying travel activation.
          </p>
        </div>

        <WhatsAppConciergeButton customMessage="Hi Gumnu JUM, I am looking to customize a special holiday package." />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filter === 'all' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          All Destinations ({DESTINATION_PACKAGES.length})
        </button>
        <button
          onClick={() => setFilter('domestic')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filter === 'domestic' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Domestic Escapes (India)
        </button>
        <button
          onClick={() => setFilter('international')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filter === 'international' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          International Adventures
        </button>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={pkg.heroImage}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 shadow-sm">
                    {pkg.category === 'domestic' ? 'Domestic' : 'International'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-[10px] text-sky-200 font-bold">
                    <MapPin className="w-3 h-3" />
                    <span>{pkg.location}</span>
                  </div>
                  <h3 className="font-sans font-extrabold text-lg text-white line-clamp-1">
                    {pkg.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {pkg.tagline}
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Featured Highlights:</div>
                  {pkg.highlights?.slice(0, 2).map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1 font-medium">{h.title || h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 mt-2">
              <WhatsAppConciergeButton
                size="md"
                className="w-full"
                destinationName={pkg.name}
                customMessage={`Hi Gumnu JUM, I am a member interested in travelling to ${pkg.name}. I would like to know about available dates and custom luxury stay options.`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
