# 4 Anos de Nosso Amor 💜

Landing page em React com Tailwind CSS e Framer Motion, ultra-otimizada para rodar a 60fps no iPhone XR.

## ✨ Características

### 🎬 Experiência Cinematográfica
- **Splash Loader**: Animação dos anos (2022-2026) com efeito de transição suave
- **Z-Axis Tunnel**: Seção imersiva com efeito 3D de túnel, onde cartões crescem conforme o scroll
- **Glassmorphism**: Cards com backdrop blur e bordas translúcidas para efeito de luxo

### 📱 Otimização Mobile-First
- **Single Column Layout**: Design minimalista focado em mobile
- **GPU Acceleration**: Uso de `will-change: transform, opacity` em todos os elementos animados
- **Smooth Scroll**: Comportamento de scroll nativo do CSS
- **Responsive Design**: Adaptado para todos os tamanhos de tela com breakpoints customizados

### 🎵 Sincronização de Áudio
- **Legendas Sincronizadas**: Texto gigante e centralizado que sincroniza com a música
- **Player Flutuante**: Controle de música fixo no canto inferior direito
- **Progress Bar**: Barra de progresso interativa para controlar o áudio

### 🎨 Estética Silent Luxury
- **Tema Dark Imersivo**: Fundo #050505 com textura de mármore escuro
- **Acentos Lilás**: Cores primárias #c084fc (lilás) e #8b5cf6 (roxo)
- **Tipografia Premium**: 'Playfair Display' para títulos, 'Inter' para textos

## 📁 Estrutura do Projeto

```
src/
├── App.jsx                 # Componente principal
├── main.jsx               # Entrada da aplicação
├── index.css              # Estilos globais com Tailwind
├── components/
│   ├── Splash.jsx        # Loader cinematográfico
│   ├── Counter.jsx       # Contador dinâmico (4 anos, 0 meses, etc)
│   ├── Hero.jsx          # Seção inicial com CTA
│   ├── ZAxisTunnel.jsx   # Efeito tunnel 3D com scroll
│   ├── Gallery.jsx       # Galeria de fotos
│   ├── AcousticPoetry.jsx # Seção final com sincronização de áudio
│   └── MusicPlayer.jsx   # Player flutuante
└── hooks/
    ├── useCounter.js     # Hook para contador dinâmico
    └── useAudioSync.js   # Hook para sincronização de áudio
```

## 🚀 Instalação e Execução

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 🎯 Otimizações para Performance

### 1. **Aceleração de Hardware**
- `gpu-accelerated` class usa `will-change: transform, opacity`
- Transições apenas em propriedades que não causam reflow
- Animations rodam em 60fps no iPhone XR

### 2. **Lazy Loading**
- Imagens com `loading="lazy"`
- Componentes renderizados apenas quando visíveis com `whileInView`

### 3. **Single Column Mobile-First**
- Grid responsivo que se torna coluna única em mobile
- Sem layouts complexos que causem reflow
- Tipografia adaptativa com `clamp()`

### 4. **CSS Otimizado**
- Tailwind CSS com PurgeCSS
- Sem estilos não-utilizados
- CSS-in-JS removido, apenas Tailwind

### 5. **Animações Eficientes**
- Framer Motion com GPU acceleration
- `useTransform` para scroll-linked animations sem JavaScript constante
- `AnimatePresence` para saídas suaves

## 📦 Dependências

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^10.16.4",
  "@studio-freight/lenis": "^1.0.29"
}
```

## 🎵 Arquivos de Mídia

Coloque os seguintes arquivos na raiz do projeto (`public/` ou `/`):

- **Fotos**: `IMG_1420.JPEG`, `IMG_0419.JPEG`, `IMG_1735.JPEG`, `IMG_8285.JPEG`, `IMG_1878.JPEG`, `IMG_1638.JPEG`
- **Música**: `musica.mp3` (referência na seção AcousticPoetry)

## 🎬 Seções Principais

### Splash (Loader)
- Animação cinematográfica dos anos
- Efeito de pulso no botão "Começar"
- Transição suave para o conteúdo

### Counter (Topo)
- Mostra: "4 anos • 0 meses • 15 dias • 19 horas • 45 min • 12 seg"
- Atualiza a cada segundo
- Fica fixo no topo durante o scroll

### Hero
- Título principal "4 Anos de Nosso Amor"
- Botão de scroll com animação de seta
- Decorações com blobs animados

### Z-Axis Tunnel
- 4 cartões fixos com fotos e anos
- Efeito scale (0.5 → 1 → 4) conforme scroll
- Opacity sincronizada (0 → 1 → 0)
- Glassmorphism com backdrop blur

### Gallery
- Grid responsivo de 3 colunas no desktop
- 1 coluna no mobile
- Efeito hover com scale e gradient overlay

### Acoustic Poetry
- Display de legendas sincronizadas com áudio
- Player com progress bar
- Mensagens de amor e dedicatória

## 💡 Performance Tips

1. **Teste no iPhone XR**: Use DevTools do Safari ou Chrome DevTools no iPhone
2. **Lighthouse**: Verifique score de performance (deve ser 90+)
3. **FPS Meter**: Use a aba Performance do DevTools para verificar 60fps
4. **Network**: Compress imagens com TinyPNG ou similar
5. **Caching**: Configure headers de cache para assets estáticos

## 📝 Customização

### Mudar Data de Início
No hook `useCounter`, altere:
```javascript
const startDate = new Date('2022-05-26');
```

### Mudar Cores
No `tailwind.config.js`:
```javascript
colors: {
  primary: '#c084fc',  // Lilás
  accent: '#8b5cf6',   // Roxo
  dark: '#050505',     // Preto
}
```

### Mudar Fotos
No `ZAxisTunnel.jsx` e `Gallery.jsx`, altere os imports de fotos.

### Mudar Legendas
No hook `useAudioSync.js`, atualize o array `lyrics` com novos textos e tempos.

## 🔐 Recursos de Acessibilidade

- Alt text em todas as imagens
- Contraste adequado entre cores
- Suporte a navegação por teclado
- Animações resolvidas com `prefers-reduced-motion`

## 📄 Licença

Feito com 💜 para você.

---

**Made with React + Framer Motion + Tailwind CSS**
