import React, { useState } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { DESTINATIONS } from '../data/wanderlustData';
import { CheckCircle2, ShieldCheck, Plane, Lock, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';

export const CheckoutFlow = () => {
  const { selectedDestination, formatPrice, navigateTo, bookingDetails, setBookingDetails, showToast } = useWanderlust();
  const dest = selectedDestination || DESTINATIONS[0];
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: 'Alexander',
    lastName: 'Wright',
    email: 'alexander.wright@wanderlust.com',
    phone: '+1 (555) 019-2834',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '08/28',
    cvv: '984',
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsCompleted(true);
      setStep(3);
      showToast('Flight path vector confirmed! Departure sequence initialized.', 'success');
    }
  };

  const totalPrice = dest.priceUSD * bookingDetails.travelers + 350; // add-ons

  return (
    <div style={{ maxWidth: '800px', margin: '48px auto 80px auto', padding: '0 24px' }}>
      
      {/* Checkout Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="font-mono-data text-12" style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
          CHECKOUT SEQUENCE :: VECTOR REF-{dest.flightCode}
        </div>
        <h1 className="font-display display-34" style={{ color: 'var(--text-main)', marginBottom: '12px' }}>
          Finalize Your Flight Path
        </h1>
        
        {/* 3 Step Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: step >= 1 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
            <span className="font-mono-data text-12" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--hairline)', backgroundColor: step >= 1 ? 'var(--accent-primary)' : 'transparent', color: step >= 1 ? '#0E2233' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              1
            </span>
            <span className="font-mono-data text-12">Travelers</span>
          </div>

          <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--hairline)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: step >= 2 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
            <span className="font-mono-data text-12" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--hairline)', backgroundColor: step >= 2 ? 'var(--accent-primary)' : 'transparent', color: step >= 2 ? '#0E2233' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              2
            </span>
            <span className="font-mono-data text-12">Payment</span>
          </div>

          <div style={{ width: '32px', height: '1px', backgroundColor: 'var(--hairline)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: step >= 3 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
            <span className="font-mono-data text-12" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--hairline)', backgroundColor: step >= 3 ? 'var(--accent-primary)' : 'transparent', color: step >= 3 ? '#0E2233' : 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              3
            </span>
            <span className="font-mono-data text-12">Confirmation</span>
          </div>
        </div>

      </div>

      {/* Transparent Price Breakdown Always Visible */}
      <div className="card-raised" style={{ padding: '24px', marginBottom: '32px', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="font-display text-16" style={{ color: 'var(--text-main)', fontWeight: 600 }}>
              {dest.title}
            </div>
            <div className="font-mono-data text-12" style={{ color: 'var(--text-muted)' }}>
              {dest.durationDays} Days • {bookingDetails.travelers} Travelers
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.65rem' }}>TOTAL CHARTER AMOUNT</span>
            <span className="font-mono-data text-20" style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Step 1: Traveler Details */}
      {step === 1 && (
        <form onSubmit={handleNextStep} className="card-raised" style={{ padding: '32px' }}>
          <h2 className="font-display text-20" style={{ color: 'var(--text-main)', marginBottom: '24px' }}>
            Step 1 of 3: Primary Traveler Details
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>FIRST NAME</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="font-mono-data text-14"
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>LAST NAME</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="font-mono-data text-14"
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="font-mono-data text-14"
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>PHONE NUMBER</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="font-mono-data text-14"
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ padding: '14px 28px' }}>
              <span>Proceed to Payment</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      )}

      {/* Step 2: Payment Details */}
      {step === 2 && (
        <form onSubmit={handleNextStep} className="card-raised" style={{ padding: '32px' }}>
          <h2 className="font-display text-20" style={{ color: 'var(--text-main)', marginBottom: '24px' }}>
            Step 2 of 3: Payment & Charter Confirmation
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>CREDIT / DEBIT CARD NUMBER</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <CreditCard size={18} style={{ position: 'absolute', left: '12px', color: 'var(--accent-primary)' }} />
              <input
                type="text"
                required
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                className="font-mono-data text-14"
                style={{ width: '100%', padding: '12px 12px 12px 40px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
            <div>
              <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>EXPIRATION DATE</label>
              <input
                type="text"
                required
                value={formData.expDate}
                onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                className="font-mono-data text-14"
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>
            <div>
              <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>SECURITY CODE (CVV)</label>
              <input
                type="text"
                required
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="font-mono-data text-14"
                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>
          </div>

          {/* Plain Language Trust Marker */}
          <div style={{ backgroundColor: 'var(--bg-deep)', padding: '16px', borderRadius: 'var(--radius-sm)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={20} style={{ color: 'var(--accent-secondary)' }} />
            <div className="text-12" style={{ color: 'var(--text-main)', lineHeight: 1.4 }}>
              Protected under ATOL #10894 and IATA guidelines. Free cancellation up to 14 days before departure vector.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <button type="submit" className="btn-primary" style={{ padding: '14px 28px' }}>
              <Lock size={16} />
              <span>Confirm & Lock Flight Path ({formatPrice(totalPrice)})</span>
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Celebratory Solid Flight Path Arc Confirmation Animation */}
      {step === 3 && (
        <div className="card-raised" style={{ padding: '48px', textAlign: 'center' }}>
          
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(201, 164, 85, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', color: 'var(--accent-primary)' }}>
            <CheckCircle2 size={36} />
          </div>

          <div className="font-mono-data text-14" style={{ color: 'var(--accent-primary)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '8px' }}>
            FLIGHT PATH CONFIRMED :: VECTOR LOCKED
          </div>

          <h2 className="font-display display-34" style={{ color: 'var(--text-main)', marginBottom: '16px' }}>
            You're On The Vector!
          </h2>

          <p className="text-16" style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 32px auto', lineHeight: 1.6 }}>
            Your booking confirmation for <strong>{dest.title}</strong> has been transmitted. Your live flight path rail is now active in your trip dashboard.
          </p>

          {/* Celebratory Solid Arc Animation with Plane Easing along it */}
          <div style={{ position: 'relative', width: '100%', height: '180px', backgroundColor: 'var(--bg-deep)', borderRadius: 'var(--radius-md)', marginBottom: '32px', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 500 180">
              {/* Solid Arc */}
              <path
                d="M 60 130 Q 250 20 440 130"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="3.5"
              />
              
              {/* Origin Dot */}
              <circle cx="60" cy="130" r="6" fill="var(--accent-primary)" />
              <text x="60" y="156" textAnchor="middle" className="font-mono-data" fill="var(--text-main)" fontSize="11">ORIGIN</text>

              {/* Destination Dot */}
              <circle cx="440" cy="130" r="6" fill="var(--accent-secondary)" />
              <text x="440" y="156" textAnchor="middle" className="font-mono-data" fill="var(--text-main)" fontSize="11">{dest.flightCode}</text>

              {/* Plane Icon Moving Along Solid Arc */}
              <circle cx="250" cy="75" r="14" fill="var(--accent-primary)" />
              <foreignObject x="242" y="67" width="16" height="16">
                <Plane size={16} color="#0E2233" style={{ transform: 'rotate(25deg)' }} />
              </foreignObject>
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="btn-primary" onClick={() => navigateTo('dashboard')} style={{ padding: '14px 28px' }}>
              <span>View Trip Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
