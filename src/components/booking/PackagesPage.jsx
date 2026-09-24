import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Star, ShieldCheck, ArrowRight, MapPin, Clock } from 'lucide-react';
import { apiClient } from '../../api/client';

export const PackagesPage = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [memberStatus, setMemberStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch live data from backend
    const fetchPackages = async () => {
      try {
        const response = await apiClient.get('/api/packages/active');
        if (response.data.success) {
          setPackages(response.data.data.packages);
          setMemberStatus(response.data.data.memberStatus); // e.g., hasBooked: boolean
        }
      } catch (err) {
        console.error("Failed to load packages");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-[#C9A455] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] min-h-full rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-800 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* --- FOMO UPGRADE BANNER --- */}
      {memberStatus && !memberStatus.hasBooked && (
        <div className="bg-gradient-to-r from-indigo-900 to-[#0F172A] border border-indigo-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4">
            <Star size={150} />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A455]/20 text-[#C9A455] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck size={14} />
              Action Required
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-display">
              Upgrade to <span className="text-[#C9A455]">Traveller</span> Status
            </h1>
            <p className="text-slate-300 text-lg mb-6 leading-relaxed">
              Your network is growing, but your <strong className="text-white">5-Level Team Bonus</strong> is currently locked. Book any of our premium domestic or international packages below to permanently unlock your upline commissions and start earning from your downline's travel.
            </p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Exclusive Member Journeys</h2>
        
        {packages.length === 0 ? (
          <div className="text-center py-12 bg-[#1E293B] rounded-xl border border-slate-800">
            <Plane className="mx-auto text-slate-500 mb-4" size={48} />
            <h3 className="text-xl text-white font-semibold">New Packages Arriving Soon</h3>
            <p className="text-slate-400 mt-2">Our curation team is finalizing exclusive deals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-[#1E293B] rounded-2xl overflow-hidden border border-slate-800 group hover:border-[#C9A455]/50 transition-all duration-300 flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  {/* Assuming pkg.heroImageUrl exists, fallback to placeholder */}
                  <img 
                    src={pkg.heroImageUrl || "/images/placeholder-dest.jpg"} 
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider border border-white/10">
                    {pkg.packageType}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A455] transition-colors">
                    {pkg.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                    <span className="flex items-center gap-1"><Clock size={14} /> {pkg.durationNights} Nights</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {pkg.destination.region}</span>
                  </div>

                  {/* Pricing & Business Value Box */}
                  <div className="mt-auto bg-[#0F172A] p-4 rounded-xl border border-slate-800 mb-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-slate-400 text-xs uppercase tracking-wider">Member Price</span>
                      <span className="text-2xl font-bold text-white">₹{pkg.prices[0]?.sellingPrice || 'TBA'}</span>
                    </div>
                    <div className="h-px w-full bg-slate-800 my-3"></div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        +{pkg.prices[0]?.binaryVolumeBudget || 0} BV
                      </span>
                      <span className="text-indigo-400 font-semibold">
                        Unlocks Team Bonus
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => window.open('https://wa.me/YOUR_ADMIN_NUMBER?text=Hi,%20I%20want%20to%20book%20the%20' + encodeURIComponent(pkg.name) + '%20package.', '_blank')}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#C9A455] hover:text-white text-slate-900 font-bold py-3 rounded-xl transition-all duration-300"
                  >
                    Request Booking <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};
