import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useWanderlust } from '../../context/WanderlustContext';
import { notificationsApi } from '../../api';
import {
  LayoutDashboard,
  Compass,
  Palmtree,
  Users,
  GitFork,
  Award,
  Wallet,
  ArrowUpRight,
  Share2,
  User,
  Headphones,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  MoreHorizontal,
  X
} from 'lucide-react';

export const MemberLayout = () => {
  const { currentView, navigateTo, memberProfile, setMemberStatusDemo, setIsLoggedIn, showToast } = useWanderlust();
  const [unreadCount, setUnreadCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  useEffect(() => {
    notificationsApi.getAll().then((res) => {
      if (res.success) {
        setUnreadCount(res.data.filter((n) => !n.isRead).length);
      }
    });
  }, [currentView]);

  const navItems = [
    { view: 'member-dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { view: 'member-trips', label: 'My Journeys', icon: <CalendarCheck className="w-4 h-4" /> },
    { view: 'member-explore', label: 'Explore Trips', icon: <Palmtree className="w-4 h-4" /> },
    { view: 'member-network', label: 'My Network', icon: <Users className="w-4 h-4" /> },
    { view: 'member-binary', label: 'Binary Tree', icon: <GitFork className="w-4 h-4" /> },
    { view: 'member-rewards', label: 'Rewards', icon: <Award className="w-4 h-4" /> },
    { view: 'member-wallet', label: 'Wallet', icon: <Wallet className="w-4 h-4" /> },
    { view: 'member-withdraw', label: 'Withdraw', icon: <ArrowUpRight className="w-4 h-4" /> },
    { view: 'member-referral', label: 'Referral Hub', icon: <Share2 className="w-4 h-4" /> },
    { view: 'member-profile', label: 'Profile & KYC', icon: <User className="w-4 h-4" /> },
    { view: 'member-support', label: 'Support Desk', icon: <Headphones className="w-4 h-4" /> },
  ];

  // Remaining navigation items that open inside the "More" bottom sheet on mobile
  const moreNavItems = [
    { view: 'member-explore', label: 'Explore Trips', icon: <Palmtree className="w-5 h-5" /> },
    { view: 'member-binary', label: 'Binary Tree', icon: <GitFork className="w-5 h-5" /> },
    { view: 'member-rewards', label: 'Rewards Ledger', icon: <Award className="w-5 h-5" /> },
    { view: 'member-withdraw', label: 'Request Withdrawal', icon: <ArrowUpRight className="w-5 h-5" /> },
    { view: 'member-referral', label: 'Referral Hub & QR', icon: <Share2 className="w-5 h-5" /> },
    { view: 'member-profile', label: 'Profile & KYC', icon: <User className="w-5 h-5" /> },
    { view: 'member-support', label: 'Support Desk', icon: <Headphones className="w-5 h-5" /> },
    { view: 'member-notifications', label: 'Notification Center', icon: <Bell className="w-5 h-5" />, badge: unreadCount > 0 ? unreadCount : null },
  ];

  const isMoreActive = moreNavItems.some((item) => item.view === currentView) || isMoreMenuOpen;

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    showToast('You have been securely signed out.', 'info');
    navigateTo('home');
  };

  const handleMobileNavClick = (view) => {
    navigateTo(view);
    setIsMoreMenuOpen(false);
  };

  const status = memberProfile?.status || 'ACTIVE';

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col pb-20 lg:pb-0">
      {/* 1. Global Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
        {/* Left Brand */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center text-[#C9A455] shadow-xs group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display font-bold text-base text-slate-900 leading-tight">
              WANDERLUST
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#C9A455] font-bold">
              MEMBER ATELIER
            </div>
          </div>
        </div>

        {/* Center Search (Contextual) */}
        <div className="hidden md:flex items-center relative w-72 lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search journeys, network, or transactions..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-full text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-400 transition-colors"
          />
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications Bell */}
          <button
            onClick={() => navigateTo('member-notifications')}
            className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* User Profile Pill & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 p-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#0F172A] text-[#C9A455] font-bold text-xs flex items-center justify-center">
                {memberProfile?.name?.charAt(0) || '-'}
              </div>
              <span className="hidden sm:inline font-bold text-xs text-slate-900 max-w-[110px] truncate">
                {memberProfile?.name?.split(' ')[0] || 'Member'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fadeIn">
                <div className="p-3 border-b border-slate-100">
                  <div className="font-bold text-xs text-slate-900">{memberProfile?.name || 'Loading Profile...'}</div>
                  <div className="font-mono text-[10px] text-slate-500">ID: #{memberProfile?.memberCode || '---'}</div>
                </div>
                <div className="py-1 space-y-0.5">
                  <button
                    onClick={() => {
                      navigateTo('member-profile');
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    My Profile & KYC
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('member-support');
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    Support Desk
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('home');
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Public Storefront</span>
                  </button>
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
        {/* 2. Desktop Collapsible Sidebar */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 space-y-6">
          {/* Member Status Badge */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400">Membership</span>
              <span
                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  status === 'ACTIVE' || status === 'GREEN_ACTIVE'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : status === 'YELLOW' || status === 'REGISTERED'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {status === 'ACTIVE' || status === 'GREEN_ACTIVE' ? '🟢 Active' : '🟡 Registered'}
              </span>
            </div>
            <div className="font-display font-bold text-sm text-slate-900">
              {memberProfile?.rank || 'Loading Rank...'}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Sponsor: <span className="text-slate-800 font-semibold">{memberProfile?.sponsorName || 'Direct Sign Up'}</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => navigateTo(item.view)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <span className={isActive ? 'text-[#C9A455]' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sandbox Status Switcher */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 space-y-2 mt-auto">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Simulate Status:
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setMemberStatusDemo('ACTIVE', 'Confirmed')}
                className={`py-1 rounded-lg text-[10px] font-bold ${
                  status === 'ACTIVE' || status === 'GREEN_ACTIVE'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Active Member
              </button>
              <button
                onClick={() => setMemberStatusDemo('REGISTERED', 'Hold')}
                className={`py-1 rounded-lg text-[10px] font-bold ${
                  status === 'REGISTERED' || status === 'YELLOW'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Registered
              </button>
            </div>
          </div>
        </aside>

        {/* 3. Main Content Container */}
        <main className="flex-1 min-w-0"><Outlet /></main>
      </div>

      {/* 4. Mobile Bottom Navigation Dock */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-lg">
        {/* Home */}
        <button
          onClick={() => handleMobileNavClick('member-dashboard')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold transition-colors cursor-pointer ${
            currentView === 'member-dashboard' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>

        {/* Trips */}
        <button
          onClick={() => handleMobileNavClick('member-trips')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold transition-colors cursor-pointer ${
            currentView === 'member-trips' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Trips</span>
        </button>

        {/* Network */}
        <button
          onClick={() => handleMobileNavClick('member-network')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold transition-colors cursor-pointer ${
            currentView === 'member-network' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Network</span>
        </button>

        {/* Wallet */}
        <button
          onClick={() => handleMobileNavClick('member-wallet')}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold transition-colors cursor-pointer ${
            currentView === 'member-wallet' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>Wallet</span>
        </button>

        {/* More */}
        <button
          onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
          className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold transition-colors cursor-pointer ${
            isMoreActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MoreHorizontal className="w-4 h-4" />
          <span>More</span>
        </button>
      </nav>

      {/* 5. Mobile "More" Bottom Sheet Modal */}
      {isMoreMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          {/* Backdrop Click-to-Close */}
          <div
            className="flex-1"
            onClick={() => setIsMoreMenuOpen(false)}
          />

          {/* Bottom Sheet Card */}
          <div className="bg-white rounded-t-3xl p-6 border-t border-slate-100 shadow-2xl space-y-4 max-h-[82vh] overflow-y-auto animate-slideUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#C9A455] tracking-widest block">
                  MEMBER ATELIER
                </span>
                <h3 className="font-sans font-extrabold text-base text-slate-900">
                  More Navigation Options
                </h3>
              </div>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of Remaining Navigation Items */}
            <div className="grid grid-cols-2 gap-2.5">
              {moreNavItems.map((item) => {
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => handleMobileNavClick(item.view)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0F172A] text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-white/10 text-[#C9A455]'
                          : 'bg-white text-slate-700 shadow-2xs'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate">
                        {item.label}
                      </div>
                      {item.badge && (
                        <span className="inline-block mt-0.5 text-[9px] font-black uppercase px-1.5 py-0.2 bg-red-500 text-white rounded-full">
                          {item.badge} new
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  navigateTo('home');
                  setIsMoreMenuOpen(false);
                }}
                className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 py-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  handleLogout();
                }}
                className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 py-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
