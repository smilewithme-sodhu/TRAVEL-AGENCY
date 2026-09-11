import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { PackageMarginInfo } from '../../types';
import { Badge } from '../ui/Badge';
import { Package, DollarSign, Sparkles } from 'lucide-react';

export const AdminPackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<PackageMarginInfo[]>([]);

  useEffect(() => {
    adminService.getPackageMargins().then(setPackages);
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Financial Margins
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
          Package Cost & Gross Profit Configuration
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Monitor supplier base rates, taxes, gross profit floor, and maximum allowed affiliate compensation allocation.
        </p>
      </div>

      {/* Package Margins Table */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-5">Package / Destination</th>
                <th className="py-4 px-5">Est. Selling Price</th>
                <th className="py-4 px-5">Supplier Cost</th>
                <th className="py-4 px-5">Taxes & Fees</th>
                <th className="py-4 px-5">Min. Gross Margin</th>
                <th className="py-4 px-5">Max Affiliate Cap</th>
                <th className="py-4 px-5">Inquiries</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {packages.map(pkg => (
                <tr key={pkg.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-5">
                    <p className="font-bold text-white text-sm">{pkg.packageName}</p>
                    <span className="text-[11px] text-slate-400">{pkg.destination} ({pkg.category})</span>
                  </td>
                  <td className="py-4 px-5 font-bold text-white">
                    ₹{pkg.estimatedSellingPrice.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    ₹{pkg.supplierCost.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    ₹{pkg.taxesAndFees.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 font-bold text-emerald-400">
                    ₹{pkg.minimumGrossProfit.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 font-bold text-amber-400">
                    ₹{pkg.maxAffiliateAllocation.toLocaleString()}
                  </td>
                  <td className="py-4 px-5">
                    <span className="bg-indigo-900/50 text-indigo-300 px-2.5 py-1 rounded-full text-xs font-semibold">
                      {pkg.inquiryCount} Inquiries
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
