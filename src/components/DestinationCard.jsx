import React, { useState } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Heart, Clock, Star, MapPin, MessageSquare, Utensils, ShieldCheck } from 'lucide-react';

export const DestinationCard = ({ destination }) => {
  const { savedWishlist, toggleWishlist, navigateTo, openInquiryModal, openWhatsAppInquiry } = useWanderlust();
  const [isHovered, setIsHovered] = useState(false);
  const isSaved = savedWishlist.includes(destination.id);

  return (
    <div
      className="card-raised"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        borderColor: isHovered ? 'var(--accent-primary)' : 'var(--hairline)',
        transition: 'transform var(--transition-fast), border-color var(--transition-fast)'
      }}
      onClick={() => navigateTo('detail', destination)}
    >
      {/* Image Banner */}
      <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
        <img
          src={destination.image}
          alt={destination.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform var(--transition-medium)'
          }}
        />

        {/* Badge (Domestic vs International / Best Seller) */}
        <div
          className="font-mono-data text-12"
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: destination.category === 'domestic' ? 'var(--accent-secondary)' : 'var(--accent-primary)',
            color: destination.category === 'domestic' ? '#FFFFFF' : '#0E2233',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {destination.category === 'domestic' ? 'Domestic (India)' : 'International'}
        </div>

        {/* Pure Veg / Jain Food Badge for Indian Travelers */}
        {destination.vegFriendly && (
          <div
            className="font-mono-data text-12"
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: 'rgba(37, 160, 80, 0.95)',
              color: '#FFFFFF',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Utensils size={12} />
            <span>Pure Veg / Jain Available</span>
          </div>
        )}

        {/* Save Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(destination.id);
          }}
          title={isSaved ? "Remove from wishlist" : "Save destination"}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(14, 34, 51, 0.75)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)',
            transition: 'transform var(--transition-fast)'
          }}
        >
          <Heart
            size={18}
            fill={isSaved ? 'var(--accent-primary)' : 'none'}
            style={{ color: isSaved ? 'var(--accent-primary)' : '#EDEFEA' }}
          />
        </button>

      </div>

      {/* Card Content Body */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-secondary)' }}>
              <MapPin size={14} />
              <span className="font-mono-data text-12" style={{ textTransform: 'uppercase', fontWeight: 600 }}>
                {destination.location.split(',')[1] || destination.location}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-primary)' }}>
              <Star size={14} fill="var(--accent-primary)" />
              <span className="font-mono-data text-12" style={{ fontWeight: 600 }}>
                {destination.rating}
              </span>
            </div>
          </div>

          <h3 className="font-display text-20" style={{ color: 'var(--text-main)', marginBottom: '8px' }}>
            {destination.title}
          </h3>

          <p className="text-14" style={{ color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {destination.tagline}
          </p>
        </div>

        {/* Card Footer: No Money Price Display! Only "Inquire for Pricing" Action */}
        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
              <Clock size={14} />
              <span className="font-mono-data text-12">
                {destination.durationDays} Days / {destination.durationNights} Nights
              </span>
            </div>

            <span className="font-mono-data text-12" style={{ color: 'var(--accent-primary)', fontWeight: 700, backgroundColor: 'rgba(201, 164, 85, 0.15)', padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>
              Inquire for Rates
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                openInquiryModal(destination);
              }}
              className="btn-primary"
              style={{ padding: '8px 12px', fontSize: '0.8rem', justifyContent: 'center' }}
            >
              <span>Book & Inquire</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openWhatsAppInquiry(destination);
              }}
              style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <MessageSquare size={14} />
              <span>WhatsApp</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
