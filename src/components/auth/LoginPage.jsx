import React, { useState } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { Compass, ArrowRight, Lock, User, CheckCircle2 } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export const LoginPage = () => {
  const { navigateTo, showToast } = useWaypoint();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      showToast('Please enter your email and password.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Use Firebase Email/Password Auth
      await signInWithEmailAndPassword(auth, identifier, password);
      showToast('Signed in successfully! Welcome to your Member Atelier.', 'success');
      navigateTo('member-dashboard');
    } catch (err) {
      console.error(err);
      showToast('Authentication failed. Please check your credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-[#C9A455] shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
              WANDERLUST
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#C9A455] font-bold">
            MEMBER ATELIER ACCESS
          </p>
          <h2 className="font-sans font-extrabold text-2xl text-slate-900 pt-2">
            Sign In to Your Account
          </h2>
          <p className="text-xs text-slate-500">
            Access your travel journeys, member rewards, and referral network.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
              Email or Mobile
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@domain.com or +91..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Password
              </label>
              <button
                type="button"
                onClick={() => navigateTo('forgot-password')}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
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
            onClick={() => navigateTo('register')}
            className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer"
          >
            Apply for Membership
          </button>
        </div>
      </div>
    </div>
  );
};
