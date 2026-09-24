import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';

export const AdminAuditPage: React.FC = () => {
  const logs = [
    { id: 'LOG-104', event: 'Binary Match Payout Executed', detail: 'Processed 14 pairs for Cycle #2026-06', time: '12 Feb 2026, 06:00 PM', admin: 'SYSTEM_CRON' },
    { id: 'LOG-103', event: 'Member Active Status Verified', detail: 'Rahul Sharma (#TRV-8821) trip confirmed: Goa Coastal Odyssey', time: '10 Feb 2026, 04:30 PM', admin: 'Concierge Team' },
    { id: 'LOG-102', event: 'Package Price Margin Adjusted', detail: 'Dubai Luxury Marvels supplier base cost updated to TP 64,000', time: '08 Feb 2026, 11:15 AM', admin: 'Product Team' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Security & Compliance
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
          System Audit Logs
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Immutable records of commission cycles, status transitions, and margin changes.
        </p>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-4">
        {logs.map(log => (
          <div key={log.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-indigo-400 font-bold">{log.id}</span>
                <span className="text-sm font-bold text-white">{log.event}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{log.detail}</p>
            </div>
            <div className="text-right text-xs text-slate-500 whitespace-nowrap">
              <p>{log.time}</p>
              <p className="text-indigo-300 font-medium mt-0.5">By: {log.admin}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
