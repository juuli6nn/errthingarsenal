/**
 * Match data model interface
 * Represents a football match with all required information
 */
export interface Match {
  /** Home team name */
  homeTeam: string;
  
  /** Away team name */
  awayTeam: string;
  
  /** Home team score */
  homeScore: number;
  
  /** Away team score */
  awayScore: number;
  
  /** Competition name (e.g., "PREMIER LEAGUE", "FA CUP") */
  competition: string;
  
  /** Match date in ISO 8601 format */
  date: string;
  
  /** Venue name where the match is played */
  venue: string;
  
  /** Current match status */
  status: 'live' | 'finished' | 'scheduled';
}

/**
 * Props interface for MatchCard component
 */
export interface MatchCardProps {
  /** Match data to display */
  match: Match;
}
