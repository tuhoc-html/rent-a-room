import React from 'react';
import { Wallet, Megaphone, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Left side (Breadcrumb or Page Title if needed) */}
      <div></div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition shadow-sm cursor-pointer">
          <div className="p-0.5 bg-white/20 rounded-full">
            <Wallet className="w-3.5 h-3.5" />
          </div>
          Nạp tiền
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg transition cursor-pointer">
          <Megaphone className="w-4 h-4 text-blue-600" />
          Quảng cáo
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

        <button className="flex items-center gap-2 pl-2 hover:bg-gray-50 rounded-full pr-1 py-1 transition cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60" 
            alt="User" 
            className="w-9 h-9 rounded-full border border-gray-200 object-cover"
          />
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </header>
  );
}