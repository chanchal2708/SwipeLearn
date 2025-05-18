import React from 'react';
import { motion } from 'framer-motion';
import { useRecommendations } from '../store/useRecommendations';
import { Sparkles } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: '✨' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'movies', name: 'Movies', icon: '🎬' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'food', name: 'Food', icon: '🍳' }
];

const CategorySelector: React.FC = () => {
  const { selectedCategory, setCategory } = useRecommendations();
  
  return (
    <motion.div 
      className="mb-6 glass-effect rounded-xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-accent-400" />
        <h2 className="text-lg font-semibold">Explore Categories</h2>
      </div>
      <div className="flex overflow-x-auto pb-2 gap-3 hide-scrollbar">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySelector;