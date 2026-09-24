import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { MessageSquare, Phone, ShieldCheck } from 'lucide-react';
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
              className="cursor-pointer select-none group inline-block"
            >
              <div className="bg-white px-3.5 py-1.5 rounded-2xl shadow-sm inline-flex items-center group-hover:scale-105 transition-transform duration-200">
                <img
                  src="/images/gumnu-jum-logo.png"
                  alt="Gumnu JUM by Lisa Travels"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
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
              COMPANY & LEGAL
            </div>
            <div className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
              <button onClick={() => navigate('/about')} className="text-left hover:text-white transition-colors cursor-pointer">About Gumnu JUM</button>
              <button onClick={() => navigate('/terms')} className="text-left hover:text-white transition-colors cursor-pointer">Terms & Conditions</button>
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
                <span className="font-mono font-bold text-white">{agencyPhone}</span>
              </div>
              <div
                onClick={() => openWhatsApp()}
                className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors"
              >
                <MessageSquare size={15} className="text-[#25D366]" />
                <span>WhatsApp: {agencyPhone}</span>
              </div>
              <div className="text-[11px] text-sky-200/70 pt-1 font-medium">
                Gangtok, Sikkim, India
              </div>
            </div>
          </div>

        </div>

        {/* Official Govt & MSME Accreditation Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#032135] border border-[#0C4A6E] space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-200/90 pb-3 border-b border-[#0C4A6E]/60">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <ShieldCheck size={18} className="text-[#FACC15] shrink-0" />
              <div>
                <span className="font-bold text-white">Govt. of India Recognized:</span>{' '}
                <span className="text-slate-300">MSME Udyam Registration:</span>{' '}
                <span className="font-mono font-semibold text-[#38BDF8]">UDYAM-SK-01-0011040</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-900/50 border border-blue-400/30 text-[10px] font-mono font-bold text-sky-300">
              <span>National MSME Verified</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sky-200/90">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <ShieldCheck size={18} className="text-[#38BDF8] shrink-0" />
              <div>
                <span className="font-bold text-white">Govt. Registered Travel Agency:</span>{' '}
                <span className="font-mono font-semibold text-[#38BDF8]">1597/DoT&CAv/E/23/TA</span>
              </div>
            </div>
            <div className="font-mono text-[11px] text-slate-300 text-center sm:text-right">
              Tourist Trade Rules 2008 (Serial No. 1597) • Dept of Tourism & Civil Aviation, Govt. of Sikkim
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-4 border-t border-[#0C4A6E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/60 text-center sm:text-left font-medium">
          <div>
            © 2026 Gumnu JUM by Lisa Travels. All rights reserved. •{' '}
            <button onClick={() => navigate('/terms')} className="text-sky-300 hover:text-white underline cursor-pointer">
              Terms & Conditions
            </button>
          </div>
          <div className="font-mono text-[11px] text-sky-300/80">Explore • Experience • Create Memories</div>
        </div>

      </div>
    </footer>
  );
};
