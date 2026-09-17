import React, { useState } from 'react';
import { useCheckout } from '../../api/client';
import { X, CheckCircle2, ShieldCheck, MapPin, Calendar, Users, Banknote } from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose, selectedPackage }) => {
  const [numTravellers, setNumTravellers] = useState(1);
  const [paymentUtr, setPaymentUtr] = useState('');
  const checkoutMutation = useCheckout();
    const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setNumTravellers(1);
      setPaymentUtr('');
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen || !selectedPackage) return null;

  const priceObj = selectedPackage.prices?.[0];
  const unitPrice = priceObj ? Number(priceObj.sellingPrice) : 0;
  const totalPrice = unitPrice * numTravellers;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentUtr) return;
    try {
      await checkoutMutation.mutateAsync({
        packageId: selectedPackage.id,
        numTravellers,
        paymentUtr,
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Checkout failed: ' + (err.response?.data?.error || err.message));
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-emerald-400 w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Booking Submitted</h2>
          <p className="text-slate-400 mb-8">
            Your booking for <span className="text-white font-medium">{selectedPackage.name}</span> is now under review. We will verify your payment UTR and confirm your itinerary shortly.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              onClose();
            }}
            className="w-full bg-[#C9A455] hover:bg-[#B5914A] text-[#0F172A] font-bold py-3 px-6 rounded-full transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-[#0F172A] border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Summary */}
          <div className="bg-[#1E293B] p-8 md:rounded-l-3xl border-b md:border-b-0 md:border-r border-slate-700">
            <h3 className="text-[#C9A455] font-bold tracking-widest text-xs uppercase mb-2">Checkout Summary</h3>
            <h2 className="text-2xl font-bold text-white mb-6 leading-tight">{selectedPackage.name}</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-300 gap-3">
                <MapPin className="w-5 h-5 text-slate-500" />
                <span className="text-sm">{selectedPackage.destination?.name || 'Various'}</span>
              </div>
              <div className="flex items-center text-slate-300 gap-3">
                <Calendar className="w-5 h-5 text-slate-500" />
                <span className="text-sm">{(selectedPackage.durationNights + 1)} Days, {selectedPackage.durationNights} Nights</span>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-sm">Unit Price</span>
                <span className="text-white">?{unitPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-400 text-sm">Travellers</span>
                <span className="text-white font-medium">x {numTravellers}</span>
              </div>
              <div className="flex justify-between items-end border-t border-slate-700 pt-4">
                <span className="text-slate-300 font-medium">Total Due</span>
                <span className="text-3xl font-bold text-[#C9A455]">?{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Right: Payment Form */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-white mb-6">Complete Booking</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Number of Travellers
                </label>
                <div className="flex items-center bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                  <button 
                    type="button" 
                    onClick={() => setNumTravellers(Math.max(1, numTravellers - 1))}
                    className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >-</button>
                  <input 
                    type="number" 
                    min="1" 
                    value={numTravellers} 
                    onChange={(e) => setNumTravellers(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 bg-transparent text-center text-white font-bold py-3 outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => setNumTravellers(numTravellers + 1)}
                    className="px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >+</button>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-start gap-3 mb-2">
                  <Banknote className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="text-white text-sm font-bold">Manual Bank Transfer</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Please transfer exactly <strong className="text-white">?{totalPrice.toLocaleString()}</strong> to the company bank account or UPI ID.
                    </p>
                  </div>
                </div>
                <div className="mt-3 bg-slate-900 rounded-lg p-3 text-xs font-mono text-slate-300">
                  <div className="flex justify-between mb-1"><span>UPI ID:</span><span className="text-white">admin@wanderlust</span></div>
                  <div className="flex justify-between mb-1"><span>Bank:</span><span className="text-white">HDFC Bank</span></div>
                  <div className="flex justify-between"><span>A/C:</span><span className="text-white">000011112222</span></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Payment UTR / Reference Number
                </label>
                <input 
                  type="text" 
                  required
                  value={paymentUtr}
                  onChange={(e) => setPaymentUtr(e.target.value)}
                  placeholder="e.g. 31234567890"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#C9A455] transition-colors"
                />
              </div>

              <button 
                type="submit"
                disabled={checkoutMutation.isPending || !paymentUtr}
                className="w-full flex items-center justify-center gap-2 bg-[#C9A455] hover:bg-[#B5914A] disabled:opacity-50 disabled:hover:bg-[#C9A455] text-[#0F172A] font-bold py-3.5 px-6 rounded-xl transition-colors shadow-[0_0_15px_rgba(201,164,85,0.3)]"
              >
                {checkoutMutation.isPending ? 'Processing...' : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Submit Booking Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



