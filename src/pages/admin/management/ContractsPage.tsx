import React from 'react';
import { FileText, Download, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const CONTRACTS = [
  { id: 'HD001', tenant: 'Nguyễn Văn A', room: 'P101 - Hạnh Phúc', start: '01/01/2024', end: '01/01/2025', status: 'active' },
  { id: 'HD002', tenant: 'Trần Thị B', room: 'P202 - Green', start: '15/02/2024', end: '15/08/2024', status: 'expiring' },
  { id: 'HD003', tenant: 'Lê Văn C', room: 'P303 - Sinh Viên', start: '01/01/2023', end: '01/01/2024', status: 'ended' },
];

export default function ContractsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Hợp đồng</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm transition cursor-pointer">
          <Plus className="w-5 h-5" /> Tạo hợp đồng
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
         {/* Stats Cards */}
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FileText className="w-6 h-6"/></div>
            <div><p className="text-xs text-gray-500 uppercase font-semibold">Tổng hợp đồng</p><p className="text-xl font-bold text-gray-900">142</p></div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg"><FileText className="w-6 h-6"/></div>
            <div><p className="text-xs text-gray-500 uppercase font-semibold">Đang hiệu lực</p><p className="text-xl font-bold text-gray-900">120</p></div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><FileText className="w-6 h-6"/></div>
            <div><p className="text-xs text-gray-500 uppercase font-semibold">Sắp hết hạn</p><p className="text-xl font-bold text-gray-900">5</p></div>
         </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Số HĐ</th>
                <th className="px-6 py-4 font-semibold">Người thuê</th>
                <th className="px-6 py-4 font-semibold">Phòng / Nhà</th>
                <th className="px-6 py-4 font-semibold">Ngày bắt đầu</th>
                <th className="px-6 py-4 font-semibold">Ngày kết thúc</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CONTRACTS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.tenant}</td>
                  <td className="px-6 py-4 text-gray-600">{item.room}</td>
                  <td className="px-6 py-4 text-gray-600">{item.start}</td>
                  <td className="px-6 py-4 text-gray-600">{item.end}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      item.status === 'active' ? 'bg-green-100 text-green-700' : 
                      item.status === 'expiring' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item.status === 'active' ? 'Hiệu lực' : item.status === 'expiring' ? 'Sắp hết hạn' : 'Đã kết thúc'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-600 cursor-pointer" title="Tải xuống">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}