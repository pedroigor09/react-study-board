import { ChapterData } from '@/types';

export const clientServerChapter: ChapterData = {
  id: 'client-server',
  title: '🌐 Client-Side vs Server-Side',
  description: 'Entenda a diferença fundamental entre renderização no cliente e no servidor',
  backgroundColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
  cards: [
    {
      id: 'server-side-concept',
      title: 'Server-Side Rendering (SSR)',
      description: 'HTML é gerado no servidor antes de ser enviado para o navegador - essencial para SEO e performance inicial',
      category: 'client-server',
      color: 'bg-blue-100 border-blue-300',
      position: { x: 100, y: 200 },
      connections: ['client-side-concept', 'seo-benefits'],
      code: {
        language: 'typescript',
        example: `// 🚀 SERVER-SIDE RENDERING (SSR) - NEXT.JS
// ===============================================

// 📁 pages/produto/[id].tsx
export async function getServerSideProps(context) {
  const { id } = context.params;
  
  // 🔄 EXECUTA NO SERVIDOR a cada requisição
  const produto = await fetch(\`/api/produtos/\${id}\`).then(r => r.json());
  const avaliacoes = await fetch(\`/api/avaliacoes/\${id}\`).then(r => r.json());
  
  // ⚡ Se produto não existir, retorna 404
  if (!produto) {
    return { notFound: true };
  }
  
  return {
    props: {
      produto,
      avaliacoes,
      timestamp: new Date().toISOString() // ⏰ Sempre atual
    }
  };
}

export default function PaginaProduto({ produto, avaliacoes, timestamp }) {
  return (
    <div>
      {/* 🎯 HTML já vem PRONTO do servidor */}
      <h1>{produto.nome}</h1>
      <p>R$ {produto.preco}</p>
      <p>Gerado em: {timestamp}</p>
      
      {/* 📊 SEO perfeito - conteúdo visível no HTML */}
      <meta name="description" content={produto.descricao} />
      
      <div>
        {avaliacoes.map(avaliacao => (
          <div key={avaliacao.id}>
            ⭐ {avaliacao.nota} - {avaliacao.comentario}
          </div>
        ))}
      </div>
    </div>
  );
}

// 🔧 VANTAGENS DO SSR:
// ✅ SEO excelente (Google vê conteúdo)
// ✅ Primeiro carregamento rápido
// ✅ Melhor para usuários com conexão lenta
// ✅ Dados sempre atualizados

// ⚠️ DESVANTAGENS:
// ❌ Cada página = nova requisição ao servidor
// ❌ Pode ser mais lento em navegação
// ❌ Maior carga no servidor`,
        explanation: `🎓 ENTENDA O SSR PROFUNDAMENTE:

📊 COMO FUNCIONA:

1. **Usuário acessa /produto/123**
   → Requisição HTTP é enviada para o servidor

2. **Servidor Next.js executa getServerSideProps()**
   → Função roda antes da renderização

3. **Busca dados do banco/API**
   → Informações são coletadas no servidor

4. **Gera HTML completo com dados**
   → React renderiza a página inteira com dados

5. **Envia HTML pronto para o navegador**
   → HTML completo é transmitido

6. **Navegador mostra conteúdo instantaneamente**
   → Usuário vê a página final imediatamente

🔍 QUANDO USAR SSR:
• E-commerce (preços dinâmicos)
• Dashboards com dados em tempo real
• Conteúdo personalizado por usuário
• Sites que precisam de SEO perfeito

⚡ PERFORMANCE:
• TTFB (Time to First Byte): Mais lento
• FCP (First Contentful Paint): Mais rápido
• LCP (Largest Contentful Paint): Mais rápido
• CLS (Cumulative Layout Shift): Menor

🏗️ ARQUITETURA:
Navegador ↔️ CDN ↔️ Servidor Next.js ↔️ Banco de Dados

💰 CUSTO:
• Mais recursos de servidor
• Mais requisições ao banco
• Melhor experiência do usuário`
      },
      icon: '🖥️'
    },
    {
      id: 'client-side-concept',
      title: 'Client-Side Rendering (CSR)',
      description: 'JavaScript executa no navegador para gerar o conteúdo dinamicamente - ideal para SPAs interativas',
      category: 'client-server',
      color: 'bg-green-100 border-green-300',
      position: { x: 500, y: 200 },
      connections: ['hydration-concept'],
      code: {
        language: 'typescript',
        example: `// 🚀 CLIENT-SIDE RENDERING (CSR) - REACT SPA
// ===============================================

// 📁 components/Dashboard.tsx
import { useState, useEffect } from 'react';

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    // 🔄 EXECUTA NO NAVEGADOR após a página carregar
    async function carregarDados() {
      try {
        setLoading(true);
        
        // 📡 Múltiplas requisições paralelas
        const [resUsuario, resVendas] = await Promise.all([
          fetch('/api/usuario'),
          fetch('/api/vendas')
        ]);
        
        const dadosUsuario = await resUsuario.json();
        const dadosVendas = await resVendas.json();
        
        setUsuario(dadosUsuario);
        setVendas(dadosVendas);
      } catch (error) {
        setErro('Erro ao carregar dados');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    carregarDados();
  }, []);
  
  // 🎯 Estados de loading e erro
  if (loading) return <LoadingSpinner />;
  if (erro) return <ErrorMessage erro={erro} />;
  
  return (
    <div>
      {/* 💫 Interface altamente interativa */}
      <header>
        <h1>Dashboard - {usuario?.nome}</h1>
        <NotificationBell />
      </header>
      
      {/* 📊 Componentes que se atualizam em tempo real */}
      <div className="grid">
        <GraficoVendas data={vendas} />
        <ChatAoVivo />
        <FeedAtividades />
      </div>
      
      {/* 🔄 Navegação sem recarregar página */}
      <TabNavigation>
        <Tab>Relatórios</Tab>
        <Tab>Configurações</Tab>
      </TabNavigation>
    </div>
  );
}

// 🎮 Hook customizado para dados em tempo real
function useRealtimeData(endpoint) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const ws = new WebSocket(\`ws://localhost:3001\${endpoint}\`);
    
    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    
    return () => ws.close();
  }, [endpoint]);
  
  return data;
}

// 🔧 VANTAGENS DO CSR:
// ✅ Interface super responsiva
// ✅ Transições suaves entre páginas
// ✅ Estados complexos no frontend
// ✅ Menos carga no servidor
// ✅ Melhor para aplicações interativas

// ⚠️ DESVANTAGENS:
// ❌ SEO mais complexo
// ❌ Carregamento inicial mais lento
// ❌ JavaScript obrigatório
// ❌ Bundle size pode crescer muito`,
        explanation: `🎓 ENTENDA O CSR PROFUNDAMENTE:

📊 COMO FUNCIONA:

1. **Servidor envia HTML básico + bundle JS**
   → Página inicial vazia com loading spinner

2. **Navegador baixa e executa JavaScript**
   → React framework e dependências carregam

3. **React monta a árvore de componentes**
   → Virtual DOM é criado e componentes inicializam

4. **useEffect dispara requisições para APIs**
   → Dados são buscados de forma assíncrona

5. **Estado atualiza e re-renderiza interface**
   → React reconcilia mudanças no Virtual DOM

6. **Usuário vê conteúdo carregado dinamicamente**
   → Interface final é apresentada

🔍 QUANDO USAR CSR:
• Dashboards administrativos
• Aplicações altamente interativas
• Jogos web ou editores
• Apps que não dependem de SEO
• Sistemas internos de empresa

⚡ PERFORMANCE METRICS:
• TTFB (Time to First Byte): Mais rápido
• FCP (First Contentful Paint): Mais lento
• TTI (Time to Interactive): Mais lento
• Bundle splitting essencial!

💡 OTIMIZAÇÕES CRUCIAIS:
• Code splitting com React.lazy()
• Lazy loading de componentes
• Service Workers para cache
• Virtual scrolling para listas grandes
• Debounce em inputs de busca

🏗️ ARQUITETURA TÍPICA:
CDN (HTML+JS) → Navegador → APIs REST/GraphQL

🛠️ FERRAMENTAS ESSENCIAIS:
• React Query/SWR (cache de dados)
• Zustand/Redux (estado global)
• React Router (navegação)
• Webpack/Vite (bundling)

📱 RESPONSIVIDADE:
Perfect para Progressive Web Apps (PWA)
Suporte offline com Service Workers
Push notifications nativas`
      },
      icon: '💻'
    },
    {
      id: 'seo-benefits',
      title: 'Benefícios SEO - Search Engine Optimization',
      description: 'SSR é ESSENCIAL para SEO - Google precisa ver o conteúdo no HTML inicial para indexar corretamente',
      category: 'client-server',
      color: 'bg-purple-100 border-purple-300',
      position: { x: 100, y: 400 },
      code: {
        language: 'html',
        example: `<!-- 🔍 SEO COM SSR - HTML COMPLETO DO SERVIDOR -->
<!DOCTYPE html>
<html>
<head>
  <!-- 📊 Meta tags ESSENCIAIS para SEO -->
  <title>iPhone 15 Pro Max - Comprar Online | Loja Tech</title>
  <meta name="description" content="iPhone 15 Pro Max 256GB por R$ 8.999. Frete grátis, 12x sem juros. Entrega rápida em todo Brasil." />
  <meta name="keywords" content="iPhone 15, Apple, smartphone, iOS" />
  
  <!-- 🌐 Open Graph para redes sociais -->
  <meta property="og:title" content="iPhone 15 Pro Max - Melhor Preço" />
  <meta property="og:description" content="Compre o iPhone 15 com desconto exclusivo" />
  <meta property="og:image" content="https://loja.com/iphone-15.jpg" />
  <meta property="og:url" content="https://loja.com/iphone-15-pro-max" />
  
  <!-- 🏪 Schema.org para Rich Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "iPhone 15 Pro Max",
    "image": ["https://loja.com/iphone-15.jpg"],
    "description": "iPhone 15 Pro Max 256GB",
    "brand": {
      "@type": "Brand",
      "name": "Apple"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://loja.com/iphone-15-pro-max",
      "priceCurrency": "BRL",
      "price": 8999.00,
      "availability": "https://schema.org/InStock"
    }
  }
  </script>
</head>
<body>
  <!-- ✅ CONTEÚDO VISÍVEL NO HTML INICIAL -->
  <h1>iPhone 15 Pro Max 256GB - Titanium Blue</h1>
  <p>R$ 8.999,00 ou 12x de R$ 749,92 sem juros</p>
  
  <div class="product-info">
    <img src="iphone-15.jpg" alt="iPhone 15 Pro Max Titanium Blue" />
    <p>⭐⭐⭐⭐⭐ (847 avaliações)</p>
    <p>🚚 Frete GRÁTIS para todo o Brasil</p>
    <p>📱 Chip A17 Pro, Câmera 48MP, USB-C</p>
  </div>
  
  <!-- 📝 Avaliações visíveis no HTML -->
  <section>
    <h2>Avaliações dos Clientes</h2>
    <div>
      <p>"Melhor iPhone que já tive!" - João Silva ⭐⭐⭐⭐⭐</p>
      <p>"Câmera incrível, vale cada centavo" - Maria Santos ⭐⭐⭐⭐⭐</p>
    </div>
  </section>
</body>
</html>

<!-- 🎯 RESULTADO: GOOGLE VÊ TUDO ISSO NO HTML! -->`,
        explanation: `🎓 SEO PROFUNDO - POR QUE SSR É CRUCIAL:

🔍 COMO O GOOGLE FUNCIONA:

1. **Googlebot faz requisição HTTP para sua página**
   → Bot do Google simula um navegador

2. **Servidor responde com HTML completo (SSR)**
   → Conteúdo já está renderizado no HTML

3. **Google lê título, meta tags, conteúdo principal**
   → Algoritmo analisa estrutura e relevância

4. **Indexa informações estruturadas (Schema.org)**
   → Rich snippets são criados para busca

5. **Página aparece nos resultados de busca**
   → Ranking é baseado no conteúdo encontrado

❌ PROBLEMA DO CSR PARA SEO:
• Google recebe HTML vazio + JavaScript
• Precisa executar JS para ver conteúdo
• Nem sempre consegue (timeout, errors)
• Indexação incompleta ou falha

✅ VANTAGENS DO SSR PARA SEO:
• HTML completo desde o primeiro request
• Meta tags dinâmicas (produto, preço atual)
• Structured data (Rich Snippets)
• Core Web Vitals melhores
• Social media previews funcionam

📊 MÉTRICAS SEO IMPORTANTES:
• First Contentful Paint (FCP) < 2.5s
• Largest Contentful Paint (LCP) < 2.5s
• Cumulative Layout Shift (CLS) < 0.1
• Time to Interactive (TTI) < 5s

🛠️ FERRAMENTAS PARA TESTAR SEO:
• Google Search Console
• PageSpeed Insights
• Lighthouse (Chrome DevTools)
• Rich Results Test
• Mobile-Friendly Test

💡 DICAS AVANÇADAS:
• Use next/head para meta tags dinâmicas
• Implemente breadcrumbs estruturados
• Otimize images com next/image
• Configure sitemap.xml automático
• Use canonical URLs para evitar duplicação

🚀 IMPACTO NO NEGÓCIO:
• +40% tráfego orgânico com SSR
• Melhor posicionamento no Google
• Mais cliques em redes sociais
• Maior taxa de conversão`
      },
      icon: '🔍'
    },
    {
      id: 'hydration-concept',
      title: 'Hydration - O Processo Mágico ✨',
      description: 'Processo de "hidratar" HTML estático com JavaScript - transformando página estática em app interativo',
      category: 'client-server',
      color: 'bg-yellow-100 border-yellow-300',
      position: { x: 500, y: 400 },
      code: {
        language: 'typescript',
        example: `// 💧 HYDRATION - DE ESTÁTICO PARA INTERATIVO
// ===============================================

// 📁 pages/contador.tsx
import { useState } from 'react';

export async function getServerSideProps() {
  // 🎯 1. SERVIDOR: Busca dados iniciais
  const contadorInicial = await buscarContadorDoBanco();
  
  return {
    props: {
      contadorInicial: contadorInicial || 0
    }
  };
}

export default function PaginaContador({ contadorInicial }) {
  // 💧 2. HYDRATION: Estado inicial vem do servidor
  const [count, setCount] = useState(contadorInicial);
  const [loading, setLoading] = useState(false);
  
  // 🎮 3. INTERATIVIDADE: Funciona após hydration
  const incrementar = async () => {
    setLoading(true);
    setCount(prev => prev + 1);
    
    // 📡 Persiste no servidor
    await fetch('/api/contador', {
      method: 'POST',
      body: JSON.stringify({ novoValor: count + 1 })
    });
    
    setLoading(false);
  };
  
  return (
    <div>
      {/* 🌟 HTML inicial (do servidor): */}
      {/* <div><h1>Contador: 42</h1><button>+1</button></div> */}
      
      <h1>Contador: {count}</h1>
      <button 
        onClick={incrementar}
        disabled={loading}
        className={loading ? 'opacity-50' : 'hover:bg-blue-600'}
      >
        {loading ? '🔄 Salvando...' : '+1'}
      </button>
      
      {/* 💡 Componente que só funciona no cliente */}
      <RelogioDinamico />
    </div>
  );
}

// 🕐 Componente que precisa de hydration
function RelogioDinamico() {
  const [tempo, setTempo] = useState(new Date());
  
  useEffect(() => {
    // ⚠️ Este timer só funciona após hydration!
    const timer = setInterval(() => {
      setTempo(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="mt-4">
      <p>⏰ {tempo.toLocaleTimeString()}</p>
      <p className="text-sm text-gray-500">
        Este relógio só funciona após hydration!
      </p>
    </div>
  );
}

// 🔧 PROCESSO DE HYDRATION:
// 1️⃣ Servidor gera HTML: <h1>Contador: 42</h1><button>+1</button>
// 2️⃣ Navegador recebe HTML estático
// 3️⃣ JavaScript carrega e executa
// 4️⃣ React "hidrata" o DOM existente
// 5️⃣ Event listeners são anexados
// 6️⃣ Estado React sincroniza com HTML
// 7️⃣ Página fica totalmente interativa

// ⚠️ HYDRATION MISMATCH - ERRO COMUM:
function ComponenteProblematico() {
  // ❌ ERRO: Servidor e cliente têm valores diferentes
  const isClient = typeof window !== 'undefined';
  
  return (
    <div>
      {isClient ? 'No navegador' : 'No servidor'}
    </div>
  );
  // Resultado: Warning de hydration mismatch!
}

// ✅ SOLUÇÃO: useEffect para diferenças cliente/servidor
function ComponenteCorrigido() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div>
      {isClient ? 'No navegador!' : 'Carregando...'}
    </div>
  );
}`,
        explanation: `🎓 HYDRATION - ENTENDA PROFUNDAMENTE:

🔄 O QUE ACONTECE PASSO A PASSO:

1. **SSR gera HTML completo no servidor**
   → React renderiza tudo antes de enviar

2. **Navegador renderiza HTML instantaneamente**
   → Usuário vê conteúdo estático imediatamente

3. **JavaScript bundle carrega em paralelo**
   → React e componentes chegam ao navegador

4. **React.hydrate() "acorda" o DOM estático**
   → React assume controle do DOM existente

5. **Event listeners são anexados aos elementos**
   → Clicks, hovers, etc. começam a funcionar

6. **Estado React sincroniza com DOM existente**
   → useState hooks recebem valores iniciais

7. **useEffect hooks executam pela primeira vez**
   → Side effects e APIs são chamados

⚡ PERFORMANCE BENEFITS:
• FCP (First Contentful Paint): Instantâneo
• TTI (Time to Interactive): Após hydration
• SEO perfeito: HTML completo imediato
• Progressive enhancement automático

❌ PROBLEMAS COMUNS DE HYDRATION:
• Mismatch servidor/cliente (datas, random, window)
• useEffect que muda estado inicial
• Conditional rendering baseado em ambiente
• CSS-in-JS que gera classes diferentes

🛠️ DEBUGGING HYDRATION:
• React.StrictMode mostra warnings
• Console: "Warning: Text content did not match"
• Chrome DevTools: Performance tab
• suppressHydrationWarning (use com cuidado!)

🎯 BOAS PRÁTICAS:
• Mantenha HTML servidor === cliente
• Use dynamic imports para componentes cliente-only
• Serialize dados complexos corretamente
• Evite Math.random() ou Date.now() no render inicial

📊 MÉTRICAS DE HYDRATION:
• Time to Hydration < 3s
• Hydration Warning Count = 0
• Bundle size otimizado
• Code splitting eficiente

🔧 OTIMIZAÇÕES AVANÇADAS:
• Partial Hydration (React 18+)
• Selective Hydration com Suspense
• Island Architecture (Astro style)
• Streaming SSR com concurrent features`
      },
      icon: '💧'
    }
  ],
  connections: [
    {
      id: 'server-to-client',
      path: 'M 300 220 Q 400 180 500 220',
      strokeDasharray: '5,5',
      strokeDashoffset: '100',
      duration: 1.5
    },
    {
      id: 'server-to-seo',
      path: 'M 200 300 L 200 380',
      strokeDasharray: '3,3',
      strokeDashoffset: '50',
      duration: 1.2
    },
    {
      id: 'client-to-hydration',
      path: 'M 600 300 L 600 380',
      strokeDasharray: '3,3',
      strokeDashoffset: '50',
      duration: 1.2
    }
  ]
};
