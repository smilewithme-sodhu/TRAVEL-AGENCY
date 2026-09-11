import React, { useState } from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { SplitFlapCounter } from './SplitFlapCounter';
import { DESTINATIONS } from '../data/waypointData';
import { Plane, Hotel, Navigation, Calendar, ChevronDown, ChevronUp, MapPin, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

export const TripDashboard = () => {
  const { activeTrip, formatPrice, navigateTo } = useWaypoint();
  const trip = activeTrip || DESTINATIONS[0];
  const [expandedNodeIndex, setExpandedNodeIndex] = useState(0);

  const toggleNode = (index) => {
    setExpandedNodeIndex(expandedNodeIndex === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: '#0E2233', minHeight: 'calc(100vh - 72px)', color: '#EDEFEA', padding: '48px 24px 80px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header & Split-Flap Instrumentation Countdown Strip */}
        <div className="card-raised" style={{ backgroundColor: '#16304A', padding: '32px', marginBottom: '40px', borderColor: 'rgba(201, 164, 85, 0.4)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C9A455' }} />
                <span className="font-mono-data text-12" style={{ color: '#C9A455', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ACTIVE FLIGHT PATH VECTOR :: CHARTER #{trip.flightCode}
                </span>
              </div>

              <h1 className="font-display display-34" style={{ color: '#EDEFEA', marginBottom: '4px' }}>
                {trip.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9DACAF' }}>
                <MapPin size={16} style={{ color: '#3E938C' }} />
                <span className="font-mono-data text-14">{trip.location}</span>
                <span>•</span>
                <span className="font-mono-data text-14">{trip.durationDays} Days / {trip.distanceKm.toLocaleString()} KM</span>
              </div>
            </div>

            {/* Split-Flap Instrumentation Departure Countdown */}
            <div style={{ backgroundColor: '#081521', padding: '16px 24px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(216, 220, 212, 0.15)', textAlign: 'center' }}>
              <div className="font-mono-data text-12" style={{ color: '#9DACAF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
              <div className="font-mono-data text-12" style={{ color: '#C9A455', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                NEXT VECTOR LEG :: LEG 01 CONFIRMED
              </div>
              <div className="font-display text-16" style={{ color: '#EDEFEA', fontWeight: 600 }}>
                Direct Flight Departure ({trip.itineraryNodes[0].title})
              </div>
              <div className="text-12" style={{ color: '#9DACAF', marginTop: '2px' }}>
                Departing Haneda Terminal 3 • Boarding Gate 44B • Seat 02A
              </div>
            </div>

            <button className="btn-teal" onClick={() => navigateTo('live-trip')} style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
              <span>Enter Live Mode</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

        {/* Section Title */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="font-mono-data text-12" style={{ color: '#3E938C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              INSTRUMENT ITINERARY RAIL
            </div>
            <h2 className="font-display text-26" style={{ color: '#EDEFEA' }}>
              The Flight Path Rail
            </h2>
          </div>
          <span className="font-mono-data text-12" style={{ color: '#9DACAF' }}>
            CLICK NODE TO EXPAND DETAILS
          </span>
        </div>

        {/* Curved Vertical Flight Path Rail Canvas & Nodes */}
        <div style={{ position: 'relative', paddingLeft: '48px' }}>
          
          {/* Curved Vertical Rail Lines (SVG Arc) */}
          <svg
            style={{
              position: 'absolute',
              top: '20px',
              left: '18px',
              width: '40px',
              height: 'calc(100% - 40px)',
              pointerEvents: 'none'
            }}
          >
            <path
              d="M 10 0 C 35 150, -15 350, 10 600"
              fill="none"
              stroke="#C9A455"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
          </svg>

          {/* Itinerary Nodes along the Curved Rail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {trip.itineraryNodes.map((node, index) => {
              const isExpanded = expandedNodeIndex === index;
              return (
                <div
                  key={index}
                  className="card-raised"
                  style={{
                    backgroundColor: isExpanded ? '#16304A' : '#081521',
                    borderColor: isExpanded ? '#C9A455' : 'rgba(216, 220, 212, 0.15)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    transition: 'all var(--transition-medium)',
                    position: 'relative'
                  }}
                >
                  
                  {/* Node Dot on Curved Rail */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-38px',
                      top: '24px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: node.status === 'confirmed' ? '#C9A455' : '#3E938C',
                      border: '3px solid #0E2233',
                      boxShadow: '0 0 10px rgba(201, 164, 85, 0.5)',
                      zIndex: 2
                    }}
                  />

                  {/* Header Trigger */}
                  <div
                    onClick={() => toggleNode(index)}
                    style={{
                      padding: '20px 24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div className="font-mono-data text-12" style={{ color: '#C9A455', fontWeight: 700, minWidth: '48px' }}>
                        DAY 0{node.day}
                      </div>

                      <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', backgroundColor: '#0E2233', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3E938C' }}>
                        {node.type === 'flight' && <Plane size={16} />}
                        {node.type === 'stay' && <Hotel size={16} />}
                        {node.type === 'activity' && <Navigation size={16} />}
                        {node.type === 'transit' && <Calendar size={16} />}
                      </div>

                      <div>
                        <div className="font-display text-16" style={{ fontWeight: 600, color: '#EDEFEA' }}>
                          {node.title}
                        </div>
                        <div className="font-mono-data text-12" style={{ color: '#9DACAF' }}>
                          {node.location} • {node.time}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span className="font-mono-data text-12" style={{ color: '#3E938C', backgroundColor: 'rgba(62, 147, 140, 0.15)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase' }}>
                        {node.status}
                      </span>
                      {isExpanded ? <ChevronUp size={18} style={{ color: '#C9A455' }} /> : <ChevronDown size={18} style={{ color: '#9DACAF' }} />}
                    </div>
                  </div>

                  {/* Accordion Expand Content */}
                  {isExpanded && (
                    <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid rgba(216, 220, 212, 0.1)', marginTop: '8px', paddingTop: '16px' }}>
                      <p className="text-14" style={{ color: '#EDEFEA', lineHeight: 1.6, marginBottom: '16px' }}>
                        {node.description}
                      </p>

                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        {node.flightCode && (
                          <div style={{ backgroundColor: '#0E2233', padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201, 164, 85, 0.3)' }}>
                            <span className="font-mono-data text-12" style={{ color: '#9DACAF', display: 'block', fontSize: '0.65rem' }}>CARRIER CODE</span>
                            <span className="font-mono-data text-14" style={{ color: '#C9A455', fontWeight: 700 }}>{node.flightCode}</span>
                          </div>
                        )}
                        <div style={{ backgroundColor: '#0E2233', padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(216, 220, 212, 0.1)' }}>
                          <span className="font-mono-data text-12" style={{ color: '#9DACAF', display: 'block', fontSize: '0.65rem' }}>CONCIERGE ACCESS</span>
                          <span className="font-mono-data text-14" style={{ color: '#3E938C', fontWeight: 600 }}>VIP Priority Included</span>
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
