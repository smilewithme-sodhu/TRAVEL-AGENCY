import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useWanderlust } from '../../context/WanderlustContext';
import {
  ShieldCheck,
  Package,
  Users,
  CreditCard,
  History,
  ArrowLeft,
  Compass
} from 'lucide-react';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentView } = useWanderlust();

  const navItems = [
    { view: 'admin-dashboard', label: 'Overview', icon: <ShieldCheck className="w-4 h-4" /> },
    { view: 'admin-packages', label: 'Manage Packages', icon: <Package className="w-4 h-4" /> },
    { view: 'admin-bookings', label: 'Manage Bookings', icon: <Compass className="w-4 h-4" /> },
    { view: 'admin-members', label: 'Manage Members', icon: <Users className="w-4 h-4" /> },
    { view: 'admin-payouts', label: 'Payout Approvals', icon: <CreditCard className="w-4 h-4" /> },
    { view: 'admin-audit', label: 'Audit Logs', icon: <History className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-[#0F172A] text-slate-300 border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-sans text-base font-extrabold text-white">
                ADMIN CONSOLE
              </span>
              <span className="block text-[9px] text-blue-400 uppercase tracking-widest font-semibold">
                Agency Control Center
              </span>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => navigate(item.view === 'admin-dashboard' ? '/admin' : `/admin/${item.view.replace('admin-', '')}`)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                location.pathname === (item.view === 'admin-dashboard' ? '/admin' : `/admin/${item.view.replace('admin-', '')}`)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto flex flex-col gap-2">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-slate-400 hover:text-white bg-slate-800/80 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('user');
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-red-400 hover:text-white bg-red-900/30 hover:bg-red-800 transition-colors"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
