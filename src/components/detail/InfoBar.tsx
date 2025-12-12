// src/components/detail-v2/InfoBar.tsx
import React from 'react';
import { MessageCircle, Home, DollarSign, User, Clock, Phone as PhoneIcon, Phone } from 'lucide-react';
import  type { RoomDetail } from '../../types';

interface Props {
  data: RoomDetail;
}

const InfoBar: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Phần trên: Giá & Action */}
      <div className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 bg-blue-50/30">
        <div>
          <span className="text-sm text-gray-500 block mb-1">Giá thuê</span>
          <span className="text-2xl sm:text-3xl font-bold text-[#ff5a00]">{data.priceText}</span>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#ff5a00] hover:bg-[#e04f00] text-white py-3 px-8 rounded-lg font-bold transition-transform active:scale-95 shadow-md shadow-orange-200 cursor-pointer">
            <Phone size={20} fill="currentColor" />
            Gọi {data.owner.name}
          </button>
          <button className="flex-none flex items-center justify-center bg-[#0088ff] hover:bg-[#0077e0] text-white p-3 rounded-lg font-bold transition-colors shadow-md shadow-blue-200 cursor-pointer w-12 h-12">
            <MessageCircle size={24} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Phần dưới: Meta Data Icons */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2">
            <MetaItem icon={Home} label="Loại phòng" value="Tự quản" />
            <MetaItem icon={DollarSign} label="Mức giá" value={data.priceText} />
            <MetaItem icon={User} label="Chủ trọ" value={data.owner.name} />
            <MetaItem icon={PhoneIcon} label="Điện thoại" value={data.owner.phone} />
            
            {/* Dòng full width cho ngày đăng */}
            <div className="col-span-2 md:col-span-4 mt-2 pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-500 text-sm">
                <Clock size={16} />
                <span>Ngày đăng: {data.createdAt}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

// Component con nhỏ để code gọn hơn
const MetaItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Icon size={20} />
        </div>
        <div>
            <span className="text-xs text-gray-500 block">{label}</span>
            <span className="text-sm font-semibold text-gray-900">{value}</span>
        </div>
    </div>
);

export default InfoBar;