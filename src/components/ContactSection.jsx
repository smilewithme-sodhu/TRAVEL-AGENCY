import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { MessageSquare, Phone, MapPin, Mail, Clock, Compass, ShieldCheck } from 'lucide-react';

export const ContactSection = () => {
  const { openWhatsApp, openPhoneCall, agencyPhone } = useWanderlust();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#0284C7] font-bold">
            <Compass size={14} />
            <span>24/7 DEDICATED CONSULTATION</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0A3161] tracking-tight">
            We'd Love To Help Plan Your Next Journey
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
            Reach out directly via WhatsApp or phone call. Our travel curation team in Sikkim is ready to craft your custom vacation.
          </p>
        </div>

        {/* 2 Contact Cards: WhatsApp & Phone Hotline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          
          {/* WhatsApp Card */}
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-10 text-center border border-sky-100 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-slate-950 flex items-center justify-center mx-auto shadow-sm">
                <MessageSquare size={26} className="fill-current" />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-[#0A3161]">
                Instant WhatsApp Chat
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">
                Get instant custom quotes, detailed itineraries, and immediate answers directly from Lisa & our operations team.
              </p>
            </div>

            <button
              onClick={() => openWhatsApp(null, "Hello Gumnu JUM by Lisa Travels, I would like to inquire about vacation planning.")}
              className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageSquare size={16} className="fill-current" />
              <span>Chat on WhatsApp ({agencyPhone})</span>
            </button>
          </div>

          {/* Call Card */}
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-10 text-center border border-sky-100 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0A3161] text-[#FACC15] flex items-center justify-center mx-auto shadow-sm">
                <Phone size={26} />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-[#0A3161]">
                Call Travel Hotline
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">
                Prefer speaking over the phone? Talk directly with our Sikkim travel concierge team.
              </p>
            </div>

            <button
              onClick={openPhoneCall}
              className="w-full py-3.5 px-6 rounded-full bg-[#0A3161] hover:bg-[#072447] text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Phone size={16} className="text-[#FACC15]" />
              <span>Call {agencyPhone}</span>
            </button>
          </div>

        </div>

        {/* Government Registration Certificate Trust Card */}
        <div className="max-w-4xl mx-auto bg-blue-50/70 border border-blue-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A3161] text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck size={24} className="text-[#FACC15]" />
            </div>
            <div>
              <div className="font-display font-bold text-base text-[#0A3161]">
                Official Government Registered Travel Agency
              </div>
              <div className="font-mono text-xs font-extrabold text-[#2563EB] mt-0.5">
                Reg. No: 1597/DoT&CAv/E/23/TA
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Tourist Trade Rules 2008 (Serial No. 1597) • Dept of Tourism & Civil Aviation, Govt. of Sikkim
              </div>
            </div>
          </div>

          <div className="shrink-0 font-mono text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
            ✓ 100% Verified License
          </div>
        </div>

      </div>
    </section>
  );
};
