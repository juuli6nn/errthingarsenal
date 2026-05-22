import React from 'react';
import { MatchCardProps } from '../types/match';

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isArsenalHome = match.homeTeam === 'Arsenal';
  const arsenalScore = isArsenalHome ? match.homeScore : match.awayScore;
  const opponentScore = isArsenalHome ? match.awayScore : match.homeScore;
  const opponent = isArsenalHome ? match.awayTeam : match.homeTeam;
  
  const getStatusColor = (status: 'live' | 'finished' | 'scheduled'): string => {
    switch(status) {
      case 'live': return '#10B981';
      case 'finished': return '#6B7280';
      case 'scheduled': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)'}
    onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'}
    >
      <div style={{
        fontSize: '0.875rem',
        color: '#6B7280',
        marginBottom: '0.75rem',
        fontWeight: '500'
      }}>
        {match.competition}
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
            Arsenal
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#EF0107'
          }}>
            {arsenalScore}
          </div>
        </div>
        
        <div style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#D1D5DB',
          margin: '0 1.5rem'
        }}>
          -
        </div>
        
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
            {opponent}
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#374151'
          }}>
            {opponentScore}
          </div>
        </div>
      </div>
      
      <div style={{
        fontSize: '0.875rem',
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: '0.5rem'
      }}>
        {new Date(match.date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })} • {match.venue}
      </div>
      
      <div style={{
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '600',
        color: getStatusColor(match.status),
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {match.status}
      </div>
    </div>
  );
};

export default MatchCard;
