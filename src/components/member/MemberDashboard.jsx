import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Zap, Wallet, Plane, TrendingUp, Users, AlertTriangle, ShieldCheck } from 'lucide-react';
import { apiClient } from '../../api/client';

export const MemberDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch live data from your backend. NO HARDCODING.
    const fetchDashboard = async () => {
      try {
        const response = await apiClient.get('/api/member/dashboard');
        if (response.data.success) {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-[#C9A455] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fallback if API fails
  if (!dashboardData) return <div className="text-white">Failed to load profile.</div>;

  const isGreen = dashboardData.member.status === 'GREEN' || dashboardData.member.status === 'ORANGE';
  const hasBooked = (dashboardData.bookings && dashboardData.bookings.length > 0) || dashboardData.member.status === 'ORANGE';

  return (
    <div className="bg-[#0F172A] min-h-full rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-800 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-6">
      
      {/* --- INACTIVE (RED ID) FOMO BANNER --- */}
      {!isGreen && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Lock size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <AlertTriangle className="text-red-500" />
                Your Account is Inactive (RED ID)
              </h2>
              <p className="text-slate-300 mt-2 max-w-2xl">
                You are currently missing out on <strong className="text-white">Binary Spillover</strong> and <strong className="text-white">Team Bonuses</strong>. Your position in the tree is locked, but points from your upline will bypass you until you activate.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => window.open('https://wa.me/YOUR_ADMIN_NUMBER', '_blank')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                Activate Now (₹500)
              </button>
              <span className="text-xs text-slate-400">Pay via WhatsApp & send UTR</span>
            </div>
          </div>
        </div>
      )}

      {/* --- ACTIVE (GREEN ID) SUCCESS BANNER --- */}
      {isGreen && !hasBooked && (
        <div className="bg-[#C9A455]/10 border border-[#C9A455]/30 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#C9A455] flex items-center gap-2">
                <ShieldCheck /> Active Member (GREEN ID)
              </h2>
              <p className="text-slate-300 mt-2">
                Your position in the binary tree is secured! However, to unlock the <strong className="text-white">5-Level Team Bonus</strong>, you must book your first travel package.
              </p>
            </div>
            <button 
              onClick={() => navigate('/member/packages')}
              className="bg-[#C9A455] hover:bg-[#b38e44] text-slate-900 font-bold py-3 px-8 rounded-lg transition-all"
            >
              Book a Package
            </button>
          </div>
        </div>
      )}

      {/* --- FINANCIAL STATS (BLURRED IF INACTIVE) --- */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${!isGreen ? 'opacity-50 blur-[2px] pointer-events-none' : ''}`}>
        
        {/* Wallet Balance */}
        <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Wallet size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Available Balance</p>
          <h3 className="text-3xl font-bold text-white mt-1">₹{dashboardData.member.walletBalance}</h3>
        </div>

        {/* Direct Referrals */}
        <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#C9A455]/10 rounded-lg text-[#C9A455]">
              <Users size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Direct Referrals</p>
          <h3 className="text-3xl font-bold text-white mt-1">{dashboardData.overview.activeDirectReferrals}</h3>
        </div>

        {/* Left BV */}
        <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-blue-500"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Left Leg Volume (BV)</p>
          <h3 className="text-3xl font-bold text-white mt-1">{dashboardData.overview.leftVolume}</h3>
        </div>

        {/* Right BV */}
        <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-emerald-500"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Zap size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Right Leg Volume (BV)</p>
          <h3 className="text-3xl font-bold text-white mt-1">{dashboardData.overview.rightVolume}</h3>
        </div>
      </div>

      {/* --- RECENT ACTIVITY / NEXT STEPS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Your Next Milestones</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-slate-300">
              <div className={`p-1 rounded-full ${isGreen ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-500'}`}>✓</div>
              <span className={isGreen ? 'text-white' : ''}>Pay ₹500 Activation Fee</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <div className={`p-1 rounded-full ${hasBooked ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-500'}`}>✓</div>
              <span className={hasBooked ? 'text-white' : ''}>Book your first Travel Package</span>
            </li>
            <li className="flex items-center gap-3 text-slate-300">
              <div className="p-1 rounded-full bg-slate-700 text-slate-500">✓</div>
              <span>Refer 2 Active Members (1 Left, 1 Right)</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <Plane size={48} className="text-[#C9A455] mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white mb-2">Upcoming Trips</h3>
          {hasBooked ? (
            <p className="text-slate-400">You are all set for your next adventure. Check your Trips page for itinerary details.</p>
          ) : (
            <>
              <p className="text-slate-400 mb-4">You haven't booked any packages yet. Your Team Bonus is currently locked.</p>
              <button 
                onClick={() => navigate('/member/packages')}
                className="text-[#C9A455] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider"
              >
                Browse Packages →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};
