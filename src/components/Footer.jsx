import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Compass, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const { openWhatsApp, openPhoneCall, agencyPhone } = useWanderlust();
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0F172A] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Tagline (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer select-none group inline-flex"
            >
              <div className="w-9 h-9 rounded-xl bg-[#C9A455] text-[#0F172A] flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                <Compass size={20} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                WANDERLUST
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-medium">
              Hand-crafting extraordinary domestic & international travel memories. Experience personalized travel planning without fixed itineraries or hidden costs.
            </p>
            <button
              onClick={() => openWhatsApp(null, "Hello Wanderlust Travel Agency, I would like to inquire about holiday packages.")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare size={15} className="fill-current" />
              <span>WhatsApp Consultation</span>
            </button>
          </div>

          {/* Col 2: Navigation (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C9A455]">
              EXPLORE
            </div>
            <div className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
              <button onClick={() => navigate('/')} className="text-left hover:text-white transition-colors cursor-pointer">Home</button>
              <button onClick={() => navigate('/destinations')} className="text-left hover:text-white transition-colors cursor-pointer">All Destinations</button>
              <button onClick={() => navigate('/gallery')} className="text-left hover:text-white transition-colors cursor-pointer">Traveler Gallery</button>
            </div>
          </div>

          {/* Col 3: Company (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C9A455]">
              COMPANY
            </div>
            <div className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
              <button onClick={() => navigate('/about')} className="text-left hover:text-white transition-colors cursor-pointer">About Wanderlust</button>
              <button onClick={() => navigate('/contact')} className="text-left hover:text-white transition-colors cursor-pointer">Contact Experts</button>
              <button onClick={() => navigate('/member')} className="text-left text-[#C9A455] hover:underline cursor-pointer font-bold">Member Portal</button>
            </div>
          </div>

          {/* Col 4: Contact Hotline (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C9A455]">
              HOTLINE CONCIERGE
            </div>
            <div className="space-y-2.5 text-xs text-slate-300 font-medium">
              <div
                onClick={openPhoneCall}
                className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors"
              >
                <Phone size={15} className="text-[#C9A455]" />
                <span className="font-mono">{agencyPhone}</span>
              </div>
              <div
                onClick={() => openWhatsApp()}
                className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors"
              >
                <MessageSquare size={15} className="text-[#25D366]" />
                <span>WhatsApp: +91 98765 43210</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left font-medium">
          <div>© 2026 Wanderlust Travel Agency. All rights reserved.</div>
          <div className="font-mono text-[11px] text-slate-400">Pure Veg & Custom Luxury Travel Specialists</div>
        </div>

      </div>
    </footer>
  );
};
