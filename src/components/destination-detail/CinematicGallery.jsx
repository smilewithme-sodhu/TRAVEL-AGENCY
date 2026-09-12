import React from 'react';

export const CinematicGallery = ({ title, galleryImages }) => {
  if (!galleryImages || galleryImages.length <= 1) return null;

  return (
    <div>
      <div className="font-mono-data text-12" style={{ color: '#C9A455', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
        CINEMATIC GALLERY
      </div>
      <h3 className="font-display text-24" style={{ color: '#0F172A', marginBottom: '20px' }}>
        Glimpses of {title}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {galleryImages.map((imgUrl, idx) => (
          <div key={idx} style={{ height: '180px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0F172A' }}>
            <img src={imgUrl} alt={`${title} photo ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );
};
