# 🚀 Guia de Deploy - React Study Board

## 📋 **Opções de Deploy (Código Privado)**

### 🔒 **Opção 1: GitHub - Repositório Privado com Pages Público**

#### ⚠️ **Limitação**: 
GitHub Pages não permite repositório privado com site público no plano gratuito. 

#### 💡 **Soluções**:

**A) Repositório Público + Código Minificado**
- O código vai na build será minificado/ofuscado
- Código fonte não é facilmente legível
- README.md focado em marketing, não em código

**B) Two-Repo Strategy**
```bash
# Repo 1: Privado (desenvolvimento)
my-username/react-study-board-private

# Repo 2: Público (apenas build)
my-username/react-study-board
```

---

### 🌟 **Opção 2: Vercel (RECOMENDADO)**

✅ **Vantagens**:
- Repositório privado gratuito
- Deploy automático
- URL personalizada
- Performance superior

#### 🚀 **Setup Vercel**:

1. **Conecte o GitHub**:
   - Acesse [vercel.com](https://vercel.com)
   - Login com GitHub
   - Import repository (pode ser privado)

2. **Configure o Build**:
   ```bash
   # Build Command
   npm run build
   
   # Output Directory
   out
   ```

3. **Deploy**:
   - Push no GitHub = Deploy automático
   - URL: `https://seu-projeto.vercel.app`

---

### 🔥 **Opção 3: Netlify**

✅ **Vantagens**:
- Repositório privado gratuito
- Drag & drop deploy
- URL personalizada

#### 🚀 **Setup Netlify**:

1. **Build Local**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Acesse [netlify.com](https://netlify.com)
   - Arraste a pasta `out/` 
   - URL: `https://seu-site.netlify.app`

---

## 🛠️ **Setup do Projeto para Deploy**

### 1. **Configurar package.json**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export"
  }
}
```

### 2. **Configurar next.config.js** (já criado)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/react-study-board' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/react-study-board/' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

### 3. **Build e Test Local**
```bash
# Build do projeto
npm run build

# Testar localmente
npx serve out
```

---

## 🎯 **Recomendação Final**

### 🏆 **Melhor Opção: Vercel**
- ✅ Código privado
- ✅ Deploy automático  
- ✅ Performance alta
- ✅ URL personalizada
- ✅ SSL gratuito
- ✅ Preview branches

### 📋 **Passos Vercel**:
1. Push código para GitHub (privado)
2. Import no Vercel
3. Deploy automático
4. Compartilhe apenas a URL final

### 🎁 **Resultado**:
- **Repositório**: Privado (código protegido)
- **Site**: Público e rápido
- **URL**: `https://react-study-board.vercel.app`

---

## 🔗 **URLs Úteis**

- [Vercel](https://vercel.com) - Deploy recomendado
- [Netlify](https://netlify.com) - Alternativa simples
- [GitHub Pages](https://pages.github.com) - Repositório público

---

**💡 Dica**: Vercel é usado pela própria equipe do Next.js e oferece a melhor experiência para projetos React/Next.js!
