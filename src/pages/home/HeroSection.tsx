import React from 'react';
import { Search, MapPin, Home, DollarSign, Layout, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative">
      
      {/* --- BACKGROUND IMAGE & TEXT --- */}
      <div className="relative h-[600px] w-full bg-slate-900 overflow-hidden">
        {/* Ảnh nền */}
        <img 
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Room" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        
        {/* Nội dung chính giữa */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-20">
          <span className="bg-[#22C55E] text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            Nền tảng số 1 Việt Nam
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Tìm không gian sống <br />
            <span className="text-blue-400">lý tưởng của bạn</span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl font-medium drop-shadow-md">
            Hơn 50,000 phòng trọ, căn hộ, nhà nguyên căn đã được kiểm duyệt.
          </p>
        </div>
      </div>

      {/* --- SEARCH BAR (Thanh tìm kiếm đè lên ảnh) --- */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4 z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-full shadow-2xl p-2 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* 1. KHU VỰC */}
            <div className="flex-1 px-6 py-3 hover:bg-gray-50 rounded-l-full cursor-pointer transition group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Khu vực</div>
                  <div className="text-sm font-bold text-gray-800 flex items-center gap-1">
                    Thành phố <ChevronDown size={14} className="text-gray-400"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. LOẠI PHÒNG */}
            <div className="flex-1 px-6 py-3 hover:bg-gray-50 cursor-pointer transition group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
                  <Home size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Loại phòng</div>
                  <div className="text-sm font-bold text-gray-800 flex items-center gap-1">
                    Tất cả loại phòng <ChevronDown size={14} className="text-gray-400"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. GIÁ THUÊ */}
            <div className="flex-1 px-6 py-3 hover:bg-gray-50 cursor-pointer transition group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
                  <DollarSign size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Giá thuê</div>
                  <div className="text-sm font-bold text-gray-800 flex items-center gap-1">
                    Chọn khoảng giá <ChevronDown size={14} className="text-gray-400"/>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. DIỆN TÍCH (Ẩn trên mobile nhỏ) */}
            <div className="flex-1 px-6 py-3 hover:bg-gray-50 cursor-pointer transition group hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
                  <Layout size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Diện tích</div>
                  <div className="text-sm font-bold text-gray-800 flex items-center gap-1">
                    Chọn diện tích <ChevronDown size={14} className="text-gray-400"/>
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTON SEARCH */}
            <div className="p-1 pl-2">
              <button className="h-full w-full md:w-auto aspect-square bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 transition hover:scale-105 active:scale-95">
                <Search size={20} />
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;