import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { AdminKPIs } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';
import {
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  AlertTriangle,
  Package,
  CalendarCheck,
  Activity
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [kpis, setKpis] = useState<AdminKPIs | null>(null);

  useEffect(() => {
    adminService.getKPIs().then(setKpis);
  }, []);

  if (!kpis) return null;

  const compRatioPercent = Math.round(kpis.compToGrossMarginRatio * 100);
  const safetyThresholdPercent = Math.round(kpis.safetyThreshold * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Executive Analytics
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
          Platform Margins & Solvency Monitor
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          High-level oversight of gross travel commerce revenue, package profitability, and affiliate payouts.
        </p>
      </div>

      {/* Critical Metric Spotlight: Compensation / Gross Margin Ratio */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-indigo-500/40 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Critical Solvency Metric
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
              COMPENSATION / GROSS MARGIN: {compRatioPercent}%
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Percentage of gross margin distributed across Direct, Team, and Binary payouts. Operating well within sustainable safety limits.
            </p>
          </div>

          <div className="bg-slate-900 px-5 py-3 rounded-2xl border border-slate-800 text-right">
            <span className="text-xs text-slate-400">Safety Cap Threshold</span>
            <p className="text-xl font-bold text-emerald-400 mt-0.5">{safetyThresholdPercent}% Ceiling</p>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <ProgressBar
          value={(kpis.compToGrossMarginRatio / kpis.safetyThreshold) * 100}
          label={`Current Allocation: ${compRatioPercent}% of Gross Margin`}
          sublabel={`Safety Limit: ${safetyThresholdPercent}% max`}
          color="emerald"
          height="md"
        />
      </div>

      {/* Financial KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gross Sales */}
        <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Gross Travel Sales
          </span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-2">
            ₹{(kpis.grossTravelSales / 100000).toFixed(2)} Lakhs
          </p>
          <p className="text-xs text-emerald-400 mt-1">188 Verified Customer Trips</p>
        </div>

        {/* Gross Margin */}
        <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Net Gross Margin
          </span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-2">
            ₹{(kpis.grossMargin / 100000).toFixed(2)} Lakhs
          </p>
          <p className="text-xs text-slate-400 mt-1">After direct supplier hotel & cab costs</p>
        </div>

        {/* Member Network */}
        <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Members
          </span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-2">
            {kpis.totalActiveMembers} Active
          </p>
          <p className="text-xs text-slate-400 mt-1">+{kpis.totalYellowMembers} Yellow Registered</p>
        </div>

        {/* Total Commissions Distributed */}
        <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Total Affiliate Payouts
          </span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-2">
            ₹{(kpis.totalCommissionsPaid / 1000).toFixed(1)}k
          </p>
          <p className="text-xs text-slate-400 mt-1">Direct + Team + Binary pairs</p>
        </div>
      </div>

      {/* Summary Table: Destination Performance */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white">
            Live Destination Performance & Inquiries
          </h3>
          <span className="text-xs text-slate-400">Real-time WhatsApp inquiry tracking</span>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="text-sm font-bold text-white">Goa Coastal Odyssey</h4>
            <p className="text-xs text-emerald-400 mt-1 font-semibold">94 WhatsApp Inquiries</p>
            <p className="text-xs text-slate-400 mt-0.5">Top Spot: Dudhsagar Falls & Fort Aguada</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="text-sm font-bold text-white">Kashmir Paradise</h4>
            <p className="text-xs text-emerald-400 mt-1 font-semibold">112 WhatsApp Inquiries</p>
            <p className="text-xs text-slate-400 mt-0.5">Top Spot: Dal Lake Shikara & Gulmarg Gondola</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="text-sm font-bold text-white">Dubai Luxury Marvels</h4>
            <p className="text-xs text-emerald-400 mt-1 font-semibold">88 WhatsApp Inquiries</p>
            <p className="text-xs text-slate-400 mt-0.5">Top Spot: Desert Safari & Burj Khalifa</p>
          </div>
        </div>
      </div>
    </div>
  );
};
