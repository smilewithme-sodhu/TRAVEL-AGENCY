import React from 'react';
import { TravelStage } from '../../types';

interface TimelineProps {
  currentStage: TravelStage;
  activationDate?: string;
  travelDate?: string;
}

const STAGES: { stage: TravelStage; label: string; num: string }[] = [
  { stage: 'Booked', label: 'Booked', num: '01' },
  { stage: 'Confirmed', label: 'Confirmed', num: '02' },
  { stage: 'Traveling', label: 'Traveling', num: '03' },
  { stage: 'Completed', label: 'Completed', num: '04' }
];

export const TravelProgressTimeline: React.FC<TimelineProps> = ({
  currentStage,
  activationDate,
  travelDate
}) => {
  const getStageIndex = (s: TravelStage) => {
    switch (s) {
      case 'Booked': return 0;
      case 'Confirmed': return 1;
      case 'Traveling': return 2;
      case 'Completed': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStageIndex(currentStage);

  return (
    <div className="w-full py-4">
      {/* Horizontal step bar */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
        {STAGES.map((item, index) => {
          const isPassed = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={item.stage} className="flex flex-col">
              {/* Step indicator bar */}
              <div
                className={`h-1 w-full rounded-full transition-all duration-700 mb-3 ${
                  isPassed ? 'bg-[#0E8388]' : 'bg-[#EFECE4]'
                }`}
              />
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-mono text-[10px] ${
                    isPassed ? 'text-[#0E8388] font-bold' : 'text-slate-400'
                  }`}
                >
                  {item.num}
                </span>
                <span
                  className={`text-xs uppercase tracking-wider font-semibold ${
                    isPassed ? 'text-[#071A2F]' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {(activationDate || travelDate) && (
        <div className="mt-5 pt-4 border-t border-[#071A2F]/6 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <span>Activation: <strong className="text-[#071A2F] font-medium">{activationDate || '10 Feb 2026'}</strong></span>
          <span>Target Departure: <strong className="text-[#071A2F] font-medium">{travelDate || '15 March 2027'}</strong></span>
        </div>
      )}
    </div>
  );
};
