'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DrawingPath } from '@/types';
import { useAnimationOnScroll } from '@/hooks/useAnimation';

interface AnimatedArrowProps {
  connection: DrawingPath;
  delay?: number;
  isVisible?: boolean;
}

export function AnimatedArrow({ connection, delay = 0, isVisible = false }: AnimatedArrowProps) {
  const { ref, isAnimated } = useAnimationOnScroll({ delay, threshold: 0.2 });
  
  const shouldAnimate = isVisible && isAnimated;
  
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <svg className="w-full h-full" style={{ minHeight: '100vh', minWidth: '100vw' }}>
        <motion.path
          d={connection.path}
          stroke="#6B7280"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8,4"
          strokeLinecap="round"
          strokeDashoffset={connection.strokeDashoffset}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={shouldAnimate ? {
            pathLength: 1,
            opacity: 0.7,
            strokeDashoffset: 0
          } : {
            pathLength: 0,
            opacity: 0
          }}
          transition={{
            pathLength: { duration: connection.duration, ease: "easeInOut" },
            opacity: { duration: 0.3 },
            strokeDashoffset: { 
              duration: connection.duration * 1.5, 
              ease: "linear",
              repeat: Infinity
            }
          }}
          className="filter drop-shadow-sm"
        />
        
        <motion.polygon
          points="0,-4 8,0 0,4"
          fill="#6B7280"
          initial={{ opacity: 0, scale: 0 }}
          animate={shouldAnimate ? {
            opacity: 0.7,
            scale: 1
          } : {
            opacity: 0,
            scale: 0
          }}
          transition={{
            delay: connection.duration * 0.8,
            duration: 0.3
          }}
        >
          <animateMotion
            dur={`${connection.duration}s`}
            begin={shouldAnimate ? "0s" : "indefinite"}
            fill="freeze"
          >
            <mpath href={`#path-${connection.id}`} />
          </animateMotion>
        </motion.polygon>
        
        <defs>
          <path id={`path-${connection.id}`} d={connection.path} />
        </defs>
      </svg>
    </div>
  );
}

interface AnimatedConnectionsProps {
  connections: DrawingPath[];
  startAnimation?: boolean;
  baseDelay?: number;
}

export function AnimatedConnections({ 
  connections, 
  startAnimation = false, 
  baseDelay = 500 
}: AnimatedConnectionsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {connections.map((connection, index) => (
        <AnimatedArrow
          key={connection.id}
          connection={connection}
          delay={index * baseDelay}
          isVisible={startAnimation}
        />
      ))}
    </div>
  );
}
