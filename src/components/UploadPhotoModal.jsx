import React, { useState } from 'react';
import { useWaypoint } from '../context/WaypointContext';
import { X, Upload, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export const UploadPhotoModal = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, uploadTravelerPhoto } = useWaypoint();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [travelerName, setTravelerName] = useState('');
  const [tripTitle, setTripTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('domestic');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isUploadModalOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const success = await uploadTravelerPhoto({
      file,
      travelerName,
      tripTitle,
      location,
      category,
      caption,
    });

    setIsUploading(false);
    if (success) {
      setIsUploadModalOpen(false);
      setFile(null);
      setPreviewUrl('');
      setTravelerName('');
      setTripTitle('');
      setLocation('');
      setCaption('');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setIsUploadModalOpen(false)}
    >
      <div
        className="card-raised"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: 'var(--bg-raised)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 48px rgba(0,0,0,0.3)',
          borderTop: '4px solid var(--accent-primary)'
        }}
      >
        
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="font-mono-data text-12" style={{ color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              AUTOMATIC WEBP CONVERSION
            </div>
            <h3 className="font-display text-20" style={{ color: 'var(--text-main)', marginTop: '2px' }}>
              Upload Traveler Photo to Gallery
            </h3>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* File Drag & Drop Zone */}
          <div
            style={{
              border: '2px dashed var(--hairline)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-main)',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {previewUrl ? (
              <div style={{ position: 'relative', height: '180px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <img src={previewUrl} alt="Upload Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="font-mono-data text-12" style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'var(--accent-primary)', color: '#0E2233', padding: '3px 8px', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
                  WebP Compression Ready
                </span>
              </div>
            ) : (
              <div>
                <ImageIcon size={36} style={{ color: 'var(--accent-primary)', marginBottom: '8px' }} />
                <div className="font-display text-16" style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '4px' }}>
                  Click to select photo or drag here
                </div>
                <div className="font-mono-data text-12" style={{ color: 'var(--text-muted)' }}>
                  Supports JPG, PNG, HEIC (Auto converts to lightweight .webp)
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              required={!file}
              onChange={handleFileChange}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer'
              }}
            />
          </div>

          <div>
            <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              TRAVELER / FAMILY NAME
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul & Sunita Sharma"
              value={travelerName}
              onChange={(e) => setTravelerName(e.target.value)}
              className="font-mono-data text-14"
              style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                TRIP TITLE / PACKAGE
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kashmir Houseboat Stay"
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
                className="font-mono-data text-14"
                style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>

            <div>
              <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                LOCATION / DESTINATION
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Srinagar, J&K"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="font-mono-data text-14"
                style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
              />
            </div>
          </div>

          <div>
            <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              CATEGORY
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="font-mono-data text-14"
              style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
            >
              <option value="domestic">Domestic (India)</option>
              <option value="international">International Tour</option>
            </select>
          </div>

          <div>
            <label className="font-mono-data text-12" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              TRAVELER REVIEW CAPTION
            </label>
            <textarea
              rows={2}
              required
              placeholder="Write short feedback or memory..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="font-mono-data text-14"
              style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', resize: 'none' }}
            />
          </div>

          <button
            type="submit"
            disabled={isUploading || !file}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '8px' }}
          >
            {isUploading ? (
              <>
                <Sparkles size={18} className="spin-icon" />
                <span>Converting to .WebP Format...</span>
              </>
            ) : (
              <>
                <Upload size={18} />
                <span>Convert to WebP & Publish to Gallery</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
