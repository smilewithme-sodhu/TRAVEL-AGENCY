import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWanderlust } from '../../context/WanderlustContext';
import { apiClient } from '../../api/client';
import { ShieldAlert } from 'lucide-react';

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
        showToast('Admin access granted', 'success');
        navigate('/admin');
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Admin login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center text-red-500 mb-4 border border-red-500/20">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center">Admin Portal</h2>
          <p className="text-slate-400 mt-2 text-sm text-center">Restricted access area.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};
