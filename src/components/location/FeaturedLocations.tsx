import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_CITIES } from '../../data/locations';

const FeaturedLocations = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-[#1e3a8a] text-3xl md:text-4xl font-bold uppercase mb-3 tracking-tight">
          🏙️ Tỉnh, Thành phố nổi bật
        </h2>
        <p className="text-slate-500 text-sm md:text-base">Khám phá những địa điểm được yêu thích nhất</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {FEATURED_CITIES.map((city, index) => (
          <Link 
            to={`/search?city=${city.name}`} 
            key={city.id} 
            className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 hover:border-blue-300"
          >
            {/* Vùng ảnh */}
            <div className="relative h-[180px] overflow-hidden bg-gradient-to-br from-slate-300 to-slate-400">
              <img 
                src={city.image} 
                alt={city.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
              />
              {/* Overlay gradient khi hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/0 group-hover:from-blue-900/50 transition-all duration-300"></div>
            </div>
            
            {/* Tên thành phố */}
            <div className="p-4 text-center">
              <span className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors duration-300">
                {city.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLocations;