import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  // const { login } = useAuth(); // Sử dụng hook login từ context

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Giả lập gọi API kiểm tra đăng nhập
    setTimeout(() => {
      // Logic kiểm tra demo (Sau này thay bằng API thật)
      if (formData.email === 'admin@tromoi.com' && formData.password === '123456') {
        showToast('Đăng nhập quản trị thành công!', 'success');
        
        // Lưu token giả vào localStorage (hoặc dùng AuthContext)
        localStorage.setItem('adminToken', 'demo-token-123');
        
        // Chuyển hướng vào Dashboard
        navigate('/admin');
      } else {
        showToast('Email hoặc mật khẩu không chính xác!', 'error');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* --- LEFT SIDE: Banner Image --- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-blue-800/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Admin Building" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        
        <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Home className="w-8 h-8" /> TRỌ MỚI ADMIN
          </div>
          
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Quản lý hệ thống <br/> hiệu quả & thông minh
            </h2>
            <p className="text-blue-100 text-lg max-w-md">
              Hệ thống quản trị tập trung giúp bạn kiểm soát nhà trọ, cư dân và dòng tiền mọi lúc mọi nơi.
            </p>
          </div>

          <div className="text-sm text-blue-200">
            &copy; 2024 Tro Moi Inc. Admin Portal.
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Login Form --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-xl mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Đăng nhập quản trị</h1>
            <p className="text-gray-500 text-sm mt-2">Vui lòng nhập thông tin xác thực của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email công việc</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="admin@company.com"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Mật khẩu</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">Quên mật khẩu?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  Đăng nhập <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Quick links */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Bạn không phải Admin?{' '}
              <button 
                onClick={() => navigate('/login')} 
                className="text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                Đăng nhập người dùng
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}