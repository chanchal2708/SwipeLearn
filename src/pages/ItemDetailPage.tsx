import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRecommendations } from '../store/useRecommendations';
import { ArrowLeft, Heart, ThumbsDown, Tag, Calendar, Share2 } from 'lucide-react';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recommendations, likeItem, dislikeItem } = useRecommendations();
  
  const item = recommendations.find(item => item.id === id);
  
  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Item not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
        >
          Go back home
        </button>
      </div>
    );
  }
  
  const handleLike = () => {
    likeItem(item.id);
    navigate('/');
  };
  
  const handleDislike = () => {
    dislikeItem(item.id);
    navigate('/');
  };
  
  return (
    <div className="pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back
        </button>
        
        <div className="rounded-2xl overflow-hidden glass-effect">
          <div className="h-64 relative">
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <motion.h1 
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {item.title}
              </motion.h1>
              <motion.div 
                className="flex items-center text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Tag size={16} className="mr-1" />
                {item.category}
              </motion.div>
            </div>
          </div>
          
          <div className="p-6">
            <motion.div 
              className="flex gap-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {item.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-primary-900/50 text-primary-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            
            <motion.p 
              className="text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {item.description}
              {item.description}
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center text-gray-400">
                <Calendar size={16} className="mr-2" />
                <span>Added on Jan 15, 2025</span>
              </div>
              
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Share2 size={20} />
              </button>
            </motion.div>
            
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <button 
                onClick={handleDislike}
                className="flex-1 py-3 flex justify-center items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ThumbsDown size={20} />
                <span>Not for me</span>
              </button>
              
              <button 
                onClick={handleLike}
                className="flex-1 py-3 flex justify-center items-center gap-2 rounded-lg bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                <Heart size={20} />
                <span>I like this</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ItemDetailPage;