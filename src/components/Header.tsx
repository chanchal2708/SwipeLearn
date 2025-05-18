import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, User, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="glass-effect sticky top-0 z-50 px-4 py-3 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 4
            }}
          >
            <Sparkles className="h-7 w-7 text-accent-400" />
          </motion.div>
          <span className="text-xl font-bold text-gradient">SwipeLearn</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <motion.div 
            className="relative hidden md:flex items-center"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/10 border border-white/20 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </motion.div>
          
          <Link 
            to="/profile" 
            className="p-2 rounded-full hover:bg-white/10 transition-colors relative group"
          >
            <User className="h-6 w-6" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
            />
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;