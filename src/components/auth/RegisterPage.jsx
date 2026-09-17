import React, { useState } from "react";
import { useWanderlust } from "../../context/WanderlustContext";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Phone,
  User,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api/client";

export const RegisterPage = () => {
  const { navigateTo, showToast } = useWanderlust();
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placementSide, setPlacementSide] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("ref")) setReferralCode(params.get("ref") || "");
    if (params.has("leg")) {
      const leg = params.get("leg")?.toUpperCase();
      if (leg === "LEFT" || leg === "RIGHT") setPlacementSide(leg);
    }
    if (params.has("ref") && params.has("leg")) setIsLocked(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !fullName ||
      !mobile ||
      !email ||
      !password ||
      !referralCode ||
      !placementSide
    ) {
      showToast(
        "Please fill in all mandatory fields, including Referral Code and Placement Leg.",
        "error"
      );
      return;
    }
    if (!agreeTerms) {
      showToast("Please accept the membership terms and conditions.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post("/api/auth/register", {
        name: fullName,
        email,
        phone: mobile,
        password,
        referralCode,
        placementLeg: placementSide,
      });

      if (response.data?.token) {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      showToast("Registration successful! Welcome to Wanderlust.", "success");
      navigate("/member");
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.error || "Registration failed.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-[#0F172A] relative overflow-hidden flex-col justify-between p-12 lg:p-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent" />
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-3 select-none">
            <div className="w-12 h-12 rounded-full bg-[#C9A455] flex items-center justify-center text-[#0F172A] shadow-lg">
              <Compass className="w-7 h-7" />
            </div>
            <span className="text-2xl font-display font-bold tracking-widest text-white">
              WANDERLUST
            </span>
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-white leading-[1.1] mb-6">
              Curate Your World. <br />
              <span className="text-[#C9A455]">Reward Your Journey.</span>
            </h1>
            <p className="text-slate-300 text-lg font-medium leading-relaxed">
              Join an exclusive binary network of travel curators. Earn powerful
              matching bonuses and travel the world at insider margins.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#C9A455]">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold">Direct Rewards</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Earn upfront cash bonuses for every traveler you personally invite to the club.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#C9A455]">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold">Binary Matching</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Unlock exponential passive income as your left and right teams grow globally.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 xl:px-32 relative">
        <div className="w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </button>

          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-[#C9A455]">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-lg font-display font-bold tracking-widest text-[#0F172A]">
              WANDERLUST
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-3 tracking-tight">
              Apply for Membership
            </h2>
            <p className="text-slate-500 text-sm">
              Join an exclusive community of discerning travelers and bespoke journey curators.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Full Legal Name
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Smilewithme"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="9800452188"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="smilewithme470@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  Referral Code
                </label>
                <div className="relative flex items-center">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="genesis"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                    disabled={isLocked}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Placement Leg
              </label>
              <div className="relative flex items-center">
                <select
                  value={placementSide}
                  onChange={(e) => setPlacementSide(e.target.value)}
                  className="w-full pl-4 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white appearance-none"
                  disabled={isLocked}
                >
                  <option value="" disabled>Select placement leg</option>
                  <option value="LEFT">Left Team</option>
                  <option value="RIGHT">Right Team</option>
                </select>
                <div className="absolute right-3.5 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-2.5 mt-4 group cursor-pointer">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="appearance-none w-4 h-4 border border-slate-300 rounded-[4px] checked:bg-slate-900 checked:border-slate-900 transition-colors cursor-pointer"
                />
                {agreeTerms && (
                  <svg className="w-2.5 h-2.5 text-white absolute pointer-events-none" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-xs text-slate-600 leading-snug group-hover:text-slate-900 transition-colors select-none">
                I agree to the Wanderlust Member Terms of Membership. I understand that reward eligibility is activated exclusively through genuine qualifying travel bookings.
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Complete Member Registration
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
