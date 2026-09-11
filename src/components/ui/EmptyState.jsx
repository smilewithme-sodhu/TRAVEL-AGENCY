import React from 'react';
import { Compass, RefreshCw } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Compass,
  title = 'No records found',
  description = 'There is currently no activity to display here.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-100/90 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-xs">
      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
        <Icon className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="font-sans font-bold text-lg text-slate-900 mb-2">{title}</h3>
      <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-all shadow-sm cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({
  title = 'Unable to load data',
  description = "We couldn't connect to the server right now. Please check your connection.",
  onRetry,
}) => {
  return (
    <div className="bg-white rounded-3xl p-10 border border-red-100 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-xs">
      <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
        <RefreshCw className="w-6 h-6" />
      </div>
      <h3 className="font-sans font-bold text-base text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 mb-5 leading-relaxed">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
