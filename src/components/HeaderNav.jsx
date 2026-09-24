import React, { useState, useEffect } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Compass, MessageSquare, Menu, X, Phone, User, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeaderNav = () => {
  const {
    openWhatsApp,
    openPhoneCall,
    agencyPhone,
    memberProfile
  } = useWanderlust();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'destinations', label: 'Destinations', path: '/destinations' },
    { id: 'gallery', label: 'Traveler Gallery', path: '/gallery' },
    { id: 'about', label: 'About Gumnu JUM', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* 1. Brand Logo */}
          <div
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#0369A1] flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-[#0C4A6E] leading-tight tracking-tight">
                Gumnu JUM
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#F97316] font-bold">
                BY LISA TRAVELS
              </div>
            </div>
          </div>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold">
            {navLinks.map((link) => {
              const isActive = window.location.pathname === link.path || (link.path === '/' && window.location.pathname === '');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.path)}
                  className={`transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#0284C7] font-extrabold'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* 3. Right Action Items (Phone, Member, WhatsApp, Hamburger) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Phone Hotline (Hidden on small mobile) */}
            <button
              onClick={openPhoneCall}
              title={`Call Concierge: ${agencyPhone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-sky-50 hover:bg-sky-100/80 border border-sky-200/80 text-xs font-semibold text-[#0C4A6E] transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="font-mono text-[11px]">{agencyPhone}</span>
            </button>

            {/* Member Portal Access Button */}
            <button
              onClick={() => handleNavClick('/member')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0C4A6E] hover:bg-[#075985] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-sky-300" />
              <span>Member</span>
              {memberProfile?.status === 'GREEN_ACTIVE' && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              )}
            </button>

            {/* Primary WhatsApp Action CTA */}
            <button
              onClick={() => openWhatsApp(null, "Hello Gumnu JUM by Lisa Travels, I would like to plan my custom holiday journey.")}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Plan My Trip</span>
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* 4. Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs flex flex-col justify-start pt-20 px-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-3 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
                EXPLORE GUMNU JUM
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.path)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    window.location.pathname === link.path
                      ? 'bg-[#0284C7] text-white'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => handleNavClick('/member')}
                className="w-full py-3 px-4 rounded-2xl bg-[#0C4A6E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <User className="w-4 h-4 text-sky-300" />
                <span>Member Portal</span>
              </button>

              <button
                onClick={() => {
                  openWhatsApp(null, "Hello Gumnu JUM by Lisa Travels, I would like to plan my custom holiday journey.");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#25D366] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Talk to Concierge on WhatsApp</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
