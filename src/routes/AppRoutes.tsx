
import { Routes, Route, useLocation } from "react-router-dom";

import Layout1 from "../components/layouts/layout1";
import AuthenLayout from "../components/layouts/authenlayout";

import HomePage from "../pages/home/homePage";
import LoginPage from "../pages/login/loginpage";
import RegisterPage from "../pages/register/registerpage";
import ForgotPasswordPage from "../pages/forgot-password/forgotpasswordpage";
import DetailPage from "../pages/detail/DetailPage";
import { PrivateRoute } from "./PrivateRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import { AuthProvider } from "../context/AuthContext";

const AppRoutes = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const background = state && state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route
          element={
            <AuthProvider>
              <Layout1 />
            </AuthProvider>
          }
        >
          <Route path="/" element={<HomePage />} />

          {/* THÊM ROUTE CHI TIẾT TẠI ĐÂY */}

          <Route
            path="/listings/:id"
            element={
              <PrivateRoute>
                <DetailPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route element={<AuthenLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route path="/admin" element={<AdminDashboard />} />
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
