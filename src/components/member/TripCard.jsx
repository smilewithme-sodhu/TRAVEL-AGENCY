import React from 'react';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { WhatsAppConciergeButton } from '../ui/WhatsAppConciergeButton';

export const TripCard = ({ trip, onSelect }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      {/* Card Image Header */}
      <div className="relative h-44 sm:h-52 bg-slate-900 overflow-hidden">
        <img
          src={trip.heroImage}
          alt={trip.destination}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        <div className="absolute top-3.5 left-3.5">
          <span
            className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs ${
              trip.status === 'UPCOMING'
                ? 'bg-blue-600 text-white'
                : trip.status === 'COMPLETED'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-white'
            }`}
          >
            {trip.status}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="font-mono text-[10px] text-sky-300 font-bold uppercase tracking-wider block">
            REF: #{trip.referenceNumber}
          </span>
          <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white line-clamp-1">
            {trip.destination}
          </h3>
        </div>
      </div>

      {/* Scannable Card Body */}
      <div className="p-5 space-y-4">
        <div className="space-y-1.5 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C9A455] shrink-0" />
            <span>{trip.travelDates}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C9A455] shrink-0" />
            <span>{trip.travellerCount}</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
          <button
            onClick={() => onSelect(trip)}
            className="text-xs font-extrabold text-slate-900 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <WhatsAppConciergeButton
            size="sm"
            destinationName={trip.destination}
            customMessage={`Hi ${trip.consultantName}, I am inquiring about my booking #${trip.referenceNumber} for ${trip.destination}.`}
          />
        </div>
      </div>
    </div>
  );
};
