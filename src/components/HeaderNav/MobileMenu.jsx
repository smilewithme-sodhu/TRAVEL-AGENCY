import React from 'react';
import { navLinks } from './constants';
import { X, User, MessageSquare } from 'lucide-react';

export const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  currentView,
  handleNavClick,
  openWhatsApp
}) => {
  if (!mobileMenuOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs flex flex-col justify-start pt-20 px-4 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-3 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C9A455]">
            EXPLORE WANDERLUST
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
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                currentView === link.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-2">
          <button
            onClick={() => handleNavClick('member-dashboard')}
            className="w-full py-3 px-4 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
          >
            <User className="w-4 h-4 text-[#C9A455]" />
            <span>Member Atelier Portal</span>
          </button>

          <button
            onClick={() => {
              openWhatsApp(null, "Hello Wanderlust Travel Agency, I would like to plan my custom holiday journey.");
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
  );
};
