import React from 'react';
import { WaypointProvider, useWaypoint } from './context/WaypointContext';

// Public Storefront Components (Customer-Facing Luxury Website)
import { HeaderNav } from './components/HeaderNav';
import { Footer } from './components/Footer';
import { HeroFlightPath } from './components/HeroFlightPath';
import { TrustStrip } from './components/TrustStrip';
import { ExploreJourneysSection } from './components/ExploreJourneysSection';
import { AITripPlanner } from './components/AITripPlanner';
import { TravelerGalleryCarousel } from './components/TravelerGalleryCarousel';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FestivalDealBanner } from './components/FestivalDealBanner';
import { ContactSection } from './components/ContactSection';

// Public Pages
import { DomesticToursPage } from './components/DomesticToursPage';
import { InternationalToursPage } from './components/InternationalToursPage';
import { TravelerGalleryPage } from './components/TravelerGalleryPage';
import { AboutWanderlustPage } from './components/AboutWanderlustPage';
import { DestinationDetail } from './components/DestinationDetail';
import { LiveTripMode } from './components/LiveTripMode';
import { TripDashboard } from './components/TripDashboard';
import { CheckoutFlow } from './components/CheckoutFlow';

// Auth Flow
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';

// Authenticated Member Portal Views
import { MemberLayout } from './components/member/MemberLayout';
import { MemberDashboard } from './components/member/MemberDashboard';
import { TripsPage } from './components/member/TripsPage';
import { ExplorePage } from './components/member/ExplorePage';
import { NetworkPage } from './components/member/NetworkPage';
import { BinaryPage } from './components/member/BinaryPage';
import { RewardsPage } from './components/member/RewardsPage';
import { WalletPage } from './components/member/WalletPage';
import { WithdrawPage } from './components/member/WithdrawPage';
import { ReferralsPage } from './components/member/ReferralsPage';
import { ProfilePage } from './components/member/ProfilePage';
import { SupportPage } from './components/member/SupportPage';
import { NotificationsPage } from './components/member/NotificationsPage';

// Admin Console Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminPackagesPage } from './components/admin/AdminPackagesPage';
import { AdminMembersPage } from './components/admin/AdminMembersPage';
import { AdminPayoutsPage } from './components/admin/AdminPayoutsPage';
import { AdminAuditPage } from './components/admin/AdminAuditPage';

// Modals & Overlays
import { InquiryModal } from './components/InquiryModal';
import { UploadPhotoModal } from './components/UploadPhotoModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ToastContainer } from './components/ToastContainer';

const MainContent = () => {
  const { currentView, navigateTo, authLoading, isLoggedIn } = useWaypoint();

  // Route Protection
  React.useEffect(() => {
    if (!authLoading && !isLoggedIn && currentView.startsWith('member-')) {
      navigateTo('login');
    }
  }, [authLoading, isLoggedIn, currentView, navigateTo]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-slate-700 border-t-[#C9A455] animate-spin"></div>
          <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  // Auth Routing
  if (currentView === 'login') return <LoginPage />;
  if (currentView === 'register') return <RegisterPage />;
  if (currentView === 'forgot-password') return <ForgotPasswordPage />;

  // Authenticated Member Portal Routing
  if (currentView.startsWith('member-')) {
    return (
      <MemberLayout>
        {currentView === 'member-dashboard' && <MemberDashboard />}
        {currentView === 'member-trips' && <TripsPage />}
        {currentView === 'member-explore' && <ExplorePage />}
        {currentView === 'member-network' && <NetworkPage />}
        {currentView === 'member-binary' && <BinaryPage />}
        {currentView === 'member-rewards' && <RewardsPage />}
        {currentView === 'member-wallet' && <WalletPage />}
        {currentView === 'member-withdraw' && <WithdrawPage />}
        {currentView === 'member-referral' && <ReferralsPage />}
        {currentView === 'member-profile' && <ProfilePage />}
        {currentView === 'member-support' && <SupportPage />}
        {currentView === 'member-notifications' && <NotificationsPage />}
      </MemberLayout>
    );
  }

  // Admin Console Routing
  if (currentView.startsWith('admin-')) {
    return (
      <AdminLayout>
        {currentView === 'admin-dashboard' && <AdminDashboard />}
        {currentView === 'admin-packages' && <AdminPackagesPage />}
        {currentView === 'admin-members' && <AdminMembersPage />}
        {currentView === 'admin-payouts' && <AdminPayoutsPage />}
        {currentView === 'admin-audit' && <AdminAuditPage />}
      </AdminLayout>
    );
  }

  // Customer-Facing Public Luxury Storefront
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8F6F0' }}>
      <HeaderNav />

      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <>
            <HeroFlightPath />
            <TrustStrip />
            <ExploreJourneysSection />
            <TravelerGalleryCarousel />
            <HowItWorks />
            <TestimonialsSection />
            <FestivalDealBanner />
            <ContactSection />
          </>
        )}

        {currentView === 'destinations' && <ExploreJourneysSection />}
        {currentView === 'domestic' && <DomesticToursPage />}
        {currentView === 'international' && <InternationalToursPage />}
        {currentView === 'gallery' && <TravelerGalleryPage />}
        {currentView === 'about' && <AboutWanderlustPage />}
        {currentView === 'contact' && <ContactSection />}
        {currentView === 'detail' && <DestinationDetail />}
        {currentView === 'ai-planner' && <AITripPlanner />}
        {currentView === 'live-mode' && <LiveTripMode />}
        {currentView === 'trip-dashboard' && <TripDashboard />}
        {currentView === 'checkout' && <CheckoutFlow />}
      </main>

      <Footer />
      <FloatingWhatsAppButton />
      <InquiryModal />
      <UploadPhotoModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <WaypointProvider>
      <MainContent />
    </WaypointProvider>
  );
}
