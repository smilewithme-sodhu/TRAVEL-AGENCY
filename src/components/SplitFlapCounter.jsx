import React from 'react';

export const SplitFlapCounter = ({ value, label }) => {
  // Convert value to string characters
  const charArray = String(value).split('');

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        {charArray.map((char, idx) => (
          <div key={idx} className="split-flap-box">
            <div className="split-flap-divider" />
            <span>{char}</span>
          </div>
        ))}
      </div>
      {label && (
        <span className="font-mono-data text-12" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </span>
      )}
    </div>
  );
};
