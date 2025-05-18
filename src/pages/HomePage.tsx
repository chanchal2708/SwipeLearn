import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SwipeContainer from '../components/SwipeContainer';
import CategorySelector from '../components/CategorySelector';
// Update the import path if the file is named differently or located elsewhere
// Example: import { useRecommendations } from '../store/useRecommendationsStore';
// Or create the file '../store/useRecommendations.ts' with the appropriate export

import { useRecommendations } from '../store/useRecommendations';

const HomePage: React.FC = () => {
  const { initializeRecommendations, selectedCategory } = useRecommendations();
  
  useEffect(() => {
    initializeRecommendations();
  }, [selectedCategory, initializeRecommendations]);
  
  return (
    <div className="pb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-3"
      >
        <h1 className="text-2xl font-bold mb-1">Discover</h1>
        <p className="text-gray-300 text-sm">
          Swipe to discover items tailored to your preferences
        </p>
      </motion.div>
      
      <CategorySelector />
      <SwipeContainer />
    </div>
  );
};

export default HomePage;