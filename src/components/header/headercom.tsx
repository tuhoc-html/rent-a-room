import React from 'react';
import Button1 from '../buttons/button1';
import {  Link } from 'react-router-dom';
// Component Button cơ bản để tái sử dụng cho UI
interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}
const ListMenu: MenuItem[] = [
  { name: 'Trang chủ', href: '#' },
  {name: 'Nhà nguyên căn', href: '#'},
  {name: 'Căn hộ', href: '#'},
  {name: 'Phòng trọ', href: '#'},
  {name: 'Liên hệ', href: '#'}
]
export const HeaderCom = () => {
     return (
    <div className=" bg-slate-50">
      {/* --- START HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* 1. Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/20">
              T
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">TroMoi</span>
          </div>

          {/* 2. Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {
              ListMenu.map((item, index) => (
                <Link key={index} to={item.href} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  {item.name}
                </Link>
              ))
            }
          </nav>

          {/* 3. Actions / Right Side */}
          <div className="flex items-center gap-3">
            
            {/* Search Icon (Mobile only) */}
            <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              {/* Icon Search (Inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                {/* Icon Bell (Inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                </svg>
                {/* Red dot indicator */}
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden md:block mx-1"></div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button1 variant="ghost">Đăng nhập</Button1>
              <Button1 variant="ghost">Đăng ký</Button1>
              <Button1 variant="primary">
                {/* Icon PlusCircle (Inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
                Đăng tin mới
              </Button1>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              {/* Icon Menu (Inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* --- END HEADER --- */}

    </div>
  );
}