import React from "react";
import { motion } from "framer-motion";
import { 
  Home, Users, DollarSign, LayoutGrid, Wrench, Settings, LogOut 
} from "lucide-react";

const AdminSidebar = () => {
  const menuItems = [
    { icon: LayoutGrid, label: "Tổng quan", active: true },
    { icon: Home, label: "Quản lý phòng", active: false },
    { icon: Users, label: "Khách thuê", active: false },
    { icon: DollarSign, label: "Tài chính", active: false },
    { icon: Wrench, label: "Báo cáo sự cố", active: false },
    { icon: Settings, label: "Cài đặt", active: false },
  ];

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-100 hidden md:flex flex-col z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">RentManager</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              item.active 
                ? "bg-indigo-50 text-indigo-600 font-semibold shadow-sm shadow-indigo-100" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <item.icon size={20} strokeWidth={item.active ? 2.5 : 2} />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium">
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;