import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react'; 
import { useLocation } from 'react-router-dom';

const HeaderCom = () => {
  const location = useLocation();
  return (
    <header className="h-20 bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-200">
            T
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">TLU hostel</span>
        </Link>
        
        {/* NAV LINKS (Căn giữa) */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-blue-600 font-bold text-[15px]">Trang chủ</Link>
          <Link to="/news" className="text-gray-500 hover:text-blue-600 font-medium text-[15px] transition">Tin tức</Link>
        </nav>

        {/* ACTIONS RIGHT */}
        <div className="flex items-center gap-5">
          {/* Nút thông báo */}
          <button className="relative text-gray-500 hover:text-blue-600 transition">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <Link to="/login" state={{ background: location }} className="text-gray-600 font-bold text-[15px] hover:text-blue-600 px-2">
              Đăng nhập
            </Link>
            <Link to="/register" state={{ background: location }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[15px] px-6 py-2.5 rounded-lg shadow-lg shadow-blue-500/20 transition">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderCom;