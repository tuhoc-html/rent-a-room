import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, QrCode, 
  Facebook, Youtube, MessageCircle 
} from 'lucide-react';

const FooterCom = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-8 pb-12">
      <div className="container mx-auto px-4 max-w-[1400px]">
        
        {/* --- MAIN CONTENT (GRID 3 CỘT) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* CỘT 1: APP & THÀNH VIÊN (Chiếm 4 phần) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo Brand */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <span className="text-2xl font-bold text-[#00419E]">TRỌ MỚI</span>
            </div>

            {/* Tải App */}
            <div>
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase">Tải App Trọ Mới Ngay</h4>
                <div className="flex gap-4">
                    {/* Giả lập QR Code */}
                    <div className="w-24 h-24 bg-white border border-slate-200 rounded p-1 flex items-center justify-center shadow-sm">
                        <QrCode size={60} className="text-slate-800"/>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col gap-2 justify-center">
                        <button className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition w-[130px]">
                            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.58-.67.77-1.24 2-1.09 3.15 1.15.09 2.32-.79 3.05-1.62z"/></svg>
                            <div className="text-left">
                                <div className="text-[8px] leading-none">Download on the</div>
                                <div className="text-[10px] font-bold leading-none mt-0.5">App Store</div>
                            </div>
                        </button>
                        <button className="bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition w-[130px]">
                            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,25.88L5,24.82L16.81,13L21.5,17.69C22.17,18.36 22.17,19.43 21.5,20.1L16.81,15.12M21.5,6.31L16.81,11L5,1.18L6.05,0.12L16.81,10.88L21.5,6.31M15.12,12L5,1.88L5,22.12L15.12,12Z"/></svg>
                            <div className="text-left">
                                <div className="text-[8px] leading-none">GET IT ON</div>
                                <div className="text-[10px] font-bold leading-none mt-0.5">Google Play</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Thành viên của */}
            <div>
                <h4 className="font-bold text-slate-800 mb-3 text-sm">Thành viên của OHI.VN</h4>
                <div className="flex flex-wrap gap-3">
                    {/* Placeholder cho logo các công ty con */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-200">
                            LOGO
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* CỘT 2: HỆ THỐNG & THÔNG TIN (Chiếm 4 phần) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {/* Hệ thống */}
            <div>
                <h3 className="font-bold text-[#00419E] text-base mb-4 uppercase">Hệ thống</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                    <li><Link to="#" className="hover:text-[#00419E] transition">Dành cho chủ trọ</Link></li>
                    <li><Link to="#" className="hover:text-[#00419E] transition">Blog / Tin tức</Link></li>
                    <li><Link to="#" className="hover:text-[#00419E] transition">Hướng dẫn sử dụng</Link></li>
                    <li><Link to="#" className="hover:text-[#00419E] transition">Liên hệ</Link></li>
                    <li><Link to="#" className="hover:text-[#00419E] transition">Tuyển dụng</Link></li>
                </ul>
            </div>
            
            {/* Thông tin */}
            <div>
                <h3 className="font-bold text-[#00419E] text-base mb-4 uppercase">Thông tin</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                    <li><Link to="#" className="hover:text-[#00419E] transition">Điều khoản & Cam kết</Link></li>
                    <li><Link to="#" className="hover:text-[#00419E] transition">Quy chế hoạt động</Link></li>
                    <li><Link to="#" className="hover:text-[#00419E] transition">Chính sách bảo mật</Link></li>
                    <li><Link to="#" className="hover:text-[#00419E] transition">Giải quyết khiếu nại</Link></li>
                </ul>
            </div>
          </div>

          {/* CỘT 3: KẾT NỐI (Chiếm 4 phần) */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-[#00419E] text-base mb-5 uppercase">Kết nối với chúng tôi</h3>
            
            <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Phone size={16} />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-800 text-lg">033.266.1579</span>
                        <span className="text-xs text-slate-500">Tổng đài CSKH (8:00 - 22:00)</span>
                    </div>
                </li>
                
                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <MessageCircle size={16} />
                    </div>
                    <span>Zalo: <strong>0332661579</strong></span>
                </li>

                <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Mail size={16} />
                    </div>
                    <span className="hover:text-[#00419E] cursor-pointer">info@tromoi.com</span>
                </li>

                <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-1">
                        <MapPin size={16} />
                    </div>
                    <span className="leading-tight">
                        <strong>VP Huế:</strong> 4/16 Đoàn Hữu Trưng, TP. Huế<br/>
                        <strong>VP HCM:</strong> 19 Đường Số 23, P. Bình Phú, TP. HCM
                    </span>
                </li>
            </ul>

            {/* Social Links (Dạng nút) */}
            <div className="mt-6 flex flex-wrap gap-2">
                <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-600 hover:text-white transition">
                    <Facebook size={14} /> tromoitoanquoc
                </a>
                <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold hover:bg-black hover:text-white transition">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                    @tromoi
                </a>
                <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-semibold hover:bg-red-600 hover:text-white transition">
                    <Youtube size={14} /> @tromoi
                </a>
            </div>
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Copyright © 2015 - 2025 OHI Co.Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterCom;