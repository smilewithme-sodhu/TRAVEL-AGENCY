import React, { useState } from 'react';
import { useWanderlust } from '../../context/WanderlustContext';
import { Compass, ArrowRight, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';

export const MemberLogin = () => {
  const { showToast, setIsLoggedIn, setMemberProfile } = useWanderlust();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      showToast('Please enter your email and password.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Real backend auth endpoint
      const { data } = await apiClient.post('/api/auth/login/member', { email: identifier, password });
      
      localStorage.setItem('auth_token', data.token);
      setIsLoggedIn(true);
      
      if (data.user) {
        setMemberProfile(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        showToast('Signed in successfully! Welcome back to Gumnu JUM.', 'success');
        
        if (data.user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/member');
        }
      } else {
        showToast('Signed in successfully! Welcome back to Gumnu JUM.', 'success');
        navigate('/member');
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.error || 'Authentication failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative Soft Travel Glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-900/5 border border-blue-100/80 space-y-6 relative z-10 animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#0A3161] flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-xl text-[#0A3161] leading-none tracking-tight">
                Gumnu JUM
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#2563EB] font-bold">
                BY LISA TRAVELS
              </div>
            </div>
          </div>
          
          <h2 className="font-sans font-extrabold text-2xl text-[#0A3161] pt-3">
            Member Sign In
          </h2>
          <p className="text-xs text-slate-500">
            Access your journeys, binary rewards, and member wallet.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#0A3161] block">
              Email or Mobile
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                id="login-identifier"
                name="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@domain.com or +91..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-blue-100 rounded-xl text-xs font-semibold text-[#0A3161] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#0A3161] block">
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[11px] font-semibold text-[#2563EB] hover:text-[#0A3161] cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                id="login-password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-blue-100 rounded-xl text-xs font-semibold text-[#0A3161] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#FACC15] hover:bg-yellow-400 text-[#0A3161] rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-yellow-500/20 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Member Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Don't have a member account? </span>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="font-bold text-[#2563EB] hover:text-[#0A3161] cursor-pointer"
          >
            Apply for Membership
          </button>
        </div>
      </div>
    </div>
  );
};
