import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWanderlust } from '../context/WanderlustContext';
import { DESTINATION_PACKAGES } from '../data/packageData';
import { PackageCard } from './PackageCard';
import { Search, MapPin, SlidersHorizontal, Compass } from 'lucide-react';

export const DestinationsCatalogPage = () => {
  const { allPackages } = useWanderlust();
  const location = useLocation();

  // Determine initial tab based on path or query
  const getInitialTab = () => {
    const path = location.pathname.toLowerCase();
    const searchParams = new URLSearchParams(location.search);
    const cat = searchParams.get('category')?.toUpperCase();
    if (cat === 'DOMESTIC' || path.includes('domestic')) return 'DOMESTIC';
    if (cat === 'INTERNATIONAL' || path.includes('international')) return 'INTERNATIONAL';
    return 'ALL';
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Scroll to top on mount or route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Sync tab with route if path changes
  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [location.pathname, location.search]);

  const packagesList = (allPackages && allPackages.length > 0) ? allPackages : DESTINATION_PACKAGES;

  const filteredPackages = useMemo(() => {
    return packagesList.filter(pkg => {
      const name = pkg.name || pkg.title || '';
      const loc = pkg.location || '';
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            loc.toLowerCase().includes(searchQuery.toLowerCase());
      const category = (pkg.category || '').toUpperCase();
      const matchesTab = activeTab === 'ALL' || category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [packagesList, searchQuery, activeTab]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      
      {/* Hero Header */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#082F49] text-white text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
            <Compass className="w-4 h-4 text-[#F97316]" />
            <span>GUMNU JUM BY LISA TRAVELS • ALL CATALOGUE</span>
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            Explore All Destinations
          </h1>
          <p className="text-sky-100/90 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Affordable luxury domestic & international tours, handcrafted for every budget.
          </p>

          {/* Search Bar */}
          <div className="pt-2">
            <div className="flex items-center bg-white rounded-full px-5 py-2.5 max-w-lg mx-auto shadow-lg shadow-black/20 border border-sky-100">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search destination (e.g., Dubai, Sikkim, Bali)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none outline-none px-3 text-xs sm:text-sm text-[#0C4A6E] bg-transparent placeholder-slate-400 font-semibold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-sky-100/80">
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-sky-100">
            {['ALL', 'DOMESTIC', 'INTERNATIONAL'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0A3161] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0A3161]'
                }`}
              >
                {tab === 'ALL' ? 'All Destinations' : tab === 'DOMESTIC' ? 'Domestic (India)' : 'International'}
              </button>
            ))}
          </div>
          
          <div className="text-xs text-slate-500 font-bold flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[#0284C7]" />
            <span>Showing {filteredPackages.length} Destinations</span>
          </div>
        </div>

        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id || pkg._id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-sky-100 p-8 shadow-sm">
            <MapPin size={48} className="mx-auto mb-4 text-slate-300 opacity-60" />
            <h3 className="text-lg font-bold text-[#0C4A6E] mb-1">No destinations found</h3>
            <p className="text-xs text-slate-500">Try searching for a different destination or category.</p>
          </div>
        )}
      </div>

    </div>
  );
};
