import React from 'react';
import { Link } from 'react-router-dom';
import { FEATURED_CITIES } from '../../data/locations';

const FeaturedLocations = () => {
  return (
    <div className="mb-12">
      <h2 className="text-[#1e3a8a] text-center text-2xl font-bold uppercase mb-8">
        Tỉnh, Thành phố nổi bật
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {FEATURED_CITIES.map((city) => (
          <Link 
            to={`/search?city=${city.name}`} 
            key={city.id} 
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Vùng ảnh */}
            <div className="relative h-[160px] overflow-hidden">
              <img 
                src={city.image} 
                alt={city.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay nhẹ khi hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
            
            {/* Tên thành phố */}
            <div className="p-3 text-center">
              <span className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
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