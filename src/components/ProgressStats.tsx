import React from 'react';
import { motion } from 'framer-motion';
import { useRecommendations } from '../store/useRecommendations';
import { Sparkles, Heart, ThumbsDown, BarChart } from 'lucide-react';

const ProgressStats: React.FC = () => {
  const { userActions, recommendations } = useRecommendations();
  
  const totalItems = recommendations.length;
  const seenItems = userActions.length;
  const likedItems = userActions.filter(action => action.action === 'like').length;
  const dislikedItems = userActions.filter(action => action.action === 'dislike').length;
  
  const progressPercentage = Math.round((seenItems / totalItems) * 100);
  
  const statItems = [
    {
      title: 'Total Viewed',
      value: seenItems,
      icon: <BarChart className="h-5 w-5 text-primary-400" />,
      color: 'from-primary-500 to-secondary-500'
    },
    {
      title: 'Liked',
      value: likedItems,
      icon: <Heart className="h-5 w-5 text-red-400" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Skipped',
      value: dislikedItems,
      icon: <ThumbsDown className="h-5 w-5 text-blue-400" />,
      color: 'from-blue-500 to-cyan-500'
    }
  ];
  
  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const barVariants = {
    hidden: { width: 0 },
    visible: (custom: number) => ({
      width: `${custom}%`,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.3 }
    })
  };
  
  return (
    <motion.div 
      className="glass-effect rounded-2xl p-6 max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={chartVariants}
    >
      <div className="flex items-center mb-4">
        <Sparkles className="h-6 w-6 text-accent-400 mr-2" />
        <h2 className="text-xl font-bold">Your Recommendation Journey</h2>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-300">Learning Progress</span>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
        <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            custom={progressPercentage}
            variants={barVariants}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {statItems.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="mb-2 flex justify-center">{stat.icon}</div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.title}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Learning Insights</h3>
        <p className="text-sm text-gray-300">
          {likedItems > dislikedItems 
            ? "You tend to like most recommendations. We'll focus on similar items."
            : "You're selective! We'll refine recommendations to better match your taste."}
        </p>
      </div>
    </motion.div>
  );
};

export default ProgressStats;