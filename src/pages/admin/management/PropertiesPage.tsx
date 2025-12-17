import { useState } from 'react';
import { Plus, MapPin, Home, MoreHorizontal, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


import CreatePropertyModal, { type PropertyFormData } from '../../../components/modals/CreatePropertyModal';
import { useToast } from '../../../context/ToastContext';

type Property = PropertyFormData & {
  id: number;
  image: string;
  empty: number;
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('properties');
      return saved ? (JSON.parse(saved) as Property[]) : [];
    } catch {
      return [];
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleCreateProperty = (data: PropertyFormData) => {
    const newProperty: Property = {
      ...data, 
      id: Date.now(),
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop',
      empty: parseInt(data.totalRooms || '0', 10) 
    };

    let existingData: Property[] = [];
    try {
      existingData = JSON.parse(localStorage.getItem('properties') || '[]') as Property[];
    } catch {
      existingData = [];
    }
    
    const updatedList = [newProperty, ...existingData];
    
    localStorage.setItem('properties', JSON.stringify(updatedList));

    setProperties(updatedList);
    
    setIsModalOpen(false);
    showToast(`Đã thêm nhà trọ "${data.name}"`, 'success');
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Danh sách nhà trọ</h1>
            <p className="text-gray-500 text-sm mt-1">Quản lý {properties.length} tòa nhà trong hệ thống</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" /> Thêm nhà trọ
          </button>
        </div>

        {properties.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Building className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium mb-1">Chưa có nhà trọ nào</p>
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="text-blue-600 font-semibold hover:underline text-sm cursor-pointer"
              >
                + Thêm mới ngay
              </button>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {properties.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  layout 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: index * 0.05 }} 
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  <div className="h-40 overflow-hidden relative bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-700 shadow-sm">
                      {item.totalRooms} Phòng
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{item.name}</h3>
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">
                        {item.address} 
                        {item.district ? `, ${item.district}` : ''} 
                        {item.city ? `, ${item.city}` : ''}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-4 border-t border-gray-100">
                      <div className="flex-1 text-sm font-medium text-green-600 flex items-center gap-1">
                        <Home className="w-4 h-4" /> Đang hoạt động
                      </div>
                      <button className="text-sm font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded transition cursor-pointer">
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      <CreatePropertyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateProperty} 
      />
    </>
  );
}