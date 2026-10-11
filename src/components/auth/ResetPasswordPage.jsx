import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { authApi } from '../../api';
import { useWanderlust } from '../../context/WanderlustContext';

export const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useWanderlust();
  const uid = params.get('uid');
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return showToast('Password must be at least 6 characters.', 'error');
    if (password !== confirm) return showToast('Passwords do not match.', 'error');
    setLoading(true);
    try {
      await authApi.resetPassword({ uid, token, password });
      setDone(true);
    } catch (err) {
      showToast(err?.response?.data?.error || 'Invalid or expired link.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-blue-100 space-y-5">
        <button type="button" onClick={() => navigate('/login')} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0A3161] cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" /><span>Back to Sign In</span>
        </button>
        <h2 className="font-extrabold text-2xl text-[#0A3161]">Set New Password</h2>
        {!uid || !token ? (
          <p className="text-sm text-red-600">This reset link is invalid. Please request a new one.</p>
        ) : done ? (
          <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="text-sm text-slate-700">Password updated successfully.</p>
            <button onClick={() => navigate('/login')} className="w-full py-2.5 rounded-xl bg-[#0A3161] text-white text-xs font-bold cursor-pointer">Go to Login</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-blue-100 rounded-xl text-xs font-semibold text-[#0A3161] focus:outline-none focus:border-[#2563EB]" />
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-blue-100 rounded-xl text-xs font-semibold text-[#0A3161] focus:outline-none focus:border-[#2563EB]" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-[#0A3161] text-white text-xs font-bold disabled:opacity-60 cursor-pointer">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
