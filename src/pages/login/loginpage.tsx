import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Home, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
// import { i } from "framer-motion/client";

import { Cookies } from "react-cookie";
const LoginPage = () => {
  // --- STATE ---
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State hiệu ứng thành công

  // --- HOOKS ---
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;
  console.log("form data:", formData);
  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    if (background) {
      navigate(background.pathname + background.search + background.hash);
    } else {
      navigate("/");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );
      if (res.status === 200) {
        console.log("Login successful:", res.data);
        // 4. Hiển thị thông báo thành công

        setIsSuccess(true);
        const cookies = new Cookies();
        cookies.set("token", res.data.token, { path: "/" });

        

        // 5. Chuyển hướng về trang chủ sau 1.5 giây
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      return;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 w-full shadow-2xl relative animate-modal-pop min-h-[550px] flex flex-col justify-center overflow-hidden">
      {/* Nút đóng */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer z-10"
        title="Đóng"
      >
        <X size={24} />
      </button>

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
              Đăng nhập thành công!
            </h2>
            <p className="text-gray-500">
              Xin chào, {formData.username || "Bạn"}!
            </p>
            <p className="text-sm text-gray-400">
              Đang chuyển hướng về trang chủ...
            </p>
          </motion.div>
        ) : (
          // --- GIAO DIỆN FORM ĐĂNG NHẬP ---
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
              Chào Mừng Bạn Đến Với Trọ Mới
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="Email hoặc Số điện thoại"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Mật khẩu"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm font-medium">
                <Link
                  to="/forgot-password"
                  state={{ background: background }}
                  className="text-blue-600 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
                <Link
                  to="/register"
                  state={{ background: background }}
                  className="text-blue-600 hover:underline"
                >
                  Đăng ký
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF5A1F] hover:bg-[#e04f1b] text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-500/20 cursor-pointer active:scale-95 duration-200"
              >
                Đăng nhập
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">
                  Hoặc đăng nhập bằng
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer hover:scale-110">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.065 0 12 0 7.37 0 3.357 2.682 1.458 6.642l3.808 3.123z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-3.834 3.02C3.396 21.318 7.41 24 12 24c3.234 0 5.967-1.154 7.96-3.138l-3.92-2.849z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.96 3c1.38 1.205 2.44 2.73 3.08 4.54.4 1.137.62 2.37.62 3.66h.005v.798H12v-4.808h6.728c-.288 1.543-1.08 2.898-2.688 3.96l3.92 2.848C21.84 12.193 23.36 9.775 23.36 6.5c0-.127-.005-.253-.015-.378H19.96V3z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12 4.909c-1.636 0-3.09.623-4.225 1.643l-3.235-2.63C6.307 2.35 9.03 1.18 12 1.18c2.617 0 4.965.918 6.84 2.45l-2.42 2.01c-1.2-.98-2.728-1.58-4.42-1.58z"
                  />
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:bg-blue-700 transition cursor-pointer hover:scale-110">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733.984-2.733 2.583v1.388h3.885l-.535 3.667h-3.35v7.98h-5.08z" />
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition cursor-pointer hover:scale-110">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.127 3.675-.552 9.127 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.027-3.029 2.489-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
