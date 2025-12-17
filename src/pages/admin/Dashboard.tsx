import React, { useState } from 'react';
import { Home, Users, Wallet, AlertCircle, TrendingUp, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Định nghĩa Interface
interface StoredProperty {
  totalRooms: string;
}

interface StatItem {
  label: string;
  val: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export default function DashboardPage() {
  // Lazy Initialization cho useState
  const [stats] = useState<StatItem[]>(() => {
    try {
      const savedProperties = JSON.parse(localStorage.getItem('properties') || '[]') as StoredProperty[];
      
      const totalRooms = savedProperties.reduce((acc: number, curr: StoredProperty) => {
        return acc + (parseInt(curr.totalRooms) || 0);
      }, 0);

      const emptyRooms = totalRooms; 
      const rentedRooms = 0;

      return [
        { label: 'Tổng số phòng', val: totalRooms.toString(), icon: Home, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Đang thuê', val: rentedRooms.toString(), icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Phòng trống', val: emptyRooms.toString(), icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Doanh thu tháng', val: '0đ', icon: Wallet, color: 'text-purple-600', bg: 'bg-purple-50' },
      ];
    } catch {
      // FIX LỖI Ở ĐÂY: Xóa biến 'error' trong catch vì không dùng đến
      return [
        { label: 'Tổng số phòng', val: '0', icon: Home, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Đang thuê', val: '0', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Phòng trống', val: '0', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Doanh thu tháng', val: '0đ', icon: Wallet, color: 'text-purple-600', bg: 'bg-purple-50' },
      ];
    }
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <p className="text-gray-500 text-sm">Cập nhật tình hình kinh doanh nhà trọ của bạn.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-lg ${item.bg}`}><item.icon className={`w-6 h-6 ${item.color}`} /></div>
            <div><p className="text-sm text-gray-500 font-medium">{item.label}</p><p className="text-2xl font-bold text-gray-900">{item.val}</p></div>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-h-[300px]">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-600" /> Biểu đồ doanh thu</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300">(Chưa có dữ liệu thanh toán)</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Chưa có hoạt động nào</div>
          <Link to="/admin/management/properties" className="block text-center text-blue-600 text-sm font-medium hover:underline pt-4 border-t border-gray-100 mt-auto">Quản lý nhà trọ</Link>
        </div>
      </motion.div>
    </div>
  );
}