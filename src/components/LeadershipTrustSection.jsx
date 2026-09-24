import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  PhoneCall,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Heart
} from 'lucide-react';
import { useWanderlust } from '../context/WanderlustContext';

export const LeadershipTrustSection = () => {
  const { openWhatsApp } = useWanderlust();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-[#F4F7FC] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-blue-100/80 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0A3161] font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#2563EB]" />
            <span>The Heart & Hands Behind Lisa Travels</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0A3161] tracking-tight">
            Our Story & Leadership
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Built on genuine passion, deep local roots in Sikkim, professional hospitality expertise, and relentless dedication to every single guest.
          </p>
        </div>

        {/* 1. FEATURED FOUNDER BLOCK - LISA */}
        <div className="bg-white rounded-3xl border border-blue-100 shadow-xl shadow-blue-900/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300">
          
          {/* Left Column: Founder Photo & Visual Story */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0A3161] to-[#1E3A8A] relative min-h-[380px] lg:min-h-full flex flex-col justify-end overflow-hidden">
            <img 
              src="/images/WhatsApp Image 2026-09-23 at 1.02.33 PM.jpeg" 
              alt="Lisa - Founder of Lisa Travels" 
              className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.02]"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/WhatsApp%20Image%202026-09-23%20at%201.02.33%20PM.jpeg";
              }}
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A3161]/95 via-[#0A3161]/40 to-transparent"></div>

            {/* Floating Tags on Founder Photo */}
            <div className="relative z-10 p-6 sm:p-8 space-y-3 text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FACC15] text-[#0A3161] font-bold text-xs shadow-md">
                <Sparkles size={13} className="fill-current" />
                <span>Founder & Chief Travel Curator</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Lisa
              </h3>
              <p className="text-sky-200 text-xs sm:text-sm font-medium flex items-center gap-1.5">
                <MapPin size={15} className="text-[#FACC15] shrink-0" />
                <span>Sikkim, India • Tourism & Hospitality Graduate</span>
              </p>
            </div>
          </div>

          {/* Right Column: Founder's Story with Expand/Collapse */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌸</span>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#2563EB]">
                  A Message From Our Founder
                </span>
              </div>

              {/* Story Title */}
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0A3161] leading-tight">
                Lisa — A Woman Who Turned Her Love for Travel Into a Dream 🌍❤️
              </h3>

              {/* Story Introduction Preview */}
              <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  I am Lisa, a woman from beautiful <strong>Sikkim</strong>, and the founder of <strong>Lisa Travels</strong>. With a Graduate background in <strong>Tourism & Hospitality</strong> and <strong>5 years of experience</strong> in the travel industry, I turned my personal passion into a profession to create extraordinary journeys for travelers worldwide.
                </p>

                {/* Vision Callout Box */}
                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-1.5">
                  <p className="font-semibold text-[#0A3161] text-xs sm:text-sm">
                    As a woman entrepreneur from Sikkim, my vision has always been simple:
                  </p>
                  <p className="text-blue-900 font-bold text-sm sm:text-base italic">
                    “To make travel easy, honest, comfortable, and memorable for every traveller.”
                  </p>
                </div>
              </div>

              {/* EXPANDED FULL LETTER SECTION */}
              {isExpanded && (
                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed pt-2 animate-fadeIn border-t border-slate-100">
                  <p>
                    My love for travelling started when I was a child. I have always been fascinated by new places, different cultures, beautiful landscapes, local food, and the stories that every destination has to tell.
                  </p>
                  <p>
                    Over the years, travelling became more than just a hobby for me. I started exploring different parts of India as well as international destinations, experiencing different hotels, tours, transportation, sightseeing, and the little details that can make a journey truly memorable.
                  </p>
                  <p>
                    My own travel experiences have taught me something very important — <span className="text-[#0A3161] font-semibold italic">a beautiful holiday is not only about where you go, but also about how you experience the journey.</span>
                  </p>
                  
                  <p className="font-medium text-[#0A3161] pt-1">
                    Travel is not just business for me — it is my personal passion. I understand what travellers truly look for:
                  </p>

                  {/* 4 Pillars with Emoji */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-1">
                    <div className="flex items-center gap-2.5 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/70 text-slate-800 text-xs sm:text-sm font-medium">
                      <span className="text-amber-500">✨</span>
                      <span>Good & safe hotels</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/70 text-slate-800 text-xs sm:text-sm font-medium">
                      <span className="text-amber-500">✨</span>
                      <span>Smooth and hassle-free arrangements</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/70 text-slate-800 text-xs sm:text-sm font-medium">
                      <span className="text-amber-500">✨</span>
                      <span>Transparent pricing with no surprises</span>
                    </div>
                    <div className="flex items-center gap-2.5 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/70 text-slate-800 text-xs sm:text-sm font-medium">
                      <span className="text-amber-500">✨</span>
                      <span>Friendly guidance & support at every step</span>
                    </div>
                  </div>

                  <p>
                    Every package, every itinerary, and every recommendation at Lisa Travels is created with care, personal attention, and high standards. I personally ensure that our guests get the best possible experience, whether they are travelling with family, friends, a partner, or exploring solo.
                  </p>

                  <p className="font-semibold text-[#0A3161]">
                    Today, I am proud to share that Lisa Travels has earned the trust of more than <span className="underline decoration-[#FACC15] decoration-2">500+ happy travellers</span>, and this is just the beginning of our journey.
                  </p>

                  <p>
                    When you travel with Lisa Travels, you are not just booking a trip — you are travelling with someone who loves travel as much as you do.
                  </p>
                </div>
              )}
            </div>

            {/* Read More / Read Less Interactive Toggle & Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0A3161] font-bold text-xs transition-all cursor-pointer border border-blue-200 shadow-xs"
              >
                <span>{isExpanded ? 'Show Less' : "Read Lisa's Full Story 🌸"}</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <button
                onClick={() => openWhatsApp(null, "Hello Lisa Travels, I would like to consult directly with Lisa and the team.")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs transition-all shadow-xs cursor-pointer"
              >
                <MessageSquare size={14} className="fill-current" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Bottom Signature & Badges */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              
              {/* Highlight Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-100 text-center">
                  <span className="text-base block mb-0.5">🏔️</span>
                  <div className="text-[11px] font-bold text-[#0A3161] leading-tight">Sikkim Entrepreneur</div>
                </div>
                <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-100 text-center">
                  <span className="text-base block mb-0.5">🎓</span>
                  <div className="text-[11px] font-bold text-[#0A3161] leading-tight">Tourism Graduate</div>
                </div>
                <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-100 text-center">
                  <span className="text-base block mb-0.5">⏳</span>
                  <div className="text-[11px] font-bold text-[#0A3161] leading-tight">5 Years Experience</div>
                </div>
                <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-100 text-center">
                  <span className="text-base block mb-0.5">❤️</span>
                  <div className="text-[11px] font-bold text-[#0A3161] leading-tight">500+ Customers</div>
                </div>
              </div>

              {/* Sign-off Box (Shown in full when expanded, compact otherwise) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200/60">
                <div className="space-y-0.5">
                  <p className="font-display font-bold text-[#0A3161] text-sm sm:text-base flex items-center gap-1.5">
                    <span>Welcome to Lisa Travels.</span>
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    Let’s create beautiful travel memories together! ✈️🌸
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB]">
                    Your Journey. Our Passion. Your Memories. ❤️
                  </p>
                </div>
                
                <div className="text-left sm:text-right shrink-0 border-l-2 sm:border-l-0 border-[#2563EB] pl-3 sm:pl-0">
                  <div className="font-display font-extrabold text-[#0A3161] text-sm flex items-center sm:justify-end gap-1">
                    <span>🌸 Lisa</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold">Founder – Lisa Travels</div>
                  <div className="text-[10px] text-slate-400">Sikkim, India</div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 2. OPERATIONS LEADERSHIP BLOCK - SUNIL SHARMA */}
        <div className="bg-white rounded-3xl border border-blue-100 shadow-lg shadow-blue-900/5 p-6 sm:p-8 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            
            {/* Sunil Sharma Photo */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-blue-200 shadow-md relative bg-slate-100">
                <img 
                  src="/images/WhatsApp Image 2026-09-22 at 3.25.33 PM.jpeg" 
                  alt="Sunil Sharma - Head of Operations & Logistics" 
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/images/WhatsApp%20Image%202026-09-22%20at%203.25.33%20PM.jpeg";
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#0A3161] text-white p-1.5 rounded-lg shadow">
                <ShieldCheck size={16} className="text-[#FACC15]" />
              </div>
            </div>

            {/* Operations Message & Quote */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                  <ShieldCheck size={13} className="text-[#2563EB]" />
                  <span>Operations & Ground Safety</span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#0A3161]">
                  Sunil Sharma — Head of Operations & Logistics
                </h3>
              </div>

              {/* Quote */}
              <div className="relative pl-0 md:pl-4 md:border-l-4 md:border-blue-400">
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  “At Lisa Travels, we believe every journey should be smooth, comfortable, and memorable. Our team is committed to taking care of every detail so you can travel with confidence and enjoy every moment. Your journey, our responsibility.”
                </p>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-5 pt-1 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#2563EB]" />
                  24/7 Concierge Support
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#2563EB]" />
                  Verified Drivers & Logistics
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#2563EB]" />
                  Instant On-Trip Assistance
                </span>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
              <button
                onClick={() => openWhatsApp(null, "Hello Lisa Travels, I would like to plan a journey.")}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0A3161] hover:bg-[#072447] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <PhoneCall size={14} className="text-[#FACC15]" />
                <span>Connect With Team</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
