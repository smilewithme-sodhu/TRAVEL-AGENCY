import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DESTINATION_PACKAGES } from '../data/packageData';
import { INITIAL_GALLERY_PHOTOS } from '../data/galleryData';
import { memberService } from '../services/memberService';
  import { apiClient } from '../api/client';

const WanderlustContext = createContext();

export const AGENCY_PHONE = '+91 98765 43210';
export const AGENCY_WHATSAPP = '919876543210';

export const AGENCY_CONTACT = {
  phone: AGENCY_PHONE,
  whatsappNumber: AGENCY_WHATSAPP,
  email: 'concierge@wanderlust.travel',
  address: '102 Horizon Plaza, Connaught Place, New Delhi, India',
  googleRating: '4.95',
  googleReviewCount: '1,450+'
};

export const WanderlustProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home');
  const [packages, setPackages] = useState(DESTINATION_PACKAGES);
  const [selectedPackage, setSelectedPackage] = useState(DESTINATION_PACKAGES[0]);
  const [memberProfile, setMemberProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Fetch Packages from DB
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await apiClient.get('/api/packages');
        if (response.data && response.data.success && response.data.data.length > 0) {
          setPackages(response.data.data);
          setSelectedPackage(response.data.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch packages from API:", err);
      }
    };
    fetchPackages();
  }, []);

  // Parse Initial URL for Referrals and Routing
  useEffect(() => {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    
    if (path.startsWith('/r/')) {
      const code = path.split('/r/')[1];
      searchParams.set('ref', code);
      // Rewrite URL so RegisterPage can read the query params properly
      window.history.replaceState({}, '', `/?view=register&${searchParams.toString()}`);
      setCurrentView('register');
    } else if (searchParams.get('view') === 'register') {
      setCurrentView('register');
    }
  }, []);
  // Inquiry Modal State
  const [inquiryModal, setInquiryModal] = useState({
    isOpen: false,
    destination: DESTINATION_PACKAGES[0]
  });

  // Saved Wishlist
  const [savedWishlist, setSavedWishlist] = useState(['sikkim', 'bali', 'dubai']);

  // Gallery Photos
  const [galleryPhotos, setGalleryPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_gallery_photos');
      return saved ? JSON.parse(saved) : INITIAL_GALLERY_PHOTOS;
    } catch {
      return INITIAL_GALLERY_PHOTOS;
    }
  });

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Toast System
  const [toast, setToast] = useState({ message: '', type: 'info', visible: false });

  // LocalStorage Auth listener
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      setIsLoggedIn(true);
      try {
        setMemberProfile(JSON.parse(userStr));
      } catch (err) {
        console.error("Failed to parse user from local storage", err);
      }
    } else {
      setIsLoggedIn(false);
      setMemberProfile(null);
    }
    setAuthLoading(false);
  }, []);

  // Save Gallery to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wanderlust_gallery_photos', JSON.stringify(galleryPhotos));
    } catch (e) {
      console.error(e);
    }
  }, [galleryPhotos]);

  // Show Toast
  const showToast = (message, type = 'info') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3500);
  };

  // Toggle Wishlist
  const toggleWishlist = (packageId) => {
    setSavedWishlist(prev => {
      const exists = prev.includes(packageId);
      const updated = exists ? prev.filter(id => id !== packageId) : [...prev, packageId];
      showToast(exists ? 'Removed from saved trips' : 'Saved to your dream wishlist', exists ? 'info' : 'success');
      return updated;
    });
  };

  // Direct WhatsApp Inquiry Routing
  const openWhatsApp = (packageObj = null, customNote = '') => {
    const pkg = packageObj || selectedPackage;
    const destinationName = pkg ? (pkg.name || pkg.title) : 'a dream holiday destination';
    const message = customNote || `Hello Wanderlust Travel Agency, I would like to know more about ${destinationName}.`;
    const encodedText = encodeURIComponent(message);
    const url = `https://wa.me/${AGENCY_WHATSAPP}?text=${encodedText}`;
    window.open(url, '_blank');
  };

  const openWhatsAppInquiry = (packageObj = null, customNote = '') => {
    openWhatsApp(packageObj, customNote);
  };

  // Phone Call Routing
  const openPhoneCall = () => {
    window.location.href = `tel:${AGENCY_PHONE.replace(/\s+/g, '')}`;
  };

  // Inquiry Modal Helpers
  const openInquiryModal = (dest = null) => {
    setInquiryModal({
      isOpen: true,
      destination: dest || selectedPackage
    });
  };

  const closeInquiryModal = () => {
    setInquiryModal(prev => ({ ...prev, isOpen: false }));
  };

  // Upload Photo Helper
  const uploadTravelerPhoto = async (photoData) => {
    const newPhoto = {
      id: `user-${Date.now()}`,
      imageUrl: photoData.file ? URL.createObjectURL(photoData.file) : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      travelerName: photoData.travelerName || 'Anonymous Traveler',
      tripTitle: photoData.tripTitle || 'Dream Holiday Experience',
      location: photoData.location || 'Exotic Destination',
      category: photoData.category || 'domestic',
      caption: photoData.caption || 'Unforgettable moments with Wanderlust.',
      verifiedTrip: true,
      likes: 1
    };
    setGalleryPhotos(prev => [newPhoto, ...prev]);
    showToast('Photo uploaded successfully! Added to Traveler Gallery.', 'success');
    setIsUploadModalOpen(false);
    return true;
  };

  const navigate = useNavigate();

  // Navigation Helper
  const navigateTo = (view, packageObj = null) => {
    if (packageObj) {
      setSelectedPackage(packageObj);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // React Router translation
    if (view === 'home') navigate('/');
    else if (view.startsWith('member-')) {
      const subpath = view.replace('member-', '');
      navigate(`/member${subpath === 'dashboard' ? '' : `/${subpath}`}`);
    }
    else if (view.startsWith('admin-')) {
      const subpath = view.replace('admin-', '');
      navigate(`/admin${subpath === 'dashboard' ? '' : `/${subpath}`}`);
    }
    else {
      navigate(`/${view}`);
    }
  };

  // Demo status switcher
  const setMemberStatusDemo = (status, stage = 'Confirmed') => {
    const updated = memberService.updateStatusForDemo(status, stage);
    setMemberProfile(updated);
    showToast(`Switched Member Status to: ${status === 'GREEN_ACTIVE' ? '🟢 Active Travel Member' : status === 'YELLOW' ? '🟡 Yellow Member' : '⚪ Inactive'}`, 'success');
  };

  const formatPrice = (amount) => {
    if (!amount) return 'Custom Quote';
    return `$${Number(amount).toLocaleString()}`;
  };

  // Filter Helpers
  const domesticPackages = packages.filter(p => p.category === 'domestic');
  const internationalPackages = packages.filter(p => p.category === 'international');

  return (
    <WanderlustContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedPackage,
        setSelectedPackage,
        selectedDestination: selectedPackage,
        setSelectedDestination: setSelectedPackage,
        inquiryModal,
        openInquiryModal,
        closeInquiryModal,
        openWhatsAppInquiry,
        memberProfile,
        setMemberProfile,
        isLoggedIn,
        setIsLoggedIn,
        authLoading,
        setMemberStatusDemo,
        savedWishlist,
        toggleWishlist,
        galleryPhotos,
        setGalleryPhotos,
        isUploadModalOpen,
        setIsUploadModalOpen,
        uploadTravelerPhoto,
        openWhatsApp,
        openPhoneCall,
        toast,
        showToast,
        navigateTo,
        formatPrice,
        contact: AGENCY_CONTACT,
        destinations: packages,
        allPackages: packages,
        domesticPackages,
        internationalPackages,
        agencyPhone: AGENCY_PHONE,
        agencyWhatsApp: AGENCY_WHATSAPP
      }}
    >
      {children}
    </WanderlustContext.Provider>
  );
};

export const useWanderlust = () => {
  const context = useContext(WanderlustContext);
  if (!context) {
    throw new Error('useWanderlust must be used within a WanderlustProvider');
  }
  return context;
};

// Also export useApp as an alias so any component importing useApp works seamlessly
export const useApp = useWanderlust;
