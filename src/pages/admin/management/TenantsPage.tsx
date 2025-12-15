import React from 'react';
import { UserPlus, Search, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const TENANTS = [
  { id: 1, name: 'Lê Thành Đạt', phone: '0385286189', email: 'dat.le@example.com', room: 'P101', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop' },
  { id: 2, name: 'Nguyễn Thị Hoa', phone: '0987654321', email: 'hoa.nguyen@example.com', room: 'P102', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop' },
  { id: 3, name: 'Trần Văn Nam', phone: '0912345678', email: 'nam.tran@example.com', room: 'P201', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop' },
];

export default function TenantsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Danh sách khách thuê</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Tìm tên, SĐT..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm whitespace-nowrap cursor-pointer">
            <UserPlus className="w-4 h-4" /> Thêm khách
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TENANTS.map((tenant, idx) => (
          <motion.div 
            key={tenant.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <img src={tenant.avatar} alt={tenant.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 truncate">{tenant.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-2">Phòng {tenant.room}</p>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="w-3.5 h-3.5" />
                  {tenant.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{tenant.email}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}