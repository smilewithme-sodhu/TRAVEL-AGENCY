import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WanderlustProvider, useWanderlust } from './context/WanderlustContext';

// Layout Components
import { HeaderNav } from './components/HeaderNav';
import { Footer } from './components/Footer';
import { MemberLayout } from './components/member/MemberLayout';
import { AdminLayout } from './components/admin/AdminLayout';

// Modals & Overlays
import { InquiryModal } from './components/InquiryModal';
import { UploadPhotoModal } from './components/UploadPhotoModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ToastContainer } from './components/ToastContainer';

// --- Lazy Load Public Pages ---
const HeroFlightPath = React.lazy(() => import('./components/HeroFlightPath').then(m => ({ default: m.HeroFlightPath })));
const TrustStrip = React.lazy(() => import('./components/TrustStrip').then(m => ({ default: m.TrustStrip })));
const ExploreJourneysSection = React.lazy(() => import('./components/ExploreJourneysSection').then(m => ({ default: m.ExploreJourneysSection })));
const TravelerGalleryCarousel = React.lazy(() => import('./components/TravelerGalleryCarousel').then(m => ({ default: m.TravelerGalleryCarousel })));
const HowItWorks = React.lazy(() => import('./components/HowItWorks').then(m => ({ default: m.HowItWorks })));
const TestimonialsSection = React.lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FestivalDealBanner = React.lazy(() => import('./components/FestivalDealBanner').then(m => ({ default: m.FestivalDealBanner })));
const ContactSection = React.lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));

const DomesticToursPage = React.lazy(() => import('./components/DomesticToursPage').then(m => ({ default: m.DomesticToursPage })));
const InternationalToursPage = React.lazy(() => import('./components/InternationalToursPage').then(m => ({ default: m.InternationalToursPage })));
const TravelerGalleryPage = React.lazy(() => import('./components/TravelerGalleryPage').then(m => ({ default: m.TravelerGalleryPage })));
const AboutWanderlustPage = React.lazy(() => import('./components/AboutWanderlustPage').then(m => ({ default: m.AboutWanderlustPage })));
const DestinationDetail = React.lazy(() => import('./components/DestinationDetail').then(m => ({ default: m.DestinationDetail })));
const LiveTripMode = React.lazy(() => import('./components/LiveTripMode').then(m => ({ default: m.LiveTripMode })));
const TripDashboard = React.lazy(() => import('./components/TripDashboard').then(m => ({ default: m.TripDashboard })));
const CheckoutFlow = React.lazy(() => import('./components/CheckoutFlow').then(m => ({ default: m.CheckoutFlow })));

// --- Lazy Load Auth ---
const LoginPage = React.lazy(() => import('./components/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = React.lazy(() => import('./components/auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = React.lazy(() => import('./components/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));

// --- Lazy Load Member Pages ---
const MemberDashboard = React.lazy(() => import('./components/member/MemberDashboard').then(m => ({ default: m.MemberDashboard })));
const TripsPage = React.lazy(() => import('./components/member/TripsPage').then(m => ({ default: m.TripsPage })));
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
const AdminPackagesPage = React.lazy(() => import('./components/admin/AdminPackagesPage').then(m => ({ default: m.AdminPackagesPage })));
const AdminMembersPage = React.lazy(() => import('./components/admin/AdminMembersPage').then(m => ({ default: m.AdminMembersPage })));
const AdminPayoutsPage = React.lazy(() => import('./components/admin/AdminPayoutsPage').then(m => ({ default: m.AdminPayoutsPage })));
const AdminAuditPage = React.lazy(() => import('./components/admin/AdminAuditPage').then(m => ({ default: m.AdminAuditPage })));

// 1. QueryClient Instance
const queryClient = new QueryClient();

// 2. RefTracker: intercepts ?ref=
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

// 3. Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, authLoading } = useWanderlust();
  const token = localStorage.getItem('token');
  
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-slate-700 border-t-[#C9A455] animate-spin"></div>
      </div>
    );
  }

  if (!token && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
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
      <InquiryModal />
      <UploadPhotoModal />
      <ToastContainer />
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
      <WanderlustProvider>
        <BrowserRouter>
          <RefTracker />
          <Suspense fallback={<SuspenseFallback />}>
            <Routes>
              
              <Route element={<PublicLayout />}>
                <Route path="/" element={
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
                } />
                <Route path="/destinations" element={<ExploreJourneysSection />} />
                <Route path="/domestic" element={<DomesticToursPage />} />
                <Route path="/international" element={<InternationalToursPage />} />
                <Route path="/gallery" element={<TravelerGalleryPage />} />
                <Route path="/about" element={<AboutWanderlustPage />} />
                <Route path="/contact" element={<ContactSection />} />
                <Route path="/detail/:id" element={<DestinationDetail />} />

                <Route path="/live-mode" element={<LiveTripMode />} />
                <Route path="/trip-dashboard" element={<TripDashboard />} />
                <Route path="/checkout" element={<CheckoutFlow />} />
              </Route>

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              <Route path="/member" element={
                <ProtectedRoute>
                  <MemberLayout />
                </ProtectedRoute>
              }>
                <Route index element={<MemberDashboard />} />
                <Route path="trips" element={<TripsPage />} />
                <Route path="explore" element={<ExplorePage />} />
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

              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="packages" element={<AdminPackagesPage />} />
                <Route path="members" element={<AdminMembersPage />} />
                <Route path="payouts" element={<AdminPayoutsPage />} />
                <Route path="audit" element={<AdminAuditPage />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </Suspense>
        </BrowserRouter>
      </WanderlustProvider>
    </QueryClientProvider>
  );
}
