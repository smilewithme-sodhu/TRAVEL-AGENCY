import React, { useState, useMemo } from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { Upload, MapPin, Sparkles, SlidersHorizontal, Camera, Heart } from 'lucide-react';

export const TravelerGalleryPage = () => {
  const { galleryPhotos, setIsUploadModalOpen } = useWaypoint();
  const [filter, setFilter] = useState('all');

  const filteredPhotos = useMemo(() => {
    return filter === 'all'
      ? galleryPhotos
      : galleryPhotos.filter(p => p.category === filter);
  }, [filter, galleryPhotos]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px 80px 24px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div className="font-mono-data text-12" style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            VERIFIED TRAVELER GALLERY :: WEBP LAZY LOADED
          </div>
          <h1 className="font-display display-46" style={{ color: 'var(--text-main)' }}>
            Real Memories & Photos
          </h1>
          <p className="text-16" style={{ color: 'var(--text-muted)', marginTop: '8px', maxWidth: '600px' }}>
            Browse photos captured by travelers on their domestic and international vacations with Wanderlust Travels.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['all', 'domestic', 'international'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="font-mono-data text-12"
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: filter === cat ? '1px solid var(--accent-primary)' : '1px solid var(--hairline)',
                  backgroundColor: filter === cat ? 'var(--accent-primary)' : 'var(--bg-raised)',
                  color: filter === cat ? '#0E2233' : 'var(--text-main)',
                  fontWeight: filter === cat ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {cat === 'all' ? 'All Photos' : cat === 'domestic' ? 'Domestic (India)' : 'International'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn-primary"
            style={{ padding: '12px 20px' }}
          >
            <Upload size={18} />
            <span>Upload Your Photo</span>
          </button>

        </div>
      </div>

      {/* Gallery Grid with WebP Images & Lazy Loading */}
      {filteredPhotos.length > 0 ? (
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="card-raised"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-ambient)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image Container with Native Lazy Loading */}
              <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
                <img
                  src={photo.image}
                  alt={photo.tripTitle}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-medium)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* WebP Format Badge */}
                <span
                  className="font-mono-data text-12"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(14, 34, 51, 0.85)',
                    color: 'var(--accent-primary)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(201, 164, 85, 0.3)'
                  }}
                >
                  .WEBP
                </span>

                {/* Category Tag */}
                <span
                  className="font-mono-data text-12"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: photo.category === 'domestic' ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                    color: photo.category === 'domestic' ? '#FFFFFF' : '#0E2233',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}
                >
                  {photo.category === 'domestic' ? 'India' : 'International'}
                </span>
              </div>

              {/* Card Meta Content */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-secondary)', marginBottom: '6px' }}>
                    <MapPin size={14} />
                    <span className="font-mono-data text-12" style={{ fontWeight: 600 }}>{photo.location}</span>
                  </div>

                  <h3 className="font-display text-16" style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                    {photo.tripTitle}
                  </h3>

                  <p className="text-14" style={{ color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4, marginBottom: '16px' }}>
                    "{photo.caption}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="font-display text-14" style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                    {photo.travelerName}
                  </span>
                  <span className="font-mono-data text-12" style={{ color: 'var(--text-muted)' }}>
                    {photo.date}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="card-raised" style={{ padding: '48px', textAlign: 'center' }}>
          <Camera size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3 className="font-display text-20" style={{ color: 'var(--text-main)' }}>
            No photos found in this category
          </h3>
        </div>
      )}

    </div>
  );
};
