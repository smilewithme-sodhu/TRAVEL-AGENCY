import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/wanderlustData';
import { Compass, Sparkles, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { useWanderlust } from '../context/WanderlustContext';

export const HowItWorks = () => {
  const { openWhatsApp } = useWanderlust();
  const stepIcons = [Compass, Sparkles, CheckCircle2];

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A455] font-bold">
            <span>THE WANDERLUST CONCIERGE METHOD</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            How We Navigate Your Journey
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
            Rather than rigid fixed packages, our travel specialists curate custom private itineraries tailored around your timeline and preferences.
          </p>
        </div>

        {/* 3 Step Progression Cards (Responsive: 1 col on mobile, 3 col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || Compass;
            return (
              <div
                key={idx}
                className="bg-[#F8F9FA] rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white text-[#C9A455] border border-slate-200 flex items-center justify-center font-bold shadow-2xs">
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300">
                      {step.stepNumber}
                    </span>
                  </div>

                  <div className="font-mono text-xs uppercase font-bold text-[#C9A455] tracking-wider mb-1">
                    STAGE :: {step.code}
                  </div>

                  <h3 className="font-sans font-extrabold text-lg text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                {idx < 2 && (
                  <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 pt-4 border-t border-slate-200/60">
                    <span>NEXT STAGE</span>
                    <ArrowRight size={14} className="text-[#C9A455]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => openWhatsApp(null, "Hello Wanderlust, I would like to consult on planning a customized holiday itinerary.")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <MessageSquare size={15} className="text-[#25D366] fill-current" />
            <span>Consult Our Travel Designers on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
