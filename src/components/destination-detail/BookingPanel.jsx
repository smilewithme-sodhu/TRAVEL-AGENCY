import React from 'react';
import { Compass, Heart, MessageSquare, Phone, ShieldCheck, Sparkles } from 'lucide-react';

export const BookingPanel = ({
  title,
  dest,
  isSaved,
  toggleWishlist,
  openWhatsApp,
  openPhoneCall,
  agencyPhone
}) => (
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
        onClick={() => openWhatsApp(dest, `Hello Wanderlust Travel Agency, I would like to plan a bespoke holiday to ${title}. Please share available dates, luxury stay options, and pricing quote.`)}
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
);
