import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormattedContentProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

// Função simplificada para formatar texto
function formatText(text: string): string {
  return text
    // Títulos principais
    .replace(/🎓 ([^:]+):/g, '<h2 class="text-lg font-bold text-blue-600 mt-4 mb-2 flex items-center gap-2">🎓 $1</h2>')
    .replace(/📊 ([^:]+):/g, '<h3 class="text-md font-semibold text-green-600 mt-3 mb-2 flex items-center gap-2">📊 $1</h3>')
    .replace(/⚡ ([^:]+):/g, '<h3 class="text-md font-semibold text-orange-600 mt-3 mb-2 flex items-center gap-2">⚡ $1</h3>')
    .replace(/🔍 ([^:]+):/g, '<h3 class="text-md font-semibold text-purple-600 mt-3 mb-2 flex items-center gap-2">🔍 $1</h3>')
    
    // Highlights e avisos
    .replace(/✅\s([^\n]+)/g, '<div class="bg-green-50 border-l-4 border-green-400 p-3 my-2 rounded-r"><span class="text-green-700">✅ $1</span></div>')
    .replace(/❌\s([^\n]+)/g, '<div class="bg-red-50 border-l-4 border-red-400 p-3 my-2 rounded-r"><span class="text-red-700">❌ $1</span></div>')
    .replace(/⚠️\s([^\n]+)/g, '<div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 my-2 rounded-r"><span class="text-yellow-700">⚠️ $1</span></div>')
    
    // Listas
    .replace(/•\s([^\n•]+)/g, '<li class="ml-4 my-1">$1</li>')
    .replace(/(\d+)\.\s([^\n]+)/g, '<div class="flex items-start gap-2 my-2"><span class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full min-w-6 text-center">$1</span><span>$2</span></div>')
    
    // Code inline
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    
    // Quebras de linha
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/^(.+)/, '<p class="mb-3">$1')
    .replace(/(.+)$/, '$1</p>')
    
    // Limpeza
    .replace(/<p class="mb-3"><\/p>/g, '');
}

export function FormattedContent({ content, className, maxHeight = "60vh" }: FormattedContentProps) {
  const formattedHTML = formatText(content);
  
  return (
    <ScrollArea className={cn("w-full", className)} style={{ maxHeight }}>
      <div 
        className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formattedHTML }}
      />
    </ScrollArea>
  );
}
