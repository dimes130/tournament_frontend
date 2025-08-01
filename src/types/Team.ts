// Team and Player type definitions for the coaching dashboard

export interface Player {
  id: string;
  name: string;
  position: string;
  age: number;
  email?: string;
  phoneNumber?: string;
  isActive: boolean;
  joinedDate: Date;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  sport: string;
  players: Player[];
  coachId: string;
  createdDate: Date;
  lastModified: Date;
  status: 'active' | 'inactive' | 'season-ended';
  teamLogo?: string;
  homeVenue?: string;
  maxPlayers: number;
  currentSeason: string;
  wins: number;
  losses: number;
  draws: number;
}

export interface TeamStats {
  totalPlayers: number;
  activePlayers: number;
  averageAge: number;
  gamesPlayed: number;
  winPercentage: number;
}

export interface CoachDashboardData {
  coach: {
    id: string;
    name: string;
    email: string;
  };
  teams: Team[];
  totalPlayers: number;
  activeTeams: number;
}