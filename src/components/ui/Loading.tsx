'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function LoadingSpinner({ size = 'md', color = '#3B82F6' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-gray-200 rounded-full`}
        style={{ borderTopColor: color }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

// 🎨 NOVA TELA DE LOADING PERSONALIZADA
interface StudyLoadingProps {
  message?: string;
  onSkip?: () => void;
}

export function StudyLoading({ message, onSkip }: StudyLoadingProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // 🎯 Garante renderização apenas no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 💬 Frases inspiradoras sobre React
  const loadingPhrases = [
    "🚀 Preparando os componentes...",
    "⚡ Hidratando o estado...",
    "🎨 Renderizando a interface...",
    "🔄 Configurando os hooks...",
    "📦 Carregando o conhecimento...",
    "🎯 Montando o virtual DOM...",
    "✨ Aplicando a mágica do React...",
    "🛠️ Construindo a experiência...",
    "💡 Iluminando os conceitos...",
    "🎪 Preparando o show...",
  ];

  // 🔄 Rotaciona as frases a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % loadingPhrases.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [loadingPhrases.length]);

  if (!isClient) {
    return null; // Evita hydration mismatch
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 flex items-center justify-center z-50">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas flutuantes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${(i * 5.26) % 100}%`,
              top: `${(i * 7.83) % 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Ondas de fundo */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-800/30 to-transparent"
          animate={{
            x: [-100, 100, -100],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center px-8">
        {/* Ícone principal com animação */}
        <motion.div
          className="mb-8 flex justify-center"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full blur-xl"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="relative bg-white/20 backdrop-blur-sm rounded-full p-6 border border-white/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={process.env.NODE_ENV === 'production' ? '/react-study-board/iconspawn.png' : '/iconspawn.png'}
                alt="React Study Board Icon"
                width={80}
                height={80}
                className="relative z-10"
                loading="eager"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Título */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-4 font-handwriting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          React Study Board
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-lg text-white/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Aprendendo React de forma visual e interativa
        </motion.p>

        {/* Frases rotativas */}
        <div className="mb-8 h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhrase}
              className="text-white/90 text-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {loadingPhrases[currentPhrase]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Barra de progresso animada */}
        <div className="w-64 mx-auto bg-white/20 rounded-full h-2 mb-6">
          <motion.div
            className="bg-gradient-to-r from-white to-yellow-200 h-full rounded-full"
            animate={{
              width: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Spinner personalizado */}
        <motion.div
          className="flex justify-center items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Mensagem personalizada (se fornecida) */}
        {message && (
          <motion.p
            className="mt-4 text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {message}
          </motion.p>
        )}

        {/* Botão para pular loading integrado */}
        {onSkip && (
          <motion.button
            onClick={onSkip}
            className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Entrar agora
          </motion.button>
        )}
      </div>
    </div>
  );
}

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-white rounded-xl shadow-lg p-6 h-48">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full loading-shimmer"></div>
          <div className="h-4 bg-gray-200 rounded loading-shimmer flex-1"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded loading-shimmer"></div>
          <div className="h-3 bg-gray-200 rounded loading-shimmer w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded loading-shimmer w-4/6"></div>
        </div>
        <div className="mt-4 h-8 bg-gray-100 rounded loading-shimmer"></div>
      </div>
    </div>
  );
}
