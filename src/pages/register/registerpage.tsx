import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Home, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "LANDLORD",
  });
  console.log(formData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State để quản lý trạng thái thành công

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // Bạn có thể thay alert bằng hiển thị lỗi text đỏ dưới input nếu muốn đẹp hơn
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    // --- GIẢ LẬP GỌI API ---
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );
      if (res.status === 200) {
        setIsSuccess(true); // Kích hoạt hiệu ứng thành công

        // Tự động chuyển trang sau 2 giây
        setTimeout(() => {
          navigate("/login", { state: { background: background } });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
    }
  };

  const handleClose = () => {
    if (background) {
      navigate(background.pathname + background.search + background.hash);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 w-full shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
      {/* Nút đóng */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer z-10"
      >
        <X size={24} />
      </button>

      {/* Sử dụng AnimatePresence để làm hiệu ứng chuyển đổi giữa Form và Thông báo thành công */}
      <AnimatePresence mode="wait">
        {isSuccess ? (
          // --- GIAO DIỆN THÀNH CÔNG ---
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-green-500"
            >
              <CheckCircle size={80} strokeWidth={1.5} />
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-800">
              Đăng ký thành công!
            </h2>
            <p className="text-gray-500">Chào mừng bạn đến với Rent-A-Room.</p>
            <p className="text-sm text-gray-400">
              Đang chuyển đến trang đăng nhập...
            </p>

            <button
              onClick={() =>
                navigate("/login", { state: { background: background } })
              }
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-md"
            >
              Đăng nhập ngay
            </button>
          </motion.div>
        ) : (
          // --- GIAO DIỆN FORM ĐĂNG KÝ ---
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 text-blue-600">
                <Home size={64} strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-xl font-bold text-center text-gray-800 mb-8">
              Đăng Ký Tài Khoản Mới
            </h2>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Các input giữ nguyên */}
              <div>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Họ và Tên"
                  required
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Tên đăng nhập"
                  required
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  required
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  required
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <div className="text-right text-sm font-medium">
                <Link
                  to="/login"
                  state={{ background: background }}
                  className="text-blue-600 hover:underline"
                >
                  Đã có tài khoản? Đăng nhập
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF5A1F] hover:bg-[#e04f1b] text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-500/20 cursor-pointer active:scale-95 duration-200"
              >
                Đăng ký ngay
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterPage;
