import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'white' | 'sand' | 'dark' | 'transparent';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  padding = 'md',
  variant = 'white'
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-12'
  };

  const variantStyles = {
    white: 'bg-white border border-[#071A2F]/8 shadow-[0_4px_24px_-4px_rgba(7,26,47,0.04)]',
    sand: 'bg-[#EFECE4]/70 border border-[#071A2F]/6',
    dark: 'bg-[#071A2F] text-white border border-white/10 shadow-xl',
    transparent: 'bg-transparent border border-[#071A2F]/10'
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl sm:rounded-3xl transition-all duration-500 ${variantStyles[variant]} ${
        hoverEffect ? 'hover:-translate-y-1 hover:shadow-[0_16px_40px_-8px_rgba(7,26,47,0.08)] cursor-pointer' : ''
      } ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};
