import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { ShieldCheck, MessageSquare, Users } from 'lucide-react';
import { LeadershipTrustSection } from './LeadershipTrustSection';

export const AboutWanderlustPage = () => {
  const { openWhatsApp } = useWanderlust();

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Hero Header */}
      <section className="relative py-24 px-6 bg-[#082F49] text-white text-center mb-12">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold">
            ABOUT GUMNU JUM BY LISA TRAVELS
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white">
            Dream Destination, Budget Friendly
          </h1>
          <p className="text-lg text-sky-100/90 leading-relaxed font-medium">
            Affordable travel, unforgettable experiences. We believe that a vacation is not just a booking—it is a story waiting to be lived.
          </p>
        </div>
      </section>

      {/* Founder & Leadership Section */}
      <LeadershipTrustSection />

      {/* Pillars */}
      <section className="bg-[#F8FAFC] py-16 px-6 mb-16 border-y border-sky-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-sky-100/80 shadow-sm">
              <Users size={32} className="text-[#0284C7] mb-4" />
              <h3 className="font-display font-bold text-xl text-[#0C4A6E] mb-2">500+ Happy Travelers</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Trusted by families, honeymooners, and travel enthusiasts across India and worldwide.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-sky-100/80 shadow-sm">
              <ShieldCheck size={32} className="text-[#F97316] mb-4" />
              <h3 className="font-display font-bold text-xl text-[#0C4A6E] mb-2">100% Customized Trips</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Every single detail tailored to your timing, budget tier, and preferred travel style.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-sky-100/80 shadow-sm">
              <MessageSquare size={32} className="text-[#25D366] mb-4" />
              <h3 className="font-display font-bold text-xl text-[#0C4A6E] mb-2">24/7 WhatsApp Support</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Instant assistance at your fingertips throughout your trip—from driver pickup to hotel check-ins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 text-center space-y-6">
        <h2 className="font-display font-bold text-3xl text-[#0C4A6E]">
          Ready to Craft Your Dream Escape?
        </h2>
        <p className="text-base text-slate-600">
          Speak directly with our senior travel consultants on WhatsApp right now.
        </p>

        <button
          onClick={() => openWhatsApp(null, "Hello Gumnu JUM by Lisa Travels, I would like to consult with a travel planner.")}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <MessageSquare size={18} className="fill-current" />
          <span>Talk To A Travel Consultant On WhatsApp</span>
        </button>
      </section>

    </div>
  );
};
