'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs";
import { Badge } from "@/core/components/ui/badge";
import { FormattedContent } from "@/core/components/ui/formatted-content";
import { Eye, EyeOff, Code } from 'lucide-react';
import { ConceptCard } from '@/types';

interface CodeModalProps {
  card: ConceptCard;
  isOpen: boolean;
  onClose: () => void;
  onCodeViewed?: () => void;
}

export function CodeModal({ card, isOpen, onClose, onCodeViewed }: CodeModalProps) {
  const [activeTab, setActiveTab] = useState("code");

  if (!card.code) return null;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "code" && onCodeViewed) {
      onCodeViewed();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {card.icon} {card.title}
          </DialogTitle>
          <Badge variant="outline" className="w-fit">
            {card.category}
          </Badge>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code size={16} />
              Código
            </TabsTrigger>
            <TabsTrigger value="explanation" className="flex items-center gap-2">
              <Eye size={16} />
              Explicação
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="mt-4">
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {card.code.language}
                  </span>
                </div>
                <pre className="text-green-400 text-sm font-mono leading-relaxed">
                  <code>{card.code.example}</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explanation" className="mt-4">
            <FormattedContent 
              content={card.code.explanation}
              maxHeight="50vh"
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
