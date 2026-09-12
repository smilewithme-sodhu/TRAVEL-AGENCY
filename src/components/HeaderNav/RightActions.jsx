import React from 'react';
import { Phone, User, MessageSquare, Menu, X } from 'lucide-react';

export const RightActions = ({
  openPhoneCall,
  agencyPhone,
  memberProfile,
  handleNavClick,
  openWhatsApp,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      {/* Phone Hotline (Hidden on small mobile) */}
      <button
        onClick={openPhoneCall}
        title={`Call Concierge: ${agencyPhone}`}
        className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
      >
        <Phone className="w-3.5 h-3.5 text-[#C9A455]" />
        <span className="font-mono text-[11px]">{agencyPhone}</span>
      </button>

      {/* Member Portal Access Button */}
      <button
        onClick={() => handleNavClick('member-dashboard')}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
      >
        <User className="w-3.5 h-3.5 text-[#C9A455]" />
        <span>Member</span>
        {memberProfile?.status === 'GREEN_ACTIVE' && (
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        )}
      </button>

      {/* Primary WhatsApp Action CTA */}
      <button
        onClick={() => openWhatsApp(null, "Hello Wanderlust Travel Agency, I would like to plan my custom holiday journey.")}
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
  );
};
