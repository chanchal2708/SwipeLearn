import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ItemType } from '../types';
import { Check, X, Info, Star, Clock } from 'lucide-react';

interface SwipeableCardProps {
  item: ItemType;
  onSwipe: (direction: 'left' | 'right', item: ItemType) => void;
  active?: boolean;
  index: number;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ 
  item, 
  onSwipe, 
  active = false, 
  index 
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-25, 0, 25]);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);
  const scale = useTransform(x, [-100, 0, 100], [0.8, 1, 0.8]);
  
  const background = useTransform(
    x,
    [-200, 0, 200],
    [
      'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
      'rgba(255, 255, 255, 0)',
      'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))'
    ]
  );
  
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const dislikeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe('right', item);
    } else if (info.offset.x < -100) {
      onSwipe('left', item);
    }
  };

  const zIndex = active ? 10 : 10 - index;
  const cardScale = active ? 1 : 1 - (index * 0.05);
  const yOffset = active ? 0 : index * 10;

  return (
    <motion.div 
      className="absolute w-full h-full"
      style={{ 
        zIndex,
        y: yOffset,
        scale: cardScale
      }}
    >
      <motion.div
        className="swipe-card"
        style={{
          x,
          rotate,
          opacity: active ? opacity : 0.8,
          background,
        }}
        drag={active ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ x: 0, opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', damping: 40, stiffness: 300 }}
        whileHover={active ? { scale: 1.02 } : undefined}
      >
        <div className="relative h-2/3 overflow-hidden rounded-t-2xl">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Featured</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{item.title}</h2>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="h-4 w-4" />
                <p className="text-sm">{item.category}</p>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="absolute top-4 right-4 bg-success-500 text-white p-3 rounded-xl shadow-lg"
            style={{ opacity: likeOpacity }}
          >
            <Check className="h-6 w-6" />
          </motion.div>
          
          <motion.div 
            className="absolute top-4 left-4 bg-error-500 text-white p-3 rounded-xl shadow-lg"
            style={{ opacity: dislikeOpacity }}
          >
            <X className="h-6 w-6" />
          </motion.div>
        </div>
        
        <div className="p-4 card-content rounded-b-2xl">
          <p className="text-gray-200 text-sm leading-relaxed line-clamp-3 mb-4">
            {item.description}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2 flex-wrap">
              {item.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/90 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link 
              to={`/item/${item.id}`} 
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <Info size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SwipeableCard;