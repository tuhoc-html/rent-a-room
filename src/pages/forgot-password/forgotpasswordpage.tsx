import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, X, ArrowLeft, Mail } from 'lucide-react';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  // Xử lý nút Đóng (X)
  const handleClose = () => {
    // Nếu có trang nền (đang mở dạng Popup), hãy quay về đúng đường dẫn của trang nền đó (VD: Trang chủ)
    if (background) {
      navigate(background.pathname + background.search + background.hash);
    } else {
      // Trường hợp hiếm: Nếu không có background (VD: mở trực tiếp link), về trang chủ
      navigate('/');
    }
  };

  // Xử lý Form (Tạm thời chặn reload)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Chặn load lại trang
    console.log("Đã bấm gửi, nhưng chưa xử lý logic gì cả.");
  };

  return (
    <div className="bg-white rounded-3xl p-8 w-full shadow-2xl relative animate-modal-pop">
      
      {/* NÚT ĐÓNG (X) - Đã sửa logic */}
      <button 
        onClick={handleClose}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
        title="Đóng"
      >
        <X size={24} />
      </button>

      {/* LOGO */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 text-blue-600">
           <Home size={64} strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
        Quên Mật Khẩu?
      </h2>
      <p className="text-center text-gray-500 text-sm mb-8 px-4">
        Đừng lo lắng! Hãy nhập email của bạn, chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu.
      </p>

      {/* Thêm onSubmit để chặn reload */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Input Email */}
        <div className="relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400">
                <Mail size={20} />
            </div>
            <input 
              type="email" 
              placeholder="Nhập email của bạn" 
              className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" 
            />
        </div>

        {/* Nút Gửi */}
        <button className="w-full bg-[#FF5A1F] hover:bg-[#e04f1b] text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-500/20 cursor-pointer active:scale-95 duration-200">
          Gửi yêu cầu
        </button>

        {/* Quay lại Đăng nhập */}
        <div className="text-center">
            <Link 
                to="/login" 
                state={{ background: background }} 
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
                <ArrowLeft size={16} /> Quay lại đăng nhập
            </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;