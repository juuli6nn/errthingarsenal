const Hero = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #EF0107 0%, #8B0000 100%)',
      color: 'white',
      padding: '5rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 1
      }}></div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <h2 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Welcome to Arsenal Nation
        </h2>
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '2rem',
          opacity: 0.95
        }}>
          The home of Gunners passion, pride, and glory
        </p>
        <button style={{
          backgroundColor: '#FFD700',
          color: '#8B0000',
          padding: '1rem 2.5rem',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#FFC700'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#FFD700'}
        >
          Explore Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
