import React, { useState } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Star, CheckCircle2, MessageSquarePlus, Trash2, Check } from 'lucide-react';
import { ReviewModal } from './ui/ReviewModal';

export const TestimonialsSection = () => {
  const { reviews, deleteReview, approveReview, memberProfile, isLoggedIn } = useWanderlust();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isAdmin = memberProfile?.role === 'ADMIN';
  
  // Admin sees all reviews to manage them, public sees only approved
  const displayReviews = isAdmin ? reviews : reviews.filter(r => r.approved);

  return (
    <section className="bg-[#F8F9FA] py-16 sm:py-24 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#C9A455] font-bold">
              <span>VERIFIED TRAVEL EXPERIENCES</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Stories From Our Travelers
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
              Real experiences from travelers who designed their private journeys with Gumnu JUM.
            </p>
          </div>

          {(isAdmin || isLoggedIn) && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0C4A6E] hover:bg-[#075985] text-white font-bold text-xs transition-all shadow-md cursor-pointer shrink-0"
            >
              <MessageSquarePlus size={16} />
              <span>{isAdmin ? 'Add Review (Admin)' : 'Write a Review'}</span>
            </button>
          )}
        </div>

        {/* Reviews Grid */}
        {displayReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayReviews.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow relative ${!item.approved ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100'}`}
              >
                {isAdmin && (
                  <div className="absolute -top-3 -right-3 flex gap-2">
                    {!item.approved && (
                      <button onClick={() => approveReview(item.id)} className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 shadow-sm cursor-pointer" title="Approve Review">
                        <Check size={14} />
                      </button>
                    )}
                    <button onClick={() => deleteReview(item.id)} className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-sm cursor-pointer" title="Delete Review">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-[#C9A455]">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={15} fill="#C9A455" />
                      ))}
                    </div>
                    {item.approved ? (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        <span>VERIFIED</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                        <span>PENDING APPROVAL</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium line-clamp-1">
                      {item.role || 'Traveler'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-[10px] font-bold text-[#C9A455] block uppercase line-clamp-1">
                      {item.trip || 'Gumnu JUM Trip'}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <MessageSquarePlus className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 font-display">No reviews yet</h3>
            <p className="text-sm text-slate-500 mt-1 mb-6">Be the first to share your Gumnu JUM experience!</p>
            {isAdmin && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0C4A6E] text-white font-bold text-xs hover:bg-[#075985] transition-colors cursor-pointer"
              >
                Add the First Review
              </button>
            )}
          </div>
        )}

      </div>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
