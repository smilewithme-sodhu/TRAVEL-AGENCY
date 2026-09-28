import React, { useState } from 'react';
import { useWanderlust } from '../../context/WanderlustContext';
import { Star, X } from 'lucide-react';

export const ReviewModal = ({ isOpen, onClose }) => {
  const { addReview, memberProfile } = useWanderlust();
  const isAdmin = memberProfile?.role === 'ADMIN';
  
  const [formData, setFormData] = useState({
    name: memberProfile?.name || '',
    role: '',
    trip: '',
    rating: 5,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;
    addReview(formData, isAdmin);
    setFormData({ name: memberProfile?.name || '', role: '', trip: '', rating: 5, comment: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
        
        <h3 className="font-display font-bold text-2xl text-slate-900 mb-1">
          {isAdmin ? 'Add New Review (Admin)' : 'Write a Review'}
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          {isAdmin ? 'Publish a review instantly to the platform.' : 'Share your travel experience. It will be published after admin verification.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Traveler Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#C9A455] focus:ring-1 focus:ring-[#C9A455] outline-none transition-all text-sm"
              placeholder="e.g. Eleanor Vance"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Role / Title</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#C9A455] focus:ring-1 focus:ring-[#C9A455] outline-none transition-all text-sm"
                placeholder="e.g. Solo Explorer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Trip Destination</label>
              <input
                type="text"
                value={formData.trip}
                onChange={(e) => setFormData({...formData, trip: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#C9A455] focus:ring-1 focus:ring-[#C9A455] outline-none transition-all text-sm"
                placeholder="e.g. Bali, Indonesia"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Rating (1-5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData({...formData, rating: num})}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${formData.rating >= num ? 'text-[#C9A455]' : 'text-slate-200 hover:text-slate-300'}`}
                >
                  <Star size={24} fill={formData.rating >= num ? "#C9A455" : "currentColor"} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Review Comment *</label>
            <textarea
              required
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C9A455] focus:ring-1 focus:ring-[#C9A455] outline-none transition-all text-sm min-h-[100px] resize-y"
              placeholder="Share the details of your experience..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0C4A6E] hover:bg-[#075985] text-white font-bold text-sm transition-all shadow-md cursor-pointer"
            >
              {isAdmin ? 'Publish Review' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
