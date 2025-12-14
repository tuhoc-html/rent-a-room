import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, PlayCircle } from 'lucide-react';
import type { Listing } from '../../data/listings';

interface ListingCardProps {
  data: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  return (
    <Link 
      to={`/listings/${data.id}`} 
      className="group block bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* --- PHẦN HÌNH ẢNH --- */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge HOT */}
        {data.isHot && (
          <div className="absolute top-2 left-2 bg-[#FF0000] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            HOT
          </div>
        )}

        {/* Nút Review */}
        <div className="absolute bottom-2 left-2">
           <div className="bg-white/90 backdrop-blur-sm text-[#00B4D8] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
             <PlayCircle size={12} fill="currentColor" />
             Review
           </div>
        </div>

        {/* Icon Heart (Yêu thích) */}
        <div className="absolute bottom-2 right-2">
           <Heart size={20} className="text-white hover:text-red-500 transition-colors drop-shadow-md cursor-pointer" />
        </div>
        
        {/* Gradient mờ bên dưới để text dễ nhìn hơn nếu cần */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>

      {/* --- PHẦN THÔNG TIN --- */}
      <div className="p-3">
        {/* Tiêu đề */}
        <h3 className="font-bold text-gray-800 text-[15px] leading-tight mb-2 line-clamp-2 min-h-10 group-hover:text-blue-600 transition-colors">
          {data.title}
        </h3>

        {/* Giá tiền */}
        <div className="flex items-center gap-1 mb-2">
           <span className="text-gray-500 text-xs">Từ</span>
           <span className="text-[#F97316] font-bold text-base">{data.price}</span>
        </div>

        {/* Tags (Loại phòng + Diện tích) */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-1 rounded">
            {data.category}
          </span>
          {data.area && (
            <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-1 rounded">
              {data.area}
            </span>
          )}
        </div>

        {/* Địa chỉ */}
        <div className="flex items-center gap-1 text-gray-500 text-[11px]">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{data.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;