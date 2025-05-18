import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeableCard from './SwipeableCard';
import { ItemType } from '../types';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useRecommendations } from '../store/useRecommendations';

const SwipeContainer: React.FC = () => {
  const { 
    recommendations,
    currentIndex,
    likeItem,
    dislikeItem,
    userActions
  } = useRecommendations();
  
  // Animation for the empty state
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
  
  const handleSwipe = (direction: 'left' | 'right', item: ItemType) => {
    if (direction === 'right') {
      likeItem(item.id);
    } else {
      dislikeItem(item.id);
    }
  };
  
  const isFinished = currentIndex >= recommendations.length;
  
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-6">
      <AnimatePresence>
        {!isFinished ? (
          <div className="swipe-container card-stack">
            {recommendations
              .slice(currentIndex, currentIndex + 3)
              .map((item, index) => (
                <SwipeableCard 
                  key={item.id} 
                  item={item} 
                  onSwipe={handleSwipe}
                  active={index === 0}
                  index={index}
                />
              ))}
            
            <div className="flex justify-center mt-6 gap-6">
              <button 
                className="action-btn bg-error-500 text-white"
                onClick={() => handleSwipe('left', recommendations[currentIndex])}
              >
                <ThumbsDown size={24} />
              </button>
              <button 
                className="action-btn bg-success-500 text-white"
                onClick={() => handleSwipe('right', recommendations[currentIndex])}
              >
                <ThumbsUp size={24} />
              </button>
            </div>
          </div>
        ) : (
          <motion.div 
            className="text-center p-8 rounded-2xl glass-effect max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={childVariants}>
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ThumbsUp size={36} className="text-white" />
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl font-bold mb-4"
              variants={childVariants}
            >
              You've seen all recommendations!
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-6"
              variants={childVariants}
            >
              Based on your {userActions.length} preferences, we'll refine future recommendations.
            </motion.p>
            
            <motion.div variants={childVariants}>
              <button 
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium transition-colors"
                onClick={() => window.location.reload()}
              >
                Start Over
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeContainer;