import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer = () => {
  const { toast } = useWanderlust();

  if (!toast.visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 2000,
        backgroundColor: 'var(--bg-raised)',
        border: '1px solid var(--hairline)',
        borderLeft: `4px solid ${toast.type === 'success' ? 'var(--accent-primary)' : 'var(--accent-secondary)'}`,
        borderRadius: 'var(--radius-sm)',
        padding: '16px 24px',
        boxShadow: 'var(--shadow-ambient)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '400px',
        animation: 'drawPath 0.3s ease-out'
      }}
    >
      {toast.type === 'success' ? (
        <CheckCircle2 size={20} style={{ color: 'var(--accent-primary)' }} />
      ) : (
        <Info size={20} style={{ color: 'var(--accent-secondary)' }} />
      )}
      <span className="font-mono-data text-14" style={{ color: 'var(--text-main)', fontWeight: 500 }}>
        {toast.message}
      </span>
    </div>
  );
};
