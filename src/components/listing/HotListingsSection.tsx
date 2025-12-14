import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HOT_LISTINGS } from '../../data/listings';
import ListingCard from './ListingCard';

const HotListingsSection = () => {
  return (
    <section className="pb-20"> 
      <div className="container mx-auto px-4 max-w-[1400px]">

        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12 hover:shadow-2xl transition-shadow duration-500">
            
            {/* --- HEADER SECTION --- */}
            <div className="mb-12 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    🔥
                  </div>
                  <h2 className="text-[#1e3a8a] text-3xl md:text-4xl font-bold uppercase tracking-tight">
                    Lựa Chọn Chỗ Ở Hot
                  </h2>
                </div>
                {/* Đường gạch dưới */}
                <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-cyan-500 mt-3 rounded-full shadow-lg shadow-blue-500/30"></div>
              </div>
              <p className="text-slate-500 text-sm hidden md:block">Những phòng được yêu thích nhất tuần này</p>
            </div>

            {/* --- GRID LAYOUT --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {HOT_LISTINGS.map((item, index) => (
                <div key={item.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <ListingCard data={item} />
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button className="group flex items-center gap-2 px-8 py-4 rounded-full border-2 border-blue-200 text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 active:scale-95">
                Xem tất cả danh sách
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

        </div> 

      </div>
    </section>
  );
};

export default HotListingsSection;