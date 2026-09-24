import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWanderlust } from '../../context/WanderlustContext';
import { apiClient } from '../../api/client';
import { ShieldCheck, Compass, Lock, Mail } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setMemberProfile, showToast } = useWanderlust();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiClient.post('/api/auth/login/admin', { email, password });
      
      if (res.data.success) {
        localStorage.setItem('auth_token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setIsLoggedIn(true);
        setMemberProfile(res.data.user);
        showToast('Admin access granted. Welcome to Gumnu JUM Executive Panel.', 'success');
        navigate('/admin');
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Admin login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white border border-blue-100/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-900/5 relative z-10 animate-fadeIn">
        <div className="flex flex-col items-center mb-8 text-center">
          <div
            onClick={() => navigate('/')}
            className="cursor-pointer mb-4"
          >
            <img
              src="/images/gumnu-jum-logo.png"
              alt="Gumnu JUM by Lisa Travels"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#2563EB] font-bold mb-1">
            EXECUTIVE CONSOLE
          </div>
          <h2 className="text-2xl font-display font-bold text-[#0A3161]">Admin Portal</h2>
          <p className="text-slate-500 text-xs mt-1">Restricted management & bookings control center.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0A3161]">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-blue-100 rounded-xl text-xs font-semibold text-[#0A3161] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                placeholder="admin@gumnujum.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0A3161]">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-blue-100 rounded-xl text-xs font-semibold text-[#0A3161] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0A3161] hover:bg-[#075985] text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-md shadow-blue-900/10 disabled:opacity-50 mt-2 cursor-pointer"
          >
            {isLoading ? 'Authenticating...' : 'Secure Admin Login'}
          </button>
        </form>
      </div>
    </div>
  );
};
