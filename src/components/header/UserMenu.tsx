import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { User, Home, CreditCard, LogOut, HandHeart, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Import Auth

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // 1. Lấy user và hàm logout từ Context
  const { user, logout } = useAuth(); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); // Gọi hàm logout của context
    setIsOpen(false);
    navigate('/'); // Quay về trang chủ
  };

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } }
  };

  // Nếu không có user (phòng hờ), không render gì cả
  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* TRIGGER BUTTON: Hiển thị thông tin thật từ user context */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 group"
      >
        <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-700 leading-tight">{user.name}</p>
            <p className="text-xs text-gray-500 font-medium">{user.id}</p>
        </div>
        
        <div className="relative">
             <img 
                src={user.avatar} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:shadow-md transition-shadow"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-50"
          >
             {/* Header Mobile */}
             <div className="md:hidden p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
                <img src={user.avatar} className="w-10 h-10 rounded-full" alt="avatar"/>
                <div>
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.id}</p>
                </div>
            </div>

            <div className="p-2 space-y-1">
              <MenuItem to="/profile/accommodation" icon={<Home size={18} />} label="Thông tin lưu trú" />
              <MenuItem to="/profile/personal" icon={<CreditCard size={18} />} label="Thông tin cá nhân" />
              <MenuItem to="/profile/account" icon={<User size={18} />} label="Thông tin tài khoản" />
              <div className="h-px bg-gray-100 my-1 mx-2"></div>
              <MenuItem to="/landlord/dashboard" icon={<HandHeart size={18} />} label="Dành cho chủ trọ" />
            </div>

            <div className="p-2 border-t border-gray-100 bg-gray-50/50">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
              >
                <LogOut size={18} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuItem = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <Link to={to} className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group">
    <span className="text-gray-400 group-hover:text-blue-600 transition-colors">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export default UserMenu;