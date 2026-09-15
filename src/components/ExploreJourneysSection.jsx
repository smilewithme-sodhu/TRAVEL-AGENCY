import React, { useState, useMemo } from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { PackageCard } from './PackageCard';
import { ArrowRight, Compass } from 'lucide-react';

export const ExploreJourneysSection = () => {
  const { allPackages, domesticPackages, internationalPackages, navigateTo } = useWaypoint();
  const [filter, setFilter] = useState('all');

  const featuredList = useMemo(() => {
    if (filter === 'domestic') return domesticPackages;
    if (filter === 'international') return internationalPackages;
    return allPackages.slice(0, 6); // Curated 6 on homepage for optimal spacing
  }, [filter, domesticPackages, internationalPackages, allPackages]);

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A455] font-bold mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>HAND-CRAFTED DESTINATIONS</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Explore Our Journeys
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-lg font-medium">
              Discover private villa escapes, mountain retreats, and bespoke international expeditions.
            </p>
          </div>

          {/* Category Toggle Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'Featured All' },
              { id: 'domestic', label: 'Domestic Escapes' },
              { id: 'international', label: 'International' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Package Grid (3-column desktop, 2-column tablet, 1-column mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredList.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Section Bottom View More CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo(filter === 'international' ? 'international' : 'domestic')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>View Complete Destination Catalog</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
};
