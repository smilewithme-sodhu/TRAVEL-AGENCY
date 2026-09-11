import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'teal' | 'gold' | 'navy' | 'muted' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'teal',
  size = 'md',
  className = '',
  dot = false
}) => {
  const variantStyles = {
    teal: 'bg-[#E6F4F4] text-[#0A6367] border border-[#0E8388]/20',
    gold: 'bg-[#FBF7EE] text-[#8B6B38] border border-[#C5A880]/30',
    navy: 'bg-[#071A2F]/5 text-[#071A2F] border border-[#071A2F]/10',
    muted: 'bg-[#F1EFE9] text-[#64748B] border border-[#E2DDD0]',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200'
  };

  const dotColors = {
    teal: 'bg-[#0E8388]',
    gold: 'bg-[#C5A880]',
    navy: 'bg-[#071A2F]',
    muted: 'bg-slate-400',
    danger: 'bg-rose-600'
  };

  const sizeStyles = {
    sm: 'text-[10px] font-medium tracking-wider uppercase px-2.5 py-0.5',
    md: 'text-[11px] font-semibold tracking-wider uppercase px-3 py-1',
    lg: 'text-xs font-semibold tracking-wider uppercase px-4 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-sans transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
