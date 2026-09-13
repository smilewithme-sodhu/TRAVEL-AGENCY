import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWanderlust } from '../../context/WanderlustContext';
import { SplitFlapCounter } from '../SplitFlapCounter';
import { DESTINATIONS } from '../../data/wanderlustData';
import { Plane, Hotel, Navigation, Calendar, ChevronDown, ChevronUp, MapPin, ArrowRight, Shield, CheckCircle2, Compass, Sun, ArrowLeft } from 'lucide-react';

export const TripItineraryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Using DESTINATIONS as mock data for now
  const trip = DESTINATIONS.find(d => d.id === id) || DESTINATIONS[0];
  
  const [expandedNodeIndex, setExpandedNodeIndex] = useState(0);
  const [liveMode, setLiveMode] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(true);

  const toggleNode = (index) => {
    setExpandedNodeIndex(expandedNodeIndex === index ? null : index);
  };

  if (liveMode) {
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
                <span className="font-mono-data text-[12px]" style={{ color: '#3E938C', fontWeight: 700, display: 'block' }}>YOU ARE HERE :: DAY 02</span>
                <span className="font-display text-[16px]" style={{ fontWeight: 700, color: '#FFFFFF' }}>{trip.location}</span>
              </div>
            </div>
  
            {/* Top High-Contrast Controls */}
            <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ backgroundColor: '#16304A', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 18px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sun size={18} style={{ color: '#C9A455' }} />
                <span className="font-mono-data text-[12px]" style={{ fontWeight: 700, color: '#FFFFFF' }}>SUNLIGHT HIGH-CONTRAST MODE</span>
              </div>
  
              <button
                onClick={() => setLiveMode(false)}
                style={{
                  backgroundColor: '#C9A455',
                  color: '#0E2233',
                  border: 'none',
                  height: '56px',
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
                <span>Exit Live Mode</span>
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
              <span className="font-mono-data text-[14px]" style={{ fontWeight: 700, color: '#C9A455' }}>
                TODAY'S LIVE VECTOR :: DAY 02 OF {trip.durationDays}
              </span>
            </div>
  
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF' }}>
              <span className="font-mono-data text-[12px]">ITINERARY SHEET</span>
              {isSheetExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </div>
          </div>
  
          {/* Sheet Content */}
          {isSheetExpanded && (
            <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '280px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {trip.itineraryNodes?.slice(0, 3).map((node, i) => (
                  <div key={i} style={{ backgroundColor: '#081521', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="font-mono-data text-[12px]" style={{ color: '#C9A455', fontWeight: 700 }}>
                        {node.time}
                      </span>
                      <span className="font-mono-data text-[12px]" style={{ color: '#3E938C' }}>
                        {node.status}
                      </span>
                    </div>
                    <div className="font-display text-[16px]" style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                      {node.title}
                    </div>
                    <p className="text-[12px]" style={{ color: '#9DACAF', lineHeight: 1.4 }}>
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
  }

  return (
    <div style={{ backgroundColor: '#0E2233', minHeight: 'calc(100vh - 72px)', color: '#EDEFEA', padding: '48px 24px 80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/member/trips')} 
          className="mb-6 flex items-center gap-2 text-[#9DACAF] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-semibold tracking-wider uppercase">Back to My Bookings</span>
        </button>

        {/* Header & Split-Flap Instrumentation Countdown Strip */}
        <div className="card-raised" style={{ backgroundColor: '#16304A', padding: '32px', marginBottom: '40px', borderColor: 'rgba(201, 164, 85, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C9A455' }} />
                <span className="font-mono-data text-[12px]" style={{ color: '#C9A455', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ACTIVE FLIGHT PATH VECTOR :: CHARTER #{trip.flightCode || 'CX402'}
                </span>
              </div>
              <h1 className="font-display display-34 text-4xl font-black" style={{ color: '#EDEFEA', marginBottom: '4px' }}>
                {trip.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9DACAF' }}>
                <MapPin size={16} style={{ color: '#3E938C' }} />
                <span className="font-mono-data text-[14px]">{trip.location}</span>
                <span>•</span>
                <span className="font-mono-data text-[14px]">{trip.durationDays} Days / {(trip.distanceKm || 0).toLocaleString()} KM</span>
              </div>
            </div>

            {/* Split-Flap Instrumentation Departure Countdown */}
            <div style={{ backgroundColor: '#081521', padding: '16px 24px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(216, 220, 212, 0.15)', textAlign: 'center' }}>
              <div className="font-mono-data text-[12px]" style={{ color: '#9DACAF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                DEPARTURE FLAP COUNTDOWN
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <SplitFlapCounter value="42" label="DAYS" />
                <span style={{ color: '#C9A455', fontWeight: 700 }}>:</span>
                <SplitFlapCounter value="14" label="HRS" />
                <span style={{ color: '#C9A455', fontWeight: 700 }}>:</span>
                <SplitFlapCounter value="38" label="MIN" />
              </div>
            </div>
          </div>

          {/* Above-the-Fold "WHAT'S NEXT" Card */}
          <div style={{ backgroundColor: '#081521', borderLeft: '4px solid #C9A455', borderRadius: 'var(--radius-sm)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="font-mono-data text-[12px]" style={{ color: '#C9A455', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                NEXT VECTOR LEG :: LEG 01 CONFIRMED
              </div>
              <div className="font-display text-[16px]" style={{ color: '#EDEFEA', fontWeight: 600 }}>
                Direct Flight Departure ({trip.itineraryNodes?.[0]?.title || 'Boarding'})
              </div>
              <div className="text-[12px]" style={{ color: '#9DACAF', marginTop: '2px' }}>
                Departing Haneda Terminal 3 • Boarding Gate 44B • Seat 02A
              </div>
            </div>

            <button 
              onClick={() => setLiveMode(true)}
              style={{ backgroundColor: '#3E938C', color: '#FFF', padding: '10px 18px', fontSize: '0.85rem', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
            >
              <span>Enter Live Mode</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Section Title */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="font-mono-data text-[12px]" style={{ color: '#3E938C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              INSTRUMENT ITINERARY RAIL
            </div>
            <h2 className="font-display text-[26px] font-bold" style={{ color: '#EDEFEA' }}>
              The Flight Path Rail
            </h2>
          </div>
          <span className="font-mono-data text-[12px]" style={{ color: '#9DACAF' }}>
            CLICK NODE TO EXPAND DETAILS
          </span>
        </div>

        {/* Curved Vertical Flight Path Rail Canvas & Nodes */}
        <div style={{ position: 'relative', paddingLeft: '48px' }}>
          {/* Curved Vertical Rail Lines (SVG Arc) */}
          <svg style={{ position: 'absolute', top: '20px', left: '18px', width: '40px', height: 'calc(100% - 40px)', pointerEvents: 'none' }}>
            <path d="M 10 0 C 35 150, -15 350, 10 600" fill="none" stroke="#C9A455" strokeWidth="2.5" strokeDasharray="6 6" />
          </svg>

          {/* Itinerary Nodes along the Curved Rail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {trip.itineraryNodes?.map((node, index) => {
              const isExpanded = expandedNodeIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: isExpanded ? '#16304A' : '#081521',
                    border: isExpanded ? '1px solid #C9A455' : '1px solid rgba(216, 220, 212, 0.15)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    transition: 'all var(--transition-medium)',
                    position: 'relative'
                  }}
                >
                  {/* Node Dot on Curved Rail */}
                  <div style={{ position: 'absolute', left: '-38px', top: '24px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: node.status === 'confirmed' ? '#C9A455' : '#3E938C', border: '3px solid #0E2233', boxShadow: '0 0 10px rgba(201, 164, 85, 0.5)', zIndex: 2 }} />

                  {/* Header Trigger */}
                  <div
                    onClick={() => toggleNode(index)}
                    style={{ padding: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div className="font-mono-data text-[12px]" style={{ color: '#C9A455', fontWeight: 700, minWidth: '48px' }}>
                        DAY 0{node.day}
                      </div>

                      <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', backgroundColor: '#0E2233', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3E938C' }}>
                        {node.type === 'flight' && <Plane size={16} />}
                        {node.type === 'stay' && <Hotel size={16} />}
                        {node.type === 'activity' && <Navigation size={16} />}
                        {node.type === 'transit' && <Calendar size={16} />}
                      </div>

                      <div>
                        <div className="font-display text-[16px]" style={{ fontWeight: 600, color: '#EDEFEA' }}>
                          {node.title}
                        </div>
                        <div className="font-mono-data text-[12px]" style={{ color: '#9DACAF' }}>
                          {node.location} • {node.time}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span className="font-mono-data text-[12px]" style={{ color: '#3E938C', backgroundColor: 'rgba(62, 147, 140, 0.15)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase' }}>
                        {node.status}
                      </span>
                      {isExpanded ? <ChevronUp size={18} style={{ color: '#C9A455' }} /> : <ChevronDown size={18} style={{ color: '#9DACAF' }} />}
                    </div>
                  </div>

                  {/* Accordion Expand Content */}
                  {isExpanded && (
                    <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid rgba(216, 220, 212, 0.1)', marginTop: '8px', paddingTop: '16px' }}>
                      <p className="text-[14px]" style={{ color: '#EDEFEA', lineHeight: 1.6, marginBottom: '16px' }}>
                        {node.description}
                      </p>

                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        {node.flightCode && (
                          <div style={{ backgroundColor: '#0E2233', padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201, 164, 85, 0.3)' }}>
                            <span className="font-mono-data text-[12px]" style={{ color: '#9DACAF', display: 'block', fontSize: '0.65rem' }}>CARRIER CODE</span>
                            <span className="font-mono-data text-[14px]" style={{ color: '#C9A455', fontWeight: 700 }}>{node.flightCode}</span>
                          </div>
                        )}
                        <div style={{ backgroundColor: '#0E2233', padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(216, 220, 212, 0.1)' }}>
                          <span className="font-mono-data text-[12px]" style={{ color: '#9DACAF', display: 'block', fontSize: '0.65rem' }}>CONCIERGE ACCESS</span>
                          <span className="font-mono-data text-[14px]" style={{ color: '#3E938C', fontWeight: 600 }}>VIP Priority Included</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
