import React, { useState } from 'react';
import { useWanderlust } from '../../context/WanderlustContext';
import { authApi } from '../../api';
import { Compass, ArrowRight, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const { showToast } = useWanderlust();
  const [identifier, setIdentifier] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier) return;

    setIsLoading(true);
    try {
      await authApi.forgotPassword(identifier);
      setIsSubmitted(true);
      showToast('Password reset instructions sent!', 'success');
    } catch {
      showToast('Failed to send recovery instructions.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-900/5 border border-blue-100/80 space-y-6 relative z-10 animate-fadeIn">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0A3161] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#0284C7] to-[#0A3161] flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-[#0A3161] block leading-none">
                Gumnu JUM
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#2563EB] font-bold">
                BY LISA TRAVELS
              </span>
            </div>
          </div>
          <h2 className="font-sans font-extrabold text-2xl text-[#0A3161] pt-3">
            Reset Password
          </h2>
          <p className="text-xs text-slate-500">
            Enter your registered email address to receive secure recovery instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-sans font-bold text-sm text-[#0A3161]">Recovery Link Sent</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We have dispatched instructions to <strong>{identifier}</strong>. Please check your inbox.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-2 w-full py-2.5 rounded-xl bg-[#0A3161] text-white text-xs font-bold hover:bg-[#075985] cursor-pointer"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#0A3161] block">
                Registered Email
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-blue-100 rounded-xl text-xs font-semibold text-[#0A3161] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#FACC15] hover:bg-yellow-400 text-[#0A3161] rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-yellow-500/20 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Sending Link...' : 'Send Recovery Instructions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
