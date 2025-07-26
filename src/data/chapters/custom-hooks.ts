import { ChapterData } from '@/types';

export const customHooksChapter: ChapterData = {
  id: 'custom-hooks',
  title: '🔧 Custom Hooks & Wrappers',
  description: 'Criando hooks reutilizáveis e wrappers eficientes',
  backgroundColor: 'bg-gradient-to-br from-purple-50 to-pink-100',
  cards: [
    {
      id: 'why-custom-hooks',
      title: 'Por que Custom Hooks?',
      description: 'A arte de reutilizar lógica entre componentes',
      category: 'best-practices',
      color: 'bg-purple-100 border-purple-300',
      position: { x: 150, y: 200 },
      connections: ['hook-patterns', 'wrapper-concepts'],
      code: {
        language: 'typescript',
        example: `// ❌ ANTES: Lógica duplicada em múltiplos componentes
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user?.name}</div>;
}

function UserSettings() {
  // 🔄 MESMA LÓGICA REPETIDA!
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Settings for {user?.name}</div>;
}

// ✅ DEPOIS: Custom Hook reutilizável
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}

// 🎯 COMPONENTES LIMPOS E REUTILIZÁVEIS
function UserProfile() {
  const { user, loading, error } = useUser();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user?.name}</div>;
}

function UserSettings() {
  const { user, loading, error } = useUser();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Settings for {user?.name}</div>;
}`,
        explanation: `🎓 **BENEFÍCIOS DOS CUSTOM HOOKS**:

🔄 **REUTILIZAÇÃO DE LÓGICA**:
• Extrai lógica complexa dos componentes
• Compartilha comportamento entre componentes
• Reduz duplicação de código

🧹 **COMPONENTES MAIS LIMPOS**:
• Foca apenas na renderização
• Separa lógica de apresentação
• Facilita testes e manutenção

⚡ **PERFORMANCE**:
• Cache de dados compartilhado
• Otimizações centralizadas
• Menos re-renders desnecessários

🛡️ **TIPAGEM TYPESCRIPT**:
• Interfaces bem definidas
• Type safety garantido
• IntelliSense melhorado`
      },
      icon: '🔧'
    },
    {
      id: 'hook-patterns',
      title: 'Patterns de Custom Hooks',
      description: 'Padrões comuns e boas práticas',
      category: 'hooks',
      color: 'bg-indigo-100 border-indigo-300',
      position: { x: 500, y: 200 },
      connections: ['advanced-hooks'],
      code: {
        language: 'typescript',
        example: `// 🎯 PATTERN 1: Data Fetching Hook
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

// 🎮 PATTERN 2: Local Storage Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":, error\`);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":, error\`);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// 🔄 PATTERN 3: Debounce Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 📱 PATTERN 4: Media Query Hook
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// 🎯 USO DOS HOOKS:
function MyComponent() {
  const { data: users, loading } = useApi<User[]>('/api/users');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {loading ? 'Loading...' : \`Found \${users?.length} users\`}
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      <p>Search: {debouncedSearch}</p>
      <p>Mobile: {isMobile ? 'Yes' : 'No'}</p>
    </div>
  );
}`,
        explanation: `🏆 **PATTERNS FUNDAMENTAIS**:

📡 **DATA FETCHING**:
• Estado unificado (data, loading, error)
• Refetch manual quando necessário
• Cache e error handling consistente

💾 **PERSISTENT STATE**:
• localStorage/sessionStorage integration
• Sync entre tabs automático
• Error handling para storage issues

⏱️ **DEBOUNCING**:
• Evita calls excessivos
• Perfeito para search/filtering
• Melhora performance drasticamente

📱 **RESPONSIVE DESIGN**:
• Media queries como hooks
• Re-render automático
• Mobile-first approach

🎯 **DICAS DE DESIGN**:
• Sempre retorne objetos ou arrays named
• Use TypeScript generics
• Handle edge cases (window undefined, etc)
• Mantenha hooks pequenos e focados`
      },
      icon: '⚡'
    },
    {
      id: 'wrapper-concepts',
      title: 'Wrapper Components & HOCs',
      description: 'Envolvendo componentes com lógica reutilizável',
      category: 'best-practices',
      color: 'bg-green-100 border-green-300',
      position: { x: 150, y: 450 },
      connections: ['advanced-hooks'],
      code: {
        language: 'typescript',
        example: `// 🎯 PATTERN 1: Error Boundary Wrapper
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Oops! Algo deu errado</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 🔐 PATTERN 2: Auth Wrapper HOC
function withAuth<P extends object>(Component: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();
    
    if (loading) {
      return <div>Verificando autenticação...</div>;
    }
    
    if (!user) {
      return <LoginPrompt />;
    }
    
    return <Component {...props} />;
  };
}

// 📊 PATTERN 3: Loading Wrapper
function withLoading<P extends object>(Component: ComponentType<P>) {
  return function LoadingWrapper(props: P & { loading?: boolean }) {
    const { loading, ...componentProps } = props;
    
    if (loading) {
      return (
        <div className="loading-container">
          <Spinner />
          <p>Carregando...</p>
        </div>
      );
    }
    
    return <Component {...(componentProps as P)} />;
  };
}

// 🎨 PATTERN 4: Theme Provider Wrapper
const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, [setTheme]);
  
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={\`app \${theme}\`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// 🎯 USANDO OS WRAPPERS:
const ProtectedDashboard = withAuth(withLoading(Dashboard));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ProtectedDashboard loading={false} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// 🔗 PATTERN 5: Compound Components
function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { 
          isActive: index === activeTab,
          onClick: () => setActiveTab(index)
        })
      )}
    </div>
  );
}

function TabPanel({ children, isActive, title, onClick }) {
  return (
    <div>
      <button 
        className={\`tab-button \${isActive ? 'active' : ''}\`}
        onClick={onClick}
      >
        {title}
      </button>
      {isActive && <div className="tab-content">{children}</div>}
    </div>
  );
}

// Uso:
<Tabs defaultTab={0}>
  <TabPanel title="Home">
    <HomePage />
  </TabPanel>
  <TabPanel title="About">
    <AboutPage />
  </TabPanel>
</Tabs>`,
        explanation: `🎨 **WRAPPER PATTERNS PROFISSIONAIS**:

🛡️ **ERROR BOUNDARIES**:
• Captura erros em componentes filhos
• Fallback UI graceful
• Logging centralizado de erros

🔐 **AUTHENTICATION WRAPPERS**:
• HOCs para proteger routes
• Loading states durante auth check
• Redirect automático para login

📊 **LOADING WRAPPERS**:
• UI consistente para loading states
• Spinner/skeleton components
• Progressive enhancement

🎨 **THEME PROVIDERS**:
• Context API para temas globais
• CSS variables integration
• Persistent theme selection

🔗 **COMPOUND COMPONENTS**:
• Componentes que trabalham juntos
• Props implícitas via React.cloneElement
• API mais intuitiva para usar

💡 **QUANDO USAR CADA PATTERN**:
• HOCs: Lógica cross-cutting (auth, logging)
• Render Props: Flexibilidade máxima
• Compound: APIs de componentes complexas
• Context: Estado global (theme, user)
• Error Boundaries: Reliability e UX`
      },
      icon: '🎨'
    },
    {
      id: 'advanced-hooks',
      title: 'Advanced Hook Patterns',
      description: 'Técnicas avançadas para hooks complexos',
      category: 'performance',
      color: 'bg-orange-100 border-orange-300',
      position: { x: 350, y: 650 },
      code: {
        language: 'typescript',
        example: `// 🚀 PATTERN 1: useReducer para Estado Complexo
interface State {
  data: any[];
  loading: boolean;
  error: string | null;
  filters: Record<string, any>;
  page: number;
}

type Action = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: any[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_FILTER'; payload: { key: string; value: any } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'RESET' };

function dataReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { 
        ...state, 
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
        page: 1 // Reset page when filtering
      };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'RESET':
      return { data: [], loading: false, error: null, filters: {}, page: 1 };
    default:
      return state;
  }
}

function useDataManager(endpoint: string) {
  const [state, dispatch] = useReducer(dataReducer, {
    data: [],
    loading: false,
    error: null,
    filters: {},
    page: 1
  });

  // 🎯 Memoized fetch function
  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    
    try {
      const params = new URLSearchParams({
        page: state.page.toString(),
        ...state.filters
      });
      
      const response = await fetch(\`\${endpoint}?\${params}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_ERROR', 
        payload: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }, [endpoint, state.page, state.filters]);

  // 🔄 Auto-fetch when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🎮 Action creators
  const actions = useMemo(() => ({
    setFilter: (key: string, value: any) => 
      dispatch({ type: 'SET_FILTER', payload: { key, value } }),
    setPage: (page: number) => 
      dispatch({ type: 'SET_PAGE', payload: page }),
    reset: () => dispatch({ type: 'RESET' }),
    refetch: fetchData
  }), [fetchData]);

  return { ...state, ...actions };
}

// 🎯 PATTERN 2: useCallback com Dependencies Dinâmicas
function useAsyncCallback<T extends any[], R>(
  callback: (...args: T) => Promise<R>,
  deps: any[]
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<R | null>(null);

  const execute = useCallback(async (...args: T) => {
    try {
      setLoading(true);
      setError(null);
      const result = await callback(...args);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, deps);

  return { execute, loading, error, data };
}

// 🔄 PATTERN 3: useInterval que não "stale"
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // 📝 Always use latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // ⏰ Set up the interval
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// 🎯 USO DOS HOOKS AVANÇADOS:
function AdvancedDataTable() {
  const { data, loading, error, setFilter, setPage, refetch } = 
    useDataManager('/api/users');
    
  const { execute: deleteUser, loading: deleting } = useAsyncCallback(
    async (userId: string) => {
      await fetch(\`/api/users/\${userId}\`, { method: 'DELETE' });
      refetch(); // Refresh data after deletion
    },
    [refetch]
  );

  // 🔄 Auto-refresh every 30 seconds
  useInterval(() => {
    if (!loading && !deleting) refetch();
  }, 30000);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input 
        placeholder="Filter by name..."
        onChange={(e) => setFilter('name', e.target.value)}
      />
      
      <table>
        {data.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>
              <button 
                onClick={() => deleteUser(user.id)}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </td>
          </tr>
        ))}
      </table>
      
      <button onClick={() => setPage(prev => prev + 1)}>
        Load More
      </button>
    </div>
  );
}`,
        explanation: `🚀 **ADVANCED PATTERNS EXPLICADOS**:

🎛️ **useReducer PARA ESTADO COMPLEXO**:
• Melhor que múltiplos useState
• Actions bem definidas e testáveis
• Estado sempre consistente
• Debugging mais fácil

🔄 **ASYNC CALLBACKS**:
• Loading/error states automáticos
• Prevenção de race conditions
• Reutilização de lógica async
• Type safety com generics

⏰ **INTERVAL HOOKS**:
• Callback sempre atual (não stale)
• Cleanup automático
• Pause/resume capability

🎯 **PERFORMANCE TIPS**:
• useMemo para objetos complexos
• useCallback para event handlers
• React.memo para componentes puros
• Debounce em inputs de busca

🛡️ **ERROR HANDLING**:
• Try-catch consistente
• Error boundaries
• Graceful degradation
• User feedback claro

💡 **TESTING STRATEGIES**:
• Mock hooks individually
• Test custom hooks isolated
• Integration tests para fluxos
• Snapshot tests para UI`
      },
      icon: '🚀'
    }
  ],
  connections: [
    {
      id: 'why-to-patterns',
      path: 'M 350 220 Q 450 180 500 220',
      strokeDasharray: '5,5',
      strokeDashoffset: '120',
      duration: 1.8
    },
    {
      id: 'why-to-wrappers',
      path: 'M 200 300 L 200 430',
      strokeDasharray: '3,3',
      strokeDashoffset: '60',
      duration: 1.3
    },
    {
      id: 'patterns-to-advanced',
      path: 'M 550 300 Q 500 450 400 630',
      strokeDasharray: '4,4',
      strokeDashoffset: '80',
      duration: 1.5
    },
    {
      id: 'wrappers-to-advanced',
      path: 'M 250 550 Q 300 600 350 630',
      strokeDasharray: '4,4',
      strokeDashoffset: '80',
      duration: 1.5
    }
  ]
};
