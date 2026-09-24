import React from 'react';
import { MessageSquare } from 'lucide-react';
import { AGENCY_WHATSAPP } from '../../context/WanderlustContext';

export const WhatsAppConciergeButton = ({
  destinationName,
  customMessage,
  variant = 'primary', // 'primary' | 'outline' | 'dark'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
}) => {
  const message =
    customMessage ||
    (destinationName
      ? `Hi Gumnu JUM by Lisa Travels, I am interested in travelling to ${destinationName}. I would like to explore the current travel options.`
      : `Hi Gumnu JUM Concierge, I would like to plan my upcoming travel.`);

  const phoneDigits = AGENCY_WHATSAPP || '918972161329';
  const url = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3.5 text-sm',
  }[size];

  const variantClasses = {
    primary: 'bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold shadow-md shadow-emerald-900/10',
    outline: 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-bold',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white font-bold',
  }[variant];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
    >
      <MessageSquare className="w-4 h-4 fill-current shrink-0" />
      <span>Talk to Concierge</span>
    </a>
  );
};
