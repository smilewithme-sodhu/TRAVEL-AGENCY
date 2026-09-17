import React, { useState } from 'react';
import { usePackages } from '../../api/client';
import { CheckoutModal } from './CheckoutModal';
import { MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

export const PackagesPage = () => {
  const { data: packages, isLoading, isError } = usePackages();
  const [selectedPackage, setSelectedPackage] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C9A455] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !packages) {
    return (
      <div className="p-8 min-h-screen bg-[#0F172A]">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-red-400 text-center">
          Failed to load travel packages. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-[#C9A455] font-bold tracking-widest text-sm uppercase mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Exclusive Journeys
          </h3>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Discover Your Next Adventure</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Curated travel experiences with premium accommodations, guided tours, and unforgettable moments.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const price = pkg.prices?.[0];
            const amount = price ? Number(price.sellingPrice) : 0;
            
            return (
              <div key={pkg.id} className="bg-[#1E293B] rounded-3xl border border-slate-800 overflow-hidden hover:border-slate-600 transition-colors group flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent z-10" />
                  <img 
                    src={pkg.coverImage || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80"} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#C9A455] border border-[#C9A455]/30">
                    {Number(price?.binaryVolumeBudget || 0)} BV Points
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col relative z-20 -mt-10">
                  <div className="flex items-center gap-4 text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#C9A455]" /> {pkg.destination?.name || 'Various'}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#C9A455]" /> {(pkg.durationNights + 1)}D / {(pkg.durationNights + 1) - 1}N</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4 line-clamp-2">{pkg.name}</h2>
                  <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">{pkg.highlights?.[0] || 'A premium curated travel experience.'}</p>
                  
                  <div className="flex items-end justify-between mt-auto pt-6 border-t border-slate-700">
                    <div>
                      <p className="text-xs text-slate-500 font-medium mb-1">Starting from</p>
                      <p className="text-2xl font-bold text-white">?{amount.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedPackage(pkg)}
                      className="bg-transparent hover:bg-[#C9A455] text-[#C9A455] hover:text-[#0F172A] border border-[#C9A455] font-bold py-2.5 px-6 rounded-full transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <CheckoutModal 
        isOpen={!!selectedPackage} 
        onClose={() => setSelectedPackage(null)} 
        selectedPackage={selectedPackage} 
      />
    </div>
  );
};

