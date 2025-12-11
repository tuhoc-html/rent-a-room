import React from 'react';
import HeroSection from './HeroSection';
import HotListingsSection from '../../components/listing/HotListingsSection';
import ExperienceSection from '../../components/listing/ExperienceSection';
import LocationMain from '../../components/location/LocationMain';

const HomePage = () => {
  return (

    <div className="bg-slate-50 min-h-screen font-sans pb-8">
      
      <HeroSection />
      
      <div className="h-24 md:h-32 bg-slate-50"></div>
      
      <HotListingsSection />
      
      <ExperienceSection />

      <LocationMain />

    </div>
  );
};

export default HomePage;