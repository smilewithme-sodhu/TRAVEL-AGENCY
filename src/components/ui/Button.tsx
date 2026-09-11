import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'teal' | 'whatsapp' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-bold transition-all duration-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer tracking-wide active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2.5 gap-1.5',
    md: 'text-xs sm:text-sm px-6 py-3.5 gap-2 shadow-xs',
    lg: 'text-sm sm:text-base px-8 py-4 gap-2.5 shadow-md'
  };

  const variantStyles = {
    primary: 'bg-[#0F172A] text-white hover:bg-[#1E293B] focus:ring-[#0F172A] shadow-slate-900/20',
    secondary: 'bg-slate-100 text-[#0F172A] hover:bg-slate-200 focus:ring-slate-300 border border-slate-200',
    teal: 'bg-[#0D9488] text-white hover:bg-[#0F766E] focus:ring-[#0D9488] shadow-teal-900/20',
    whatsapp: 'bg-[#25D366] text-slate-950 hover:bg-[#20bd5a] focus:ring-[#25D366] font-extrabold shadow-emerald-600/20',
    outline: 'bg-transparent text-[#0F172A] border-2 border-[#0F172A]/20 hover:border-[#0F172A] hover:bg-[#0F172A]/5',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-[#0F172A]',
    danger: 'bg-rose-600 text-white hover:bg-rose-700'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
