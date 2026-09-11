import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  sublabel?: string;
  color?: 'teal' | 'gold' | 'navy';
  height?: 'sm' | 'md';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  sublabel,
  color = 'teal',
  height = 'sm'
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const colors = {
    teal: 'bg-[#0E8388]',
    gold: 'bg-[#C5A880]',
    navy: 'bg-[#071A2F]'
  };

  const heights = {
    sm: 'h-1',
    md: 'h-2'
  };

  return (
    <div className="w-full">
      {(label || sublabel) && (
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          {label && <span className="text-[#071A2F] uppercase tracking-wider text-[11px]">{label}</span>}
          {sublabel && <span className="text-slate-500 font-mono">{sublabel}</span>}
        </div>
      )}
      <div className={`w-full bg-[#EFECE4] rounded-full overflow-hidden ${heights[height]}`}>
        <div
          className={`${colors[color]} ${heights[height]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
