import React from 'react';
import { TESTIMONIALS } from '../data/waypointData';
import { Star, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection = () => {
  return (
    <section className="bg-[#F8F9FA] py-16 sm:py-24 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A455] font-bold">
            <span>VERIFIED TRAVEL EXPERIENCES</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Stories From Our Travelers
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
            Real experiences from travelers who designed their private journeys with Wanderlust.
          </p>
        </div>

        {/* 3 Testimonial Cards Grid (1 col on mobile, 3 col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-[#C9A455]">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="#C9A455" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={12} className="text-emerald-600" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {item.role}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[10px] font-bold text-[#C9A455] block uppercase">
                    {item.trip}
                  </span>
                  <span className="font-mono text-[9px] text-slate-400">
                    {item.date}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
