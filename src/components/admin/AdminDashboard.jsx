import React from 'react';
import { useWanderlust } from '../../context/WanderlustContext';

export const AdminDashboard = () => {
  const { memberProfile } = useWanderlust();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to the Admin Console</h1>
      <p className="text-slate-500 mb-8">Hello, {memberProfile?.name || 'System Admin'}. What would you like to manage today?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-2">Total Packages</h3>
          <p className="text-3xl font-bold text-[#C9A455]">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-2">Active Members</h3>
          <p className="text-3xl font-bold text-slate-800">--</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-2">Pending Payouts</h3>
          <p className="text-3xl font-bold text-red-500">.00</p>
        </div>
      </div>
    </div>
  );
};
