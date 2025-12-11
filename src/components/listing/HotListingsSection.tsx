import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HOT_LISTINGS } from '../../data/listings';
import ListingCard from './ListingCard';

const HotListingsSection = () => {
  return (
    <section className="pb-16"> 
      <div className="container mx-auto px-4 max-w-[1400px]">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            
            {/* --- HEADER SECTION --- */}
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-[#1e3a8a] text-2xl md:text-3xl font-bold uppercase tracking-tight">
                  Lựa Chọn Chỗ Ở Hot
                </h2>
                {/* Đường gạch dưới */}
                <div className="h-1 w-20 bg-blue-600 mt-3 rounded-full"></div>
              </div>
            </div>

            {/* --- GRID LAYOUT --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {HOT_LISTINGS.map((item) => (
                <ListingCard key={item.id} data={item} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button className="group flex items-center gap-2 px-8 py-3 rounded-full border-2 border-blue-100 text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-600 transition-all duration-300">
                Xem tất cả
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

        </div> 

      </div>
    </section>
  );
};

export default HotListingsSection;