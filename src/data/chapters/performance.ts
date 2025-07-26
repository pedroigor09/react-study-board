import { ChapterData } from '@/types';

export const performanceChapter: ChapterData = {
  id: 'performance',
  title: '🚀 revalidateTag & Performance',
  description: 'Otimização de cache e performance no Next.js',
  backgroundColor: 'bg-gradient-to-br from-orange-50 to-red-100',
  cards: [
    {
      id: 'revalidate-tag-concept',
      title: 'revalidateTag - Cache Inteligente',
      description: 'Sistema de cache granular do Next.js 13+ App Router',
      category: 'performance',
      color: 'bg-orange-100 border-orange-300',
      position: { x: 150, y: 200 },
      connections: ['isr-patterns', 'cache-strategies'],
      code: {
        language: 'typescript',
        example: `// 🎯 REVALIDATETAG - CACHE GRANULAR E INTELIGENTE

// 📁 app/products/[id]/page.tsx
import { revalidateTag } from 'next/cache';

async function getProduct(id: string) {
  const res = await fetch(\`https://api.store.com/products/\${id}\`, {
    next: { 
      // 🏷️ TAG para invalidação seletiva
      tags: ['products', \`product-\${id}\`],
      revalidate: 3600 // 1 hora
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  return res.json();
}

async function getRelatedProducts(categoryId: string) {
  const res = await fetch(\`https://api.store.com/categories/\${categoryId}/products\`, {
    next: { 
      tags: ['products', \`category-\${categoryId}\`],
      revalidate: 1800 // 30 minutos
    }
  });
  
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // ⚡ Ambas requests são cached independentemente
  const [product, relatedProducts] = await Promise.all([
    getProduct(params.id),
    getRelatedProducts(product.categoryId)
  ]);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Preço: {product.price}</p>
      <p>Estoque: {product.stock}</p>
      
      <section>
        <h2>Produtos Relacionados</h2>
        {relatedProducts.map(p => (
          <div key={p.id}>{p.name} - {p.price}</div>
        ))}
      </section>
    </div>
  );
}

// 🔄 INVALIDAÇÃO SELETIVA - API Route
// 📁 app/api/revalidate/route.ts
export async function POST(request: Request) {
  const { tags, secret } = await request.json();
  
  // 🔐 Verificação de segurança
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 });
  }
  
  try {
    // 🎯 Invalida apenas as tags especificadas
    if (Array.isArray(tags)) {
      tags.forEach(tag => revalidateTag(tag));
    } else {
      revalidateTag(tags);
    }
    
    return Response.json({ 
      message: 'Cache invalidated successfully',
      tags: tags 
    });
  } catch (error) {
    return Response.json({ 
      message: 'Error invalidating cache',
      error: error.message 
    }, { status: 500 });
  }
}

// 🛒 EXEMPLO PRÁTICO: Webhook de Atualização de Produto
// 📁 app/api/webhooks/product-updated/route.ts
export async function POST(request: Request) {
  const { productId, action } = await request.json();
  
  switch (action) {
    case 'price_updated':
      // ✅ Invalida apenas este produto específico
      revalidateTag(\`product-\${productId}\`);
      break;
      
    case 'stock_updated':
      // ✅ Invalida produto e lista de produtos
      revalidateTag(\`product-\${productId}\`);
      revalidateTag('products');
      break;
      
    case 'category_changed':
      // ✅ Invalida produto e ambas categorias
      revalidateTag(\`product-\${productId}\`);
      revalidateTag(\`category-\${oldCategoryId}\`);
      revalidateTag(\`category-\${newCategoryId}\`);
      break;
      
    default:
      // 🔄 Invalida tudo relacionado ao produto
      revalidateTag(\`product-\${productId}\`);
  }
  
  return Response.json({ success: true });
}

// 💡 VANTAGENS DO REVALIDATETAG:
// ✅ Cache granular - invalida apenas o necessário
// ✅ Performance máxima - mantém cache válido
// ✅ Dados sempre atualizados quando necessário
// ✅ Reduz carga no servidor e banco de dados
// ✅ SEO perfeito - páginas estáticas + dados dinâmicos`,
        explanation: `🎓 **REVALIDATETAG PROFUNDAMENTE**:

🏷️ **COMO FUNCIONAM AS TAGS**:
• Tags são identificadores únicos para cache groups
• Uma request pode ter múltiplas tags
• Invalidação de uma tag afeta todas requests com ela
• Sistema hierárquico: 'products' > 'product-123'

⚡ **TIMING E ESTRATÉGIAS**:
• ISR (Incremental Static Regeneration) automático
• On-demand revalidation via webhooks
• Background regeneration - usuário não espera
• Stale-while-revalidate pattern

🎯 **PATTERNS DE TAGGING**:
• Entidades: 'users', 'products', 'posts'
• Específicas: 'user-123', 'product-456'
• Relacionais: 'user-123-posts', 'category-tech'
• Hierárquicas: 'blog', 'blog-tech', 'blog-tech-react'

🔄 **INVALIDATION STRATEGIES**:
• Single entity: revalidateTag('product-123')
• Category: revalidateTag('tech-products')
• Global: revalidateTag('products')
• Cascading: multiple tags por action

💰 **IMPACTO NO NEGÓCIO**:
• 90% redução em API calls
• Sub-second page loads
• Real-time data quando necessário
• Scaling automático sem complexity`
      },
      icon: '🏷️'
    },
    {
      id: 'isr-patterns',
      title: 'ISR - Incremental Static Regeneration',
      description: 'O melhor dos dois mundos: estático + dinâmico',
      category: 'performance',
      color: 'bg-blue-100 border-blue-300',
      position: { x: 500, y: 200 },
      connections: ['performance-optimization'],
      code: {
        language: 'typescript',
        example: `// 🔄 ISR - INCREMENTAL STATIC REGENERATION

// 1️⃣ PÁGINA COM ISR BÁSICO
// 📁 app/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalida a cada 1 hora

async function getPost(slug: string) {
  const res = await fetch(\`https://api.blog.com/posts/\${slug}\`, {
    next: { 
      revalidate: 3600, // 1 hora
      tags: ['posts', \`post-\${slug}\`] // Tag específica
    }
  });
  
  return res.json();
}

async function getComments(postId: string) {
  const res = await fetch(\`https://api.blog.com/posts/\${postId}/comments\`, {
    next: { 
      revalidate: 300, // 5 minutos - comentários mudam mais
      tags: ['comments', \`comments-\${postId}\`]
    }
  });
  
  return res.json();
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  const comments = await getComments(post.id);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>Publicado em: {new Date(post.createdAt).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <section>
        <h3>Comentários ({comments.length})</h3>
        {comments.map(comment => (
          <div key={comment.id}>
            <strong>{comment.author}</strong>
            <p>{comment.content}</p>
          </div>
        ))}
      </section>
    </article>
  );
}

// 2️⃣ ON-DEMAND REVALIDATION
// 📁 app/api/revalidate-post/route.ts
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const { slug, secret } = await request.json();
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 });
  }
  
  try {
    // 🎯 Invalida post específico
    revalidateTag(\`post-\${slug}\`);
    
    return Response.json({ 
      message: 'Post revalidated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return Response.json({ 
      message: 'Error revalidating post' 
    }, { status: 500 });
  }
}

// 3️⃣ WEBHOOK INTEGRATION
// 📁 app/api/webhooks/cms/route.ts
export async function POST(request: Request) {
  const payload = await request.json();
  const { event, data } = payload;
  
  // 🔐 Verify webhook signature (implementar conforme CMS)
  const signature = request.headers.get('x-webhook-signature');
  if (!verifySignature(signature, payload)) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }
  
  switch (event) {
    case 'post.published':
      // ✅ Novo post - revalida lista de posts
      revalidateTag('posts');
      break;
      
    case 'post.updated':
      // ✅ Post atualizado - revalida post específico
      revalidateTag(\`post-\${data.slug}\`);
      break;
      
    case 'comment.created':
      // ✅ Novo comentário - revalida comentários do post
      revalidateTag(\`comments-\${data.postId}\`);
      break;
      
    case 'author.updated':
      // 🔄 Autor atualizado - pode afetar múltiplos posts
      const authorPosts = await getPostsByAuthor(data.authorId);
      authorPosts.forEach(post => {
        revalidateTag(\`post-\${post.slug}\`);
      });
      break;
      
    default:
      console.log(\`Unknown event: \${event}\`);
  }
  
  return Response.json({ success: true });
}

// 4️⃣ ESTRATÉGIA AVANÇADA: CACHE WARMING
// 📁 app/api/warm-cache/route.ts
export async function POST(request: Request) {
  const { routes, secret } = await request.json();
  
  if (secret !== process.env.CACHE_WARMING_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const results = [];
  
  for (const route of routes) {
    try {
      // 🔥 Faz request para "aquecer" o cache
      const response = await fetch(\`\${process.env.SITE_URL}\${route}\`, {
        headers: {
          'User-Agent': 'Cache-Warmer',
          'Authorization': \`Bearer \${process.env.NEXT_PUBLIC_REVALIDATE_TOKEN}\`
        }
      });
      
      results.push({
        route,
        status: response.status,
        cached: response.headers.get('x-vercel-cache') || 'unknown'
      });
    } catch (error) {
      results.push({
        route,
        error: error.message
      });
    }
  }
  
  return Response.json({ results });
}

// 🎯 MONITORING E ANALYTICS
// 📁 middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // 📊 Add cache headers para monitoring
  response.headers.set('x-cache-timestamp', new Date().toISOString());
  response.headers.set('x-cache-key', generateCacheKey(request.url));
  
  return response;
}

// 💡 ISR BENEFITS:
// ✅ Páginas carregam instantaneamente (servidas do cache)
// ✅ Conteúdo sempre atualizado (revalidation em background)
// ✅ Zero downtime durante updates
// ✅ Escala infinitamente (CDN global)
// ✅ SEO perfeito + UX de SPA`,
        explanation: `🔄 **ISR - O MELHOR DOS DOIS MUNDOS**:

⚡ **COMO FUNCIONA O ISR**:
1. **Primeira visita**: Página é gerada estaticamente
2. **Visitas seguintes**: Servida do cache (instantâneo)
3. **Após revalidate time**: Background regeneration
4. **Nova versão**: Swap atômico, sem downtime

🎯 **ESTRATÉGIAS DE REVALIDATION**:
• **Time-based**: revalidate: 3600 (1 hora)
• **On-demand**: revalidateTag() via webhooks
• **Conditional**: baseado em mudanças reais
• **Hybrid**: combinação de estratégias

📊 **CACHE HIERARCHY**:
Global CDN > Edge Cache > ISR Cache > Origin
   Instant    Near-zero   Background  Source

🔥 **CACHE WARMING STRATEGIES**:
• Pre-generate páginas importantes
• Warm cache após deploy
• Predictive loading baseado em analytics
• Queue-based regeneration

📈 **PERFORMANCE METRICS**:
• TTFB: ~50ms (edge cache)
• FCP: <1s (static content)
• LCP: <1.5s (optimized images)
• CLS: ~0 (layout stable)

💰 **BUSINESS IMPACT**:
• 95% reduction em server load
• 10x faster page loads
• Better SEO rankings
• Improved conversion rates`
      },
      icon: '🔄'
    },
    {
      id: 'cache-strategies',
      title: 'Cache Strategies & Patterns',
      description: 'Estratégias avançadas de cache para performance máxima',
      category: 'performance',
      color: 'bg-green-100 border-green-300',
      position: { x: 150, y: 450 },
      connections: ['performance-optimization'],
      code: {
        language: 'typescript',
        example: `// 🎯 CACHE STRATEGIES PROFISSIONAIS

// 1️⃣ CACHE LAYERING - Múltiplos Níveis
// 📁 lib/cache.ts
class CacheManager {
  private memoryCache = new Map();
  private readonly TTL = {
    short: 5 * 60 * 1000,    // 5 minutos
    medium: 30 * 60 * 1000,  // 30 minutos
    long: 24 * 60 * 60 * 1000 // 24 horas
  };

  async get<T>(key: string): Promise<T | null> {
    // 🚀 Layer 1: Memory cache (fastest)
    const memoryResult = this.memoryCache.get(key);
    if (memoryResult && !this.isExpired(memoryResult)) {
      return memoryResult.data;
    }

    // 💾 Layer 2: Redis cache
    try {
      const redisResult = await redis.get(key);
      if (redisResult) {
        const parsed = JSON.parse(redisResult);
        // Store in memory for next time
        this.setMemory(key, parsed, this.TTL.short);
        return parsed;
      }
    } catch (error) {
      console.warn('Redis cache miss:', error);
    }

    return null;
  }

  async set<T>(key: string, data: T, ttl: number = this.TTL.medium): Promise<void> {
    // 🚀 Store in memory
    this.setMemory(key, data, Math.min(ttl, this.TTL.short));
    
    // 💾 Store in Redis
    try {
      await redis.setex(key, Math.floor(ttl / 1000), JSON.stringify(data));
    } catch (error) {
      console.error('Redis cache set error:', error);
    }
  }

  private setMemory<T>(key: string, data: T, ttl: number): void {
    this.memoryCache.set(key, {
      data,
      expires: Date.now() + ttl
    });
  }

  private isExpired(cached: { expires: number }): boolean {
    return Date.now() > cached.expires;
  }
}

const cache = new CacheManager();

// 2️⃣ SMART CACHING com Stale-While-Revalidate
async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 30 * 60 * 1000
): Promise<T> {
  // 🎯 Try cache first
  const cached = await cache.get<T>(key);
  if (cached) {
    return cached;
  }

  // 🔄 Cache miss - fetch and cache
  const data = await fetcher();
  await cache.set(key, data, ttl);
  return data;
}

// 3️⃣ CACHE INVALIDATION PATTERNS
class SmartCache {
  private dependencies = new Map<string, Set<string>>();

  // 🏷️ Register cache dependencies
  addDependency(childKey: string, parentKey: string): void {
    if (!this.dependencies.has(parentKey)) {
      this.dependencies.set(parentKey, new Set());
    }
    this.dependencies.get(parentKey)?.add(childKey);
  }

  // 🗑️ Cascade invalidation
  async invalidate(key: string): Promise<void> {
    // Invalidate the key itself
    await cache.delete(key);
    
    // Invalidate all dependent keys
    const dependents = this.dependencies.get(key);
    if (dependents) {
      await Promise.all(
        Array.from(dependents).map(depKey => this.invalidate(depKey))
      );
    }
  }
}

// 4️⃣ PRACTICAL USAGE - E-commerce Example
// 📁 lib/product-cache.ts
export class ProductCache {
  static async getProduct(id: string): Promise<Product> {
    return getCachedData(
      \`product:\${id}\`,
      () => fetchProduct(id),
      60 * 60 * 1000 // 1 hour
    );
  }

  static async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return getCachedData(
      \`products:category:\${categoryId}\`,
      () => fetchProductsByCategory(categoryId),
      30 * 60 * 1000 // 30 minutes
    );
  }

  static async searchProducts(query: string): Promise<Product[]> {
    return getCachedData(
      \`products:search:\${query}\`,
      () => searchProducts(query),
      15 * 60 * 1000 // 15 minutes
    );
  }

  // 🔄 Smart invalidation when product updates
  static async invalidateProduct(productId: string): Promise<void> {
    const product = await this.getProduct(productId);
    
    // Invalidate product itself
    await cache.delete(\`product:\${productId}\`);
    
    // Invalidate category listings
    await cache.delete(\`products:category:\${product.categoryId}\`);
    
    // Invalidate search results (más expensive, use with care)
    const searchKeys = await cache.getKeysByPattern('products:search:*');
    await Promise.all(searchKeys.map(key => cache.delete(key)));
  }
}

// 5️⃣ CACHE WARMING AUTOMATION
// 📁 lib/cache-warmer.ts
export class CacheWarmer {
  private queue: Array<() => Promise<void>> = [];
  private isProcessing = false;

  // 🔥 Add cache warming task
  addWarmingTask(task: () => Promise<void>): void {
    this.queue.push(task);
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        try {
          await task();
        } catch (error) {
          console.error('Cache warming task failed:', error);
        }
      }
    }
    
    this.isProcessing = false;
  }

  // 🎯 Warm popular products
  async warmPopularProducts(): Promise<void> {
    const popularIds = await getPopularProductIds();
    
    popularIds.forEach(id => {
      this.addWarmingTask(() => ProductCache.getProduct(id));
    });
  }

  // 📈 Warm based on analytics
  async warmFromAnalytics(): Promise<void> {
    const popularPages = await getPopularPagesFromAnalytics();
    
    popularPages.forEach(page => {
      this.addWarmingTask(async () => {
        // Pre-warm the page by making request
        await fetch(\`\${process.env.SITE_URL}\${page}\`);
      });
    });
  }
}

// 💡 CACHE BEST PRACTICES:
// ✅ Layer caches (memory → Redis → database)
// ✅ Use appropriate TTLs por data type
// ✅ Implement cache warming para páginas críticas
// ✅ Monitor cache hit rates
// ✅ Graceful fallbacks quando cache fails
// ✅ Invalidation cascading para consistency`,
        explanation: `🎯 **CACHE STRATEGIES EXPLICADAS**:

🏗️ **CACHE LAYERING**:
• **L1 (Memory)**: Fastest, limited size, per-instance
• **L2 (Redis)**: Fast, shared, persistent
• **L3 (CDN)**: Global, cached responses
• **L4 (Database)**: Source of truth

⚡ **CACHE PATTERNS**:
• **Cache-Aside**: App manages cache
• **Write-Through**: Write to cache + DB
• **Write-Behind**: Write to cache, async to DB
• **Refresh-Ahead**: Proactive refresh

🎯 **TTL STRATEGIES**:
• **Static content**: 24h+ (images, CSS)
• **Semi-static**: 1-4h (product info)
• **Dynamic**: 5-30min (prices, stock)
• **Real-time**: 30s-5min (comments, likes)

🔄 **INVALIDATION PATTERNS**:
• **Time-based**: Automatic expiration
• **Event-driven**: Trigger on data change
• **Manual**: Admin/API triggered
• **Cascade**: Dependencies invalidation

📊 **MONITORING METRICS**:
• Cache hit rate (target: >80%)
• Average response time
• Cache memory usage
• Invalidation frequency

💰 **PERFORMANCE IMPACT**:
• 10x faster response times
• 90% reduction in DB queries
• Better user experience
• Lower infrastructure costs`
      },
      icon: '💾'
    },
    {
      id: 'performance-optimization',
      title: 'Performance Optimization Avançada',
      description: 'Técnicas profissionais para máxima performance',
      category: 'performance',
      color: 'bg-red-100 border-red-300',
      position: { x: 350, y: 650 },
      code: {
        language: 'typescript',
        example: `// ⚡ PERFORMANCE OPTIMIZATION PROFISSIONAL

// 1️⃣ BUNDLE OPTIMIZATION
// 📁 next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🎯 Bundle Analyzer
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // 📦 Replace heavy libraries with lighter alternatives
        'moment': 'dayjs',
        'lodash': 'lodash-es'
      };
    }
    
    return config;
  },
  
  // 🔄 Compression
  compress: true,
  
  // 📊 Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns']
  },
  
  // 🖼️ Image optimization
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false
  }
};

// 2️⃣ CODE SPLITTING ESTRATÉGICO
// 📁 components/LazyComponents.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 🚀 Dynamic imports com loading states
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false // Client-only component
});

const AdminPanel = dynamic(() => import('./AdminPanel'), {
  loading: () => <div>Carregando painel...</div>
});

// 🎯 Conditional loading
const ConditionalComponent = dynamic(
  () => import('./ConditionalComponent'),
  { ssr: false }
);

export function Dashboard({ user }: { user: User }) {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* ⚡ Always loaded */}
      <QuickStats />
      
      {/* 🔄 Lazy loaded */}
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
      
      {/* 🔐 Conditionally loaded */}
      {user.isAdmin && (
        <Suspense fallback={<div>Loading admin...</div>}>
          <AdminPanel />
        </Suspense>
      )}
    </div>
  );
}

// 3️⃣ MEMOIZATION ESTRATÉGICA
// 📁 hooks/useOptimizedData.ts
import { useMemo, useCallback } from 'react';

function useOptimizedData(rawData: any[], filters: FilterOptions) {
  // 🎯 Expensive calculations memoized
  const processedData = useMemo(() => {
    console.log('Processing data...'); // This should log minimally
    
    return rawData
      .filter(item => {
        if (filters.category && item.category !== filters.category) return false;
        if (filters.minPrice && item.price < filters.minPrice) return false;
        if (filters.search && !item.name.includes(filters.search)) return false;
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price': return a.price - b.price;
          case 'name': return a.name.localeCompare(b.name);
          case 'date': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          default: return 0;
        }
      });
  }, [rawData, filters.category, filters.minPrice, filters.search, filters.sortBy]);

  // 🔄 Callbacks memoized to prevent child re-renders
  const handleItemSelect = useCallback((itemId: string) => {
    // Handle selection logic
    console.log('Selected item:', itemId);
  }, []);

  const handleBulkAction = useCallback((action: string, itemIds: string[]) => {
    // Handle bulk actions
    console.log('Bulk action:', action, itemIds);
  }, []);

  return {
    data: processedData,
    onItemSelect: handleItemSelect,
    onBulkAction: handleBulkAction
  };
}

// 4️⃣ VIRTUAL SCROLLING para Grandes Listas
// 📁 components/VirtualizedList.tsx
import { FixedSizeList as List } from 'react-window';

interface VirtualizedListProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: ({ index, style }: { index: number; style: any }) => React.ReactNode;
}

export function VirtualizedList({ 
  items, 
  itemHeight, 
  containerHeight, 
  renderItem 
}: VirtualizedListProps) {
  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      {renderItem({ index, style })}
    </div>
  );

  return (
    <List
      height={containerHeight}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
}

// 5️⃣ IMAGE OPTIMIZATION AVANÇADA
// 📁 components/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
        onLoad={() => setIsLoading(false)}
        className={
          isLoading 
            ? 'opacity-0 transition-opacity duration-300' 
            : 'opacity-100 transition-opacity duration-300'
        }
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

// 6️⃣ PERFORMANCE MONITORING
// 📁 lib/performance.ts
export class PerformanceMonitor {
  static measureComponent(name: string) {
    return function<T extends React.ComponentType<any>>(Component: T): T {
      const MeasuredComponent = (props: any) => {
        const startTime = performance.now();
        
        useEffect(() => {
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          // 📊 Send to analytics
          if (duration > 100) { // Warn if > 100ms
            console.warn(\`Component \${name} took \${duration}ms to render\`);
          }
          
          // 📈 Track in analytics service
          analytics.track('component_render_time', {
            component: name,
            duration,
            timestamp: Date.now()
          });
        });
        
        return <Component {...props} />;
      };
      
      return MeasuredComponent as T;
    };
  }

  static measurePageLoad() {
    useEffect(() => {
      // 📊 Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            analytics.track('lcp', { value: entry.startTime });
          }
          
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
            analytics.track('fid', { value: entry.processingStart - entry.startTime });
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
      
      return () => observer.disconnect();
    }, []);
  }
}

// 💡 PERFORMANCE CHECKLIST:
// ✅ Bundle analysis (webpack-bundle-analyzer)
// ✅ Code splitting em route level
// ✅ Dynamic imports para componentes pesados
// ✅ React.memo para componentes puros
// ✅ useMemo/useCallback para computações caras
// ✅ Virtual scrolling para listas grandes
// ✅ Image optimization com Next.js Image
// ✅ Preload critical resources
// ✅ Monitor Core Web Vitals
// ✅ Database query optimization`,
        explanation: `⚡ **PERFORMANCE OPTIMIZATION EXPLICADA**:

📦 **BUNDLE OPTIMIZATION**:
• Tree shaking para remover código não usado
• Code splitting por rotas e componentes
• Dynamic imports para carregar sob demanda
• Bundle analysis para identificar bottlenecks

🎯 **MEMOIZATION STRATEGY**:
• **React.memo**: Para componentes puros
• **useMemo**: Para computações caras
• **useCallback**: Para event handlers
• **useMemo vs useCallback**: Objects vs Functions

🖼️ **IMAGE OPTIMIZATION**:
• WebP/AVIF formats
• Responsive sizing
• Lazy loading
• Blur placeholders
• CDN integration

📊 **CORE WEB VITALS**:
• **LCP**: <2.5s (Largest Contentful Paint)
• **FID**: <100ms (First Input Delay)
• **CLS**: <0.1 (Cumulative Layout Shift)

🔄 **LAZY LOADING STRATEGIES**:
• Route-based splitting
• Component-based splitting
• Feature-based splitting
• Conditional loading

📈 **MONITORING & METRICS**:
• Real User Monitoring (RUM)
• Synthetic testing
• Performance budgets
• Continuous monitoring

💰 **BUSINESS IMPACT**:
• 1s faster = 7% more conversions
• Better SEO rankings
• Reduced bounce rate
• Lower infrastructure costs`
      },
      icon: '⚡'
    }
  ],
  connections: [
    {
      id: 'revalidate-to-isr',
      path: 'M 350 220 Q 450 180 500 220',
      strokeDasharray: '5,5',
      strokeDashoffset: '120',
      duration: 1.8
    },
    {
      id: 'revalidate-to-cache',
      path: 'M 200 300 L 200 430',
      strokeDasharray: '3,3',
      strokeDashoffset: '60',
      duration: 1.3
    },
    {
      id: 'isr-to-optimization',
      path: 'M 550 300 Q 500 450 400 630',
      strokeDasharray: '4,4',
      strokeDashoffset: '80',
      duration: 1.5
    },
    {
      id: 'cache-to-optimization',
      path: 'M 250 550 Q 300 600 350 630',
      strokeDasharray: '4,4',
      strokeDashoffset: '80',
      duration: 1.5
    }
  ]
};
