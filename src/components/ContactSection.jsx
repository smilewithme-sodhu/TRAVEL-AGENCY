import React from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { MessageSquare, Phone, MapPin, Mail, Clock, Compass } from 'lucide-react';

export const ContactSection = () => {
  const { openWhatsApp, openPhoneCall, agencyPhone } = useWaypoint();

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A455] font-bold">
            <Compass size={14} />
            <span>24/7 DEDICATED CONSULTATION</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            We'd Love To Help Plan Your Next Journey
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
            Reach out directly via WhatsApp or phone call. Our senior travel specialists are ready to design your itinerary.
          </p>
        </div>

        {/* 2 Contact Cards: WhatsApp & Phone Hotline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          
          {/* WhatsApp Card */}
          <div className="bg-[#F8F9FA] rounded-3xl p-6 sm:p-10 text-center border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-slate-950 flex items-center justify-center mx-auto shadow-sm">
                <MessageSquare size={26} className="fill-current" />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-slate-900">
                Instant WhatsApp Chat
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">
                Get instant custom quotes, luxury destination brochures, and immediate answers to your travel plans.
              </p>
            </div>

            <button
              onClick={() => openWhatsApp(null, "Hello Wanderlust Travel Agency, I would like to inquire about vacation planning.")}
              className="w-full py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageSquare size={16} className="fill-current" />
              <span>Chat on WhatsApp Now</span>
            </button>
          </div>

          {/* Call Card */}
          <div className="bg-[#F8F9FA] rounded-3xl p-6 sm:p-10 text-center border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-[#C9A455] flex items-center justify-center mx-auto shadow-sm">
                <Phone size={26} />
              </div>
              <h3 className="font-sans font-extrabold text-xl text-slate-900">
                Call Travel Hotline
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">
                Prefer speaking over the phone? Talk directly with our senior travel concierge team.
              </p>
            </div>

            <button
              onClick={openPhoneCall}
              className="w-full py-3.5 px-6 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Phone size={16} className="text-[#C9A455]" />
              <span>Call {agencyPhone}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
