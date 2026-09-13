import React, { useState } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import {
  Share2,
  Copy,

  MessageSquare,
  QrCode,




} from 'lucide-react';

const ShareLinksCard = ({ shareUrl, handleCopy, handleWebShare }) => (
  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
    <div className="space-y-1">
      <span className="font-mono text-[10px] font-bold text-[#C9A455] uppercase tracking-wider block">
        UNIQUE REFERRAL LINK
      </span>
      <h3 className="font-sans font-extrabold text-lg text-slate-900">
        Your Direct Invite URL
      </h3>
    </div>

    <div className="space-y-4">
      {/* Default Link */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-500 uppercase ml-1">Auto-Balance Placement Link</span>
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3">
          <span className="font-mono text-xs font-bold text-slate-800 truncate">
            {shareUrl}
          </span>
          <button
            onClick={() => handleCopy(shareUrl)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </button>
        </div>
      </div>

      {/* Left Leg Link */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-blue-600 uppercase ml-1">Force Left Leg Placement Link</span>
        <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between gap-3">
          <span className="font-mono text-xs font-bold text-slate-800 truncate">
            {shareUrl}?leg=left
          </span>
          <button
            onClick={() => handleCopy(`${shareUrl}?leg=left`)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </button>
        </div>
      </div>

      {/* Right Leg Link */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-amber-600 uppercase ml-1">Force Right Leg Placement Link</span>
        <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-100 flex items-center justify-between gap-3">
          <span className="font-mono text-xs font-bold text-slate-800 truncate">
            {shareUrl}?leg=right
          </span>
          <button
            onClick={() => handleCopy(`${shareUrl}?leg=right`)}
            className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </button>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        onClick={handleWebShare}
        className="py-3 px-4 rounded-xl border border-slate-200 text-slate-800 font-extrabold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <Share2 className="w-4 h-4 text-blue-600" />
        <span>Device Share / Airdrop</span>
      </button>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(`Plan your dream luxury vacation with Wanderlust Travel Agency: ${shareUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span>Share via WhatsApp</span>
      </a>
    </div>
  </div>
);

const QrCodeCard = ({ referralCode }) => (
  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center gap-6">
    <div className="w-36 h-36 bg-slate-900 rounded-2xl p-3 flex items-center justify-center shrink-0 shadow-md">
      {/* Clean Stylized QR Pattern */}
      <div className="w-full h-full bg-white rounded-xl p-2 flex flex-col items-center justify-center">
        <QrCode className="w-24 h-24 text-slate-900 stroke-[1.5]" />
      </div>
    </div>

    <div className="space-y-2 text-center sm:text-left">
      <h4 className="font-sans font-bold text-base text-slate-900">
        Instant QR Code Scanner
      </h4>
      <p className="text-xs text-slate-500 leading-relaxed">
        Scan this QR code with any smartphone camera at travel meetups or events to open your personalized referral registration page instantly.
      </p>
      <div className="font-mono text-[10px] text-slate-400 font-bold">
        MEMBER CODE: #{referralCode}
      </div>
    </div>
  </div>
);

const AttributionGuidelines = () => (
  <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-5">
    <h3 className="font-sans font-extrabold text-base text-slate-900">
      Attribution Guidelines
    </h3>

    <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
      <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
        <span className="font-bold text-slate-900 block">1. First-Touch Attribution</span>
        <p className="text-slate-500 text-[11px]">
          When a visitor registers through your referral link, their membership code is permanently bound to your sponsor organization.
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
        <span className="font-bold text-slate-900 block">2. Travel Activation Requirement</span>
        <p className="text-slate-500 text-[11px]">
          Direct referral commissions and team overrides are credited exclusively upon confirmed departure of genuine qualifying travel packages.
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
        <span className="font-bold text-slate-900 block">3. Dual-Leg Automatic Placement</span>
        <p className="text-slate-500 text-[11px]">
          New members are automatically assigned to your balanced binary leg (Left/Right) to maximize volume matching opportunities.
        </p>
      </div>
    </div>
  </div>
);

export const ReferralsPage = () => {
  const { memberProfile, showToast } = useWaypoint();


  const [_isCopied, setIsCopied] = useState(false);

  const referralCode = memberProfile?.referralCode || (memberProfile?.id ? `TRV${memberProfile.id.substring(0,4).toUpperCase()}` : 'NEW');
  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/r/${referralCode}`;

  const handleCopy = (urlToCopy = shareUrl) => {
    navigator.clipboard.writeText(urlToCopy);
    setIsCopied(true);
    showToast('Referral link copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wanderlust Luxury Travel Club',
          text: `Explore handcrafted luxury journeys with personal WhatsApp concierge consultation. (Invited by ${memberProfile?.name || 'Member'})`,
          url: shareUrl,
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-2 border-b border-slate-100">
        <h1 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
          Referral Management & Attribution Hub
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Share your personal referral link to invite travelers into your community and earn direct commission rewards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Share Cards & QR (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <ShareLinksCard shareUrl={shareUrl} handleCopy={handleCopy} handleWebShare={handleWebShare} />
          <QrCodeCard referralCode={referralCode} />
        </div>

        {/* Right: Referral Rules & Guidelines (5 cols) */}
        <AttributionGuidelines />
      </div>
    </div>
  );
};
