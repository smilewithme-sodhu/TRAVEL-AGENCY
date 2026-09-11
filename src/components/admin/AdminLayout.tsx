import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  ShieldCheck,
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  FileText,
  ArrowLeft,
  Activity,
  Compass
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentView, setCurrentView } = useApp();

  const navItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'admin-dashboard', label: 'Executive Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { view: 'admin-packages', label: 'Package Margins', icon: <Package className="w-4 h-4" /> },
    { view: 'admin-members', label: 'Members & Network', icon: <Users className="w-4 h-4" /> },
    { view: 'admin-payouts', label: 'Payout Processing', icon: <DollarSign className="w-4 h-4" /> },
    { view: 'admin-audit', label: 'Audit Logs', icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-base text-white tracking-tight">
                ADMIN CONSOLE
              </span>
              <span className="block text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                Financial Risk & Margins
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => setCurrentView(item.view)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setCurrentView('member-dashboard')}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 py-2 cursor-pointer"
          >
            <Activity className="w-4 h-4" />
            <span>Switch to Member View</span>
          </button>
          <button
            onClick={() => setCurrentView('home')}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-white py-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Public Storefront</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};
