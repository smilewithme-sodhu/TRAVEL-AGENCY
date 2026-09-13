import React from 'react';
import { WhatsAppConciergeButton } from '../ui/WhatsAppConciergeButton';

export const BookingDetailsModal = ({ trip, onClose }) => {
  if (!trip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-[#C9A455]">
              CONFIRMED BOOKING RECORD
            </span>
            <h3 className="font-sans font-extrabold text-xl text-slate-900">
              {trip.destination}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer font-bold text-sm"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">Reference ID</div>
            <div className="font-mono font-bold text-slate-900">#{trip.referenceNumber}</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">Travel Window</div>
            <div className="font-bold text-slate-900">{trip.travelDates}</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">Registered Passengers</div>
            <div className="font-bold text-slate-900">{trip.travellerNames.join(', ')}</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">Concierge Arrangements</div>
            <div className="text-slate-700 leading-relaxed font-medium">{trip.arrangementsNote}</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
            <div className="text-[10px] font-bold uppercase text-slate-400">Assigned Travel Consultant</div>
            <div className="font-bold text-slate-900">{trip.consultantName}</div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <WhatsAppConciergeButton
            size="md"
            className="w-full"
            customMessage={`Hi ${trip.consultantName}, regarding my booking #${trip.referenceNumber} for ${trip.destination}...`}
          />
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
