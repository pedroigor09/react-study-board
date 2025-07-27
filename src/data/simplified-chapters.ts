import { ChapterData } from '@/types';

export const chapters: ChapterData[] = [
  {
    id: 'client-server',
    title: '🌐 Client vs Server',
    description: 'Entenda a diferença fundamental entre renderização no cliente e no servidor',
    backgroundColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    connections: [],
    cards: [
      {
        id: 'server-side-concept',
        title: 'Server-Side Rendering (SSR)',
        description: 'HTML é gerado no servidor antes de ser enviado para o navegador',
        category: 'client-server',
        color: 'bg-blue-50 border-blue-200',
        position: { x: 100, y: 200 },
        connections: ['client-side-concept'],
        code: {
          language: 'typescript',
          example: `// Server-Side Rendering com Next.js
export async function getServerSideProps() {
  // Executa no servidor a cada requisição
  const user = await fetchUserFromDB();
  const posts = await fetchUserPosts(user.id);
  
  return {
    props: {
      user,
      posts,
      timestamp: new Date().toISOString()
    }
  };
}

export default function ProfilePage({ user, posts, timestamp }) {
  return (
    <div>
      <h1>Perfil de {user.name}</h1>
      <p>Carregado em: {timestamp}</p>
      <div>
        {posts.map(post => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}`,
          explanation: `🎓 ENTENDA O SSR:

📊 COMO FUNCIONA:

1. **Usuário acessa a página**
   → Requisição HTTP é enviada ao servidor

2. **Servidor executa getServerSideProps()**
   → Next.js roda função antes de renderizar

3. **Busca dados do banco/API**
   → Informações são coletadas no servidor

4. **Gera HTML completo com dados**
   → React renderiza a página inteira

5. **Envia HTML pronto para o navegador**
   → Usuário vê conteúdo imediatamente

✅ VANTAGENS:
• SEO excelente - Google vê conteúdo completo
• Primeiro carregamento mais rápido
• Melhor para usuários com conexão lenta
• Dados sempre atualizados

❌ DESVANTAGENS:
• Cada página = nova requisição ao servidor
• Pode ser mais lento em navegação
• Maior carga no servidor

🔍 QUANDO USAR:
• E-commerce com preços dinâmicos
• Dashboards com dados em tempo real
• Sites que dependem muito de SEO`
        },
        icon: '🖥️'
      },
      {
        id: 'client-side-concept',
        title: 'Client-Side Rendering (CSR)',
        description: 'JavaScript executa no navegador para gerar o conteúdo dinamicamente',
        category: 'client-server',
        color: 'bg-green-50 border-green-200',
        position: { x: 500, y: 200 },
        connections: [],
        code: {
          language: 'typescript',
          example: `// Client-Side Rendering com React
function Dashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Executa no navegador após componente montar
    async function loadData() {
      try {
        const [userRes, dataRes] = await Promise.all([
          fetch('/api/user'),
          fetch('/api/dashboard-data')
        ]);
        
        setUser(await userRes.json());
        setData(await dataRes.json());
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div>
      <h1>Dashboard - {user?.name}</h1>
      <InteractiveChart data={data} />
      <RealtimeNotifications />
    </div>
  );
}`,
          explanation: `🎓 ENTENDA O CSR:

📊 COMO FUNCIONA:

1. **Servidor envia HTML básico + JavaScript**
   → Página inicial vazia ou com loading

2. **Navegador executa JavaScript**
   → React e suas dependências carregam

3. **React monta componentes**
   → Interface começa a aparecer

4. **useEffect faz requisições para APIs**
   → Dados são buscados dinamicamente

5. **Interface atualiza dinamicamente**
   → Usuário vê conteúdo final

✅ VANTAGENS:
• Interface super responsiva
• Transições suaves entre páginas
• Melhor para aplicações interativas
• Menos carga no servidor

❌ DESVANTAGENS:
• SEO mais complexo
• Carregamento inicial mais lento
• JavaScript obrigatório

🔍 QUANDO USAR:
• Dashboards administrativos
• Aplicações altamente interativas
• Apps internos que não dependem de SEO`
        },
        icon: '💻'
      },
      {
        id: 'seo-benefits',
        title: 'SEO & Performance',
        description: 'Como SSR impacta indexação e Core Web Vitals',
        category: 'performance',
        color: 'bg-purple-50 border-purple-200',
        position: { x: 300, y: 400 },
        connections: [],
        code: {
          language: 'html',
          example: `<!-- HTML gerado pelo SSR -->
<!DOCTYPE html>
<html>
<head>
  <title>iPhone 15 Pro - Melhor Preço | TechStore</title>
  <meta name="description" content="iPhone 15 Pro 256GB por R$ 7.999. Frete grátis." />
  
  <!-- Open Graph para redes sociais -->
  <meta property="og:title" content="iPhone 15 Pro - Melhor Preço" />
  <meta property="og:image" content="/iphone-15.jpg" />
  
  <!-- Schema.org para Rich Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "iPhone 15 Pro",
    "offers": {
      "@type": "Offer",
      "price": 7999.00,
      "priceCurrency": "BRL"
    }
  }
  </script>
</head>
<body>
  <!-- Conteúdo visível imediatamente -->
  <h1>iPhone 15 Pro 256GB</h1>
  <p>R$ 7.999,00 ou 12x sem juros</p>
  <img src="/iphone-15.jpg" alt="iPhone 15 Pro" />
  <p>⭐⭐⭐⭐⭐ (547 avaliações)</p>
</body>
</html>`,
          explanation: `🎓 SEO E PERFORMANCE:

🔍 POR QUE SSR É MELHOR PARA SEO:
• Google recebe HTML completo na primeira requisição
• Meta tags dinâmicas (preço, descrição atual)
• Structured data para Rich Snippets
• Social media previews funcionam perfeitamente

⚡ CORE WEB VITALS:
• FCP (First Contentful Paint): < 1.8s
• LCP (Largest Contentful Paint): < 2.5s
• CLS (Cumulative Layout Shift): < 0.1

🛠️ FERRAMENTAS PARA MEDIR:
• Google Search Console
• PageSpeed Insights
• Lighthouse (Chrome DevTools)

📊 IMPACTO NO NEGÓCIO:
• +40% tráfego orgânico
• Melhor posicionamento no Google
• Mais cliques em redes sociais`
        },
        icon: '🔍'
      }
    ]
  },
  
  {
    id: 'hooks-state',
    title: '🎣 Hooks Essenciais',
    description: 'useState, useEffect e as bases do React moderno',
    backgroundColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
    connections: [],
    cards: [
      {
        id: 'usestate-concept',
        title: 'useState - Gerenciando Estado',
        description: 'O hook mais fundamental para criar estado em componentes funcionais',
        category: 'hooks',
        color: 'bg-green-50 border-green-200',
        position: { x: 200, y: 150 },
        connections: ['useeffect-concept'],
        code: {
          language: 'typescript',
          example: `// useState - Estado simples e complexo
function Contador() {
  // Estados básicos
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado de objeto (cuidado com a imutabilidade!)
  const [user, setUser] = useState({
    name: '',
    email: '',
    preferences: { theme: 'light' }
  });
  
  // ✅ FORMA CORRETA de atualizar
  const incrementar = () => {
    setCount(prev => prev + 1); // Função callback
  };
  
  const updateUser = (newEmail) => {
    setUser(prev => ({
      ...prev,  // Mantém dados existentes
      email: newEmail
    }));
  };
  
  const toggleTheme = () => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme: prev.preferences.theme === 'light' ? 'dark' : 'light'
      }
    }));
  };
  
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={incrementar}>+1</button>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome"
      />
      
      <p>Usuário: {user.email}</p>
      <p>Tema: {user.preferences.theme}</p>
    </div>
  );
}`,
          explanation: `🎓 ENTENDA O useState:

💡 **CONCEITOS ESSENCIAIS**:
• Hook que adiciona estado a componentes funcionais
• Retorna [valor, função] para ler/atualizar estado
• Estado é preservado entre re-renderizações
• Substitui this.state dos class components

✅ **BOAS PRÁTICAS**:

🔄 **Use função callback para atualizações**:
• setCount(prev => prev + 1) ✅
• setCount(count + 1) ❌ (pode ser desatualizado)

🗂️ **Imutabilidade para objetos**:
• Sempre crie novos objetos com spread operator
• React compara por referência (Object.is)
• Mutação direta não dispara re-render

🎯 **Quando usar cada tipo**:
• **Valores simples**: string, number, boolean
• **Arrays**: lista de itens, histórico
• **Objetos**: dados relacionados (user profile)
• **Flags**: loading, error, success states

⚠️ **ARMADILHAS COMUNS**:
• Nunca mute estado diretamente
        },
        icon: '📊'
      },
      
      {
        id: 'useeffect-concept',
        title: 'useEffect - Efeitos Colaterais',
        description: 'Hook para executar código em resposta a mudanças no componente',
        category: 'hooks',
        color: 'bg-blue-50 border-blue-200',
        position: { x: 600, y: 150 },
        connections: [],
        code: {
          language: 'typescript',
          example: \`// useEffect - Diferentes padrões
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Effect que executa uma vez (componentDidMount)
  useEffect(() => {
    console.log('Componente montou');
    
    // Setup inicial, timers globais, listeners
    const handleResize = () => {
      console.log('Window resized');
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup quando componente desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Array vazio = executa só uma vez
  
  // Effect que executa quando userId muda
  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    
    // Buscar dados do usuário
    fetch(\\\`/api/users/\${userId}\\\`)
      .then(response => response.json())
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro:', error);
        setLoading(false);
      });
  }, [userId]); // Re-executa quando userId muda
  
  // Effect sem array - executa sempre (cuidado!)
  useEffect(() => {
    document.title = user ? \\\`Perfil: \\\${user.name}\\\` : 'Carregando...';
  }); // Sem array = executa após todo render
  
  if (loading) return <div>Carregando...</div>;
  
  return (
    <div>
      <h1>{user?.name || 'Usuário não encontrado'}</h1>
      <p>{user?.email}</p>
    </div>
  );
}\`,
    console.log('Componente montou');
    
    // Setup inicial, timers globais, listeners
    const handleResize = () => {
      console.log('Window resized');
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup quando componente desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Array vazio = executa só uma vez
  
  // Effect que executa quando userId muda
  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    
    // Buscar dados do usuário
    fetch(\`/api/users/\${userId}\`)
      .then(response => response.json())
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro:', error);
        setLoading(false);
      });
  }, [userId]); // Re-executa quando userId muda
  
  // Effect sem array - executa sempre (cuidado!)
  useEffect(() => {
    document.title = user ? \`Perfil: \${user.name}\` : 'Carregando...';
  }); // Sem array = executa após todo render
  
  if (loading) return <div>Carregando...</div>;
  
  return (
    <div>
      <h1>{user?.name || 'Usuário não encontrado'}</h1>
      <p>{user?.email}</p>
    </div>
  );
}\`,
          explanation: \`🎓 ENTENDA O useEffect:

⚡ **O QUE É**:
• Hook para "efeitos colaterais" (side effects)
• Executa depois que o DOM é atualizado
• Substitui componentDidMount, componentDidUpdate, componentWillUnmount
• Não bloqueia a renderização (é assíncrono)

📊 **TRÊS PADRÕES PRINCIPAIS**:

1️⃣ **useEffect(() => {}, [])** - EXECUTA UMA VEZ
   → Equivale ao componentDidMount
   → Ideal para: setup inicial, event listeners globais

2️⃣ **useEffect(() => {}, [dep1, dep2])** - EXECUTA QUANDO DEPENDÊNCIAS MUDAM
   → Mais usado para buscar dados
   → Re-executa quando dep1 ou dep2 mudarem

3️⃣ **useEffect(() => {})** - EXECUTA SEMPRE
   → Equivale ao componentDidUpdate
   → ⚠️ Cuidado: pode causar loops infinitos

✅ **PRINCIPAIS USOS**:
• Buscar dados de APIs
• Configurar timers e intervalos
• Event listeners (scroll, resize, keypress)
• Atualizações no DOM
• Cleanup de recursos

🧹 **CLEANUP (return function)**:
• Executa antes do próximo effect
• Executa quando componente desmonta
• Essencial para: timers, listeners, subscriptions
• Previne memory leaks\`

2️⃣ **useEffect(() => {}, [dep1, dep2])** - EXECUTA QUANDO DEPENDÊNCIAS MUDAM
   → Mais usado para buscar dados
   → Re-executa quando dep1 ou dep2 mudarem

3️⃣ **useEffect(() => {})** - EXECUTA SEMPRE
   → Equivale ao componentDidUpdate
   → ⚠️ Cuidado: pode causar loops infinitos

✅ **PRINCIPAIS USOS**:
• Buscar dados de APIs
• Configurar timers e intervalos
• Event listeners (scroll, resize, keypress)
• Atualizações no DOM
• Cleanup de recursos

🧹 **CLEANUP (return function)**:
• Executa antes do próximo effect
• Executa quando componente desmonta
• Essencial para: timers, listeners, subscriptions
• Previne memory leaks`
        },
        icon: '⚡'
      }
    ]
  }
];
