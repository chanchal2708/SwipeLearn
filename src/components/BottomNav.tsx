import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <nav className="glass-effect fixed bottom-0 w-full px-4 py-3 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-md">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'text-primary-400 bg-white/10 shadow-glow' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`
          }
          end
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        
        <NavLink 
          to="/stats" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'text-primary-400 bg-white/10 shadow-glow' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`
          }
        >
          <BarChart2 className="h-6 w-6" />
          <span className="text-xs mt-1">Stats</span>
        </NavLink>
        
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'text-primary-400 bg-white/10 shadow-glow' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`
          }
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;