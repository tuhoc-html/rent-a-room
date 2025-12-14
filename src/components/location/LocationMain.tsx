import React from 'react';
import FeaturedLocations from './FeaturedLocations';
import LocationDiscovery from './LocationDiscovery';

const LocationMain = () => {
  return (
    <section className="pt-12 pb-4">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Phần 1: Ảnh các thành phố */}
        <FeaturedLocations />
        
        {/* Phần 2: Bảng khám phá */}
        <LocationDiscovery />
      </div>
    </section>
  );
};

export default LocationMain;