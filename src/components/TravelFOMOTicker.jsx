import React, { useState, useEffect } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Sparkles, MapPin, X, MessageSquare, Flame } from 'lucide-react';

const FOMO_EVENTS = [
  {
    id: 1,
    name: 'Priya & Amit',
    location: 'Kolkata',
    action: 'Just booked Sikkim 5D/4N Custom Tour',
    destId: 'sikkim',
    time: '4 mins ago',
    badge: 'Popular Choice 🔥'
  },
  {
    id: 2,
    name: 'Pooja & Rohit',
    location: 'Delhi NCR',
    action: 'Inquired about Bali Luxury Honeymoon',
    destId: 'bali',
    time: '9 mins ago',
    badge: 'Trending ✨'
  },
  {
    id: 3,
    name: 'Sharma Family (5 pax)',
    location: 'Mumbai',
    action: 'Booked Dubai Desert & Marina Package',
    destId: 'dubai',
    time: '14 mins ago',
    badge: 'Fast Filling ⚡'
  },
  {
    id: 4,
    name: 'Dr. Vivek & Friends',
    location: 'Bangalore',
    action: 'Reserved Kashmir Valley 6D Autumn Escape',
    destId: 'kashmir',
    time: '21 mins ago',
    badge: 'Limited Slots 🏔️'
  },
  {
    id: 5,
    name: 'Ananya S.',
    location: 'Pune',
    action: 'Inquired about Thailand Island Hopping',
    destId: 'thailand',
    time: '32 mins ago',
    badge: 'Special Deal 🌴'
  }
];

export const TravelFOMOTicker = () => {
  const { openWhatsApp } = useWanderlust();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Delay initial appearance by 3 seconds for natural feel
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(initialTimer);
  }, []);

  // Cycle through FOMO notifications every 9 seconds
  useEffect(() => {
    if (dismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % FOMO_EVENTS.length);
        setIsVisible(true);
      }, 600);
    }, 9000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = FOMO_EVENTS[currentIndex];

  return (
    <div 
      className={`fixed bottom-5 left-4 sm:left-6 z-40 max-w-[340px] sm:max-w-sm transition-all duration-500 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl shadow-blue-950/10 border border-blue-100 flex items-start gap-3 relative group">
        
        {/* Pulse Live Indicator */}
        <div className="relative mt-0.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
            <Sparkles size={18} className="text-[#2563EB] animate-pulse" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
            <span className="text-[#0A3161] font-extrabold">{current.name}</span>
            <span>({current.location})</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-600 font-semibold">{current.time}</span>
          </div>

          <p className="text-xs font-bold text-[#0A3161] leading-snug mt-0.5 truncate">
            {current.action}
          </p>

          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F97316]">
              {current.badge}
            </span>
            <button
              onClick={() => openWhatsApp(null, `Hello Gumnu JUM by Lisa Travels, I noticed ${current.action}. Could you share itinerary and pricing options for this journey?`)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:text-[#0A3161] transition-colors cursor-pointer"
            >
              <span>Inquire This Trip</span>
              <MessageSquare size={12} className="fill-current text-[#25D366]" />
            </button>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors cursor-pointer"
          title="Dismiss notification"
        >
          <X size={13} />
        </button>

      </div>
    </div>
  );
};
