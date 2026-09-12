import React from 'react';

export const MemberSidebar = ({
  memberProfile,
  currentView,
  navigateTo,
  setMemberStatusDemo,
  navItems,
  status
}) => {
  return (
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
  );
};
