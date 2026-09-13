import React, { useState } from 'react';
import { useWanderlust } from '../../context/WanderlustContext';
import { authApi } from '../../api';
import { Compass, ArrowRight, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const { navigateTo, showToast } = useWanderlust();
  const [identifier, setIdentifier] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
        <button
          type="button"
          onClick={() => navigateTo('login')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-[#C9A455]">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg text-slate-900">
              WANDERLUST
            </span>
          </div>
          <h2 className="font-sans font-extrabold text-2xl text-slate-900 pt-1">
            Reset Your Password
          </h2>
          <p className="text-xs text-slate-500">
            Enter your registered email address or mobile number to receive a secure recovery code.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-sans font-bold text-sm text-slate-900">Recovery Link Sent</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We have dispatched a one-time verification link to <strong>{identifier}</strong>. Please check your inbox or SMS.
            </p>
            <button
              onClick={() => navigateTo('login')}
              className="mt-2 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Registered Email or Mobile
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@domain.com or +91..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
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
