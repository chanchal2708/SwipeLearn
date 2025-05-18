import { create } from 'zustand';
import { mockItems } from '../data/mockItems';
import { ItemType, UserAction, RecommendationsState } from '../types';

// Learning algorithm implementation
const calculateRecommendations = (
  items: ItemType[],
  userActions: UserAction[],
  selectedCategory: string
): ItemType[] => {
  // Clone items to avoid mutating the original array
  const workingItems = [...items];
  
  // Filter by category if not 'all'
  const categoryFiltered = selectedCategory === 'all' 
    ? workingItems 
    : workingItems.filter(item => item.category.toLowerCase() === selectedCategory);
  
  // If user hasn't made any selections, return shuffled items
  if (userActions.length === 0) {
    return shuffleArray(categoryFiltered);
  }
  
  // Analyze user preferences
  const likedCategories: Record<string, number> = {};
  const likedTags: Record<string, number> = {};
  
  userActions.forEach(action => {
    const item = action.item;
    const multiplier = action.action === 'like' ? 1 : -0.5;
    
    // Update category preferences
    const category = item.category;
    likedCategories[category] = (likedCategories[category] || 0) + multiplier;
    
    // Update tag preferences
    item.tags.forEach(tag => {
      likedTags[tag] = (likedTags[tag] || 0) + multiplier;
    });
  });
  
  // Assign weights to remaining items based on user preferences
  const weightedItems = categoryFiltered.map(item => {
    // Skip items the user has already acted upon
    const alreadySeen = userActions.some(action => action.itemId === item.id);
    if (alreadySeen) {
      return { ...item, weight: -1000 }; // Place at the end
    }
    
    let weight = 0;
    
    // Add weight based on category preferences
    weight += likedCategories[item.category] || 0;
    
    // Add weight based on tag preferences
    item.tags.forEach(tag => {
      weight += likedTags[tag] || 0;
    });
    
    // Add a small random factor for novelty (0-1)
    weight += Math.random() * 0.5;
    
    return { ...item, weight };
  });
  
  // Sort by weight descending and remove the weight property
  return weightedItems
    .sort((a, b) => (b.weight || 0) - (a.weight || 0))
    .map(({ weight, ...item }) => item);
};

// Helper to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useRecommendations = create<RecommendationsState>((set, get) => ({
  recommendations: [],
  userActions: [],
  currentIndex: 0,
  selectedCategory: 'all',
  
  initializeRecommendations: () => {
    const { userActions, selectedCategory } = get();
    const optimizedRecommendations = calculateRecommendations(
      mockItems, 
      userActions,
      selectedCategory
    );
    
    set({ 
      recommendations: optimizedRecommendations,
      currentIndex: 0
    });
  },
  
  likeItem: (itemId: string) => {
    set(state => {
      const item = state.recommendations.find(i => i.id === itemId);
      if (!item) return state;
      
      const newAction: UserAction = {
        itemId,
        action: 'like',
        timestamp: Date.now(),
        item
      };
      
      return {
        userActions: [...state.userActions, newAction],
        currentIndex: state.currentIndex + 1
      };
    });
  },
  
  dislikeItem: (itemId: string) => {
    set(state => {
      const item = state.recommendations.find(i => i.id === itemId);
      if (!item) return state;
      
      const newAction: UserAction = {
        itemId,
        action: 'dislike',
        timestamp: Date.now(),
        item
      };
      
      return {
        userActions: [...state.userActions, newAction],
        currentIndex: state.currentIndex + 1
      };
    });
  },
  
  clearHistory: () => {
    set({ userActions: [] });
    get().initializeRecommendations();
  },
  
  setCategory: (category: string) => {
    set({ selectedCategory: category });
  }
}));