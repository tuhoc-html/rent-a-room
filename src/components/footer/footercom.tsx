import React from 'react';
import { Phone, Mail, MapPin, Facebook, Youtube, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* CỘT 1: APP & ĐỐI TÁC (Chiếm 4 phần) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
               <div className="text-blue-600 font-bold text-2xl flex items-center gap-1">
                 <HomeIconLogo /> {/* SVG Logo tự vẽ ở dưới */}
                 <span>TRỌ MỚI</span>
               </div>
            </div>

            {/* Download App Section */}
            <div>
              <h3 className="text-blue-600 font-semibold text-sm mb-3 uppercase">Tải app Trọ Mới ngay</h3>
              <div className="flex gap-3">
                {/* QR Code giả lập */}
                <div className="w-24 h-24 bg-gray-100 border border-gray-300 rounded p-1">
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tromoi.com" alt="QR Code" className="w-full h-full object-contain"/>
                </div>
                
                {/* Store Buttons */}
                <div className="flex flex-col justify-between h-24">
                  <a href="#" className="block w-32">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="w-full h-auto" />
                  </a>
                  <a href="#" className="block w-32">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="w-full h-auto" />
                  </a>
                </div>
              </div>
            </div>

            {/* Partners Section */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Thành viên của <span className="text-blue-600 font-medium">ohi.vn</span></p>
              <div className="flex flex-wrap gap-2">
                {/* Placeholder cho logo các đối tác */}
                {['ohdidi', 'ohbeauti', 'ohdental', 'nhadep', 'phongkham'].map((item, idx) => (
                  <div key={idx} className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-[8px] text-gray-400 text-center px-1">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CỘT 2: LIÊN KẾT (Chiếm 3 phần) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Nhóm Hệ thống */}
            <div>
              <h3 className="text-blue-600 font-bold uppercase mb-4 text-sm">Hệ thống</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Dành cho chủ trọ</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Hướng dẫn</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Liên hệ</a></li>
              </ul>
            </div>

            {/* Nhóm Thông tin */}
            <div>
              <h3 className="text-blue-600 font-bold uppercase mb-4 text-sm">Thông tin</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Điều khoản & Cam kết</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Quy chế hoạt động</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Chính sách bảo mật</a></li>
              </ul>
            </div>
          </div>

          {/* CỘT 3: KẾT NỐI (Chiếm 5 phần) */}
          <div className="lg:col-span-5">
            <h3 className="text-blue-600 font-bold uppercase mb-4 text-sm">Kết nối với chúng tôi</h3>
            
            <div className="space-y-4 mb-6">
              <ContactItem icon={<Phone size={18} />} text="033.266.1579" isLink href="tel:0332661579" />
              
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full shrink-0 font-bold text-xs border border-blue-100">
                  Zalo
                </span>
                <span className="font-medium">0332661579</span>
              </div>

              <ContactItem icon={<Mail size={18} />} text="info@tromoi.com" isLink href="mailto:info@tromoi.com" />
              
              <ContactItem icon={<MapPin size={18} />} text="VP Huế: 4/16 Đoàn Hữu Trưng, TP. Huế" />
              
              <ContactItem icon={<MapPin size={18} />} text="VP HCM: 19 Đường Số 23, P. Bình Phú, TP. HCM" />
            </div>

            {/* Social Tags */}
            <div className="flex flex-wrap gap-2">
              <SocialTag icon={<Facebook size={14} />} text="tromoitoanquoc" />
              <SocialTag icon={<Facebook size={14} />} text="tromoihue" />
              <SocialTag icon={<Facebook size={14} />} text="host.tromoi" />
              <SocialTag icon={<span className="text-[10px] font-bold">TikTok</span>} text="@tromoi.com" />
              <SocialTag icon={<span className="text-[10px] font-bold">TikTok</span>} text="@tromoi.hcm" />
              <SocialTag icon={<Youtube size={14} />} text="@tromoi" />
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BOTTOM BAR */}
      <div className="bg-[#00419e] py-4 text-center text-white text-xs">
        <p>Copyright © 2015 - 2025 OHI Co.Ltd</p>
      </div>
      
      {/* Fake Shield Icon (Góc phải dưới giống ảnh) */}
      <div className="fixed bottom-20 right-4 md:right-8 opacity-80 hover:opacity-100 cursor-pointer hidden md:block">
         <ShieldCheck className="w-12 h-12 text-blue-600 bg-white rounded-full p-2 shadow-lg border border-blue-100" />
      </div>
    </footer>
  );
};

// --- Sub Components nhỏ để code gọn hơn ---

const ContactItem = ({ icon, text, isLink = false, href = "#" }: { icon: React.ReactNode, text: string, isLink?: boolean, href?: string }) => {
  return (
    <div className="flex items-start gap-3 text-sm text-gray-700">
      <div className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full shrink-0 border border-blue-100">
        {icon}
      </div>
      {isLink ? (
        <a href={href} className="font-medium mt-1.5 hover:text-blue-600">{text}</a>
      ) : (
        <span className="font-medium mt-1.5 leading-relaxed">{text}</span>
      )}
    </div>
  );
};

const SocialTag = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
  return (
    <a href="#" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors border border-blue-100">
      {icon}
      <span>{text}</span>
    </a>
  );
};

// SVG Logo đơn giản để thay thế ảnh
const HomeIconLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
)

export default Footer;