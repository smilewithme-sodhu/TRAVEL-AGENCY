import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Wallet,
  MoreHorizontal,
  X,
  ArrowLeft,
  LogOut
} from 'lucide-react';

export const MemberMobileNav = ({
  currentView,
  handleMobileNavClick,
  isMoreMenuOpen,
  setIsMoreMenuOpen,
  isMoreActive,
  moreNavItems,
  navigateTo,
  handleLogout
}) => {
  return (
    <>
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
    </>
  );
};
