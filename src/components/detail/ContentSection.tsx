// src/components/detail-v2/ContentSection.tsx
import React, { useState } from 'react';
import { 
  Wifi, Bath, Snowflake, Box, Truck, Video, 
  GraduationCap, Briefcase, Users, Heart, Star 
} from 'lucide-react';
import type { RoomDetail } from '../../types';

// ... (Giữ nguyên phần IconMap)
const IconMap: Record<string, React.ElementType> = {
  "Wifi": Wifi,
  "Vệ sinh trong": Bath,
  "Phòng tắm": Bath,
  "Điều hòa": Snowflake,
  "Tủ lạnh": Box, 
  "Kệ bếp": Box,
  "Giường nệm": Box,
  "Tủ áo quần": Box,
  "Ban công/sân thượng": Box,
  "Bãi để xe riêng": Truck,
  "Camera an ninh": Video,
  "Máy giặt": Box,
  "Bình nóng lạnh": Snowflake,
  "Đi học": GraduationCap,
  "Đi làm": Briefcase,
  "Gia đình": Users,
  "Cặp đôi": Heart,
};


interface Props {
  data: RoomDetail;
}

const ContentSection: React.FC<Props> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      {/* 1. GIỚI THIỆU */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
            Thông tin mô tả
        </h3>
        <div className={`prose max-w-none text-gray-700 whitespace-pre-line leading-7 text-[15px] ${!isExpanded ? 'line-clamp-[10] relative pb-8' : ''}`}>
          {data.description}
          
          {/* Hiệu ứng mờ khi rút gọn */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          )}
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-600 font-semibold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors text-sm mx-auto block cursor-pointer"
        >
          {isExpanded ? 'Thu gọn nội dung' : 'Xem toàn bộ nội dung'}
        </button>
      </section>
      
      <hr className="border-gray-100" />

      {/* 2. ĐỐI TƯỢNG */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-5 uppercase flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
            Đối tượng cho thuê
        </h3>
        <div className="flex flex-wrap gap-3">
          {data.target.map((item) => {
            const Icon = IconMap[item] || Users;
            return (
              <div key={item} className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-gray-700 text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-colors cursor-default">
                <Icon size={16} />
                <span>{item}</span>
              </div>
            )
          })}
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 3. TIỆN NGHI */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-5 uppercase flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
            Tiện nghi có sẵn
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4">
          {data.amenities.map((item) => {
            const Icon = IconMap[item] || Box;
            return (
              <div key={item} className="flex items-center gap-3 text-gray-700 p-2 rounded hover:bg-gray-50 transition-colors">
                <div className="text-blue-500"><Icon size={20} /></div>
                <span className="text-sm font-medium">{item}</span>
              </div>
            )
          })}
        </div>
      </section>

      <hr className="border-gray-100" />

      {/* 4. ĐÁNH GIÁ */}
      <section>
         <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase">Đánh giá từ khách thuê</h3>
         <div className="bg-gray-50 rounded-lg p-6 text-center border border-dashed border-gray-300">
             <div className="flex justify-center text-gray-300 gap-1 text-2xl mb-2">
                <Star size={24} /><Star size={24} /><Star size={24} /><Star size={24} /><Star size={24} />
             </div>
             <p className="text-sm text-gray-500">Chưa có đánh giá nào cho phòng trọ này.</p>
             <button className="mt-3 text-sm text-blue-600 font-medium hover:underline cursor-pointer">
                 Viết đánh giá của bạn
             </button>
         </div>
      </section>
    </div>
  );
};

export default ContentSection;