import React, { useState, useEffect } from 'react';
import { useWanderlust } from '../../context/WanderlustContext';
import { tripsApi } from '../../api';
import { EmptyState } from '../ui/EmptyState';
import { CardSkeleton } from '../ui/Skeleton';
import { WhatsAppConciergeButton } from '../ui/WhatsAppConciergeButton';
import {
  Calendar,
  Users,
  Compass,
  ArrowRight,
  MapPin
} from 'lucide-react';

export const TripsPage = () => {
  const { navigateTo } = useWanderlust();
  const [trips, setTrips] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    tripsApi
      .getMyTrips(activeTab)
      .then((res) => {
        if (res.success) setTrips(res.data);
      })
      .finally(() => setIsLoading(false));
  }, [activeTab]);

  const tabs = [
    { id: 'ALL', label: 'All Journeys' },
    { id: 'UPCOMING', label: 'Upcoming' },
    { id: 'COMPLETED', label: 'Completed' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
            My Travel Journeys
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Your private booking history, itinerary details, and concierge care.
          </p>
        </div>

        <WhatsAppConciergeButton size="sm" customMessage="Hi Wanderlust Concierge, I would like to plan a new holiday journey." />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Trips List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : trips.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="No journeys yet"
          description="Explore our curated destinations and speak with our concierge about your next travel plan."
          actionLabel="Explore Destinations"
          onAction={() => navigateTo('member-explore')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
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
                    onClick={() => setSelectedTrip(trip)}
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
          ))}
        </div>
      )}

      {/* Progressive Disclosure: Booking Details Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#C9A455]">
                  CONFIRMED BOOKING RECORD
                </span>
                <h3 className="font-sans font-extrabold text-xl text-slate-900">
                  {selectedTrip.destination}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTrip(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">Reference ID</div>
                <div className="font-mono font-bold text-slate-900">#{selectedTrip.referenceNumber}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">Travel Window</div>
                <div className="font-bold text-slate-900">{selectedTrip.travelDates}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">Registered Passengers</div>
                <div className="font-bold text-slate-900">{selectedTrip.travellerNames.join(', ')}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">Concierge Arrangements</div>
                <div className="text-slate-700 leading-relaxed font-medium">{selectedTrip.arrangementsNote}</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">Assigned Travel Consultant</div>
                <div className="font-bold text-slate-900">{selectedTrip.consultantName}</div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <WhatsAppConciergeButton
                size="md"
                className="w-full"
                customMessage={`Hi ${selectedTrip.consultantName}, regarding my booking #${selectedTrip.referenceNumber} for ${selectedTrip.destination}...`}
              />
              <button
                onClick={() => setSelectedTrip(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
