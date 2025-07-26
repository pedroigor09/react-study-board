'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ComicEffectsProps {
  currentChapter: number;
}

export function ComicEffects({ currentChapter }: ComicEffectsProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // 🎯 Garante que só renderiza no cliente após hidratação
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reinicia as animações quando o capítulo muda
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentChapter]);

  // 📊 Valores determinísticos para evitar hydration mismatch
  const repeatDelays = [3, 5, 2, 4, 6, 1, 3.5, 4.5];
  const floatingPositions = [
    { x: 25, y: 30 }, { x: 75, y: 20 }, { x: 15, y: 70 }, { x: 85, y: 80 },
    { x: 45, y: 15 }, { x: 55, y: 85 }, { x: 10, y: 45 }, { x: 90, y: 55 }
  ];
  const floatingDelays = [2, 4, 6, 8, 1, 3, 5, 7];
  const floatingDurations = [8, 7, 9, 6, 8.5, 7.5, 6.5, 9.5];

  // ⚠️ Não renderiza nada até estar no cliente
  if (!isClient) {
    return null;
  }
  // Efeitos específicos por capítulo
  const getChapterEffects = (chapter: number) => {
    const effects = [
      {
        thoughtBubbles: [
          { text: "Client Side!", x: "15%", y: "20%", delay: 1 },
          { text: "Server Side!", x: "75%", y: "15%", delay: 2.5 },
          { text: "Rendering!", x: "20%", y: "80%", delay: 4 },
          { text: "Components!", x: "80%", y: "75%", delay: 5.5 },
        ],
        powerWords: [
          { text: "RENDER!", x: "60%", y: "30%", delay: 0.5, color: "#ef4444" },
          { text: "HYDRATE!", x: "25%", y: "50%", delay: 3, color: "#3b82f6" },
        ]
      },
      {
        thoughtBubbles: [
          { text: "useState!", x: "15%", y: "20%", delay: 1 },
          { text: "useEffect!", x: "75%", y: "15%", delay: 2.5 },
          { text: "State!", x: "20%", y: "80%", delay: 4 },
          { text: "Effects!", x: "80%", y: "75%", delay: 5.5 },
        ],
        powerWords: [
          { text: "STATE!", x: "60%", y: "30%", delay: 0.5, color: "#10b981" },
          { text: "EFFECT!", x: "25%", y: "50%", delay: 3, color: "#f59e0b" },
        ]
      },
      {
        thoughtBubbles: [
          { text: "useUser!", x: "15%", y: "20%", delay: 1 },
          { text: "useAuth!", x: "75%", y: "15%", delay: 2.5 },
          { text: "Custom!", x: "20%", y: "80%", delay: 4 },
          { text: "Hooks!", x: "80%", y: "75%", delay: 5.5 },
        ],
        powerWords: [
          { text: "CUSTOM!", x: "60%", y: "30%", delay: 0.5, color: "#8b5cf6" },
          { text: "REUSE!", x: "25%", y: "50%", delay: 3, color: "#06b6d4" },
        ]
      },
      {
        thoughtBubbles: [
          { text: "Memo!", x: "15%", y: "20%", delay: 1 },
          { text: "Callback!", x: "75%", y: "15%", delay: 2.5 },
          { text: "Optimize!", x: "20%", y: "80%", delay: 4 },
          { text: "Performance!", x: "80%", y: "75%", delay: 5.5 },
        ],
        powerWords: [
          { text: "FAST!", x: "60%", y: "30%", delay: 0.5, color: "#ef4444" },
          { text: "OPTIMIZE!", x: "25%", y: "50%", delay: 3, color: "#10b981" },
        ]
      }
    ];
    
    return effects[chapter] || effects[0];
  };

  const { thoughtBubbles, powerWords } = getChapterEffects(currentChapter);

  return (
    <div key={`comic-effects-${animationKey}`} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Balões de pensamento estilo HQ */}
      {thoughtBubbles.map((bubble, index) => (
        <motion.div
          key={`thought-${animationKey}-${index}`}
          className="absolute"
          style={{ left: bubble.x, top: bubble.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0.6, 0.8],
            scale: [0, 1.2, 1, 1.1],
            rotate: [0, 5, -5, 2]
          }}
          transition={{
            delay: bubble.delay,
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: repeatDelays[index % repeatDelays.length]
          }}
        >
          {/* Balão */}
          <div className="relative">
            <div className="bg-white border-3 border-gray-800 rounded-2xl px-4 py-2 shadow-lg relative">
              <span className="font-bold text-gray-800 font-handwriting text-lg">
                {bubble.text}
              </span>
              
              {/* Rabinho do balão */}
              <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              <div className="absolute -bottom-3 left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
            
            {/* Pequenas bolhas */}
            <div className="absolute -bottom-6 left-8 w-2 h-2 bg-white border-2 border-gray-800 rounded-full"></div>
            <div className="absolute -bottom-8 left-10 w-1 h-1 bg-white border border-gray-800 rounded-full"></div>
          </div>
        </motion.div>
      ))}

      {/* Palavras de impacto estilo Marvel */}
      {powerWords.map((word, index) => (
        <motion.div
          key={`power-${animationKey}-${index}`}
          className="absolute"
          style={{ left: word.x, top: word.y }}
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{ 
            opacity: [0, 1, 0.8, 1],
            scale: [0, 1.5, 1.2, 1.3],
            rotate: [-15, 5, -5, 10, -2]
          }}
          transition={{
            delay: word.delay,
            duration: 3,
            ease: "backOut",
            repeat: Infinity,
            repeatDelay: repeatDelays[(index + 2) % repeatDelays.length]
          }}
        >
          <div 
            className="font-black text-4xl transform -rotate-12 select-none font-handwriting"
            style={{ 
              color: word.color,
              textShadow: `3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000`,
              filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))'
            }}
          >
            {word.text}
          </div>
        </motion.div>
      ))}

      {/* Raios de energia */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.path
            key={`lightning-${animationKey}-${i}`}
            d={`M ${200 + i * 300} 100 L ${220 + i * 300} 150 L ${200 + i * 300} 200 L ${230 + i * 300} 250`}
            stroke="#fbbf24"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0, 1],
              opacity: [0, 0.8, 0.3, 0.8]
            }}
            transition={{
              delay: 2 + i * 1.5,
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: repeatDelays[(i + 4) % repeatDelays.length]
            }}
            style={{
              filter: 'drop-shadow(0 0 6px #fbbf24)'
            }}
          />
        ))}
      </svg>

      {/* Partículas flutuantes */}
      {floatingPositions.map((pos, i) => (
        <motion.div
          key={`floating-${animationKey}-${i}`}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
          }}
          animate={{
            y: [0, -100, 0, -50, 0],
            x: [0, (i % 2 === 0 ? 25 : -25), 0, (i % 3 === 0 ? -15 : 15), 0],
            opacity: [0, 0.6, 0.4, 0.8, 0.2],
            scale: [0, 1.5, 0.8, 1.2, 0.5]
          }}
          transition={{
            duration: floatingDurations[i % floatingDurations.length],
            delay: floatingDelays[i % floatingDelays.length],
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: repeatDelays[i % repeatDelays.length]
          }}
        />
      ))}
    </div>
  );
}
