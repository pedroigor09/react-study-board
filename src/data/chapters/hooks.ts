import { ChapterData } from '@/types';

export const hooksChapter: ChapterData = {
  id: 'hooks-chapter',
  title: '🎣 useState vs useEffect',
  description: 'Dominando os hooks mais importantes do React',
  backgroundColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
  cards: [
    {
      id: 'usestate-concept',
      title: 'useState - Estado Local',
      description: 'O hook fundamental para gerenciar estado em componentes',
      category: 'hooks',
      color: 'bg-green-100 border-green-300',
      position: { x: 150, y: 200 },
      connections: ['usestate-problems', 'useeffect-concept'],
      code: {
        language: 'typescript',
        example: `function Counter() {
  // useState retorna [valor, setter]
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Estados podem ser qualquer tipo
  const [user, setUser] = useState({ id: 1, name: 'João' });
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome"
      />
    </div>
  );
}`,
        explanation: `🎓 ENTENDA O useState:

💡 **O QUE É**:
• Hook que adiciona estado a componentes funcionais
• Substitui this.state em componentes de classe
• Mantém valores entre re-renderizações

✅ **VANTAGENS**:
• Sintaxe simples e intuitiva
• Pode ter múltiplos estados por componente
• Aceita qualquer tipo de dado (string, number, object, array)
• Re-renderiza apenas quando estado muda

📊 **COMO FUNCIONA**:
• useState(valorInicial) → [estado, setEstado]
• setEstado(novoValor) → dispara re-renderização
• React compara valores com Object.is()

🎯 **QUANDO USAR**:
• Dados que mudam ao longo do tempo
• Inputs de formulários (controlled components)
• Toggles, contadores, flags de loading
• Estados locais do componente`
      },
      icon: '📊'
    },
    {
      id: 'usestate-problems',
      title: 'useState - Problemas & Soluções',
      description: 'Armadilhas comuns e como evitá-las',
      category: 'hooks',
      color: 'bg-red-100 border-red-300',
      position: { x: 150, y: 450 },
      connections: ['usestate-best-practices'],
      code: {
        language: 'typescript',
        example: `// ❌ ERRO 1: Mutação direta
const [items, setItems] = useState([]);
const addItem = (item) => {
  items.push(item); // NUNCA faça isso!
  setItems(items); // React não detecta mudança
};

// ✅ SOLUÇÃO: Imutabilidade
const addItem = (item) => {
  setItems([...items, item]); // Novo array
  // ou setItems(prev => [...prev, item]);
};

// ❌ ERRO 2: Estado desatualizado
const increment = () => {
  setCount(count + 1);
  setCount(count + 1); // Ainda será count + 1!
};

// ✅ SOLUÇÃO: Callback function
const increment = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1); // Agora será count + 2!
};

// ❌ ERRO 3: Objetos aninhados
const [user, setUser] = useState({ profile: { name: '' }});
const updateName = (name) => {
  user.profile.name = name; // Mutação!
  setUser(user);
};

// ✅ SOLUÇÃO: Spread operator
const updateName = (name) => {
  setUser(prev => ({
    ...prev,
    profile: { ...prev.profile, name }
  }));
};`,
        explanation: `⚠️ **PROBLEMAS COMUNS**:

🚫 **MUTAÇÃO DIRETA**:
• React usa Object.is() para comparar
• Mutação não cria novo objeto → sem re-render
• SEMPRE crie novo estado

🔄 **ESTADO DESATUALIZADO**:
• Estado é "snapshot" do momento do render
• Múltiplas chamadas usam o mesmo valor
• Use callback para valor atual: setCount(prev => prev + 1)

🗂️ **OBJETOS COMPLEXOS**:
• Spread operator para criar cópias
• Bibliotecas como Immer para facilitar
• Considere múltiplos useState para objetos grandes

⚡ **PERFORMANCE**:
• useState dispara re-render mesmo com valor igual
• Use useMemo/useCallback para otimizar
• Considere useReducer para estados complexos`
      },
      icon: '⚠️'
    },
    {
      id: 'usestate-best-practices',
      title: 'useState - Boas Práticas',
      description: 'Como usar useState de forma eficiente',
      category: 'hooks',
      color: 'bg-emerald-100 border-emerald-300',
      position: { x: 150, y: 700 },
      code: {
        language: 'typescript',
        example: `// ✅ PRÁTICA 1: Estado inicial calculado
const [expensiveValue, setExpensiveValue] = useState(() => {
  // Só executa uma vez, no primeiro render
  return computeExpensiveValue();
});

// ✅ PRÁTICA 2: Múltiplos estados relacionados
const [user, setUser] = useState({ name: '', email: '' });
// ao invés de:
// const [name, setName] = useState('');
// const [email, setEmail] = useState('');

// ✅ PRÁTICA 3: Custom hook para lógica complexa
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
}

// ✅ PRÁTICA 4: Validação de tipos com TypeScript
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);`,
        explanation: `🏆 **BOAS PRÁTICAS**:

⚡ **INICIALIZAÇÃO LAZY**:
• Use função para cálculos pesados
• useState(() => calcular()) vs useState(calcular())
• Primeira executa uma vez, segunda sempre

🎯 **AGRUPAMENTO INTELIGENTE**:
• Estados relacionados → um objeto
• Estados independentes → separados
• Facilita updates e manutenção

🔧 **CUSTOM HOOKS**:
• Extraia lógica reutilizável
• Teste separadamente
• Melhora legibilidade

🛡️ **TYPESCRIPT**:
• Defina interfaces para estados complexos
• Use unions: useState<User | null>
• Evite any - seja específico`
      },
      icon: '✅'
    },
    {
      id: 'useeffect-concept',
      title: 'useEffect - Side Effects',
      description: 'O hook para efeitos colaterais e lifecycle',
      category: 'hooks',
      color: 'bg-orange-100 border-orange-300',
      position: { x: 550, y: 200 },
      connections: ['useeffect-dependencies', 'useeffect-cleanup'],
      code: {
        language: 'typescript',
        example: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Effect para buscar dados
  useEffect(() => {
    let cancelled = false;
    
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get(\`/users/\${userId}\`);
        
        // Evita race condition
        if (!cancelled) {
          setUser(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    
    fetchUser();
    
    // Cleanup para cancelar requisição
    return () => {
      cancelled = true;
    };
  }, [userId]); // Re-executa quando userId muda
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  return user ? <h1>{user.name}</h1> : null;
}`,
        explanation: `🎓 ENTENDA O useEffect:

⚡ **O QUE É**:
• Hook para "efeitos colaterais" (side effects)
• Substitui componentDidMount, componentDidUpdate, componentWillUnmount
• Executa após o DOM ser atualizado

✅ **PRINCIPAIS USOS**:
• Buscar dados de APIs
• Configurar timers e intervalos
• Adicionar/remover event listeners
• Manipular DOM diretamente
• Cleanup de recursos

📊 **TIMING DE EXECUÇÃO**:

1. **Componente renderiza** → HTML é atualizado no DOM
2. **useEffect executa** → Depois que o DOM está pronto
3. **Dependências mudam** → Effect executa novamente
4. **Componente desmonta** → Cleanup function executa

🎯 **VANTAGENS**:
• Não bloqueia renderização (assíncrono)
• Centraliza lógica de side effects
• Fácil de testar e debuggar
• Cleanup automático previne memory leaks`
      },
      icon: '⚡'
    },
    {
      id: 'useeffect-dependencies',
      title: 'Array de Dependências - Guia Completo',
      description: 'Domine o controle de quando effects executam',
      category: 'hooks',
      color: 'bg-blue-100 border-blue-300',
      position: { x: 400, y: 400 },
      connections: ['useeffect-advanced'],
      code: {
        language: 'typescript',
        example: `// 🔄 CENÁRIO 1: Executa sempre (sem array)
useEffect(() => {
  console.log('Executa a cada render');
  document.title = \`Contagem: \${count}\`;
}); // ⚠️ Cuidado: pode causar loops infinitos

// 🚀 CENÁRIO 2: Executa uma vez (array vazio)
useEffect(() => {
  console.log('Executa só no mount');
  // Setup inicial, event listeners globais
  const handleResize = () => setWindowSize(window.innerWidth);
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // ✅ Array vazio = componentDidMount + componentWillUnmount

// 🎯 CENÁRIO 3: Executa quando dependências mudam
useEffect(() => {
  console.log('userId mudou:', userId);
  fetchUserData(userId);
}, [userId]); // ✅ Re-executa quando userId muda

// 🔧 CENÁRIO 4: Múltiplas dependências
useEffect(() => {
  if (userId && isAuthenticated) {
    fetchPrivateUserData(userId, authToken);
  }
}, [userId, isAuthenticated, authToken]);

// ❌ ERRO COMUM: Dependência esquecida
useEffect(() => {
  fetchData(endpoint, filters); // filters está sendo usado...
}, [endpoint]); // ...mas não está nas dependências!

// ✅ CORRETO: Todas as dependências incluídas
useEffect(() => {
  fetchData(endpoint, filters);
}, [endpoint, filters]); // ✅ ESLint te ajuda com isso!`,
        explanation: `🎯 **GUIA DE DEPENDÊNCIAS**:

📝 **REGRA DE OURO**:
• Todas as variáveis do componente usadas no effect
• Props, state, funções criadas no componente
• ESLint plugin: eslint-plugin-react-hooks te ajuda

🔄 **TIPOS DE ARRAY**:

🚫 **Sem Array**: useEffect(() => {})
• Executa após EVERY render
• Geralmente é um BUG
• Use apenas para logs/debugging

⚡ **Array Vazio**: useEffect(() => {}, [])
• Executa apenas uma vez (mount)
• Ideal para: setup inicial, timers globais
• Equivale a componentDidMount

🎯 **Com Dependências**: useEffect(() => {}, [dep1, dep2])
• Executa quando qualquer dependência muda
• React usa Object.is() para comparar
• Objetos/arrays são comparados por referência

⚠️ **PROBLEMAS COMUNS**:
• Dependência esquecida → effect não re-executa
• Referência muda sempre → loop infinito
• useCallback/useMemo para estabilizar referências`
      },
      icon: '🔗'
    },
    {
      id: 'useeffect-cleanup',
      title: 'Cleanup - Evitando Memory Leaks',
      description: 'Como limpar recursos e prevenir vazamentos',
      category: 'hooks',
      color: 'bg-purple-100 border-purple-300',
      position: { x: 700, y: 400 },
      connections: ['useeffect-advanced'],
      code: {
        language: 'typescript',
        example: `// 🧹 CLEANUP PATTERN BÁSICO
useEffect(() => {
  // 1. Setup: criar recurso
  const timer = setInterval(() => {
    console.log('Timer executando...');
  }, 1000);
  
  // 2. Cleanup: limpar recurso
  return () => {
    clearInterval(timer);
  };
}, []);

// 🌐 CLEANUP: Event Listeners
useEffect(() => {
  const handleScroll = () => {
    console.log('Scroll position:', window.scrollY);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') setShowModal(false);
  };
  
  // Setup
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('keydown', handleKeyPress);
  
  // Cleanup
  return () => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('keydown', handleKeyPress);
  };
}, [setShowModal]);

// 🔄 CLEANUP: Requisições (AbortController)
useEffect(() => {
  const controller = new AbortController();
  
  async function fetchData() {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal // ✅ Conecta com AbortController
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Requisição cancelada');
      } else {
        setError(error.message);
      }
    }
  }
  
  fetchData();
  
  // Cleanup: cancela requisição pendente
  return () => {
    controller.abort();
  };
}, []);

// 📡 CLEANUP: WebSocket
useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080');
  
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    setMessages(prev => [...prev, message]);
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  // Cleanup: fechar conexão
  return () => {
    ws.close();
  };
}, []);`,
        explanation: `🧹 **POR QUE CLEANUP É CRUCIAL**:

💣 **MEMORY LEAKS COMUNS**:
• Timers que continuam rodando
• Event listeners não removidos  
• Requisições que ainda executam
• WebSockets/connections abertas

✅ **RECURSOS QUE PRECISAM CLEANUP**:
• setInterval/setTimeout
• Event listeners (window, document)
• Requisições HTTP canceláveis
• WebSockets, EventSource
• Observadores (Intersection, Mutation, Resize)

🔄 **QUANDO CLEANUP EXECUTA**:
• Antes do próximo effect (se dependências mudaram)
• Quando componente desmonta (unmount)
• React garante que cleanup sempre execute

⚡ **PATTERNS AVANÇADOS**:
• AbortController para requisições
• Flags booleanas (let cancelled = false)
• Custom hooks para encapsular cleanup
• Libraries como use-async-effect

🎯 **DICA DE PERFORMANCE**:
• Cleanup pesado pode travar unmount
• Use setTimeout/requestIdleCallback se necessário
• Mantenha cleanup simples e rápido`
      },
      icon: '🧹'
    },
    {
      id: 'useeffect-advanced',
      title: 'useEffect - Patterns Avançados',
      description: 'Técnicas profissionais para dominar useEffect',
      category: 'hooks',
      color: 'bg-indigo-100 border-indigo-300',
      position: { x: 550, y: 650 },
      code: {
        language: 'typescript',
        example: `// 🎯 PATTERN 1: Effect condicional
useEffect(() => {
  // Só executa se condições forem verdadeiras
  if (!userId || !isAuthenticated) return;
  
  fetchUserData(userId, authToken);
}, [userId, isAuthenticated, authToken]);

// 🔄 PATTERN 2: Effect com debounce
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // Só executa após 500ms sem mudanças
    searchUsers(searchTerm);
  }, 500);
  
  return () => clearTimeout(timeoutId);
}, [searchTerm]);

// 📊 PATTERN 3: Effect com loading states
useEffect(() => {
  let cancelled = false;
  
  async function loadData() {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchData(params);
      if (!cancelled) {
        setData(data);
      }
    } catch (err) {
      if (!cancelled) {
        setError(err.message);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }
  
  loadData();
  
  return () => {
    cancelled = true;
  };
}, [params]);

// 🎮 PATTERN 4: Effect com ref para valores atuais
function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  // Salva callback atual
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // Configura interval
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        savedCallback.current(); // Sempre usa callback atual
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}`,
        explanation: `🏆 **PATTERNS PROFISSIONAIS**:

🎯 **CONDITIONAL EFFECTS**:
• Early return para evitar execução desnecessária
• Reduz chamadas de API
• Melhora performance

⏱️ **DEBOUNCING**:
• Evita execuções excessivas (search, resize)
• setTimeout + cleanup pattern
• Libraries: use-debounce, lodash.debounce

🔄 **RACE CONDITIONS**:
• Flag 'cancelled' para evitar setState em componente desmontado
• AbortController para requisições
• Sempre cleanup async operations

📊 **LOADING STATES**:
• loading/error/data pattern
• Try-catch com cleanup
• UX consistente

🎮 **REFS PARA CALLBACKS**:
• useRef mantém referência atual
• Evita re-criação de effects
• Pattern do Dan Abramov

⚡ **PERFORMANCE TIPS**:
• Múltiplos useEffect vs um grande
• Custom hooks para lógica complexa
• useMemo para objetos nas dependências`
      },
      icon: '🚀'
    }
  ],
  connections: [
    {
      id: 'usestate-to-effect',
      path: 'M 350 220 Q 450 180 550 220',
      strokeDasharray: '5,5',
      strokeDashoffset: '120',
      duration: 1.8
    },
    {
      id: 'usestate-to-problems',
      path: 'M 200 300 L 200 430',
      strokeDasharray: '3,3',
      strokeDashoffset: '60',
      duration: 1.3
    },
    {
      id: 'problems-to-best-practices',
      path: 'M 200 550 L 200 680',
      strokeDasharray: '4,4',
      strokeDashoffset: '40',
      duration: 1.2
    },
    {
      id: 'effect-to-deps',
      path: 'M 600 300 Q 550 350 450 380',
      strokeDasharray: '4,4',
      strokeDashoffset: '80',
      duration: 1.5
    },
    {
      id: 'effect-to-cleanup',
      path: 'M 650 300 Q 700 350 750 380',
      strokeDasharray: '4,4',
      strokeDashoffset: '80',
      duration: 1.5
    },
    {
      id: 'deps-to-advanced',
      path: 'M 450 500 Q 500 550 550 630',
      strokeDasharray: '5,5',
      strokeDashoffset: '100',
      duration: 1.6
    },
    {
      id: 'cleanup-to-advanced',
      path: 'M 750 500 Q 700 550 600 630',
      strokeDasharray: '5,5',
      strokeDashoffset: '100',
      duration: 1.6
    }
  ]
};
