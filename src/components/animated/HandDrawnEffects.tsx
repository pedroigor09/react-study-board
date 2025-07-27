'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HandDrawnEffectsProps {
  isVisible: boolean;
  currentChapter?: number;
}

// 🔧 Função para gerar valores pseudo-aleatórios determinísticos
// Evita hydration mismatch mantendo valores consistentes entre server/client
function deterministicRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function HandDrawnEffects({ isVisible, currentChapter = 0 }: HandDrawnEffectsProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // 🎯 Garante que só renderiza no cliente após hidratação
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reinicia as animações quando o capítulo muda
  useEffect(() => {
    if (isVisible) {
      setAnimationKey(prev => prev + 1);
    }
  }, [currentChapter, isVisible]);

  // 📊 Arrays de valores determinísticos baseados em seeds
  const strokeWidths = [2.07, 2.91, 2.28, 3.14, 2.55, 1.85, 2.33, 2.67];
  const delays = [0.1, 0.3, 0.6, 0.2, 0.8, 0.4, 0.5, 0.7];
  const durations = [1.8, 2.2, 1.5, 2.5, 1.9, 2.1, 1.7, 2.3];
  const dashArrays = [true, false, true, false, true, false, true, false];
  
  // Posições determinísticas para efeitos de poeira
  const dustPositions = [
    { x: 220, y: 180, r: 2.5 },
    { x: 340, y: 165, r: 1.8 },
    { x: 460, y: 195, r: 3.2 },
    { x: 580, y: 155, r: 2.1 },
    { x: 700, y: 175, r: 2.8 },
    { x: 820, y: 190, r: 1.5 },
    { x: 940, y: 160, r: 2.9 },
    { x: 1060, y: 185, r: 2.3 }
  ];

  // ⚠️ Não renderiza nada até estar no cliente (evita hydration mismatch)
  if (!isClient) {
    return null;
  }
  // Caminhos SVG para rabiscos de fundo estilo lousa
  const chalkStrokes = [
    // Seta curvada principal
    "M 50 100 Q 120 80 200 100 Q 220 105 215 115 L 205 110 M 215 115 L 210 125",
    // Rabiscos de destaque
    "M 300 150 Q 350 140 400 160 Q 420 165 415 175",
    // Underline ondulado
    "M 150 200 Q 200 195 250 200 Q 280 202 275 205",
    // Círculo irregular
    "M 500 120 Q 520 100 540 120 Q 560 140 540 160 Q 520 180 500 160 Q 480 140 500 120",
    // Seta direita
    "M 600 180 L 680 180 M 670 170 L 680 180 L 670 190",
    // Texto phantom "React"
    "M 100 300 Q 110 295 120 300 M 130 290 L 130 310 M 140 290 Q 150 295 150 305 Q 150 315 140 310",
    // Conexões pontilhadas
    "M 250 250 L 255 248 M 265 245 L 270 243 M 280 240 L 285 238",
    // Exclamação enfática
    "M 450 80 L 450 100 M 450 110 L 450 112"
  ];

  const arrowPaths = [
    // Seta principal curvada
    {
      path: "M 80 120 Q 150 90 220 120",
      arrow: "M 210 110 L 220 120 L 210 130"
    },
    // Seta conectora
    {
      path: "M 350 180 Q 400 160 450 180",
      arrow: "M 440 170 L 450 180 L 440 190"
    }
  ];

  return (
    <div key={`hand-drawn-${animationKey}`} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        className="w-full h-full opacity-20"
        viewBox="0 0 1200 800"
        style={{ filter: 'blur(0.5px)' }}
      >
        {/* Rabiscos de fundo */}
        {chalkStrokes.map((stroke, index) => (
          <motion.path
            key={`stroke-${animationKey}-${index}`}
            d={stroke}
            stroke="#374151"
            strokeWidth={strokeWidths[index] || 2.0}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? {
              pathLength: 1,
              opacity: 0.6,
            } : { pathLength: 0, opacity: 0 }}
            transition={{
              delay: index * 0.3 + delays[index],
              duration: durations[index],
              ease: "easeInOut"
            }}
            style={{
              filter: `drop-shadow(1px 1px 2px rgba(0,0,0,0.3))`,
              strokeDasharray: dashArrays[index] ? "5,3" : undefined
            }}
          />
        ))}

        {/* Setas direcionais */}
        {arrowPaths.map((arrow, index) => (
          <g key={`arrow-${animationKey}-${index}`}>
            <motion.path
              d={arrow.path}
              stroke="#6366f1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isVisible ? {
                pathLength: 1,
                opacity: 0.7,
              } : { pathLength: 0, opacity: 0 }}
              transition={{
                delay: 2 + index * 0.5,
                duration: 1.2,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d={arrow.arrow}
              stroke="#6366f1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? {
                opacity: 0.7,
                scale: 1,
              } : { opacity: 0, scale: 0 }}
              transition={{
                delay: 2.5 + index * 0.5,
                duration: 0.5,
                ease: "backOut"
              }}
            />
          </g>
        ))}

        {/* Efeitos de poeira de giz */}
        {dustPositions.map((dust, index) => (
          <motion.circle
            key={`dust-${animationKey}-${index}`}
            cx={dust.x}
            cy={dust.y}
            r={dust.r}
            fill="#94a3b8"
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? {
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            } : { opacity: 0, scale: 0 }}
            transition={{
              delay: 3 + index * 0.2,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5 + (index * 0.5)
            }}
          />
        ))}
      </svg>

      {/* Textos fantasma estilo lousa */}
      <div className="absolute top-20 left-20 transform -rotate-2">
        <motion.div
          className="text-gray-400 font-handwriting text-2xl opacity-30"
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 0.3, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 4, duration: 1 }}
        >
          React Hooks
        </motion.div>
      </div>

      <div className="absolute top-40 right-32 transform rotate-1">
        <motion.div
          className="text-gray-400 font-handwriting text-lg opacity-25"
          initial={{ opacity: 0, x: 20 }}
          animate={isVisible ? { opacity: 0.25, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 5, duration: 1 }}
        >
          Components
        </motion.div>
      </div>
    </div>
  );
}
