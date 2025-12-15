import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Layout1 from '../components/layouts/layout1';
import AuthenLayout from '../components/layouts/authenlayout';

import HomePage from '../pages/home/homePage';
import LoginPage from '../pages/login/loginpage';
import RegisterPage from '../pages/register/registerpage';
import ForgotPasswordPage from '../pages/forgot-password/forgotpasswordpage';
import DetailPage from '../pages/detail/DetailPage'; 

import AdminLayout from '../components/layouts/AdminLayout';
import DashboardPage from '../pages/admin/Dashboard';

import PropertiesPage from '../pages/admin/management/PropertiesPage';
import RoomsPage from '../pages/admin/management/RoomsPage';
import ContractsPage from '../pages/admin/management/ContractsPage';
import TenantsPage from '../pages/admin/management/TenantsPage';

import AdminLoginPage from '../pages/admin/login/AdminLoginPage';

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state && state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route element={<Layout1 />}>
          <Route path="/" element={<HomePage />} />
          
          {/* THÊM ROUTE CHI TIẾT TẠI ĐÂY */}
          <Route path="/listings/:id" element={<DetailPage />} />
          
        </Route>

        <Route element={<AuthenLayout />}>
           <Route path="/login" element={<LoginPage />} />
           <Route path="/register" element={<RegisterPage />} />
           <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path="properties" element={<PropertiesPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="contracts" element={<ContractsPage />} />
          <Route path="tenants" element={<TenantsPage />} />
        </Route>

      </Routes>
      
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