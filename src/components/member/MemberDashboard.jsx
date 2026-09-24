import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Zap, Wallet, Plane, TrendingUp, Users, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
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
      <div className="flex h-full items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-blue-100 border-t-[#2563EB] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fallback if API fails
  if (!dashboardData) return <div className="text-[#0A3161] font-bold p-8">Failed to load profile.</div>;

  const isGreen = dashboardData.member.status === 'GREEN' || dashboardData.member.status === 'ORANGE';
  const hasBooked = (dashboardData.bookings && dashboardData.bookings.length > 0) || dashboardData.member.status === 'ORANGE';

  return (
    <div className="bg-[#F4F7FC] min-h-full rounded-3xl p-6 md:p-8 shadow-sm border border-blue-100/80 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-6">
      
      {/* --- INACTIVE (RED ID) FOMO BANNER --- */}
      {!isGreen && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-4 text-red-900 opacity-5 pointer-events-none">
            <Lock size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-red-900 flex items-center gap-2">
                <AlertTriangle className="text-red-500" />
                Your Account is Inactive (RED ID)
              </h2>
              <p className="text-red-800/80 mt-2 max-w-2xl text-sm leading-relaxed">
                You are currently missing out on <strong className="text-red-950">Binary Spillover</strong> and <strong className="text-red-950">Team Bonuses</strong>. Your position in the tree is locked, but points from your upline will bypass you until you activate.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2.5 w-full md:w-auto shrink-0">
              <button 
                onClick={() => window.open('https://wa.me/YOUR_ADMIN_NUMBER', '_blank')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md shadow-red-500/20 cursor-pointer"
              >
                Activate Now (₹500)
              </button>
              <span className="text-xs text-red-600/90 font-medium">Pay via WhatsApp & send UTR</span>
            </div>
          </div>
        </div>
      )}

      {/* --- ACTIVE (GREEN ID) SUCCESS BANNER --- */}
      {isGreen && !hasBooked && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0A3161] flex items-center gap-2">
                <ShieldCheck className="text-[#2563EB]" /> Active Member (GREEN ID)
              </h2>
              <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                Your position in the binary tree is secured! However, to unlock the <strong className="text-[#0A3161]">5-Level Team Bonus</strong>, you must book your first travel package.
              </p>
            </div>
            <button 
              onClick={() => navigate('/member/packages')}
              className="bg-[#FACC15] hover:bg-yellow-400 text-[#0A3161] font-bold py-3 px-8 rounded-xl transition-all shadow-md shadow-yellow-500/20 cursor-pointer shrink-0"
            >
              Book a Package
            </button>
          </div>
        </div>
      )}

      {/* --- FINANCIAL STATS (BLURRED IF INACTIVE) --- */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${!isGreen ? 'opacity-50 blur-[2px] pointer-events-none' : ''}`}>
        
        {/* Wallet Balance */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-lg shadow-blue-900/5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-[#2563EB]">
              <Wallet size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Available Balance</p>
          <h3 className="text-3xl font-bold text-[#0A3161] mt-1">₹{dashboardData.member.walletBalance}</h3>
        </div>

        {/* Direct Referrals */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-lg shadow-blue-900/5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <Users size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Direct Referrals</p>
          <h3 className="text-3xl font-bold text-[#0A3161] mt-1">{dashboardData.overview.activeDirectReferrals}</h3>
        </div>

        {/* Left BV */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-lg shadow-blue-900/5 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-[#2563EB]"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-[#2563EB]">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Left Leg Volume (BV)</p>
          <h3 className="text-3xl font-bold text-[#0A3161] mt-1">{dashboardData.overview.leftVolume}</h3>
        </div>

        {/* Right BV */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-lg shadow-blue-900/5 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1 bg-emerald-500"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <Zap size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Right Leg Volume (BV)</p>
          <h3 className="text-3xl font-bold text-[#0A3161] mt-1">{dashboardData.overview.rightVolume}</h3>
        </div>
      </div>

      {/* --- RECENT ACTIVITY / NEXT STEPS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-lg shadow-blue-900/5">
          <h3 className="text-lg font-bold text-[#0A3161] mb-4">Your Next Milestones</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-slate-600 text-sm">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isGreen ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>✓</div>
              <span className={isGreen ? 'text-[#0A3161] font-semibold' : ''}>Pay ₹500 Activation Fee</span>
            </li>
            <li className="flex items-center gap-3 text-slate-600 text-sm">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${hasBooked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>✓</div>
              <span className={hasBooked ? 'text-[#0A3161] font-semibold' : ''}>Book your first Travel Package</span>
            </li>
            <li className="flex items-center gap-3 text-slate-600 text-sm">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-bold">✓</div>
              <span>Refer 2 Active Members (1 Left, 1 Right)</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-lg shadow-blue-900/5 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2563EB] mb-4">
            <Plane size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#0A3161] mb-2">Upcoming Trips</h3>
          {hasBooked ? (
            <p className="text-slate-500 text-sm">You are all set for your next adventure. Check your Journeys page for itinerary details.</p>
          ) : (
            <>
              <p className="text-slate-500 text-sm mb-4">You haven't booked any packages yet. Your Team Bonus is currently locked.</p>
              <button 
                onClick={() => navigate('/member/packages')}
                className="inline-flex items-center gap-1.5 text-[#2563EB] hover:text-[#0A3161] font-bold text-sm tracking-wide uppercase transition-colors cursor-pointer"
              >
                <span>Browse Packages</span>
                <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};
