import React from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsAppButton = () => {
  const { openWhatsAppInquiry } = useWanderlust();

  return (
    <div
      onClick={() => openWhatsAppInquiry(null, "Hi Gumnu JUM Travels! I am looking for a customized travel package.")}
      title="Chat with Travel Expert on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
        zIndex: 1000,
        transition: 'transform var(--transition-fast)',
        animation: 'pulse 2s infinite'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <MessageSquare size={28} />
    </div>
  );
};
