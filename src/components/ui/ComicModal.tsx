'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'info' | 'warning' | 'loading';
}

export function ComicModal({ isOpen, onClose, title, message, type = 'info' }: ComicModalProps) {
  // Não renderiza nada se não estiver aberto
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bg: 'from-orange-400 to-red-500',
          bubble: 'bg-orange-50 border-orange-300',
          text: 'text-orange-800',
          icon: '⚠️',
          sound: 'AVISO!'
        };
      case 'loading':
        return {
          bg: 'from-blue-400 to-purple-500',
          bubble: 'bg-blue-50 border-blue-300',
          text: 'text-blue-800',
          icon: '⏳',
          sound: 'ESPERE!'
        };
      default:
        return {
          bg: 'from-green-400 to-blue-500',
          bubble: 'bg-green-50 border-green-300',
          text: 'text-green-800',
          icon: 'ℹ️',
          sound: 'INFO!'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4 comic-modal-overlay"
        onClick={onClose}
      >
        {/* Efeitos de fundo estilo HQ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Raios de ação */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className={`absolute bg-gradient-to-r ${styles.bg} opacity-20`}
              style={{
                width: '200px',
                height: '4px',
                left: '50%',
                top: '50%',
                transformOrigin: 'left center',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Partículas estilo HQ */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute w-2 h-2 bg-gradient-to-r ${styles.bg} rounded-full`}
              style={{
                left: `${20 + (i * 6)}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                scale: [0, 1.2, 0],
                y: [0, -30, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Modal principal */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          className="relative max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Balão de fala estilo HQ */}
          <div className={`relative ${styles.bubble} border-4 rounded-3xl p-8 shadow-2xl comic-bubble`}>
            {/* Pico do balão */}
            <div 
              className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[24px] border-l-transparent border-r-transparent`}
              style={{ borderTopColor: 'rgb(147 197 253)' }}
            />

            {/* Efeito de "som" estilo HQ */}
            <motion.div
              className="absolute -top-8 -right-4 bg-yellow-400 text-black font-black text-sm px-3 py-1 rounded-full border-2 border-black transform -rotate-12"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [-12, -8, -12],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {styles.sound}
            </motion.div>

            {/* Ícone animado */}
            <motion.div 
              className="text-6xl text-center mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {styles.icon}
            </motion.div>

            {/* Título */}
            {title && (
              <h3 className={`text-2xl font-black text-center mb-4 ${styles.text} transform -rotate-1`}>
                {title}
              </h3>
            )}

            {/* Mensagem */}
            <div className={`text-lg font-bold text-center ${styles.text} leading-relaxed`}>
              {message.split('\n').map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </div>

            {/* Botão de fechar estilo HQ */}
            <motion.button
              onClick={onClose}
              className="mt-6 w-full font-black text-lg py-3 px-6 rounded-full comic-button"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              🦸‍♂️ ENTENDI!
            </motion.button>

            {/* Efeitos decorativos estilo HQ */}
            <motion.div
              className="absolute -top-2 -left-2 text-yellow-400 text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -right-2 text-blue-400 text-xl"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -20, 20, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💫
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
