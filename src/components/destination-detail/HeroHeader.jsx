import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';

export const HeroHeader = ({ heroImage, title, category, location, tagline, navigateTo }) => (
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
);
