import React from 'react';
import { Check } from 'lucide-react';

export const CuratedExperiences = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '36px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)' }}>
      <div className="font-mono-data text-12" style={{ color: '#C9A455', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
        CURATED EXPERIENCES
      </div>
      <h3 className="font-display text-24" style={{ color: '#0F172A', marginBottom: '20px' }}>
        Featured Tourist Highlights
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {highlights.map((h, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#F8F6F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A455', shrink: 0, marginTop: '2px' }}>
              <Check size={14} strokeWidth={2.5} />
            </div>
            <div>
              <h5 className="font-display text-16" style={{ fontWeight: 700, color: '#0F172A' }}>
                {h.title || h.name || h}
              </h5>
              {h.desc && (
                <p className="text-14" style={{ color: '#64748B', marginTop: '2px', lineHeight: 1.5 }}>
                  {h.desc}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
