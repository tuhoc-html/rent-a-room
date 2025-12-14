// src/components/detail-v2/MapSection.tsx
import React from 'react';

const MapSection = ({ address }: { address: string }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase flex items-center gap-2">
         <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
         Vị trí trên bản đồ
      </h3>
      <div className="w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
         <iframe 
           width="100%" 
           height="100%" 
           frameBorder="0" 
           src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
           title="Map"
           className="grayscale-[20%] hover:grayscale-0 transition-all duration-500"
         ></iframe>
      </div>
      <p className="mt-3 text-sm text-gray-500 italic text-center">
         * Vị trí trên bản đồ chỉ mang tính chất tương đối. Vui lòng liên hệ chủ trọ để biết địa chỉ chính xác.
      </p>
    </div>
  );
};

export default MapSection;