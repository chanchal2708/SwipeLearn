export interface ItemType {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  weight?: number;
}

export type ActionType = 'like' | 'dislike';

export interface UserAction {
  itemId: string;
  action: ActionType;
  timestamp: number;
  item: ItemType;
}

export interface RecommendationsState {
  recommendations: ItemType[];
  userActions: UserAction[];
  currentIndex: number;
  selectedCategory: string;
  initializeRecommendations: () => void;
  likeItem: (itemId: string) => void;
  dislikeItem: (itemId: string) => void;
  clearHistory: () => void;
  setCategory: (category: string) => void;
}