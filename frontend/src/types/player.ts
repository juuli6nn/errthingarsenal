/**
 * Player statistics interface
 * Represents a player's performance statistics
 */
export interface PlayerStats {
  /** Number of goals scored */
  goals: number;
  
  /** Number of assists provided */
  assists: number;
  
  /** Number of appearances/matches played */
  appearances: number;
}

/**
 * Player data model interface
 * Represents a football player with all required information
 */
export interface Player {
  /** Player's full name */
  name: string;
  
  /** Player's position (e.g., "Forward", "Midfielder", "Defender", "Goalkeeper") */
  position: string;
  
  /** Player's nationality */
  nationality: string;
  
  /** Player's jersey number */
  number: number;
  
  /** Player's initials for display on card */
  initials: string;
  
  /** Optional player statistics */
  stats?: PlayerStats;
}

/**
 * Props interface for PlayerCard component
 */
export interface PlayerCardProps {
  /** Player data to display */
  player: Player;
}
