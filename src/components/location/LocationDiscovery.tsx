import React from 'react';
import { Link } from 'react-router-dom';
import { DISCOVERY_LIST } from '../../data/locations';

const LocationDiscovery = () => {
  return (
    // Khung trắng bo góc, có viền nhẹ
    <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-10 hover:shadow-xl transition-shadow duration-500">
      
      <div className="mb-8">
        <h3 className="text-[#1e3a8a] text-2xl md:text-3xl font-bold uppercase mb-2 tracking-tight">
          🗺️ Khám phá thêm trọ mới
        </h3>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          Dưới đây là tổng hợp các tỉnh thành có nhiều trọ mới và được quan tâm nhất trong thời gian gần đây
        </p>
      </div>

      {/* Grid danh sách text */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6">
        {DISCOVERY_LIST.map((item, index) => (
          <Link 
            key={index} 
            to={`/search?city=${item.name}`}
            className="group flex flex-col p-4 rounded-xl hover:bg-blue-50 hover:border border-blue-200 transition-all duration-300"
          >
            <span className="font-bold text-gray-800 text-[15px] group-hover:text-blue-600 transition-colors duration-300">
              {item.name}
            </span>
            <span className="text-gray-400 text-xs mt-2 group-hover:text-gray-500">
              📌 {item.count} phòng trọ
            </span>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default LocationDiscovery;