import { useState, useEffect, useRef } from 'react';
import './App.css';
import MatchCenter from './components/MatchCenter';
import Newsletter from './components/Newsletter';

function App() {
  const [scrollY, setScrollY] = useState<number>(0);

  // Ultra-Smooth Momentum Drag-to-scroll state
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDown = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftPos = useRef<number>(0);
  const exactScrollLeft = useRef<number>(0); // Tracks floating point scroll for buttery deceleration
  const momentumID = useRef<number | null>(null);
  const velocityTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const velX = useRef<number>(0);
  const prevX = useRef<number>(0);
  const [cursorState, setCursorState] = useState<'grab' | 'grabbing'>('grab');

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!carouselRef.current) return;
    
    isDown.current = true;
    setCursorState('grabbing');
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftPos.current = carouselRef.current.scrollLeft;
    exactScrollLeft.current = scrollLeftPos.current;
    prevX.current = e.pageX;
    
    if (momentumID.current !== null) {
      cancelAnimationFrame(momentumID.current);
    }
  };

  const handleMouseLeave = (): void => {
    if (!isDown.current) return;
    isDown.current = false;
    setCursorState('grab');
    beginMomentum();
  };

  const handleMouseUp = (): void => {
    if (!isDown.current) return;
    isDown.current = false;
    setCursorState('grab');
    beginMomentum();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDown.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.0; // 1:1 speed for pixel-perfect smooth dragging
    
    exactScrollLeft.current = scrollLeftPos.current - walk;
    carouselRef.current.scrollLeft = exactScrollLeft.current;
    
    // Calculate velocity for momentum throw
    velX.current = prevX.current - e.pageX;
    prevX.current = e.pageX;

    // Clear velocity if user stops dragging but holds mouse
    if (velocityTimeout.current !== null) {
      clearTimeout(velocityTimeout.current);
    }
    velocityTimeout.current = setTimeout(() => {
      velX.current = 0;
    }, 100);
  };

  const runMomentumLoop = (): void => {
    if (momentumID.current !== null) return; // Prevent multiple loops
    
    const loop = (): void => {
      if (!carouselRef.current) return;
      
      if (Math.abs(velX.current) > 0.5) {
        exactScrollLeft.current += velX.current;
        carouselRef.current.scrollLeft = exactScrollLeft.current;
        velX.current *= 0.92; // 0.92 provides a very natural deceleration curve
        momentumID.current = requestAnimationFrame(loop);
      } else {
        momentumID.current = null;
      }
    };
    momentumID.current = requestAnimationFrame(loop);
  };

  const beginMomentum = (): void => {
    velX.current = velX.current * 1.5; // Smooth throw boost for dragging
    runMomentumLoop();
  };

  const scrollCarousel = (direction: number): void => {
    if (!carouselRef.current) return;
    
    // Sync exact floating point with real scroll
    if (Math.abs(exactScrollLeft.current - carouselRef.current.scrollLeft) > 1) {
      exactScrollLeft.current = carouselRef.current.scrollLeft;
    }
    
    // Inject a massive velocity burst for the physics engine
    velX.current += direction * 35; 
    runMomentumLoop();
  };

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    // Add window scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use scrollY to prevent unused variable warning
  console.log('Current scroll position:', scrollY);

  return (
    <div className="app-container">
      {/* Fixed Navigation - Full Width */}
      <div className="nav-wrapper fixed-nav">
        <nav className="nav-bar">
          <div className="nav-left">
            <button className="nav-hamburger">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="logo">
              <img src="/Images/Arsenal PNG Logo.png" alt="Arsenal Logo" className="logo-img" />
              ARSENAL FC
            </div>
          </div>

          <div className="nav-center">
            <div className="nav-links">
              <a href="#gooners">Gooners</a>
              <a href="#tickets">Tickets</a>
              <a href="#hospitality">Hospitality</a>
              <a href="#tour">Tour</a>
              <a href="#shop">Shop</a>
              <a href="#tv">Arsenal TV</a>
            </div>
          </div>

          <div className="nav-right">
            <button className="sign-in-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Sign in</span>
            </button>
          </div>
        </nav>
      </div>

      {/* New Hero Section */}
      <div className="hero-grid-layout">
        <div className="hero-left">
          <div className="tags">
            <span className="tag">Emirates Stadium</span>
            <span className="tag">North London</span>
          </div>
          <h1 className="hero-title">
            ALWAYS<br />
            FORWARD
          </h1>
          <p className="hero-desc">
            History, Class, and Tradition. Premier League Champions 2026. UEFA Champions League Winners 2026. Come on you Gunners.
          </p>
          <div className="hero-cta-group">
            <button className="btn-gold">LATEST KIT</button>
            <button className="btn-outline">VIEW SQUAD</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-graphic">
            <div className="shape red-block"></div>
            <div className="shape gold-block"></div>
            <div className="player-cutout"></div>
          </div>
        </div>
      </div>


      {/* Manual scrolling carousel */}
      <section className="articles-section">
        <div className="articles-header">
          <h2>ARTICLES</h2>
        </div>
        <div 
          className="carousel-wrapper"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: cursorState }}
        >
          <div className="carousel-track">
          <div className="news-card" style={{ backgroundImage: "url('/Images/ART1.jpg')" }}>
            <div className="news-card-overlay"></div>
            <div className="news-card-content">
              <h2 className="news-card-title">Odegaard Signs New Long-Term Contract</h2>
              <button className="news-card-btn">Read Article</button>
            </div>
          </div>
          <div className="news-card wide" style={{ backgroundImage: "url('/Images/ART2.jpg')" }}>
            <div className="news-card-overlay"></div>
            <div className="news-card-content">
              <h2 className="news-card-title">Mikel Arteta Reflects on a Historic Season</h2>
              <button className="news-card-btn">Read Article</button>
            </div>
          </div>
          <div className="news-card" style={{ backgroundImage: "url('/Images/ART3.jpg')" }}>
            <div className="news-card-overlay"></div>
            <div className="news-card-content">
              <h2 className="news-card-title">Inside the Arsenal Academy: The Next Generation</h2>
              <button className="news-card-btn">Read Article</button>
            </div>
          </div>
          <div className="news-card wide" style={{ backgroundImage: "url('/Images/ART4.jpg')" }}>
            <div className="news-card-overlay"></div>
            <div className="news-card-content">
              <h2 className="news-card-title">Saka Named Premier League Player of the Month</h2>
              <button className="news-card-btn">Read Article</button>
            </div>
          </div>
          <div className="news-card" style={{ backgroundImage: "url('/Images/ART5.jpg')" }}>
            <div className="news-card-overlay"></div>
            <div className="news-card-content">
              <h2 className="news-card-title">Emirates Stadium Expansion Plans Announced</h2>
              <button className="news-card-btn">Read Article</button>
            </div>
          </div>
          <div className="news-card wide" style={{ backgroundImage: "url('/Images/ART6.jpg')" }}>
            <div className="news-card-overlay"></div>
            <div className="news-card-content">
              <h2 className="news-card-title">Invincibles Anniversary: 20 Years Later</h2>
              <button className="news-card-btn">Read Article</button>
            </div>
          </div>
          <div className="news-card" style={{ backgroundImage: "url('/Images/ART7.jpg')" }}>
            <div className="news-card-overlay"></div>
            <div className="news-card-content">
              <h2 className="news-card-title">Women's Team Secures Record-Breaking Win</h2>
              <button className="news-card-btn">Read Article</button>
            </div>
          </div>
          </div>
        </div>
        
        <div className="articles-footer">
          <button className="read-more-btn">Read More News</button>
          
          <div className="carousel-controls">
            <button className="carousel-arrow" onClick={() => scrollCarousel(-1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="carousel-arrow" onClick={() => scrollCarousel(1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Match Center Section */}
      <MatchCenter />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}

export default App;
