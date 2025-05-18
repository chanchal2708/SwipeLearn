import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-pattern">
      <div className="absolute inset-0 z-0 bg-pattern"></div>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-3 z-10 relative">
        <Outlet />
      </main>
      <div className="h-20" /> {/* Spacer for bottom nav */}
      <BottomNav />
    </div>
  );
};

export default Layout;