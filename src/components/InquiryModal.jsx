import React, { useState } from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { X, Phone, MessageSquare, Send, CheckCircle2, MapPin, ShieldCheck, Utensils, CreditCard } from 'lucide-react';

const ModalHeader = ({ dest, closeInquiryModal }) => (
  <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <div className="font-mono-data text-12" style={{ color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
        CUSTOM PRICING & BOOKING INQUIRY
      </div>
      <h3 className="font-display text-20" style={{ color: 'var(--text-main)', marginTop: '2px' }}>
        {dest ? dest.title : 'Customized Holiday Package'}
      </h3>
    </div>

    <button
      onClick={closeInquiryModal}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--text-muted)',
        padding: '6px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <X size={20} />
    </button>
  </div>
);

const SuccessMessage = ({ formData }) => (
  <div style={{ textAlign: 'center', padding: '32px 16px' }}>
    <CheckCircle2 size={48} style={{ color: 'var(--accent-primary)', margin: '0 auto 16px auto' }} />
    <h4 className="font-display text-20" style={{ color: 'var(--text-main)', marginBottom: '8px' }}>
      Inquiry Received!
    </h4>
    <p className="text-14" style={{ color: 'var(--text-muted)' }}>
      Thank you, <strong>{formData.name}</strong>. Our senior travel consultant will reach out on <strong>{formData.phone}</strong> with customized pricing and itinerary options.
    </p>
  </div>
);

const DestinationStrip = ({ dest }) => {
  if (!dest) return null;
  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
        <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
        <span className="font-mono-data text-12">{dest.location}</span>
      </div>
      <span className="font-mono-data text-12" style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>
        {dest.durationDays} Days / {dest.durationNights} Nights
      </span>
    </div>
  );
};

const ActionButtons = ({ dest, formData, contact, openWhatsAppInquiry, openPhoneCall }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
    <button
      onClick={() => openWhatsAppInquiry(dest, `Travel Month: ${formData.travelMonth}, Guests: ${formData.guests}, Meal Pref: ${formData.mealPref}.`)}
      style={{
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        padding: '14px 16px',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontSize: '0.9rem',
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)'
      }}
    >
      <MessageSquare size={18} />
      <span>WhatsApp Inquiry</span>
    </button>

    <button
      onClick={openPhoneCall}
      style={{
        backgroundColor: 'var(--accent-primary)',
        color: '#0E2233',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        padding: '14px 16px',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontSize: '0.9rem'
      }}
    >
      <Phone size={18} />
      <span>Call {contact.phone}</span>
    </button>
  </div>
);

const QuickCallbackForm = ({ formData, setFormData, handleFormSubmit }) => (
  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
    <div>
      <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
        YOUR FULL NAME
      </label>
      <input
        type="text"
        required
        placeholder="Enter your full name..."
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="font-mono-data text-14"
        style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
      />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <div>
        <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
          PHONE / WHATSAPP NUMBER
        </label>
        <input
          type="tel"
          required
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="font-mono-data text-14"
          style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
        />
      </div>

      <div>
        <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
          TRAVEL MONTH
        </label>
        <select
          value={formData.travelMonth}
          onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
          className="font-mono-data text-14"
          style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
        >
          <option value="September 2026">September 2026</option>
          <option value="October 2026">October 2026 (Festive)</option>
          <option value="November 2026">November 2026</option>
          <option value="December 2026">December 2026 (New Year)</option>
        </select>
      </div>
    </div>

    {/* Dietary / Meal Preference Selector */}
    <div>
      <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
        <Utensils size={14} style={{ color: 'var(--accent-primary)' }} />
        <span>DIETARY / MEAL PREFERENCE</span>
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {['Pure Veg', 'Jain Food', 'No Preference'].map((pref) => (
          <button
            type="button"
            key={pref}
            onClick={() => setFormData({ ...formData, mealPref: pref })}
            className="font-mono-data text-12"
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: formData.mealPref === pref ? '1px solid var(--accent-primary)' : '1px solid var(--hairline)',
              backgroundColor: formData.mealPref === pref ? 'var(--accent-primary)' : 'var(--bg-main)',
              color: formData.mealPref === pref ? '#0E2233' : 'var(--text-main)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {pref}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
        ADDITIONAL NOTES (OPTIONAL)
      </label>
      <textarea
        rows={2}
        placeholder="Mention custom requirements, flight preference, budget..."
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className="font-mono-data text-14"
        style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', resize: 'none' }}
      />
    </div>

    <button
      type="submit"
      className="btn-primary"
      style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '4px' }}
    >
      <Send size={16} />
      <span>Submit Pricing & Itinerary Request</span>
    </button>
  </form>
);

const CreditCardBanner = () => (
  <div style={{ backgroundColor: 'var(--bg-deep)', padding: '12px', borderRadius: 'var(--radius-sm)', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
    <CreditCard size={16} style={{ color: 'var(--accent-secondary)' }} />
    <span className="font-mono-data text-12" style={{ color: 'var(--text-muted)' }}>
      Book with small advance token • Zero-interest EMI options available
    </span>
  </div>
);

export const InquiryModal = () => {
  const { inquiryModal, closeInquiryModal, openWhatsAppInquiry, openPhoneCall, showToast, contact } = useWaypoint();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelMonth: 'September 2026',
    guests: '2 Adults',
    mealPref: 'Pure Veg',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!inquiryModal.isOpen) return null;

  const dest = inquiryModal.destination;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Inquiry submitted! Our travel expert will call you shortly.', 'success');
    setTimeout(() => {
      setSubmitted(false);
      closeInquiryModal();
    }, 2500);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={closeInquiryModal}
    >
      <div
        className="card-raised"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '580px',
          backgroundColor: 'var(--bg-raised)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 48px rgba(0,0,0,0.3)',
          borderTop: '4px solid var(--accent-primary)'
        }}
      >
        
        <ModalHeader dest={dest} closeInquiryModal={closeInquiryModal} />

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {submitted ? (
            <SuccessMessage formData={formData} />
          ) : (
            <>
              <DestinationStrip dest={dest} />

              <ActionButtons
                dest={dest}
                formData={formData}
                contact={contact}
                openWhatsAppInquiry={openWhatsAppInquiry}
                openPhoneCall={openPhoneCall}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--hairline)' }} />
                <span className="font-mono-data text-12" style={{ color: 'var(--text-muted)' }}>OR REQUEST QUICK CALLBACK</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--hairline)' }} />
              </div>

              <QuickCallbackForm
                formData={formData}
                setFormData={setFormData}
                handleFormSubmit={handleFormSubmit}
              />

              <CreditCardBanner />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
