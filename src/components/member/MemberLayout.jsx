import React, { useState, useEffect } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { notificationsApi } from '../../api';
import { MemberHeader } from './MemberHeader';
import { MemberSidebar } from './MemberSidebar';
import { MemberMobileNav } from './MemberMobileNav';
import {
  LayoutDashboard,
  Palmtree,
  Users,
  GitFork,
  Award,
  Wallet,
  ArrowUpRight,
  Share2,
  User,
  Headphones,
  Bell,
  CalendarCheck,
} from 'lucide-react';

export const MemberLayout = ({ children }) => {
  const { currentView, navigateTo, memberProfile, setMemberStatusDemo, setIsLoggedIn, showToast } = useWaypoint();
  const [unreadCount, setUnreadCount] = useState(2);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  useEffect(() => {
    notificationsApi.getAll().then((res) => {
      if (res.success) {
        setUnreadCount(res.data.filter((n) => !n.isRead).length);
      }
    });
  }, [currentView]);

  const navItems = [
    { view: 'member-dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { view: 'member-trips', label: 'My Journeys', icon: <CalendarCheck className="w-4 h-4" /> },
    { view: 'member-explore', label: 'Explore Trips', icon: <Palmtree className="w-4 h-4" /> },
    { view: 'member-network', label: 'My Network', icon: <Users className="w-4 h-4" /> },
    { view: 'member-binary', label: 'Binary Tree', icon: <GitFork className="w-4 h-4" /> },
    { view: 'member-rewards', label: 'Rewards', icon: <Award className="w-4 h-4" /> },
    { view: 'member-wallet', label: 'Wallet', icon: <Wallet className="w-4 h-4" /> },
    { view: 'member-withdraw', label: 'Withdraw', icon: <ArrowUpRight className="w-4 h-4" /> },
    { view: 'member-referral', label: 'Referral Hub', icon: <Share2 className="w-4 h-4" /> },
    { view: 'member-profile', label: 'Profile & KYC', icon: <User className="w-4 h-4" /> },
    { view: 'member-support', label: 'Support Desk', icon: <Headphones className="w-4 h-4" /> },
  ];

  // Remaining navigation items that open inside the "More" bottom sheet on mobile
  const moreNavItems = [
    { view: 'member-explore', label: 'Explore Trips', icon: <Palmtree className="w-5 h-5" /> },
    { view: 'member-binary', label: 'Binary Tree', icon: <GitFork className="w-5 h-5" /> },
    { view: 'member-rewards', label: 'Rewards Ledger', icon: <Award className="w-5 h-5" /> },
    { view: 'member-withdraw', label: 'Request Withdrawal', icon: <ArrowUpRight className="w-5 h-5" /> },
    { view: 'member-referral', label: 'Referral Hub & QR', icon: <Share2 className="w-5 h-5" /> },
    { view: 'member-profile', label: 'Profile & KYC', icon: <User className="w-5 h-5" /> },
    { view: 'member-support', label: 'Support Desk', icon: <Headphones className="w-5 h-5" /> },
    { view: 'member-notifications', label: 'Notification Center', icon: <Bell className="w-5 h-5" />, badge: unreadCount > 0 ? unreadCount : null },
  ];

  const isMoreActive = moreNavItems.some((item) => item.view === currentView) || isMoreMenuOpen;

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('You have been securely signed out.', 'info');
    navigateTo('home');
  };

  const handleMobileNavClick = (view) => {
    navigateTo(view);
    setIsMoreMenuOpen(false);
  };

  const status = memberProfile?.status || 'ACTIVE';

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col pb-20 lg:pb-0">
      {/* 1. Global Top Header */}
      <MemberHeader
        memberProfile={memberProfile}
        unreadCount={unreadCount}
        navigateTo={navigateTo}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
        {/* 2. Desktop Collapsible Sidebar */}
        <MemberSidebar
          memberProfile={memberProfile}
          currentView={currentView}
          navigateTo={navigateTo}
          setMemberStatusDemo={setMemberStatusDemo}
          navItems={navItems}
          status={status}
        />

        {/* 3. Main Content Container */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <MemberMobileNav
        currentView={currentView}
        handleMobileNavClick={handleMobileNavClick}
        isMoreMenuOpen={isMoreMenuOpen}
        setIsMoreMenuOpen={setIsMoreMenuOpen}
        isMoreActive={isMoreActive}
        moreNavItems={moreNavItems}
        navigateTo={navigateTo}
        handleLogout={handleLogout}
      />
    </div>
  );
};
