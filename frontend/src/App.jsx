import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MatchCenter from './components/MatchCenter';
import Newsletter from './components/Newsletter';

function App() {
  const [scrollY, setScrollY] = useState(0);

  // Ultra-Smooth Momentum Drag-to-scroll state
  const carouselRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const exactScrollLeft = useRef(0); // Tracks floating point scroll for buttery deceleration
  const momentumID = useRef(null);
  const velocityTimeout = useRef(null);
  const velX = useRef(0);
  const prevX = useRef(0);
  const [cursorState, setCursorState] = useState('grab');

  const handleMouseDown = (e) => {
    isDown.current = true;
    setCursorState('grabbing');
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftPos.current = carouselRef.current.scrollLeft;
    exactScrollLeft.current = scrollLeftPos.current;
    prevX.current = e.pageX;
    cancelAnimationFrame(momentumID.current);
  };

  const handleMouseLeave = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setCursorState('grab');
    beginMomentum();
  };

  const handleMouseUp = () => {
    if (!isDown.current) return;
    isDown.current = false;
    setCursorState('grab');
    beginMomentum();
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.0; // 1:1 speed for pixel-perfect smooth dragging
    
    exactScrollLeft.current = scrollLeftPos.current - walk;
    carouselRef.current.scrollLeft = exactScrollLeft.current;
    
    // Calculate velocity for momentum throw
    velX.current = prevX.current - e.pageX;
    prevX.current = e.pageX;

    // Clear velocity if user stops dragging but holds mouse
    clearTimeout(velocityTimeout.current);
    velocityTimeout.current = setTimeout(() => {
      velX.current = 0;
    }, 100);
  };

  const runMomentumLoop = () => {
    if (momentumID.current) return; // Prevent multiple loops
    
    const loop = () => {
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

  const beginMomentum = () => {
    velX.current = velX.current * 1.5; // Smooth throw boost for dragging
    runMomentumLoop();
  };

  const scrollCarousel = (direction) => {
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
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add window scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic styles based on scroll position
  // The hero container scales down to 0.9 as we scroll down 800px
  const scale = Math.max(0.85, 1 - scrollY / 2500);

  // Border radius goes from 0 to 40px as we scroll
  const borderRadius = Math.min(40, scrollY / 5);

  // Fade out main content slightly so it's not distracting when scrolling past
  const opacity = Math.max(0, 1 - scrollY / 600);

  return (
    <div className="app-container">
      {/* Fixed Navigation - outside of the scaling hero container */}
      <div className="nav-wrapper fixed-nav" style={{
        transform: `translateY(${Math.min(0, scrollY * 0.5)}px)` // slight parallax on nav if desired, or just static
      }}>
        <nav className="nav-bar">
          <div className="logo">
            ARSENAL FC
          </div>

          <div className="nav-links">
            <a href="#photography">Photography</a>
            <a href="#players">Players</a>
            <a href="#matches">Matches</a>
            <a href="#store">Store</a>
          </div>

          <button className="btn-primary">
            Tickets
            <div className="btn-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </button>
        </nav>
      </div>

      {/* Sticky container that holds the scaling hero */}
      <div className="hero-scroll-container">
        <header
          className="hero-container"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
            transition: 'transform 0.05s linear, border-radius 0.05s linear'
          }}
        >
          <div className="hero-overlay"></div>

          <main className="main-content" style={{ opacity, transition: 'opacity 0.05s linear' }}>
            <h1 className="heading-large">
              NORTH LONDON<br />
              IS RED
            </h1>

            <div className="right-content">
              <div className="tags">
                <span className="tag">Emirates Stadium</span>
                <span className="tag">North London</span>
              </div>
              <p className="description">
                History, Class, and Tradition. Premier League Champions 2026. UEFA Champions League Winners 2026.
                Come on you Gunners
              </p>
            </div>
          </main>
        </header>
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
