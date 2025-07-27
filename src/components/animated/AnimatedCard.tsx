'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { ConceptCard } from '@/types';
import { useAnimationOnScroll } from '@/hooks/useAnimation';
import { ComicModal } from '@/components/ui/ComicModal';

const DETERMINISTIC_VALUES = {
  strokeOffsets: [1.5, 2.8, 0.9, 2.1, 1.2, 3.0, 0.7, 2.5],
  roughnessFactors: [0.3, -0.2, 0.4, -0.1, 0.2, -0.4, 0.1, -0.3],
  underlineSeeds: [25, 32, 35, 28, 30, 33, 27, 36],
  dustPositions: [
    { x: 45, y: 47 }, { x: 55, y: 44 }, { x: 65, y: 48 }, { x: 75, y: 46 },
    { x: 85, y: 45 }, { x: 95, y: 47 }, { x: 105, y: 44 }, { x: 115, y: 48 }
  ],
  sparklePositions: [
    { x: 30, y: 35 }, { x: 70, y: 25 }, { x: 45, y: 75 }, { x: 85, y: 65 },
    { x: 20, y: 55 }, { x: 90, y: 45 }, { x: 60, y: 80 }, { x: 15, y: 20 }
  ]
};

function formatExplanation(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const formatted = text
    .replace(/\*\*([^*]+)\*\*/g, '<span class="highlight-text">$1</span>')
    
    .replace(/🎓\s*([^\n:]+):/g, '<div class="title-section">🎓 $1</div>')
    .replace(/📊\s*([^\n:]+):/g, '<div class="subtitle-section">📊 $1</div>')
    .replace(/🔍\s*([^\n:]+):/g, '<div class="subtitle-section">🔍 $1</div>')
    .replace(/⚡\s*([^\n:]+):/g, '<div class="subtitle-section">⚡ $1</div>')
    .replace(/🛠️\s*([^\n:]+):/g, '<div class="subtitle-section">🛠️ $1</div>')
    .replace(/💡\s*([^\n:]+):/g, '<div class="subtitle-section">💡 $1</div>')
    .replace(/🚀\s*([^\n:]+):/g, '<div class="subtitle-section">🚀 $1</div>')
    .replace(/🎯\s*([^\n:]+):/g, '<div class="subtitle-section">🎯 $1</div>')
    .replace(/🏗️\s*([^\n:]+):/g, '<div class="subtitle-section">🏗️ $1</div>')
    .replace(/📱\s*([^\n:]+):/g, '<div class="subtitle-section">📱 $1</div>')
    .replace(/💰\s*([^\n:]+):/g, '<div class="subtitle-section">💰 $1</div>')
    .replace(/🔧\s*([^\n:]+):/g, '<div class="subtitle-section">🔧 $1</div>')
    .replace(/🏷️\s*([^\n:]+):/g, '<div class="subtitle-section">🏷️ $1</div>')
    .replace(/🔄\s*([^\n:]+):/g, '<div class="subtitle-section">🔄 $1</div>')
    .replace(/⚠️\s*([^\n:]+):/g, '<div class="subtitle-section">⚠️ $1</div>')
    .replace(/🚫\s*([^\n:]+):/g, '<div class="subtitle-section">🚫 $1</div>')
    .replace(/🗂️\s*([^\n:]+):/g, '<div class="subtitle-section">🗂️ $1</div>')
    .replace(/🏆\s*([^\n:]+):/g, '<div class="subtitle-section">🏆 $1</div>')
    
    .replace(/(\d+\.\s)([^\n•]+)/g, '<div class="numbered-item"><span class="number">$1</span>$2</div>')
    
    .replace(/^•\s*([^\n•]+)/gm, '<div class="bullet-item">• $1</div>')
    
    .replace(/^✅\s*([^\n❌⚠️]+)/gm, '<div class="highlight-box success">✅ $1</div>')
    .replace(/^❌\s*([^\n✅⚠️]+)/gm, '<div class="highlight-box error">❌ $1</div>')
    .replace(/^⚠️\s*([^\n✅❌]+)/gm, '<div class="highlight-box warning">⚠️ $1</div>')
    
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    
    .replace(/\n\s*\n/g, '</p><p class="paragraph">')
    .replace(/^([^<])/gm, '<p class="paragraph">$1')
    .replace(/([^>])$/gm, '$1</p>');

  return formatted
    .replace(/<p class="paragraph">\s*<\/p>/g, '')
    .replace(/<p class="paragraph">[\s\n\r]*<\/p>/g, '')
    .replace(/<p class="paragraph">\s*<div/g, '<div')
    .replace(/<\/div>\s*<\/p>/g, '</div>')
    .replace(/(<div[^>]*>)\s*<p class="paragraph">/g, '$1')
    .replace(/<\/p>\s*(<\/div>)/g, '$1')
    .replace(/(<\/div>)\s*(<div)/g, '$1$2')
    .replace(/(<\/p>)\s*(<p)/g, '$1$2')
    .replace(/<[^>]+>\s*<\/[^>]+>/g, '')
    .trim();
}

interface AnimatedCardProps {
  card: ConceptCard;
  delay?: number;
  onCardComplete?: (cardId: string) => void;
  onCardViewed?: (cardId: string) => void;
}

export function AnimatedCard({ card, delay = 0, onCardComplete, onCardViewed }: AnimatedCardProps) {
  const { ref, isAnimated } = useAnimationOnScroll({ delay });
  const [showCode, setShowCode] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [hasViewedCode, setHasViewedCode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isCardReady, setIsCardReady] = useState(false);
  const [showComicModal, setShowComicModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isAnimated && showParticles) {
      const timer = setTimeout(() => {
        setIsCardReady(true);
      }, 2000); 
      
      return () => clearTimeout(timer);
    }
  }, [isAnimated, showParticles]);

  const handleCardClick = () => {
    if (!isCardReady) {
      setShowComicModal(true);
      return;
    }
    
    setShowCode(!showCode);
    if (!hasViewedCode && !showCode) {
      setHasViewedCode(true);
      onCardViewed?.(card.id);
    }
  };

  if (!isClient) {
    return (
      <div className="relative mb-8 mx-auto max-w-sm" style={{ height: '300px' }}>
      </div>
    );
  }
  
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -5
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        onComplete: () => setShowParticles(true)
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8
      }
    }
  };
  
  const drawingVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.8,
      transition: {
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  const generateHandDrawnPath = (cardIndex: number = 0) => {
    const width = 320;
    const height = 220;
    const roughness = 2;
    
    const addRoughness = (value: number, seed: number) => {
      const factor = DETERMINISTIC_VALUES.roughnessFactors[seed % DETERMINISTIC_VALUES.roughnessFactors.length];
      return value + factor * roughness;
    };
    
    return `
      M ${addRoughness(10, 0)} ${addRoughness(15, 1)} 
      Q ${addRoughness(15, 2)} ${addRoughness(8, 3)} ${addRoughness(25, 4)} ${addRoughness(12, 5)}
      L ${addRoughness(295, 6)} ${addRoughness(15, 7)}
      Q ${addRoughness(310, 8)} ${addRoughness(12, 9)} ${addRoughness(308, 10)} ${addRoughness(28, 11)}
      L ${addRoughness(305, 12)} ${addRoughness(190, 13)}
      Q ${addRoughness(308, 14)} ${addRoughness(208, 15)} ${addRoughness(292, 16)} ${addRoughness(205, 17)}
      L ${addRoughness(28, 18)} ${addRoughness(202, 19)}
      Q ${addRoughness(12, 20)} ${addRoughness(208, 21)} ${addRoughness(15, 22)} ${addRoughness(192, 23)}
      L ${addRoughness(12, 24)} ${addRoughness(28, 25)}
      Q ${addRoughness(8, 26)} ${addRoughness(12, 27)} ${addRoughness(10, 28)} ${addRoughness(15, 29)} Z
    `;
  };
  
  return (
    <div
      ref={ref}
      className="relative mb-8 mx-auto max-w-sm"
      style={{
        width: '100%',
        maxWidth: '320px'
      }}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isAnimated ? "visible" : "hidden"}
        onAnimationComplete={() => onCardComplete?.(card.id)}
        className="relative"
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 320 220"
          style={{ zIndex: 1 }}
        >
          <motion.path
            d={generateHandDrawnPath()}
            stroke="rgba(55, 65, 81, 0.3)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isAnimated ? { 
              pathLength: 1, 
              opacity: 0.8 
            } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 3, delay: 0.1 }}
            style={{
              transform: 'translate(2px, 3px)',
              filter: 'blur(1px)'
            }}
          />
          
          <motion.path
            d={generateHandDrawnPath(card.id?.length || 0)}
            stroke="#374151"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isAnimated ? { 
              pathLength: 1, 
              opacity: 0.8 
            } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 3 }}
            style={{
              filter: 'drop-shadow(1px 2px 4px rgba(0, 0, 0, 0.2))',
              strokeDasharray: "2,1",
              strokeDashoffset: DETERMINISTIC_VALUES.strokeOffsets[0]
            }}
          />

          <motion.path
            d={`M 20 35 Q ${DETERMINISTIC_VALUES.underlineSeeds[0]} ${DETERMINISTIC_VALUES.underlineSeeds[1]} ${DETERMINISTIC_VALUES.underlineSeeds[2]} 35`}
            stroke="#6366f1"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isAnimated ? { 
              pathLength: 1, 
              opacity: 0.6 
            } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          {DETERMINISTIC_VALUES.dustPositions.slice(0, 3).map((pos, i) => (
            <motion.circle
              key={`emphasis-${i}`}
              cx={pos.x}
              cy={pos.y}
              r="1.5"
              fill="#6366f1"
              initial={{ opacity: 0, scale: 0 }}
              animate={isAnimated ? { 
                opacity: 0.4, 
                scale: 1,
                y: [0, -2, 0]
              } : { opacity: 0, scale: 0 }}
              transition={{ 
                delay: 1 + i * 0.2,
                duration: 0.5,
                y: { repeat: Infinity, duration: 2 }
              }}
            />
          ))}
        </svg>
        
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isAnimated ? "visible" : "hidden"}
          className={`${card.color} p-6 rounded-xl shadow-xl border-2 relative z-10 min-h-[200px] card-hover`}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="text-3xl flex-shrink-0 mt-1">{card.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xl text-gray-800 leading-tight mb-2 break-words">
                  {card.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
            {card.code && (
              <button
                onClick={handleCardClick}
                className={`flex-shrink-0 p-2 ml-2 rounded-lg transition-all duration-200 transform hover:scale-110 ${
                  !isCardReady
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed opacity-50'
                    : hasViewedCode 
                      ? 'text-green-600 bg-green-50 hover:bg-green-100' 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
                title={
                  !isCardReady 
                    ? "Aguarde o card carregar completamente..." 
                    : showCode 
                      ? "Ocultar código" 
                      : "Ver código"
                }
                disabled={!isCardReady}
              >
                {!isCardReady ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⏳
                  </motion.div>
                ) : hasViewedCode ? (
                  <CheckCircle size={18} />
                ) : showCode ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            )}
          </div>
          
          {card.code && (
            <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg mt-4 transition-all duration-300 ${
              !isCardReady
                ? 'text-gray-400 bg-gray-50 border border-gray-200'
                : hasViewedCode 
                  ? 'text-green-700 bg-green-50 border border-green-200' 
                  : 'text-gray-500 bg-gray-50'
            }`}>
              {!isCardReady ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⏳
                  </motion.div>
                  <span className="font-medium">
                    🎨 Carregando animações... Aguarde para ver o código!
                  </span>
                </>
              ) : hasViewedCode ? (
                <>
                  <CheckCircle size={14} />
                  <span className="font-medium">
                    ✅ Código visualizado! Missão completa.
                  </span>
                </>
              ) : (
                <>
                  <Code size={14} />
                  <span className="font-medium">
                    👁️ Clique no olho para ver o código de exemplo
                  </span>
                </>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
      
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {DETERMINISTIC_VALUES.sparklePositions.slice(0, 6).map((pos, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-gray-400 rounded-full"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                y: [0, -20, -40],
                x: [0, (i % 2 === 0 ? 15 : -15)]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
      
      {showCode && card.code && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setShowCode(false)}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[85vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50 }}
            animate={{ y: 0 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <span className="text-3xl">{card.icon}</span>
                  {card.title}
                </h4>
                <p className="text-gray-600">Exemplo de código prático</p>
              </div>
              <button
                onClick={() => setShowCode(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 ml-4"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">{card.code.language}</span>
              </div>
              <pre className="text-green-400 text-sm leading-relaxed font-mono">
                <code>{card.code.example}</code>
              </pre>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-400">
              <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Explicação Detalhada
              </h5>
              <div 
                className="explanation-content text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: formatExplanation(card.code.explanation) 
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <ComicModal
        isOpen={showComicModal}
        onClose={() => setShowComicModal(false)}
        type="loading"
        title="Calma aí, herói! 🦸‍♂️"
        message="Os cards ainda estão <strong>carregando suas animações</strong>!<br/><br/>Aguarde uns segundinhos para que tudo apareça <em>perfeitamente</em> antes de explorar o código! 🎨✨"
      />
    </div>
  );
}
