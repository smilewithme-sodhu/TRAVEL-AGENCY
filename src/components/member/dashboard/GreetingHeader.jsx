import React from 'react';
import { Share2 } from 'lucide-react';

export const GreetingHeader = ({ member, isActive, handleNativeShare }) => {
  return (
    <div className="flex items-center justify-between gap-4 pb-1">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-[#C9A455] tracking-widest">
            MEMBER ATELIER
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {member.rank}
          </span>
        </div>

        <h1 className="font-sans font-extrabold text-xl sm:text-3xl text-slate-900 tracking-tight">
          Good evening, {member.name.split(' ')[0]} 👋
        </h1>
      </div>

      <button
        onClick={handleNativeShare}
        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer shrink-0"
      >
        <Share2 className="w-3.5 h-3.5 text-[#C9A455]" />
        <span className="hidden sm:inline">Share Link</span>
      </button>
    </div>
  );
};
