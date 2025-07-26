'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterView } from '@/components/animated/ChapterView';
import { HandDrawnEffects } from '@/components/animated/HandDrawnEffects';
import { InteractiveArrows } from '@/components/animated/InteractiveArrows';
import { ComicEffects } from '@/components/animated/ComicEffects';
import { StudyLoading } from '@/components/ui/Loading';
import { chapters } from '@/data/chapters';
import { ChevronRight, Moon, Sun, Pause, RotateCcw } from 'lucide-react';

export default function Home() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento do app por 4 segundos
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const previousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'
    } relative overflow-hidden`}>
      
      {/* Efeitos de rabiscos de fundo estilo lousa */}
      <HandDrawnEffects isVisible={!showLoading} />
      
      {/* Efeitos estilo HQ/Marvel */}
      {!showLoading && <ComicEffects currentChapter={currentChapter} />}
      
      {/* Tela de Loading Personalizada */}
      <AnimatePresence>
        {showLoading && (
          <StudyLoading 
            onSkip={() => setShowLoading(false)}
          />
        )}
      </AnimatePresence>

      {/* Chapter navigation - Header fixo */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Capítulos:
              </h3>
              <div className="flex gap-2 overflow-x-auto">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => setCurrentChapter(index)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      index === currentChapter
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="truncate max-w-[150px]">
                      {chapter.title.replace(/^[^\s]+\s/, '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Progress indicator mini e controles */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {currentChapter + 1}/{chapters.length}
              </span>
              <div className="flex gap-1">
                {chapters.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentChapter ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              {/* Dark mode toggle integrado */}
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isDarkMode ? "Modo claro" : "Modo escuro"}
              >
                {isDarkMode ? (
                  <Sun className="text-yellow-500" size={18} />
                ) : (
                  <Moon className="text-gray-700" size={18} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <ChapterView
            chapter={chapters[currentChapter]}
            onPrevious={previousChapter}
            onNext={nextChapter}
            hasPrevious={currentChapter > 0}
            hasNext={currentChapter < chapters.length - 1}
          />
        </motion.div>
      </AnimatePresence>

      {/* Setas interativas estilo Excalidraw */}
      <InteractiveArrows
        showPrevious={currentChapter > 0}
        showNext={currentChapter < chapters.length - 1}
        onPrevious={previousChapter}
        onNext={nextChapter}
      />
    </div>
  );
}
