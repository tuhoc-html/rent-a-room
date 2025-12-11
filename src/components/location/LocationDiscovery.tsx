import React from 'react';
import { Link } from 'react-router-dom';
import { DISCOVERY_LIST } from '../../data/locations';

const LocationDiscovery = () => {
  return (
    // Khung trắng bo góc, có viền nhẹ
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      
      <div className="mb-6">
        <h3 className="text-[#1e3a8a] text-xl md:text-2xl font-bold uppercase mb-2">
          Khám phá thêm trọ mới ở các tỉnh thành
        </h3>
        <p className="text-gray-500 text-sm">
          Dưới đây là tổng hợp các tỉnh thành có nhiều trọ mới và được quan tâm nhất
        </p>
      </div>

      {/* Grid danh sách text */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-x-4">
        {DISCOVERY_LIST.map((item, index) => (
          <Link 
            key={index} 
            to={`/search?city=${item.name}`}
            className="flex flex-col group"
          >
            <span className="font-bold text-gray-800 text-[15px] group-hover:text-blue-600 transition-colors">
              {item.name}
            </span>
            <span className="text-gray-500 text-xs mt-1">
              {item.count} phòng trọ
            </span>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default LocationDiscovery;