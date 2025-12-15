// src/pages/detail/index.tsx
import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { roomData } from '../../data/mock-detail';
import GallerySection from '../../components/detail/GallerySection';
import InfoBar from '../../components/detail/InfoBar';
import ContentSection from '../../components/detail/ContentSection';
import MapSection from '../../components/detail/MapSection';

const DetailPage = () => {
  return (
    // 1. Đổi nền thành xám nhạt để làm nổi bật các khối trắng
    <div className="min-h-screen bg-[#f5f7fa] pb-10 font-sans">
      
      {/* Breadcrumb (Thanh điều hướng nhỏ) */}
      <div className="bg-white border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <span>Trang chủ</span> <ChevronRight size={14}/> 
            <span>Hồ Chí Minh</span> <ChevronRight size={14}/> 
            <span>Quận Bình Tân</span> <ChevronRight size={14}/> 
            <span className="text-blue-600 truncate max-w-[200px]">{roomData.title}</span>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* KHỐI 1: HEADER & GALLERY */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 uppercase leading-snug mb-3">
            {roomData.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
            <MapPin size={18} className="shrink-0 text-blue-600" />
            <span>{roomData.address}</span>
          </div>

          <GallerySection images={roomData.images} />
        </div>

        {/* KHỐI 2: THANH GIÁ & LIÊN HỆ (INFO BAR) */}
        {/* Component InfoBar đã được sửa ở dưới để tự nó là một khối */}
        <InfoBar data={roomData} />

        {/* LAYOUT DƯỚI: Chia 2 cột nếu màn hình to, hoặc để dọc */}
        {/* Ở design này nội dung chạy thẳng xuống nên ta dùng 1 cột lớn */}
        
        {/* KHỐI 3: NỘI DUNG CHI TIẾT */}
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-gray-100">
           <ContentSection data={roomData} />
        </div>

        {/* KHỐI 4: BẢN ĐỒ */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
           <MapSection address={roomData.address} />
        </div>

      </div>
    </div>
  );
};

export default DetailPage;