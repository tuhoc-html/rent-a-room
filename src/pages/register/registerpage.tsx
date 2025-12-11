import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Home, X } from 'lucide-react';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  // --- SỬA LOGIC NÚT ĐÓNG ---
  const handleClose = () => {
    if (background) {
      navigate(background.pathname + background.search + background.hash);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 w-full shadow-2xl relative animate-modal-pop">
      
      {/* Gọi hàm handleClose */}
      <button 
        onClick={handleClose}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
        title="Đóng"
      >
        <X size={24} />
      </button>

      {/* ... (Phần còn lại giữ nguyên không đổi) ... */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 text-blue-600">
           <Home size={64} strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-center text-gray-800 mb-8">
        Đăng Ký Tài Khoản Mới
      </h2>

      <form className="space-y-4">
        <div>
            <input type="text" placeholder="Họ và Tên" className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition" />
        </div>
        <div>
            <input type="text" placeholder="Email hoặc Số điện thoại" className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition" />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition pr-10"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition pr-10"
          />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="text-right text-sm font-medium">
             <Link to="/login" state={{ background: background }} className="text-blue-600 hover:underline">
                Đã có tài khoản? Đăng nhập
             </Link>
        </div>

        <button className="w-full bg-[#FF5A1F] hover:bg-[#e04f1b] text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-500/20 cursor-pointer active:scale-95 duration-200">
          Đăng ký ngay
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;