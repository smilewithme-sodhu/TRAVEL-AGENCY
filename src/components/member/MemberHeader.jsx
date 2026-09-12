import React, { useState } from 'react';
import {
  Compass,
  Search,
  Bell,
  ChevronDown,
  ArrowLeft,
  LogOut
} from 'lucide-react';

export const MemberHeader = ({ memberProfile, unreadCount, navigateTo, handleLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
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
  );
};
