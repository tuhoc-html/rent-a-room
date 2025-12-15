import React, { useState } from 'react';
import { 
  LayoutDashboard, Megaphone, Home, CreditCard, Settings, 
  ChevronDown, Phone, LifeBuoy, type LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// 1. Định nghĩa kiểu dữ liệu chuẩn
interface SubItem {
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
  subItems?: SubItem[];
}

// 2. Chuẩn hóa dữ liệu MENU_ITEMS (Tất cả subItems đều phải có label và path)
const MENU_ITEMS: MenuItem[] = [
  { 
    id: 'overview', 
    label: 'Tổng quan', 
    icon: LayoutDashboard, 
    path: '/admin' 
  },
  { 
    id: 'ads', 
    label: 'Quảng cáo', 
    icon: Megaphone, 
    path: '/admin/ads' 
  },
  { 
    id: 'management', 
    label: 'Quản lý cho thuê', 
    icon: Home, 
    subItems: [
        { label: 'Danh sách nhà trọ', path: '/admin/properties' },
        { label: 'Danh sách phòng', path: '/admin/rooms' },
        { label: 'Hợp đồng', path: '/admin/contracts' },
        { label: 'Khách thuê', path: '/admin/tenants' }
    ] 
  },
  { 
    id: 'payment', 
    label: 'Thanh toán', 
    icon: CreditCard, 
    // Đã chuyển String thành Object để đồng nhất
    subItems: [
      { label: 'Hóa đơn', path: '/admin/invoices' },
      { label: 'Lịch sử giao dịch', path: '/admin/transactions' }
    ] 
  },
  { 
    id: 'system', 
    label: 'Hệ thống', 
    icon: Settings, 
    // Đã chuyển String thành Object để đồng nhất
    subItems: [
      { label: 'Cài đặt chung', path: '/admin/settings' },
      { label: 'Phân quyền', path: '/admin/permissions' }
    ] 
  },
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState<string[]>(['management']); // Mặc định mở menu quản lý
  const location = useLocation(); // Dùng để active menu hiện tại

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 left-0 shrink-0 font-sans z-20">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-white">
        <Link to="/admin" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <Home className="w-8 h-8" strokeWidth={2.5} />
          <span>TRỌ MỚI</span>
        </Link>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="px-3 space-y-1">
          {MENU_ITEMS.map((item) => {
            // Kiểm tra xem menu này có đang active không (dựa trên URL)
            const isActive = item.path === location.pathname;
            const isSubActive = item.subItems?.some(sub => sub.path === location.pathname);

            return (
              <div key={item.id}>
                {item.subItems ? (
                  // === Dropdown Item ===
                  <div className="group">
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
                        ${openMenus.includes(item.id) || isSubActive 
                          ? 'text-gray-900 bg-gray-50' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isSubActive ? 'text-blue-600' : ''}`} />
                        {item.label}
                      </div>
                      <motion.div
                        animate={{ rotate: openMenus.includes(item.id) ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {openMenus.includes(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-11 pr-3 py-1 space-y-1">
                            {item.subItems.map((sub, idx) => {
                              const isChildActive = sub.path === location.pathname;
                              return (
                                <Link
                                  key={idx}
                                  to={sub.path}
                                  className={`block py-2 text-sm transition-colors rounded-md px-2
                                    ${isChildActive 
                                      ? 'text-blue-700 font-medium bg-blue-50' 
                                      : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'}
                                  `}
                                >
                                  {sub.label}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // === Single Link ===
                  <Link
                    to={item.path || '#'}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? 'text-blue-700 bg-blue-50' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer / Support */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <p className="text-xs font-semibold text-gray-500 mb-3 uppercase">Nhân viên hỗ trợ</p>
        <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg mb-3 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60" 
            alt="Support" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Lê Thành Đạt</p>
            <p className="text-xs text-gray-500 truncate">0385286189</p>
          </div>
          <button className="p-1.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition cursor-pointer">
            <LifeBuoy className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
           <p className="text-xs font-semibold text-gray-500">Hotline:</p>
           <a href="tel:0332661579" className="flex items-center gap-1 text-blue-600 font-bold hover:underline">
             <Phone className="w-4 h-4 fill-blue-600" />
             033.266.1579
           </a>
        </div>
      </div>
    </aside>
  );
}