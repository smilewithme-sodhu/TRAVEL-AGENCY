import React from 'react';
import { ArrowRight } from 'lucide-react';

export const NetworkVolumeSnapshot = ({ networkVolume, navigateTo, formatINR }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100/90 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#C9A455] uppercase tracking-wider block">
            GENEALOGY SNAPSHOT
          </span>
          <h3 className="font-sans font-extrabold text-base text-slate-900">
            Binary Network Volume
          </h3>
        </div>
        <button
          onClick={() => navigateTo('member-binary')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <span>Tree View</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">LEFT LEG</span>
          <div className="font-sans font-extrabold text-base text-slate-900">
            {formatINR(networkVolume.leftVolume)}
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">RIGHT LEG</span>
          <div className="font-sans font-extrabold text-base text-slate-900">
            {formatINR(networkVolume.rightVolume)}
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs">
        <div>
          <span className="text-[9px] text-slate-400 uppercase font-bold block">MATCHED</span>
          <span className="font-extrabold text-[#C9A455]">{formatINR(networkVolume.matchedVolume)}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-slate-400 uppercase font-bold block">CARRY FORWARD</span>
          <span className="font-bold text-slate-200">Left {formatINR(networkVolume.leftCarryForward)}</span>
        </div>
      </div>
    </div>
  );
};
