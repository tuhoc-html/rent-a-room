import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react'; 
import { useLocation } from 'react-router-dom';

const HeaderCom = () => {
  const location = useLocation();
  return (
    <header className="h-20 bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all">
            T
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">TLU hostel</span>
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
            <Link to="/login" state={{ background: location }} className="text-gray-600 font-bold text-[15px] hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300">
              Đăng nhập
            </Link>
            <Link to="/register" state={{ background: location }} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30 text-white font-bold text-[15px] px-6 py-2.5 rounded-lg transition-all duration-300 active:scale-95">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderCom;