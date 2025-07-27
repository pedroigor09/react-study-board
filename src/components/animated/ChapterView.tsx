'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Play, Pause, CheckCircle } from 'lucide-react';
import { ChapterData } from '@/types';
import { AnimatedCard } from './AnimatedCard';
import { useSequentialAnimation } from '@/hooks/useAnimation';
import { SkeletonCard } from '@/components/ui/Loading';
import { Toast, ProgressBar } from '@/components/ui/Toast';

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
  hasPrevious = false, 
  hasNext = false 
}: ChapterViewProps) {
  const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const [showConnections, setShowConnections] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { ref, isItemAnimated, allAnimated } = useSequentialAnimation(chapter.cards, 800);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [chapter.id]);
  
  useEffect(() => {
    if (allAnimated && !showConnections) {
      const timer = setTimeout(() => {
        setShowConnections(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [allAnimated, showConnections]);
  
  const handleCardComplete = (cardId: string) => {
    setCompletedCards(prev => new Set([...prev, cardId]));
  };

  const handleCardViewed = (cardId: string) => {
    setViewedCards(prev => {
      const newSet = new Set([...prev, cardId]);
      
      if (newSet.size === chapter.cards.length && !missionComplete) {
        setMissionComplete(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      }
      
      return newSet;
    });
  };

  useEffect(() => {
    setCompletedCards(new Set());
    setViewedCards(new Set());
    setMissionComplete(false);
    setShowConnections(false);
  }, [chapter.id]);
  
  const resetAnimation = () => {
    setCompletedCards(new Set());
    setShowConnections(false);
    setIsPlaying(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className={`min-h-screen ${chapter.backgroundColor} relative overflow-hidden`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 pt-24 pb-6 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {chapter.title}
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {chapter.description}
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            {hasPrevious && (
              <button
                onClick={onPrevious}
                className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-90 rounded-xl shadow-lg hover:bg-opacity-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <ChevronLeft size={20} />
                <span className="font-medium">Anterior</span>
              </button>
            )}
            
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlayPause}
                className="p-3 bg-white bg-opacity-90 rounded-xl shadow-lg hover:bg-opacity-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                title={isPlaying ? "Pausar animações" : "Reproduzir animações"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button
                onClick={resetAnimation}
                className="p-3 bg-white bg-opacity-90 rounded-xl shadow-lg hover:bg-opacity-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                title="Reiniciar animações"
              >
                <RotateCcw size={20} />
              </button>
            </div>
            
            {hasNext && (
              <button
                onClick={onNext}
                className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-90 rounded-xl shadow-lg hover:bg-opacity-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium">Próximo</span>
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
      
      <div ref={ref} className="relative px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
              {Array.from({ length: chapter.cards.length }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
                <AnimatePresence>
                  {chapter.cards.map((card, index) => (
                    <motion.div 
                      key={card.id}
                      className="flex justify-center"
                      layout
                    >
                      {(isItemAnimated(index) && isPlaying) && (
                        <AnimatedCard
                          card={card}
                          delay={index * 200}
                          onCardComplete={handleCardComplete}
                          onCardViewed={handleCardViewed}
                        />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {showConnections && (
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <svg className="w-full h-full">
                    {chapter.connections.map((connection, index) => (
                      <motion.path
                        key={connection.id}
                        d={`M ${100 + (index % 3) * 300} ${200 + Math.floor(index / 3) * 300} 
                            Q ${200 + (index % 3) * 300} ${150 + Math.floor(index / 3) * 300} 
                            ${300 + (index % 3) * 300} ${200 + Math.floor(index / 3) * 300}`}
                        stroke="#94A3B8"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="8,4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 2, delay: index * 0.3 }}
                      />
                    ))}
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="bg-white bg-opacity-95 rounded-2xl px-8 py-4 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">
              Missão - Explore todos os códigos:
            </span>
            <div className="flex gap-2">
              {chapter.cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    viewedCards.has(card.id) 
                      ? 'bg-green-500 scale-110 shadow-lg shadow-green-300' 
                      : isItemAnimated(index) 
                        ? 'bg-blue-500 animate-pulse-soft' 
                        : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  title={
                    viewedCards.has(card.id) 
                      ? `✅ ${card.title} - Código visualizado!` 
                      : `👀 ${card.title} - Clique para ver o código`
                  }
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium transition-colors duration-300 ${
                missionComplete ? 'text-green-600' : 'text-gray-600'
              }`}>
                {viewedCards.size}/{chapter.cards.length}
                {missionComplete ? ' 🎉 Missão Completa!' : ' códigos explorados'}
              </span>
              {allAnimated && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-500"
                >
                  <CheckCircle size={16} />
                </motion.div>
              )}
            </div>
          </div>
          <ProgressBar 
            progress={(completedCards.size / chapter.cards.length) * 100} 
            className="mt-3"
          />
        </div>
      </motion.div>
      
      <Toast
        isVisible={showToast}
        type="success"
        message={missionComplete 
          ? "🎉 Missão Completa! Você explorou todos os códigos deste capítulo!" 
          : "🚀 Todos os conceitos foram carregados! Explore clicando nos cards para completar a missão."
        }
        onClose={() => setShowToast(false)}
      />
      
      {!allAnimated && (
        <motion.div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-gray-600 text-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-sm">Role para baixo para ver mais</div>
            <div className="text-2xl">↓</div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
