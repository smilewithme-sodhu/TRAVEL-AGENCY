import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Compass, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const { openWhatsApp, openPhoneCall, agencyPhone } = useWanderlust();
  const navigate = useNavigate();

  return (
    <footer className="bg-[#082F49] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#0C4A6E]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Tagline (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-3 cursor-pointer select-none group inline-flex"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Compass size={20} />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-white block">
                  Gumnu JUM
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#F97316] font-bold block -mt-1">
                  BY LISA TRAVELS
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-sky-100/80 leading-relaxed max-w-sm font-medium">
              Dream Destination, Budget Friendly. Crafting extraordinary travel memories with affordable packages, handpicked stays, and dedicated support.
            </p>
            <button
              onClick={() => openWhatsApp(null, "Hello Gumnu JUM by Lisa Travels, I would like to inquire about holiday packages.")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare size={15} className="fill-current" />
              <span>WhatsApp Consultation</span>
            </button>
          </div>

          {/* Col 2: Navigation (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
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
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
              COMPANY
            </div>
            <div className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
              <button onClick={() => navigate('/about')} className="text-left hover:text-white transition-colors cursor-pointer">About Gumnu JUM</button>
              <button onClick={() => navigate('/contact')} className="text-left hover:text-white transition-colors cursor-pointer">Contact Experts</button>
              <button onClick={() => navigate('/member')} className="text-left text-[#F97316] hover:underline cursor-pointer font-bold">Member Portal</button>
            </div>
          </div>

          {/* Col 4: Contact Hotline (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
              HOTLINE CONCIERGE
            </div>
            <div className="space-y-2.5 text-xs text-slate-300 font-medium">
              <div
                onClick={openPhoneCall}
                className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors"
              >
                <Phone size={15} className="text-[#38BDF8]" />
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
        <div className="pt-8 border-t border-[#0C4A6E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/60 text-center sm:text-left font-medium">
          <div>© 2026 Gumnu JUM by Lisa Travels. All rights reserved.</div>
          <div className="font-mono text-[11px] text-sky-300/80">Explore • Experience • Create Memories</div>
        </div>

      </div>
    </footer>
  );
};
