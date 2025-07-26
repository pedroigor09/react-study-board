'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeModal } from "@/components/ui/code-modal";
import { Code, CheckCircle } from 'lucide-react';
import { ConceptCard } from '@/types';
import { cn } from "@/lib/utils";

interface ConceptCardComponentProps {
  card: ConceptCard;
  delay?: number;
  isCompleted?: boolean;
  onCardViewed?: (cardId: string) => void;
}

export function ConceptCardComponent({ 
  card, 
  delay = 0, 
  isCompleted = false,
  onCardViewed 
}: ConceptCardComponentProps) {
  const [showModal, setShowModal] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);

  const handleViewCode = () => {
    setShowModal(true);
  };

  const handleCodeViewed = () => {
    if (!hasViewed) {
      setHasViewed(true);
      onCardViewed?.(card.id);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <Card className={cn(
          "h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2",
          "border-2 cursor-pointer group",
          card.color,
          hasViewed && "ring-2 ring-green-400"
        )}>
          <CardContent className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{card.icon}</span>
                <Badge variant="secondary" className="text-xs">
                  {card.category}
                </Badge>
              </div>
              {hasViewed && (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              )}
            </div>

            {/* Conteúdo */}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {card.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                Clique para explorar
              </span>
              {card.code && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleViewCode}
                  className="flex items-center gap-1"
                >
                  <Code size={14} />
                  Ver código
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal */}
      {card.code && (
        <CodeModal
          card={card}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCodeViewed={handleCodeViewed}
        />
      )}
    </>
  );
}
