import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { memberApi } from '../../../api';

export const NetworkSettingsCard = ({ memberProfile, showToast }) => {
  const [isUpdatingPlacement, setIsUpdatingPlacement] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
      <h4 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
        <Users className="w-4 h-4 text-blue-600" />
        <span>Network Placement Strategy</span>
      </h4>
      <p className="text-xs text-slate-500">
        Select your default binary placement leg for new recruits signing up with your base referral code.
      </p>
      <div className="flex items-center gap-2 pt-1">
        <select
          value={memberProfile?.defaultPlacement || 'AUTO'}
          onChange={async (e) => {
            setIsUpdatingPlacement(true);
            try {
              await memberApi.updateProfile({ defaultPlacement: e.target.value });
              // Refresh profile in context
              window.location.reload();
            } catch (err) {
              showToast('Failed to update placement setting.', 'error');
            } finally {
              setIsUpdatingPlacement(false);
            }
          }}
          disabled={isUpdatingPlacement}
          className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-400 cursor-pointer"
        >
          <option value="AUTO">Auto-Balance (Weaker Leg)</option>
          <option value="LEFT">Force Left Leg</option>
          <option value="RIGHT">Force Right Leg</option>
        </select>
        {isUpdatingPlacement && <span className="text-[10px] font-bold text-slate-400 animate-pulse">Saving...</span>}
      </div>
    </div>
  );
};
