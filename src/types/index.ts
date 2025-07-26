export interface ConceptCard {
  id: string;
  title: string;
  description: string;
  category: 'client-server' | 'hooks' | 'performance' | 'best-practices';
  color: string;
  position: {
    x: number;
    y: number;
  };
  connections?: string[]; // IDs of connected cards
  code?: {
    language: string;
    example: string;
    explanation: string;
  };
  icon?: string;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}

export interface DrawingPath {
  id: string;
  path: string;
  strokeDasharray: string;
  strokeDashoffset: string;
  duration: number;
}

export interface ChapterData {
  id: string;
  title: string;
  description: string;
  cards: ConceptCard[];
  connections: DrawingPath[];
  backgroundColor: string;
}

export interface AppState {
  currentChapter: number;
  chapters: ChapterData[];
  isDarkMode: boolean;
  isAnimationPlaying: boolean;
  completedCards: string[];
}
