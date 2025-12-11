import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderCom from '../header/headercom';
import FooterCom from '../footer/footercom';

const Layout1 = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50">
      
      <HeaderCom />
      <main className="grow">
        <Outlet />
      </main>
      
      <FooterCom />
      
    </div>
  );
};

export default Layout1;