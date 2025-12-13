import React from "react";
import { Search, Bell } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="flex justify-between items-center mb-8 sticky top-4 z-10 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-white/50">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Xin chào Admin, chúc bạn ngày làm việc hiệu quả!</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full border border-transparent focus-within:border-indigo-300 focus-within:bg-white transition-all">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="bg-transparent border-none outline-none text-sm ml-2 w-48 placeholder-gray-400"
          />
        </div>
        
        <button className="relative p-2.5 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100 transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-700">Admin User</p>
            <p className="text-xs text-gray-400">Chủ trọ</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white cursor-pointer">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;