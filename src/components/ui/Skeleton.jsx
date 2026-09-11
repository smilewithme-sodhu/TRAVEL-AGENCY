import React from 'react';

export const CardSkeleton = () => (
  <div className="animate-pulse bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
    <div className="h-4 bg-slate-200 rounded-md w-1/3" />
    <div className="h-8 bg-slate-200 rounded-md w-2/3" />
    <div className="h-3 bg-slate-100 rounded-md w-1/2" />
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="animate-pulse bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
    <div className="h-6 bg-slate-200 rounded-md w-1/4 mb-4" />
    {Array.from({ length: rows }).map((_, idx) => (
      <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-50 gap-4">
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-4 bg-slate-100 rounded w-1/6" />
        <div className="h-4 bg-slate-100 rounded w-1/6" />
        <div className="h-4 bg-slate-200 rounded w-1/5" />
      </div>
    ))}
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-10 bg-slate-200 rounded-xl w-1/3" />
    <div className="h-44 bg-slate-200 rounded-3xl w-full" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-64 bg-slate-200 rounded-3xl" />
      <div className="h-64 bg-slate-200 rounded-3xl" />
    </div>
  </div>
);

export const TreeSkeleton = () => (
  <div className="animate-pulse bg-white p-10 rounded-3xl border border-slate-100 flex flex-col items-center space-y-8 min-h-[400px]">
    <div className="w-36 h-20 bg-slate-200 rounded-2xl" />
    <div className="w-64 h-1 bg-slate-200" />
    <div className="flex gap-16">
      <div className="w-32 h-16 bg-slate-200 rounded-2xl" />
      <div className="w-32 h-16 bg-slate-200 rounded-2xl" />
    </div>
  </div>
);
