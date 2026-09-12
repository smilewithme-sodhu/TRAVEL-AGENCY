import React, { useState, useEffect } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { BrandLogo } from './BrandLogo';
import { DesktopNav } from './DesktopNav';
import { RightActions } from './RightActions';
import { MobileMenu } from './MobileMenu';

export const HeaderNav = () => {
  const {
    currentView,
    navigateTo,
    openWhatsApp,
    openPhoneCall,
    agencyPhone,
    memberProfile
  } = useWaypoint();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <BrandLogo handleNavClick={handleNavClick} />

          <DesktopNav
            currentView={currentView}
            handleNavClick={handleNavClick}
          />

          <RightActions
            openPhoneCall={openPhoneCall}
            agencyPhone={agencyPhone}
            memberProfile={memberProfile}
            handleNavClick={handleNavClick}
            openWhatsApp={openWhatsApp}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </header>

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentView={currentView}
        handleNavClick={handleNavClick}
        openWhatsApp={openWhatsApp}
      />
    </>
  );
};
