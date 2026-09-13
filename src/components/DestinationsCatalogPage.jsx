import React, { useState, useMemo } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { PackageCard } from './PackageCard';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

export const DestinationsCatalogPage = () => {
  const { allPackages, openWhatsApp } = useWanderlust();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL', 'DOMESTIC', 'INTERNATIONAL'

  const filteredPackages = useMemo(() => {
    return allPackages.filter(pkg => {
      const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'ALL' || pkg.category.toUpperCase() === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [allPackages, searchQuery, activeTab]);

  return (
    <div style={{ backgroundColor: '#F8F6F0', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Hero Header */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          padding: '100px 24px 60px 24px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="font-display" style={{ fontSize: '3rem', marginBottom: '16px' }}>
            Explore Our Destinations
          </h1>
          <p style={{ color: '#9DACAF', fontSize: '1.1rem', marginBottom: '32px' }}>
            Discover our complete catalogue of premium luxury tours, crafted for the modern traveler.
          </p>

          {/* Search Bar */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: '#FFFFFF', 
            borderRadius: '100px', 
            padding: '8px 16px',
            maxWidth: '500px',
            margin: '0 auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <Search size={20} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Search destinations (e.g., Japan, Kerala)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '10px 12px',
                fontSize: '1rem',
                color: '#0F172A',
                backgroundColor: 'transparent'
              }}
            />
          </div>
        </div>
      </section>

      {/* Filter Tabs & Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* Filter Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '16px'
        }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {['ALL', 'DOMESTIC', 'INTERNATIONAL'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 24px',
                  borderRadius: '100px',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  border: activeTab === tab ? 'none' : '1px solid #CBD5E1',
                  backgroundColor: activeTab === tab ? '#0F172A' : '#FFFFFF',
                  color: activeTab === tab ? '#FFFFFF' : '#64748B',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab === 'ALL' ? 'All Packages' : tab === 'DOMESTIC' ? 'Domestic (India)' : 'International'}
              </button>
            ))}
          </div>
          
          <div style={{ color: '#64748B', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={16} />
            Showing {filteredPackages.length} packages
          </div>
        </div>

        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px'
          }}>
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} openWhatsApp={openWhatsApp} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#64748B' }}>
            <MapPin size={48} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>No destinations found</h3>
            <p>Try adjusting your search query or switching tabs.</p>
          </div>
        )}
      </div>
    </div>
  );
};
