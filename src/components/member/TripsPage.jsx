import React, { useState, useEffect } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { tripsApi } from '../../api';
import { EmptyState } from '../ui/EmptyState';
import { CardSkeleton } from '../ui/Skeleton';
import { WhatsAppConciergeButton } from '../ui/WhatsAppConciergeButton';
import { Compass } from 'lucide-react';
import { TripCard } from './TripCard';
import { BookingDetailsModal } from './BookingDetailsModal';

export const TripsPage = () => {
  const { navigateTo } = useWaypoint();
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
            <TripCard
              key={trip.id}
              trip={trip}
              onSelect={setSelectedTrip}
            />
          ))}
        </div>
      )}

      {/* Progressive Disclosure: Booking Details Modal */}
      {selectedTrip && (
        <BookingDetailsModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </div>
  );
};
