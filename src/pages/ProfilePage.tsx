import React from 'react';
import { motion } from 'framer-motion';
import { useRecommendations } from '../store/useRecommendations';
import { User, Sliders, Heart, ThumbsDown, Trash2 } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { userActions, clearHistory } = useRecommendations();
  
  const likedItems = userActions.filter(action => action.action === 'like');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  return (
    <div className="pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-gray-300">Personalize your recommendations</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="glass-effect p-6 rounded-2xl mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex items-center mb-4" variants={childVariants}>
          <Sliders className="h-5 w-5 text-primary-400 mr-2" />
          <h2 className="text-xl font-bold">Preferences</h2>
        </motion.div>
        
        <motion.div className="space-y-4" variants={childVariants}>
          <div className="flex justify-between">
            <span>Learning Rate</span>
            <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span>Exploration vs. Specialization</span>
            <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span>Novelty Factor</span>
            <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="glass-effect p-6 rounded-2xl mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex items-center justify-between mb-4" variants={childVariants}>
          <div className="flex items-center">
            <Heart className="h-5 w-5 text-red-400 mr-2" />
            <h2 className="text-xl font-bold">Liked Items</h2>
          </div>
          <span className="text-sm bg-white/10 px-2 py-1 rounded-full">{likedItems.length}</span>
        </motion.div>
        
        {likedItems.length > 0 ? (
          <motion.div className="space-y-3" variants={childVariants}>
            {likedItems.map((action, index) => (
              <motion.div 
                key={index} 
                className="flex items-center bg-white/5 p-3 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <img 
                  src={action.item.imageUrl} 
                  alt={action.item.title} 
                  className="w-12 h-12 rounded-md object-cover mr-3"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{action.item.title}</h3>
                  <p className="text-xs text-gray-400">{action.item.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p className="text-center py-4 text-gray-400" variants={childVariants}>
            You haven't liked any items yet
          </motion.p>
        )}
      </motion.div>
      
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button 
          className="flex items-center px-4 py-2 rounded-lg bg-red-900/30 text-red-300 hover:bg-red-900/50 transition-colors"
          onClick={clearHistory}
        >
          <Trash2 size={16} className="mr-2" />
          Clear History
        </button>
      </motion.div>
    </div>
  );
};

export default ProfilePage;