import React from 'react';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

type RoomStatus = 'rented' | 'empty' | 'maintenance';

interface Room {
  id: string;
  property: string;
  price: number;
  status: RoomStatus;
  tenant: string;
}

// Mock data với kiểu Room[]
const ROOMS: Room[] = [
  { id: 'P101', property: 'Nhà trọ Hạnh Phúc', price: 3500000, status: 'rented', tenant: 'Nguyễn Văn A' },
  { id: 'P102', property: 'Nhà trọ Hạnh Phúc', price: 3500000, status: 'empty', tenant: '-' },
  { id: 'P201', property: 'Chung cư Mini Green', price: 4200000, status: 'maintenance', tenant: '-' },
  { id: 'P202', property: 'Chung cư Mini Green', price: 4500000, status: 'rented', tenant: 'Trần Thị B' },
];

// Component Badge đã được fix type
const StatusBadge = ({ status }: { status: RoomStatus }) => {
  // Sử dụng Record để đảm bảo key phải thuộc RoomStatus
  const styles: Record<RoomStatus, string> = {
    rented: 'bg-green-100 text-green-700 border-green-200',
    empty: 'bg-gray-100 text-gray-600 border-gray-200',
    maintenance: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  const labels: Record<RoomStatus, string> = {
    rented: 'Đang thuê',
    empty: 'Còn trống',
    maintenance: 'Đang sửa',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function RoomsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Danh sách phòng</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm transition-colors cursor-pointer">
          <Plus className="w-5 h-5" /> Thêm phòng
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm phòng, khu trọ..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer">
            <Filter className="w-4 h-4" /> Bộ lọc
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Mã phòng</th>
                <th className="px-6 py-4 font-semibold">Khu nhà</th>
                <th className="px-6 py-4 font-semibold">Giá thuê</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold">Khách thuê</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ROOMS.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{room.id}</td>
                  <td className="px-6 py-4 text-gray-600">{room.property}</td>
                  <td className="px-6 py-4 font-medium text-blue-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={room.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">{room.tenant}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition rounded hover:bg-blue-50 cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
          Hiển thị {ROOMS.length}/40 kết quả
        </div>
      </div>
    </motion.div>
  );
}