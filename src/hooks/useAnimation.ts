import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export interface UseAnimationOnScrollOptions {
  threshold?: number;
  delay?: number;
  triggerOnce?: boolean;
}

export function useAnimationOnScroll(options: UseAnimationOnScrollOptions = {}) {
  const { threshold = 0.3, delay = 0, triggerOnce = true } = options;
  
  const { ref, inView } = useInView({
    threshold,
    triggerOnce
  });
  
  const [isAnimated, setIsAnimated] = useState(false);
  
  useEffect(() => {
    if (inView && !isAnimated) {
      const timer = setTimeout(() => {
        setIsAnimated(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, delay, isAnimated]);
  
  return { ref, isAnimated, inView };
}

export function useSequentialAnimation(items: unknown[], baseDelay = 100) {
  const [animatedIndexes, setAnimatedIndexes] = useState<Set<number>>(new Set());
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      items.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedIndexes(prev => new Set([...prev, index]));
        }, index * baseDelay);
      });
    }
  }, [inView, baseDelay, items.length]);
  
  const isItemAnimated = (index: number) => animatedIndexes.has(index);
  
  return { ref, isItemAnimated, allAnimated: animatedIndexes.size === items.length };
}

export function useDrawingAnimation(path: string, duration = 2000) {
  const [progress, setProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const startDrawing = () => {
    setIsDrawing(true);
    setProgress(0);
    
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      
      setProgress(newProgress);
      
      if (newProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsDrawing(false);
      }
    };
    
    requestAnimationFrame(animate);
  };
  
  return { progress, isDrawing, startDrawing };
}
