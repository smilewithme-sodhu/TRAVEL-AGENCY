import React, { useState } from 'react';
import { apiClient } from '../../api/client';
import { useWanderlust } from '../../context/WanderlustContext';
import { MessageCircle, CheckCircle, AlertTriangle } from 'lucide-react';

export const AdminWhatsAppBooking = () => {
  const { showToast } = useWanderlust();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    amountPaid: 0,
    binaryPoints: 0,
    teamBonusPoints: 0,
    directBonusPoints: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'memberId' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!window.confirm(Are you absolutely sure you want to inject this booking for Member ? This will instantly trigger live financial distributions.)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiClient.post('/api/admin/bookings/whatsapp', formData);
      if (res.data.success) {
        showToast(Success! Booking  injected., 'success');
        setFormData({ memberId: '', amountPaid: 0, binaryPoints: 0, teamBonusPoints: 0, directBonusPoints: 0 });
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Injection failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
          <MessageCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">WhatsApp Booking Injection</h2>
          <p className="text-slate-400 text-sm">Force-log off-platform bookings and distribute points.</p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-start space-x-3 text-orange-400">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p className="text-sm">
          Warning: Submitting this form bypasses standard cart rules. Points are injected directly into the live binary and unilevel trees exactly as typed below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Member ID (UUID)</label>
          <input
            type="text"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Amount Paid (INR)</label>
            <input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} min="0" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Binary Points to Roll-up</label>
            <input type="number" name="binaryPoints" value={formData.binaryPoints} onChange={handleChange} min="0" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Team Bonus (Unilevel) Points</label>
            <input type="number" name="teamBonusPoints" value={formData.teamBonusPoints} onChange={handleChange} min="0" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Direct Sponsor Bonus (INR)</label>
            <input type="number" name="directBonusPoints" value={formData.directBonusPoints} onChange={handleChange} min="0" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-green-500" required />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.memberId}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
        >
          {isSubmitting ? 'Injecting to Network...' : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Finalize & Distribute Points
            </>
          )}
        </button>
      </form>
    </div>
  );
};
