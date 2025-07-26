import { ChapterData } from '@/types';
import { clientServerChapter } from './client-server';
import { hooksChapter } from './hooks';
import { customHooksChapter } from './custom-hooks';
import { performanceChapter } from './performance';

export const chapters: ChapterData[] = [
  clientServerChapter,
  hooksChapter,
  customHooksChapter,
  performanceChapter,
];

export const getChapterById = (id: string): ChapterData | undefined => {
  return chapters.find(chapter => chapter.id === id);
};

export const getCardById = (cardId: string) => {
  for (const chapter of chapters) {
    const card = chapter.cards.find(card => card.id === cardId);
    if (card) return card;
  }
  return null;
};
