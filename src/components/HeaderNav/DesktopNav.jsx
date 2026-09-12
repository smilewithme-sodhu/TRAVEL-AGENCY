import React from 'react';
import { navLinks } from './constants';

export const DesktopNav = ({ currentView, handleNavClick }) => {
  return (
    <nav className="hidden lg:flex items-center gap-7 text-xs font-bold">
      {navLinks.map((link) => {
        const isActive = currentView === link.id;
        return (
          <button
            key={link.id}
            onClick={() => handleNavClick(link.id)}
            className={`transition-colors cursor-pointer ${
              isActive
                ? 'text-[#C9A455] font-extrabold'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            {link.label}
          </button>
        );
      })}
    </nav>
  );
};
