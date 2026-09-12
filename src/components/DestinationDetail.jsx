import React from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { HeroHeader } from './destination-detail/HeroHeader';
import { DestinationNarrative } from './destination-detail/DestinationNarrative';
import { KeyHighlights } from './destination-detail/KeyHighlights';
import { CuratedExperiences } from './destination-detail/CuratedExperiences';
import { CinematicGallery } from './destination-detail/CinematicGallery';
import { BookingPanel } from './destination-detail/BookingPanel';

export const DestinationDetail = () => {
  const { selectedDestination, selectedPackage, navigateTo, toggleWishlist, savedWishlist, openWhatsApp, openPhoneCall, agencyPhone } = useWaypoint();
  
  const dest = selectedDestination || selectedPackage || {};
  const isSaved = savedWishlist?.includes(dest.id) || false;

  // Normalized package properties
  const title = dest.name || dest.title || 'Luxury Destination';
  const heroImage = dest.heroImage || dest.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80';
  const location = dest.location || dest.stateOrCountry || 'Exotic Retreat';
  const category = dest.category || 'international';
  const tagline = dest.tagline || 'Experience an extraordinary bespoke journey tailored just for you.';
  const description = dest.description || 'Discover breathtaking landscapes, rich cultural heritage, and world-class luxury stays curated by Wanderlust Travel consultants.';
  const whyVisit = dest.whyVisit || [
    { icon: '✨', title: 'Curated Experiences', desc: 'Private guided excursions and verified luxury stays.' },
    { icon: '🏔', title: 'Scenic Landscapes', desc: 'Breathtaking natural wonders and iconic viewpoints.' },
    { icon: '🏛', title: 'Rich Culture & Heritage', desc: 'Immersive local traditions and historic landmarks.' },
    { icon: '🌟', title: 'Unforgettable Memories', desc: 'Bespoke moments crafted for couples, families, and groups.' }
  ];
  const highlights = dest.highlights || dest.touristSpots || [
    { title: 'Iconic City & Landmark Tour', desc: 'Experience the world-renowned highlights with VIP access.' },
    { title: 'Scenic Sunset Excursion', desc: 'Private evening tour with panoramic photography spots.' },
    { title: 'Authentic Culinary Experience', desc: 'Indulge in authentic regional flavors and fine dining.' }
  ];
  const galleryImages = dest.galleryImages || [heroImage];

  return (
    <div style={{ paddingBottom: '80px', backgroundColor: '#F8F6F0' }}>
      
      <HeroHeader
        heroImage={heroImage}
        title={title}
        category={category}
        location={location}
        tagline={tagline}
        navigateTo={navigateTo}
      />

      {/* Main Content Layout */}
      <div style={{ maxWidth: '1400px', margin: '48px auto 0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '48px' }}>
        
        {/* Left Storytelling Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <DestinationNarrative title={title} description={description} />
          <KeyHighlights title={title} whyVisit={whyVisit} />
          <CuratedExperiences highlights={highlights} />
          <CinematicGallery title={title} galleryImages={galleryImages} />
        </div>

        {/* Right Sticky Booking & Consultation Panel */}
        <div>
          <BookingPanel
            title={title}
            dest={dest}
            isSaved={isSaved}
            toggleWishlist={toggleWishlist}
            openWhatsApp={openWhatsApp}
            openPhoneCall={openPhoneCall}
            agencyPhone={agencyPhone}
          />
        </div>

      </div>

    </div>
  );
};
