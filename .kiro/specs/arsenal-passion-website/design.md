np# Arsenal Passion Website - Technical Design

## 1. High-Level Design

### 1.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Arsenal Passion Website                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Header     │  │  Navigation  │  │   Footer     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Hero Section (Banner)                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Match Results│  │Player Profiles│  │ News Section │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Photo Gallery                            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Football API │    │  Local State │    │ Static Assets│
│ (Optional)   │    │  Management  │    │   (Images)   │
└──────────────┘    └──────────────┘    └──────────────┘
```

### 1.2 Technology Stack

**Frontend Framework:**
- React 18+ with TypeScript
- Vite for build tooling and dev server

**Styling:**
- Tailwind CSS for utility-first styling
- CSS Modules for component-specific styles (optional)

**State Management:**
- React Context API for global state
- React Hooks (useState, useEffect, useContext)

**Routing:**
- React Router v6 for client-side routing

**Data Fetching:**
- Fetch API or Axios for HTTP requests
- Optional: React Query for data caching

**External APIs (Optional):**
- Football-Data.org API
- TheSportsDB API
- NewsAPI for Arsenal news

### 1.3 Component Architecture

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   └── Navigation
│   └── Footer
├── Pages
│   ├── Home
│   │   ├── Hero
│   │   ├── MatchResults
│   │   ├── PlayerHighlights
│   │   └── NewsPreview
│   ├── Matches
│   │   ├── MatchList
│   │   └── MatchCard
│   ├── Players
│   │   ├── PlayerGrid
│   │   └── PlayerCard
│   ├── News
│   │   ├── NewsList
│   │   └── NewsArticle
│   └── Gallery
│       ├── PhotoGrid
│       └── PhotoModal
└── Shared
    ├── Button
    ├── Card
    ├── Loading
    └── ErrorBoundary
```

### 1.4 Data Models

**Match:**
```typescript
interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: Date;
  competition: string;
  venue: string;
  status: 'scheduled' | 'live' | 'finished';
}
```

**Player:**
```typescript
interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  nationality: string;
  age: number;
  photo: string;
  stats?: {
    goals: number;
    assists: number;
    appearances: number;
  };
}
```

**NewsArticle:**
```typescript
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedDate: Date;
  imageUrl: string;
  category: string;
}
```

**Photo:**
```typescript
interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  caption: string;
  date: Date;
  category: string;
}
```

### 1.5 Folder Structure

```
arsenal-passion-website/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── players/
│   │   └── gallery/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── MatchResults.tsx
│   │   │   └── PlayerHighlights.tsx
│   │   ├── matches/
│   │   │   ├── MatchList.tsx
│   │   │   └── MatchCard.tsx
│   │   ├── players/
│   │   │   ├── PlayerGrid.tsx
│   │   │   └── PlayerCard.tsx
│   │   ├── news/
│   │   │   ├── NewsList.tsx
│   │   │   └── NewsArticle.tsx
│   │   ├── gallery/
│   │   │   ├── PhotoGrid.tsx
│   │   │   └── PhotoModal.tsx
│   │   └── shared/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Loading.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Matches.tsx
│   │   ├── Players.tsx
│   │   ├── News.tsx
│   │   └── Gallery.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── hooks/
│   │   ├── useMatches.ts
│   │   ├── usePlayers.ts
│   │   └── useNews.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── mockData.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── dateFormatter.ts
│   │   └── constants.ts
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 2. Low-Level Design

### 2.1 Core Components Implementation

#### App Component
```typescript
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Players from './pages/Players';
import News from './pages/News';
import Gallery from './pages/Gallery';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/players" element={<Players />} />
            <Route path="/news" element={<News />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
```

#### Header Component
```typescript
// src/components/layout/Header.tsx
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Arsenal Logo" className="h-12 w-12" />
            <h1 className="text-2xl font-bold">Arsenal FC</h1>
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
```

#### Navigation Component
```typescript
// src/components/layout/Navigation.tsx
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/matches', label: 'Matches' },
    { path: '/players', label: 'Players' },
    { path: '/news', label: 'News' },
    { path: '/gallery', label: 'Gallery' },
  ];

  return (
    <nav>
      <ul className="flex space-x-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `hover:text-yellow-300 transition-colors ${
                  isActive ? 'text-yellow-300 font-semibold' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
```

#### Hero Component
```typescript
// src/components/home/Hero.tsx
const Hero: React.FC = () => {
  return (
    <section className="relative h-96 bg-gradient-to-r from-red-600 to-red-800 text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h2 className="text-5xl font-bold mb-4">Welcome to Arsenal Nation</h2>
        <p className="text-xl mb-8">
          The home of Gunners passion, pride, and glory
        </p>
        <button className="bg-yellow-400 text-red-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
          Explore Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
```

#### MatchCard Component
```typescript
// src/components/matches/MatchCard.tsx
import { Match } from '../../types';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isArsenalHome = match.homeTeam === 'Arsenal';
  const arsenalScore = isArsenalHome ? match.homeScore : match.awayScore;
  const opponentScore = isArsenalHome ? match.awayScore : match.homeScore;
  const opponent = isArsenalHome ? match.awayTeam : match.homeTeam;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="text-sm text-gray-500 mb-2">{match.competition}</div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-center flex-1">
          <div className="font-bold text-lg">Arsenal</div>
          <div className="text-3xl font-bold text-red-600">{arsenalScore}</div>
        </div>
        <div className="text-2xl font-bold text-gray-400 mx-4">-</div>
        <div className="text-center flex-1">
          <div className="font-bold text-lg">{opponent}</div>
          <div className="text-3xl font-bold">{opponentScore}</div>
        </div>
      </div>
      <div className="text-sm text-gray-600 text-center">
        {new Date(match.date).toLocaleDateString()} • {match.venue}
      </div>
      <div className={`mt-2 text-center text-sm font-semibold ${
        match.status === 'live' ? 'text-green-600' : 'text-gray-500'
      }`}>
        {match.status.toUpperCase()}
      </div>
    </div>
  );
};

export default MatchCard;
```

#### PlayerCard Component
```typescript
// src/components/players/PlayerCard.tsx
import { Player } from '../../types';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-64 bg-gradient-to-b from-red-600 to-red-800">
        <img
          src={player.photo}
          alt={player.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white text-red-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
          {player.number}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{player.name}</h3>
        <p className="text-gray-600 mb-1">{player.position}</p>
        <p className="text-sm text-gray-500">{player.nationality}</p>
        {player.stats && (
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{player.stats.goals}</div>
              <div className="text-xs text-gray-500">Goals</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{player.stats.assists}</div>
              <div className="text-xs text-gray-500">Assists</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{player.stats.appearances}</div>
              <div className="text-xs text-gray-500">Apps</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
```

### 2.2 State Management

#### App Context
```typescript
// src/context/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Match, Player, NewsArticle } from '../types';

interface AppContextType {
  matches: Match[];
  players: Player[];
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  setMatches: (matches: Match[]) => void;
  setPlayers: (players: Player[]) => void;
  setNews: (news: NewsArticle[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        matches,
        players,
        news,
        loading,
        error,
        setMatches,
        setPlayers,
        setNews,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
```

### 2.3 Custom Hooks

#### useMatches Hook
```typescript
// src/hooks/useMatches.ts
import { useState, useEffect } from 'react';
import { Match } from '../types';
import { fetchMatches } from '../services/api';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        const data = await fetchMatches();
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load matches');
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  return { matches, loading, error };
};
```

### 2.4 API Service Layer

```typescript
// src/services/api.ts
import { Match, Player, NewsArticle } from '../types';
import { mockMatches, mockPlayers, mockNews } from './mockData';

const USE_MOCK_DATA = true; // Toggle for development

export const fetchMatches = async (): Promise<Match[]> => {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockMatches);
  }
  
  // Real API implementation
  const response = await fetch('https://api.football-data.org/v4/teams/57/matches');
  if (!response.ok) throw new Error('Failed to fetch matches');
  return response.json();
};

export const fetchPlayers = async (): Promise<Player[]> => {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockPlayers);
  }
  
  const response = await fetch('https://api.football-data.org/v4/teams/57/squad');
  if (!response.ok) throw new Error('Failed to fetch players');
  return response.json();
};

export const fetchNews = async (): Promise<NewsArticle[]> => {
  if (USE_MOCK_DATA) {
    return Promise.resolve(mockNews);
  }
  
  const response = await fetch('https://newsapi.org/v2/everything?q=Arsenal+FC');
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
};
```

### 2.5 Utility Functions

```typescript
// src/utils/dateFormatter.ts
export const formatMatchDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};

export const formatMatchTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
```

```typescript
// src/utils/constants.ts
export const ARSENAL_COLORS = {
  primary: '#EF0107',
  secondary: '#023474',
  gold: '#9C824A',
  white: '#FFFFFF',
};

export const POSITIONS = {
  GK: 'Goalkeeper',
  DEF: 'Defender',
  MID: 'Midfielder',
  FWD: 'Forward',
};

export const COMPETITIONS = {
  PL: 'Premier League',
  UCL: 'UEFA Champions League',
  FAC: 'FA Cup',
  EFL: 'EFL Cup',
};
```

## 3. Responsive Design Strategy

### 3.1 Breakpoints (Tailwind CSS)
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 3.2 Mobile-First Approach
All components will be designed mobile-first, with progressive enhancement for larger screens.

## 4. Performance Optimization

### 4.1 Code Splitting
- Lazy load route components
- Dynamic imports for heavy components

### 4.2 Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading for images
- Responsive images with srcset

### 4.3 Caching Strategy
- Service Worker for offline support (optional)
- LocalStorage for user preferences
- API response caching

## 5. Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Alt text for all images

## 6. Testing Strategy

### 6.1 Unit Tests
- Component rendering tests
- Hook functionality tests
- Utility function tests

### 6.2 Integration Tests
- User flow tests
- API integration tests

### 6.3 E2E Tests (Optional)
- Critical user journeys
- Cross-browser testing

## 7. Deployment

### 7.1 Build Process
```bash
npm run build
```

### 7.2 Hosting Options
- Vercel (recommended for React)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### 7.3 CI/CD
- GitHub Actions for automated builds
- Automated testing on PR
- Automatic deployment on merge to main

## 8. Future Enhancements

- User authentication for personalized experience
- Live match commentary
- Fan forum/comments section
- Arsenal history timeline
- Player comparison tool
- Match prediction game
- Dark mode toggle
- Multi-language support
