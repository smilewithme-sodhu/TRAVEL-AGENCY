import React from 'react';

export const KeyHighlights = ({ title, whyVisit }) => (
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
);
