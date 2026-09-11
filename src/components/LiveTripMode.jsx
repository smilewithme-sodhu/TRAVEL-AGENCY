import React, { useState } from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { DESTINATIONS } from '../data/waypointData';
import { MapPin, Navigation, Compass, Sun, Shield, PhoneCall, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const LiveTripMode = () => {
  const { activeTrip, navigateTo } = useWaypoint();
  const trip = activeTrip || DESTINATIONS[0];
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);

  return (
    <div style={{ backgroundColor: '#081521', minHeight: 'calc(100vh - 72px)', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      
      {/* High Contrast Outdoor Map Canvas Surface */}
      <div style={{ position: 'absolute', inset: 0, bottom: isSheetExpanded ? '320px' : '80px', transition: 'bottom var(--transition-medium)' }}>
        
        {/* Mock Map Background Grid */}
        <div style={{ width: '100%', height: '100%', backgroundColor: '#0E2233', position: 'relative', backgroundImage: 'radial-gradient(rgba(201, 164, 85, 0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
          
          {/* Map Vector Lines */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <path d="M 100 200 C 300 100, 500 400, 800 250" fill="none" stroke="#C9A455" strokeWidth="3" strokeDasharray="6 6" />
            <circle cx="300" cy="150" r="10" fill="#3E938C" />
            <circle cx="500" cy="350" r="14" fill="#C9A455" stroke="#FFFFFF" strokeWidth="3" />
          </svg>

          {/* Map Marker Badge for Today's Location */}
          <div style={{ position: 'absolute', top: '35%', left: '48%', transform: 'translate(-50%, -50%)', backgroundColor: '#16304A', border: '2px solid #C9A455', padding: '12px 20px', borderRadius: 'var(--radius-md)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MapPin size={24} style={{ color: '#C9A455' }} />
            <div>
              <span className="font-mono-data text-12" style={{ color: '#3E938C', fontWeight: 700, display: 'block' }}>YOU ARE HERE :: DAY 02</span>
              <span className="font-display text-16" style={{ fontWeight: 700, color: '#FFFFFF' }}>{trip.location}</span>
            </div>
          </div>

          {/* Top High-Contrast Controls */}
          <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#16304A', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 18px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sun size={18} style={{ color: '#C9A455' }} />
              <span className="font-mono-data text-12" style={{ fontWeight: 700, color: '#FFFFFF' }}>SUNLIGHT HIGH-CONTRAST MODE</span>
            </div>

            <button
              onClick={() => navigateTo('dashboard')}
              style={{
                backgroundColor: '#C9A455',
                color: '#0E2233',
                border: 'none',
                height: '56px', // 56px touch target for outdoor use
                padding: '0 24px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.95rem'
              }}
            >
              <Compass size={20} />
              <span>Full Dashboard</span>
            </button>
          </div>

        </div>

      </div>

      {/* Today's Itinerary Bottom Sheet */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#16304A',
          borderTop: '2px solid #C9A455',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
          boxShadow: '0 -12px 48px rgba(0,0,0,0.8)',
          zIndex: 100,
          transition: 'all var(--transition-medium)',
          height: isSheetExpanded ? '360px' : '72px'
        }}
      >
        {/* Handle bar trigger */}
        <div
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
          style={{ padding: '16px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: isSheetExpanded ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3E938C' }} />
            <span className="font-mono-data text-14" style={{ fontWeight: 700, color: '#C9A455' }}>
              TODAY'S LIVE VECTOR :: DAY 02 OF {trip.durationDays}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF' }}>
            <span className="font-mono-data text-12">ITINERARY SHEET</span>
            {isSheetExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </div>

        {/* Sheet Content */}
        {isSheetExpanded && (
          <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '280px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              
              {trip.itineraryNodes.slice(0, 3).map((node, i) => (
                <div key={i} style={{ backgroundColor: '#081521', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="font-mono-data text-12" style={{ color: '#C9A455', fontWeight: 700 }}>
                      {node.time}
                    </span>
                    <span className="font-mono-data text-12" style={{ color: '#3E938C' }}>
                      {node.status}
                    </span>
                  </div>

                  <div className="font-display text-16" style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                    {node.title}
                  </div>

                  <p className="text-12" style={{ color: '#9DACAF', lineHeight: 1.4 }}>
                    {node.description}
                  </p>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
