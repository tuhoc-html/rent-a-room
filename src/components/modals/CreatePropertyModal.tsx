import React, { useState } from 'react';
import { X, Building, MapPin, Loader2, Calendar} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface PropertyFormData {
  id?: number;
  name: string;
  type: string;
  address: string;
  city: string;
  district: string;
  totalRooms: string;
  waterPrice: string;
  electricPrice: string;
  closingDate: string;
}

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PropertyFormData) => void;
}

export default function CreatePropertyModal({ isOpen, onClose, onSubmit }: CreatePropertyModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    name: '', type: 'phong-tro', address: '', city: '', district: '', 
    totalRooms: '', waterPrice: '10000', electricPrice: '3500', closingDate: '1',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600)); // Fake delay
    onSubmit(formData);
    setLoading(false);
    setFormData(prev => ({ ...prev, name: '', address: '', totalRooms: '', district: '' })); // Reset field chính
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-[70] overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 sticky top-0 backdrop-blur-md z-10">
              <div className="flex items-center gap-2 text-blue-600">
                <Building className="w-5 h-5" />
                <h3 className="text-lg font-bold text-gray-900">Thêm nhà trọ mới</h3>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full text-gray-500 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cột 1 */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">Thông tin cơ bản</h4>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Tên nhà trọ <span className="text-red-500">*</span></label>
                  <input name="name" type="text" required placeholder="VD: Trọ Hạnh Phúc..." className="input-field w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Loại hình</label>
                  <select name="type" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.type} onChange={handleChange}>
                    <option value="phong-tro">Nhà trọ / Phòng trọ</option>
                    <option value="chung-cu-mini">Chung cư mini</option>
                    <option value="ktx">Ký túc xá</option>
                    <option value="nguyen-can">Nhà nguyên căn</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Thành phố</label>
                        <select name="city" className="w-full px-3 py-2 border rounded-lg outline-none" value={formData.city} onChange={handleChange}>
                            <option value="">Chọn TP</option><option value="HN">Hà Nội</option><option value="HCM">HCM</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Quận/Huyện</label>
                        <input name="district" className="w-full px-3 py-2 border rounded-lg outline-none" value={formData.district} onChange={handleChange} />
                    </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Địa chỉ chi tiết</label>
                  <input name="address" type="text" required className="w-full px-3 py-2 border rounded-lg outline-none" value={formData.address} onChange={handleChange} />
                </div>
              </div>
              {/* Cột 2 */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">Cấu hình dịch vụ</h4>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Số phòng dự kiến</label>
                  <input name="totalRooms" type="number" min="1" required className="w-full px-3 py-2 border rounded-lg outline-none" value={formData.totalRooms} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Điện (đ/kwh)</label>
                        <input name="electricPrice" type="number" className="w-full px-3 py-2 border rounded-lg outline-none" value={formData.electricPrice} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Nước (đ/khối)</label>
                        <input name="waterPrice" type="number" className="w-full px-3 py-2 border rounded-lg outline-none" value={formData.waterPrice} onChange={handleChange} />
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Ngày chốt số</label>
                    <select name="closingDate" className="w-full px-3 py-2 border rounded-lg outline-none" value={formData.closingDate} onChange={handleChange}>
                        {Array.from({length: 31}, (_, i) => <option key={i+1} value={i+1}>Ngày {i+1}</option>)}
                    </select>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 pt-4 flex gap-3 border-t border-gray-100 mt-2">
                <button type="button" onClick={onClose} className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition cursor-pointer">Hủy bỏ</button>
                <button type="submit" disabled={loading} className="flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Lưu & Tạo mới'}</button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}