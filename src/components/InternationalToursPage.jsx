import React from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { PackageCard } from './PackageCard';
import { MessageSquare } from 'lucide-react';

export const InternationalToursPage = () => {
  const { internationalPackages, openWhatsApp } = useWaypoint();

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Cinematic Hero Header */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          padding: '100px 24px 80px 24px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          textAlign: 'center',
          overflow: 'hidden',
          marginBottom: '64px'
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80&fm=webp"
          alt="International Tours World"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <div className="font-mono-data text-12" style={{ color: '#C9A455', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
            INTERNATIONAL ADVENTURES :: WORLDWIDE
          </div>
          <h1 className="font-display display-46" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
            Journey Beyond Borders
          </h1>
          <p className="text-18" style={{ color: '#E2E8F0', lineHeight: 1.6, marginBottom: '32px' }}>
            Experience world-famous destinations, cultures, and memories with personalized travel planning.
          </p>

          <button
            onClick={() => openWhatsApp(null, "Hello Wanderlust Travel Agency, I am interested in inquiring about international vacation destinations.")}
            style={{
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '14px 28px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <MessageSquare size={18} />
            <span>Talk To A Travel Consultant</span>
          </button>
        </div>
      </section>

      {/* Package Grid (All 12 International Packages) */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
          {internationalPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

    </div>
  );
};
