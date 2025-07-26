// ARQUIVO REFATORADO - AGORA USANDO ESTRUTURA MODULAR
// =======================================================
// 
// 📁 Este arquivo foi reorganizado em módulos menores:
// • src/data/chapters/client-server.ts - Capítulo Client vs Server
// • src/data/chapters/hooks.ts - Capítulo Hooks (useState/useEffect)
// • src/data/chapters/index.ts - Índice principal
//
// 🎯 BENEFÍCIOS:
// ✅ Código mais organizado e legível
// ✅ Facilita manutenção e colaboração
// ✅ Reduz complexidade de cada arquivo
// ✅ Permite imports específicos por capítulo
//
// 📋 COMO USAR:
// import { chapters } from '@/data/chapters';
// import { clientServerChapter } from '@/data/chapters/client-server';

// Re-exporta tudo da nova estrutura modular
export * from './chapters/index';