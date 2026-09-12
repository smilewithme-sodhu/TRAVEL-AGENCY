import React from 'react';

export const DestinationNarrative = ({ title, description }) => (
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
);
