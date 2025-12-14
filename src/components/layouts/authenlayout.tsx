import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

interface AuthenLayoutProps {
  isModal?: boolean;
}

const AuthenLayout: React.FC<AuthenLayoutProps> = ({ isModal = false }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const containerClass = isModal
    ? "fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" 
    : "min-h-screen bg-gray-50 flex items-center justify-center p-4";

  return (
    <div 
      className={containerClass} 
      onClick={isModal ? handleClose : undefined}
    >

      <div 
        className="w-full max-w-[450px] relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenLayout;