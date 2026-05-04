import React from 'react';
import { PlayerCardProps } from '../types/player';

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    >
      <div style={{
        position: 'relative',
        height: '250px',
        background: 'linear-gradient(180deg, #EF0107 0%, #8B0000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '4rem',
        fontWeight: 'bold'
      }}>
        {player?.initials ?? '??'}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: 'white',
          color: '#EF0107',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {player?.number ?? 0}
        </div>
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#1F2937'
        }}>
          {player?.name ?? 'Unknown Player'}
        </h3>
        <p style={{
          color: '#6B7280',
          marginBottom: '0.25rem',
          fontSize: '0.95rem'
        }}>
          {player?.position ?? 'Unknown Position'}
        </p>
        <p style={{
          color: '#9CA3AF',
          fontSize: '0.875rem'
        }}>
          {player?.nationality ?? 'Unknown'}
        </p>
        
        {player.stats && (
          <div style={{
            marginTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: '#EF0107'
              }}>
                {player.stats?.goals ?? 0}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#9CA3AF',
                textTransform: 'uppercase'
              }}>
                Goals
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: '#EF0107'
              }}>
                {player.stats?.assists ?? 0}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#9CA3AF',
                textTransform: 'uppercase'
              }}>
                Assists
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: '#EF0107'
              }}>
                {player.stats?.appearances ?? 0}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#9CA3AF',
                textTransform: 'uppercase'
              }}>
                Apps
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
