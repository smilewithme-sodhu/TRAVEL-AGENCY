import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Clock, Star, ArrowLeft, Check, MapPin, MessageSquare, Phone, ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';

export const DestinationDetail = () => {
  const { selectedDestination, selectedPackage, navigateTo, toggleWishlist, savedWishlist, openWhatsApp, openPhoneCall, agencyPhone } = useWanderlust();
  
  const dest = selectedDestination || selectedPackage || {};
  const isSaved = savedWishlist?.includes(dest.id) || false;

  // Normalized package properties
  const title = dest.name || dest.title || 'Luxury Destination';
  const heroImage = dest.heroImage || dest.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80';
  const location = dest.location || dest.stateOrCountry || 'Exotic Retreat';
  const category = dest.category || 'international';
  const tagline = dest.tagline || 'Experience an extraordinary bespoke journey tailored just for you.';
  const description = dest.description || 'Discover breathtaking landscapes, rich cultural heritage, and world-class luxury stays curated by Gumnu JUM Travel consultants.';
  const whyVisit = dest.whyVisit || [
    { icon: '✨', title: 'Curated Experiences', desc: 'Private guided excursions and verified luxury stays.' },
    { icon: '🏔', title: 'Scenic Landscapes', desc: 'Breathtaking natural wonders and iconic viewpoints.' },
    { icon: '🏛', title: 'Rich Culture & Heritage', desc: 'Immersive local traditions and historic landmarks.' },
    { icon: '🌟', title: 'Unforgettable Memories', desc: 'Bespoke moments crafted for couples, families, and groups.' }
  ];
  const highlights = dest.highlights || dest.touristSpots || [
    { title: 'Iconic City & Landmark Tour', desc: 'Experience the world-renowned highlights with VIP access.' },
    { title: 'Scenic Sunset Excursion', desc: 'Private evening tour with panoramic photography spots.' },
    { title: 'Authentic Culinary Experience', desc: 'Indulge in authentic regional flavors and fine dining.' }
  ];
  const galleryImages = dest.galleryImages || [heroImage];

  return (
    <div style={{ paddingBottom: '80px', backgroundColor: '#F8F6F0' }}>
      
      {/* Full Bleed Hero Photo Header */}
      <div style={{ position: 'relative', width: '100%', height: '480px', overflow: 'hidden' }}>
        <img
          src={heroImage}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Dark Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.92) 100%)' }} />

        {/* Top Back Navigation Bar */}
        <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10, display: 'flex', gap: '12px' }}>
          <button
            className="btn-secondary"
            onClick={() => navigateTo('home')}
            style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            <ArrowLeft size={16} />
            <span>Return to Journeys</span>
          </button>
        </div>

        {/* Hero Headline Overlay */}
        <div style={{ position: 'absolute', bottom: '32px', left: '24px', right: '24px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span
              className="font-mono-data text-12"
              style={{
                backgroundColor: category === 'domestic' ? '#0F172A' : '#C9A455',
                color: category === 'domestic' ? '#C9A455' : '#0F172A',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              {category === 'domestic' ? 'Domestic Escape (India)' : 'International Adventure'}
            </span>
            <span className="font-mono-data text-14" style={{ color: '#E2E8F0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} style={{ color: '#C9A455' }} />
              {location}
            </span>
          </div>

          <h1 className="font-display display-44" style={{ color: '#FFFFFF', textShadow: '0 4px 12px rgba(0,0,0,0.5)', marginBottom: '8px' }}>
            {title}
          </h1>

          <p className="text-16" style={{ color: '#E2E8F0', maxWidth: '680px', lineHeight: 1.5 }}>
            {tagline}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ maxWidth: '1400px', margin: '48px auto 0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '48px' }}>
        
        {/* Left Storytelling Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* About The Destination */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '36px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div className="font-mono-data text-12" style={{ color: '#C9A455', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              DESTINATION NARRATIVE
            </div>
            <h2 className="font-display display-34" style={{ color: '#0F172A', marginBottom: '16px' }}>
              About {title}
            </h2>
            <p className="text-16" style={{ color: '#475569', lineHeight: 1.8 }}>
              {description}
            </p>
          </div>

          {/* Why Travel Here Cards */}
          <div>
            <div className="font-mono-data text-12" style={{ color: '#C9A455', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              KEY HIGHLIGHTS & ATTRACTIONS
            </div>
            <h3 className="font-display display-34" style={{ color: '#0F172A', marginBottom: '24px' }}>
              Why Travel to {title}?
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {whyVisit.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '24px',
                    borderRadius: '14px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ fontSize: '1.75rem', marginBottom: '4px' }}>
                    {item.icon || '✨'}
                  </div>
                  <h4 className="font-display text-18" style={{ fontWeight: 700, color: '#0F172A' }}>
                    {item.title}
                  </h4>
                  <p className="text-14" style={{ color: '#64748B', lineHeight: 1.6 }}>
                    {item.desc || item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Destination Highlights */}
          {highlights.length > 0 && (
            <div style={{ backgroundColor: '#FFFFFF', padding: '36px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="font-mono-data text-12" style={{ color: '#C9A455', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                CURATED EXPERIENCES
              </div>
              <h3 className="font-display text-24" style={{ color: '#0F172A', marginBottom: '20px' }}>
                Featured Tourist Highlights
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {highlights.map((h, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#F8F6F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A455', shrink: 0, marginTop: '2px' }}>
                      <Check size={14} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-display text-16" style={{ fontWeight: 700, color: '#0F172A' }}>
                        {h.title || h.name || h}
                      </h5>
                      {h.desc && (
                        <p className="text-14" style={{ color: '#64748B', marginTop: '2px', lineHeight: 1.5 }}>
                          {h.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cinematic Photo Gallery */}
          {galleryImages.length > 1 && (
            <div>
              <div className="font-mono-data text-12" style={{ color: '#C9A455', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                CINEMATIC GALLERY
              </div>
              <h3 className="font-display text-24" style={{ color: '#0F172A', marginBottom: '20px' }}>
                Glimpses of {title}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {galleryImages.map((imgUrl, idx) => (
                  <div key={idx} style={{ height: '180px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0F172A' }}>
                    <img src={imgUrl} alt={`${title} photo ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sticky Booking & Consultation Panel */}
        <div>
          <div
            style={{
              position: 'sticky',
              top: '96px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              padding: '36px',
              borderRadius: '20px',
              boxShadow: '0 20px 48px rgba(15, 23, 42, 0.2)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={20} style={{ color: '#C9A455' }} />
                <span className="font-mono-data text-12" style={{ color: '#C9A455', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  WANDERLUST CONCIERGE
                </span>
              </div>
              <button
                onClick={() => toggleWishlist(dest.id)}
                style={{ background: 'none', border: 'none', color: isSaved ? '#EF4444' : '#94A3B8', cursor: 'pointer' }}
                title="Save to wishlist"
              >
                <Heart size={22} fill={isSaved ? '#EF4444' : 'none'} />
              </button>
            </div>

            <h3 className="font-display text-24" style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              Plan Your Trip to {title}
            </h3>

            <p className="text-14" style={{ color: '#94A3B8', lineHeight: 1.6, marginBottom: '28px' }}>
              We do not use rigid fixed itineraries or automated carts. Every trip is hand-tailored by our luxury travel consultants on WhatsApp based on your preferences, dates, and group size.
            </p>

            {/* Direct WhatsApp Action */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <button
                onClick={() => openWhatsApp(dest, `Hello Gumnu JUM by Lisa Travels, I would like to plan a bespoke holiday to ${title}. Please share available dates, luxury stay options, and pricing quote.`)}
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '16px 24px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <MessageSquare size={18} />
                <span>Plan My Trip on WhatsApp</span>
              </button>

              <button
                onClick={openPhoneCall}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '9999px',
                  padding: '14px 24px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Phone size={16} style={{ color: '#C9A455' }} />
                <span>Call Hotline: {agencyPhone}</span>
              </button>
            </div>

            {/* Trust Points */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#CBD5E1' }}>
                <ShieldCheck size={16} style={{ color: '#C9A455' }} />
                <span>Verified 5-Star Boutique Hotels & Villas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#CBD5E1' }}>
                <Sparkles size={16} style={{ color: '#C9A455' }} />
                <span>24/7 Dedicated On-Trip WhatsApp Support</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
