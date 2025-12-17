import React from 'react'; // Bỏ useState thừa
import { Link, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import UserMenu from './UserMenu'; 
import { useAuth } from '../../context/AuthContext'; // 1. Import Auth

const HeaderCom = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth(); // 2. Lấy trạng thái từ Context

  return (
    <header className="h-20 bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* LOGO & NAV - Giữ nguyên */}
        <Link to="/">TLU hostel</Link>
        {/* ... */}

        <div className="flex items-center gap-3 md:gap-5">
          <button className="relative text-gray-500 hover:text-blue-600 transition p-2 rounded-full hover:bg-gray-100">
            <Bell size={22} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* 3. LOGIC HIỂN THỊ DỰA TRÊN CONTEXT */}
          {isAuthenticated && user ? (
            <UserMenu /> 
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/login" state={{ background: location }} className="text-gray-600 font-bold px-3 py-2">
                Đăng nhập
              </Link>
              <Link to="/register" state={{ background: location }} className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderCom;
