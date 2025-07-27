'use client';

import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target } from 'lucide-react';

interface MissionProgressProps {
  totalCards: number;
  viewedCards: number;
  isComplete: boolean;
}

export function MissionProgress({ totalCards, viewedCards, isComplete }: MissionProgressProps) {
  const progressPercentage = (viewedCards / totalCards) * 100;

  return (
    <Card className="w-full mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-800">
              Missão: Explore todos os códigos
            </h3>
          </div>
          {isComplete && (
            <Badge className="bg-green-100 text-green-800 border-green-300">
              <Trophy className="w-3 h-3 mr-1" />
              Completa!
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {viewedCards}/{totalCards} códigos explorados
            </span>
            <span className={`font-medium ${isComplete ? 'text-green-600' : 'text-blue-600'}`}>
              {Math.round(progressPercentage)}%
            </span>
          </div>

          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-600 font-medium text-sm"
            >
              🎉 Parabéns! Você completou este capítulo!
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
