import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WanderlustProvider, useWanderlust } from './context/WanderlustContext';

// Layout Components
import { HeaderNav } from './components/HeaderNav';
import { Footer } from './components/Footer';
import { MemberLayout } from './components/member/MemberLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Modals & Overlays
import { InquiryModal } from './components/InquiryModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ToastContainer } from './components/ToastContainer';
import { TravelFOMOTicker } from './components/TravelFOMOTicker';

// --- Lazy Load Public Pages ---
const HeroFlightPath = React.lazy(() => import('./components/HeroFlightPath').then(m => ({ default: m.HeroFlightPath })));
const TrustStrip = React.lazy(() => import('./components/TrustStrip').then(m => ({ default: m.TrustStrip })));
const ExploreJourneysSection = React.lazy(() => import('./components/ExploreJourneysSection').then(m => ({ default: m.ExploreJourneysSection })));
const LeadershipTrustSection = React.lazy(() => import('./components/LeadershipTrustSection').then(m => ({ default: m.LeadershipTrustSection })));
const TravelerGalleryCarousel = React.lazy(() => import('./components/TravelerGalleryCarousel').then(m => ({ default: m.TravelerGalleryCarousel })));
const HowItWorks = React.lazy(() => import('./components/HowItWorks').then(m => ({ default: m.HowItWorks })));
const TestimonialsSection = React.lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FestivalDealBanner = React.lazy(() => import('./components/FestivalDealBanner').then(m => ({ default: m.FestivalDealBanner })));
const ContactSection = React.lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));

const DestinationsCatalogPage = React.lazy(() => import('./components/DestinationsCatalogPage').then(m => ({ default: m.DestinationsCatalogPage })));
const TravelerGalleryPage = React.lazy(() => import('./components/TravelerGalleryPage').then(m => ({ default: m.TravelerGalleryPage })));
const AboutWanderlustPage = React.lazy(() => import('./components/AboutWanderlustPage').then(m => ({ default: m.AboutWanderlustPage })));
const DestinationDetail = React.lazy(() => import('./components/DestinationDetail').then(m => ({ default: m.DestinationDetail })));
const CheckoutFlow = React.lazy(() => import('./components/CheckoutFlow').then(m => ({ default: m.CheckoutFlow })));
const TermsOfServicePage = React.lazy(() => import('./components/TermsOfServicePage').then(m => ({ default: m.TermsOfServicePage })));

// --- Lazy Load Auth ---
const MemberLogin = React.lazy(() => import('./components/auth/MemberLogin').then(m => ({ default: m.MemberLogin })));
const AdminLogin = React.lazy(() => import('./components/auth/AdminLogin').then(m => ({ default: m.AdminLogin })));
const RegisterPage = React.lazy(() => import('./components/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = React.lazy(() => import('./components/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));

// --- Lazy Load Member Pages ---
const MemberDashboard = React.lazy(() => import('./components/member/MemberDashboard').then(m => ({ default: m.MemberDashboard })));
const TripsPage = React.lazy(() => import('./components/member/TripsPage').then(m => ({ default: m.TripsPage })));
const TripItineraryView = React.lazy(() => import('./components/member/TripItineraryView').then(m => ({ default: m.TripItineraryView })));
const PackagesPage = React.lazy(() => import('./components/booking/PackagesPage').then(m => ({ default: m.PackagesPage })));
const ExplorePage = React.lazy(() => import('./components/member/ExplorePage').then(m => ({ default: m.ExplorePage })));
const NetworkPage = React.lazy(() => import('./components/member/NetworkPage').then(m => ({ default: m.NetworkPage })));
const BinaryPage = React.lazy(() => import('./components/member/BinaryPage').then(m => ({ default: m.BinaryPage })));
const RewardsPage = React.lazy(() => import('./components/member/RewardsPage').then(m => ({ default: m.RewardsPage })));
const WalletPage = React.lazy(() => import('./components/member/WalletPage').then(m => ({ default: m.WalletPage })));
const WithdrawPage = React.lazy(() => import('./components/member/WithdrawPage').then(m => ({ default: m.WithdrawPage })));
const ReferralsPage = React.lazy(() => import('./components/member/ReferralsPage').then(m => ({ default: m.ReferralsPage })));
const ProfilePage = React.lazy(() => import('./components/member/ProfilePage').then(m => ({ default: m.ProfilePage })));
const SupportPage = React.lazy(() => import('./components/member/SupportPage').then(m => ({ default: m.SupportPage })));
const NotificationsPage = React.lazy(() => import('./components/member/NotificationsPage').then(m => ({ default: m.NotificationsPage })));

// --- Lazy Load Admin Pages ---
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminBookingsPage = React.lazy(() => import('./components/admin/AdminBookingsPage').then(m => ({ default: m.AdminBookingsPage })));
const AdminPackagesPage = React.lazy(() => import('./components/admin/AdminPackagesPage').then(m => ({ default: m.AdminPackagesPage })));
const AdminMembersPage = React.lazy(() => import('./components/admin/AdminMembersPage').then(m => ({ default: m.AdminMembersPage })));
const AdminPayoutsPage = React.lazy(() => import('./components/admin/AdminPayoutsPage').then(m => ({ default: m.AdminPayoutsPage })));
const AdminAuditPage = React.lazy(() => import('./components/admin/AdminAuditPage').then(m => ({ default: m.AdminAuditPage })));

// 1. QueryClient Instance
const queryClient = new QueryClient();

// 2. RefTracker: intercepts ?ref=
const ViewTracker = () => {
  const location = useLocation();
  const { setCurrentView } = useWanderlust();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCurrentView('home');
    else if (path.startsWith('/member/')) setCurrentView('member-' + path.replace('/member/', ''));
    else if (path === '/member') setCurrentView('member-dashboard');
    else if (path.startsWith('/admin/')) setCurrentView('admin-' + path.replace('/admin/', ''));
    else if (path === '/admin') setCurrentView('admin-dashboard');
    else setCurrentView(path.replace('/', ''));
  }, [location, setCurrentView]);

  return null;
};

const RefTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if (ref) {
      localStorage.setItem('affiliate_id', ref);
      params.delete('ref');
      navigate({
        pathname: location.pathname,
        search: params.toString()
      }, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

// 4. Public Layout (Header + Footer)
const PublicLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8F6F0' }}>
      <HeaderNav />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <TravelFOMOTicker />
      <InquiryModal />
    </div>
  );
};

// 5. Loading Fallback for Suspense
const SuspenseFallback = () => (
  <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-slate-700 border-t-[#C9A455] animate-spin"></div>
      <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase">Loading View...</p>
    </div>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <WanderlustProvider>
          <ToastContainer />
          <RefTracker />
          <ViewTracker />
          <Suspense fallback={<SuspenseFallback />}>
            <Routes>
              
              <Route element={<PublicLayout />}>
                <Route path="/" element={
                  <>
                    <HeroFlightPath />
                    <TrustStrip />
                    <ExploreJourneysSection />
                    <LeadershipTrustSection />
                    <TravelerGalleryCarousel />
                    <HowItWorks />
                    <TestimonialsSection />
                    <FestivalDealBanner />
                    <ContactSection />
                  </>
                } />
                
                {/* Destinations Routes */}
                <Route path="/destinations" element={<DestinationsCatalogPage />} />
                <Route path="/packages" element={<DestinationsCatalogPage />} />
                <Route path="/domestic" element={<DestinationsCatalogPage />} />
                <Route path="/international" element={<DestinationsCatalogPage />} />
                
                {/* Detail Routes */}
                <Route path="/detail/:id" element={<DestinationDetail />} />
                <Route path="/detail" element={<DestinationDetail />} />
                <Route path="/destination/:id" element={<DestinationDetail />} />
                <Route path="/destinations/:id" element={<DestinationDetail />} />

                {/* Other Public Pages */}
                <Route path="/gallery" element={<TravelerGalleryPage />} />
                <Route path="/about" element={<AboutWanderlustPage />} />
                <Route path="/contact" element={<ContactSection />} />
                <Route path="/checkout" element={<CheckoutFlow />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/terms-and-conditions" element={<TermsOfServicePage />} />
              </Route>

              <Route path="/login" element={<MemberLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Member Routes: ProtectedRoute guards, MemberLayout provides the shell */}
              <Route element={<ProtectedRoute />}>
                <Route path="/member" element={<MemberLayout />}>
                  <Route index element={<MemberDashboard />} />
                  <Route path="trips" element={<TripsPage />} />
                  <Route path="trips/:id" element={<TripItineraryView />} />
                  <Route path="explore" element={<ExplorePage />} />
                  <Route path="packages" element={<PackagesPage />} />
                  <Route path="network" element={<NetworkPage />} />
                  <Route path="binary" element={<BinaryPage />} />
                  <Route path="rewards" element={<RewardsPage />} />
                  <Route path="wallet" element={<WalletPage />} />
                  <Route path="withdraw" element={<WithdrawPage />} />
                  <Route path="referral" element={<ReferralsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                </Route>
              </Route>

              {/* Admin Routes: ProtectedRoute (requireAdmin) guards, AdminLayout provides the shell */}
              <Route element={<ProtectedRoute requireAdmin={true} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="bookings" element={<AdminBookingsPage />} />
                  <Route path="packages" element={<AdminPackagesPage />} />
                  <Route path="members" element={<AdminMembersPage />} />
                  <Route path="payouts" element={<AdminPayoutsPage />} />
                  <Route path="audit" element={<AdminAuditPage />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </Suspense>
        </WanderlustProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
