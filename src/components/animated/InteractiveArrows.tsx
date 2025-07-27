'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveArrowsProps {
  showPrevious: boolean;
  showNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function InteractiveArrows({ 
  showPrevious, 
  showNext, 
  onPrevious, 
  onNext 
}: InteractiveArrowsProps) {
  
  const arrowVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      pathLength: 0
    },
    visible: { 
      opacity: 0.6, 
      scale: 1,
      pathLength: 1,
      transition: {
        duration: 1.2,
        pathLength: { duration: 2, ease: "easeInOut" },
        scale: { delay: 0.5, type: "spring", stiffness: 200 }
      }
    },
    hover: {
      opacity: 1,
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {showPrevious && (
        <motion.div
          className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer"
          onClick={onPrevious}
          variants={arrowVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <svg 
            width="80" 
            height="60" 
            viewBox="0 0 80 60"
            className="filter drop-shadow-lg"
          >
            <motion.path
              d="M 50 30 Q 25 20 15 30 Q 25 40 50 30"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: 'translate(2px, 2px)' }}
            />
            
            <motion.path
              d="M 50 30 Q 25 20 15 30 Q 25 40 50 30"
              stroke="#6366f1"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={arrowVariants}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))'
              }}
            />
            
            <motion.path
              d="M 25 25 L 15 30 L 25 35"
              stroke="#6366f1"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={arrowVariants}
            />
            
            <motion.path
              d="M 55 25 Q 60 23 65 25"
              stroke="#6366f1"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
              variants={arrowVariants}
            />
          </svg>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <span className="text-sm font-handwriting text-gray-600 whitespace-nowrap">
              anterior
            </span>
          </div>
        </motion.div>
      )}

      {showNext && (
        <motion.div
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer"
          onClick={onNext}
          variants={arrowVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <svg 
            width="80" 
            height="60" 
            viewBox="0 0 80 60"
            className="filter drop-shadow-lg"
          >
            <motion.path
              d="M 30 30 Q 55 20 65 30 Q 55 40 30 30"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: 'translate(2px, 2px)' }}
            />
            
            <motion.path
              d="M 30 30 Q 55 20 65 30 Q 55 40 30 30"
              stroke="#6366f1"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={arrowVariants}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))'
              }}
            />
            
            <motion.path
              d="M 55 25 L 65 30 L 55 35"
              stroke="#6366f1"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={arrowVariants}
            />
            
            <motion.path
              d="M 15 25 Q 10 23 5 25"
              stroke="#6366f1"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
              variants={arrowVariants}
            />
          </svg>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <span className="text-sm font-handwriting text-gray-600 whitespace-nowrap">
              próximo
            </span>
          </div>
        </motion.div>
      )}
    </>
  );
}
