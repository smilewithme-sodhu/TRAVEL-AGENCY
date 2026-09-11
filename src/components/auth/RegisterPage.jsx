import React, { useState } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { Compass, ArrowRight, User, Mail, Phone, Lock, Tag, ArrowLeft } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, setDoc, getDocs, query, collection, where, getDoc, updateDoc } from 'firebase/firestore';

export const RegisterPage = () => {
  const { navigateTo, showToast } = useWaypoint();
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placementSide, setPlacementSide] = useState('');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('ref')) setReferralCode(params.get('ref') || '');
    if (params.has('leg')) {
      const leg = params.get('leg')?.toUpperCase();
      if (leg === 'LEFT' || leg === 'RIGHT') setPlacementSide(leg);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !mobile || !email || !password) {
      showToast('Please fill in all mandatory fields.', 'error');
      return;
    }
    if (!agreeTerms) {
      showToast('Please accept the membership terms and conditions.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Binary Tree Spillover Algorithm
      let currentParentId = null;
      let finalPlacementSide = placementSide || 'AUTO';

      if (referralCode) {
        const sponsorQuery = query(collection(db, 'users'), where('referralCode', '==', referralCode));
        const sponsorSnap = await getDocs(sponsorQuery);
        
        if (!sponsorSnap.empty) {
          const sponsorDoc = sponsorSnap.docs[0];
          currentParentId = sponsorDoc.id;
          const sponsorData = sponsorDoc.data();

          if (finalPlacementSide === 'AUTO') {
            finalPlacementSide = sponsorData.defaultPlacement || 'LEFT';
            if (finalPlacementSide === 'AUTO') finalPlacementSide = 'LEFT';
          }

          let foundEmptySpot = false;
          while (!foundEmptySpot) {
            const currentSnap = await getDoc(doc(db, 'users', currentParentId));
            const currentData = currentSnap.data();
            const childId = finalPlacementSide === 'LEFT' ? currentData.leftId : currentData.rightId;
            
            if (!childId) {
              foundEmptySpot = true;
            } else {
              currentParentId = childId;
            }
          }
        }
      }

      // 2. Create the Auth Account
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const newUserId = result.user.uid;
      const newReferralCode = `TRV${newUserId.substring(0,6).toUpperCase()}`;

      // 3. Link new user to their binary parent
      if (currentParentId && finalPlacementSide !== 'AUTO') {
        await updateDoc(doc(db, 'users', currentParentId), {
          [finalPlacementSide === 'LEFT' ? 'leftId' : 'rightId']: newUserId
        });
      }

      // 4. Save full profile to Firestore
      await setDoc(doc(db, 'users', newUserId), {
        name: fullName,
        email: email,
        phone: mobile,
        sponsorCode: referralCode || '',
        referralCode: newReferralCode,
        placementSide: placementSide || 'AUTO',
        binaryParentId: currentParentId || null,
        binarySide: finalPlacementSide !== 'AUTO' ? finalPlacementSide : null,
        leftId: null,
        rightId: null,
        status: 'GREEN_ACTIVE',
        joinedDate: new Date().toISOString(),
        travelPoints: 0,
        walletBalance: 0
      });

      showToast('Registration successful! Welcome to Wanderlust.', 'success');
      navigateTo('member-dashboard');
    } catch (err) {
      console.error(err);
      showToast('Registration failed. Email might be in use.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
        {/* Top return */}
        <button
          type="button"
          onClick={() => navigateTo('login')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </button>

        {/* Brand Header */}
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
            Apply for Membership
          </h2>
          <p className="text-xs text-slate-500">
            Join an exclusive community of discerning travelers and bespoke journey curators.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
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
                placeholder="e.g. Vikramaditya Singhania"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  placeholder="+91 98765 00000"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                  required
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
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Referral Code (Optional)
              </label>
              <div className="relative flex items-center">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  name="sponsor-referral-code-field"
                  autoComplete="off"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="TRV1092"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
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
                  placeholder="Choose password"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="text-[11px] text-slate-600 leading-tight cursor-pointer">
              I agree to the Wanderlust Member Terms of Membership. I understand that reward eligibility is activated exclusively through genuine qualifying travel bookings.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{isLoading ? 'Creating Account...' : 'Complete Member Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
