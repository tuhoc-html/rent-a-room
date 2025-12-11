import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Layout1 from '../components/layouts/layout1';
import AuthenLayout from '../components/layouts/authenlayout';

import HomePage from '../pages/home/homePage';
import LoginPage from '../pages/login/loginpage';
import RegisterPage from '../pages/register/registerpage';
import ForgotPasswordPage from '../pages/forgot-password/forgotpasswordpage';

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state && state.background;

  return (
    <>
      {/* Routes chính (Nền) */}
      <Routes location={background || location}>
        <Route element={<Layout1 />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* Thêm các route khác như Map, News ở đây */}
        </Route>

        {/* Fallback: Nếu ép F5 tại trang login thì hiện layout thường */}
        <Route element={<AuthenLayout />}>
           <Route path="/login" element={<LoginPage />} />
           <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>

      {/* Routes Modal (Đè lên trên) */}
      {background && (
        <Routes>
          <Route element={<AuthenLayout isModal={true} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;