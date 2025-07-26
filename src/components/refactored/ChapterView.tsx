'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ConceptCardComponent } from "@/components/ui/concept-card";
import { MissionProgress } from "@/components/ui/mission-progress";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChapterData } from '@/types';
import { cn } from "@/lib/utils";

interface ChapterViewProps {
  chapter: ChapterData;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export function ChapterView({ 
  chapter, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext 
}: ChapterViewProps) {
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  const missionComplete = viewedCards.size === chapter.cards.length;

  const handleCardViewed = (cardId: string) => {
    setViewedCards(prev => {
      const newSet = new Set([...prev, cardId]);
      
      // Verificar se missão foi completada
      if (newSet.size === chapter.cards.length && !missionComplete) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      
      return newSet;
    });
  };

  // Reset quando mudar de capítulo
  useEffect(() => {
    setViewedCards(new Set());
    setShowCelebration(false);
  }, [chapter.id]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header do capítulo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {chapter.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {chapter.description}
          </p>
        </motion.div>

        {/* Progresso da Missão */}
        <MissionProgress
          totalCards={chapter.cards.length}
          viewedCards={viewedCards.size}
          isComplete={missionComplete}
        />

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {chapter.cards.map((card, index) => (
            <ConceptCardComponent
              key={card.id}
              card={card}
              delay={index * 0.1}
              isCompleted={viewedCards.has(card.id)}
              onCardViewed={handleCardViewed}
            />
          ))}
        </div>

        {/* Navegação */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="lg"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              {missionComplete ? 
                "🎉 Capítulo completo! Pode avançar" : 
                `${viewedCards.size}/${chapter.cards.length} códigos explorados`
              }
            </p>
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={onNext}
            disabled={!hasNext}
            className={cn(
              "flex items-center gap-2",
              missionComplete && "bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
            )}
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Celebração */}
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white rounded-lg shadow-lg p-8 text-center border-4 border-green-400">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Missão Completa!
              </h2>
              <p className="text-gray-600">
                Você explorou todos os códigos deste capítulo!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
