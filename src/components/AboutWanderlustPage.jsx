import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { ShieldCheck, Compass, MessageSquare, Heart, Award, Users } from 'lucide-react';

export const AboutWanderlustPage = () => {
  const { openWhatsApp, agencyPhone } = useWanderlust();

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Hero Header */}
      <section
        style={{
          position: 'relative',
          padding: '100px 24px 80px 24px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: '64px'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="font-mono-data text-12" style={{ color: '#C9A455', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
            ABOUT WANDERLUST TRAVEL AGENCY
          </div>
          <h1 className="font-display display-46" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
            Crafting Extraordinary Travels With Heart
          </h1>
          <p className="text-18" style={{ color: '#E2E8F0', lineHeight: 1.6 }}>
            We believe that a holiday is not just a booking—it is a story waiting to be lived.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 64px 24px', textAlign: 'center' }}>
        <h2 className="font-display display-34" style={{ color: '#0F172A', marginBottom: '20px' }}>
          Our Travel Philosophy
        </h2>
        <p className="text-18" style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.125rem', marginBottom: '24px' }}>
          At Wanderlust Travel Agency, we reject one-size-fits-all generic tour packages. Instead, we sit down with you, understand your preferences, dietary requirements, and dream vision, and craft a bespoke journey designed just for you.
        </p>
        <p className="text-18" style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.125rem' }}>
          From ensuring authentic Pure Veg and Jain meals in remote foreign locations to managing 24/7 personal WhatsApp support while you travel, our goal is to deliver zero-stress, 100% memorable vacations.
        </p>
      </section>

      {/* Pillars */}
      <section style={{ backgroundColor: '#F8F6F0', padding: '72px 24px', marginBottom: '64px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '36px 28px', borderRadius: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <Users size={32} style={{ color: '#C9A455', marginBottom: '16px' }} />
              <h3 className="font-display text-20" style={{ color: '#0F172A', fontWeight: 700, marginBottom: '8px' }}>15,000+ Happy Travelers</h3>
              <p className="text-14" style={{ color: '#64748B', lineHeight: 1.6 }}>Trusted by families, honeymooners, and luxury travelers across India and worldwide.</p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '36px 28px', borderRadius: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <ShieldCheck size={32} style={{ color: '#C9A455', marginBottom: '16px' }} />
              <h3 className="font-display text-20" style={{ color: '#0F172A', fontWeight: 700, marginBottom: '8px' }}>100% Customized Trips</h3>
              <p className="text-14" style={{ color: '#64748B', lineHeight: 1.6 }}>Every single detail tailored to your timing, budget, hotel tier, and activity style.</p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '36px 28px', borderRadius: '18px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <MessageSquare size={32} style={{ color: '#25D366', marginBottom: '16px' }} />
              <h3 className="font-display text-20" style={{ color: '#0F172A', fontWeight: 700, marginBottom: '8px' }}>24/7 WhatsApp Concierge</h3>
              <p className="text-14" style={{ color: '#64748B', lineHeight: 1.6 }}>Instant assistance at your fingertips throughout your trip—from driver pickup to meal arrangements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <h2 className="font-display display-34" style={{ color: '#0F172A', marginBottom: '16px' }}>
          Ready to Craft Your Dream Escape?
        </h2>
        <p className="text-16" style={{ color: '#64748B', marginBottom: '32px' }}>
          Speak directly with our senior travel consultants on WhatsApp right now.
        </p>

        <button
          onClick={() => openWhatsApp(null, "Hello Wanderlust Travel Agency, I would like to consult with a travel planner.")}
          style={{
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '16px 36px',
            fontWeight: 700,
            fontSize: '1.025rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <MessageSquare size={20} />
          <span>Talk To A Travel Consultant On WhatsApp</span>
        </button>
      </section>

    </div>
  );
};
