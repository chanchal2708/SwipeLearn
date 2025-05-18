import React from 'react';
import { motion } from 'framer-motion';
import ProgressStats from '../components/ProgressStats';
import { useRecommendations } from '../store/useRecommendations';
import { BarChart2, PieChart, BrainCircuit, TrendingUp } from 'lucide-react';

const StatsPage: React.FC = () => {
  const { userActions } = useRecommendations();
  
  // Calculate category preferences
  const categoryMap: Record<string, number> = {};
  userActions
    .filter(action => action.action === 'like')
    .forEach(action => {
      const category = action.item.category;
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });
  
  const categories = Object.keys(categoryMap).sort((a, b) => categoryMap[b] - categoryMap[a]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
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
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 className="h-6 w-6 text-primary-400" />
          <h1 className="text-2xl font-bold">Your Stats</h1>
        </div>
        <p className="text-gray-300">Insights from your recommendation journey</p>
      </motion.div>
      
      <ProgressStats />
      
      <motion.div
        className="mt-8 glass-effect p-6 rounded-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex items-center mb-6" variants={childVariants}>
          <BrainCircuit className="h-5 w-5 text-accent-400 mr-2" />
          <h2 className="text-xl font-bold">Learning Insights</h2>
        </motion.div>
        
        <motion.div className="space-y-6" variants={childVariants}>
          {categories.length > 0 ? (
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <PieChart size={18} className="text-primary-400 mr-2" />
                Category Preferences
              </h3>
              <div className="space-y-3">
                {categories.slice(0, 3).map((category, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category}</span>
                      <span className="text-gray-400">{categoryMap[category]} likes</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${
                          idx === 0 
                            ? 'bg-primary-500' 
                            : idx === 1 
                              ? 'bg-secondary-500' 
                              : 'bg-accent-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(categoryMap[category] / Math.max(...Object.values(categoryMap))) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-gray-400">
              Like items to see your category preferences
            </p>
          )}
          
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <TrendingUp size={18} className="text-primary-400 mr-2" />
              Recommendation Accuracy
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Our engine learns from your preferences, becoming more accurate over time.
            </p>
            <div className="h-4 bg-gray-700 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500"
                initial={{ width: 0 }}
                animate={{ width: userActions.length > 0 ? '65%' : '10%' }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <div className="absolute top-0 left-0 h-full w-full flex justify-between px-2 text-xs text-white items-center">
                <span>Starting</span>
                <span>Current</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StatsPage;