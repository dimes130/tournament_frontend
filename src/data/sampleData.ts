import { Team, Player, CoachDashboardData } from '../types/Team';

// Sample players data
const samplePlayers: Player[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    position: 'Forward',
    age: 22,
    email: 'alex.johnson@email.com',
    phoneNumber: '+1-555-0101',
    isActive: true,
    joinedDate: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Sarah Martinez',
    position: 'Midfielder',
    age: 19,
    email: 'sarah.martinez@email.com',
    phoneNumber: '+1-555-0102',
    isActive: true,
    joinedDate: new Date('2023-02-01')
  },
  {
    id: '3',
    name: 'Mike Chen',
    position: 'Defender',
    age: 21,
    email: 'mike.chen@email.com',
    phoneNumber: '+1-555-0103',
    isActive: true,
    joinedDate: new Date('2023-01-20')
  },
  {
    id: '4',
    name: 'Emma Wilson',
    position: 'Goalkeeper',
    age: 20,
    email: 'emma.wilson@email.com',
    phoneNumber: '+1-555-0104',
    isActive: true,
    joinedDate: new Date('2023-03-01')
  },
  {
    id: '5',
    name: 'David Brown',
    position: 'Forward',
    age: 23,
    email: 'david.brown@email.com',
    phoneNumber: '+1-555-0105',
    isActive: false,
    joinedDate: new Date('2022-09-15')
  },
  {
    id: '6',
    name: 'Lisa Garcia',
    position: 'Midfielder',
    age: 18,
    email: 'lisa.garcia@email.com',
    phoneNumber: '+1-555-0106',
    isActive: true,
    joinedDate: new Date('2023-04-01')
  },
  {
    id: '7',
    name: 'Tom Anderson',
    position: 'Defender',
    age: 24,
    email: 'tom.anderson@email.com',
    phoneNumber: '+1-555-0107',
    isActive: true,
    joinedDate: new Date('2022-08-10')
  },
  {
    id: '8',
    name: 'Rachel Davis',
    position: 'Forward',
    age: 19,
    email: 'rachel.davis@email.com',
    phoneNumber: '+1-555-0108',
    isActive: true,
    joinedDate: new Date('2023-05-15')
  }
];

// Sample teams data
const sampleTeams: Team[] = [
  {
    id: '1',
    name: 'Thunder Bolts',
    description: 'Our premier competitive soccer team with a focus on developing technical skills and teamwork.',
    sport: 'Soccer',
    players: samplePlayers.slice(0, 4),
    coachId: 'coach1',
    createdDate: new Date('2023-01-01'),
    lastModified: new Date('2024-01-15'),
    status: 'active',
    teamLogo: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=100&h=100&fit=crop&crop=center',
    homeVenue: 'City Sports Complex',
    maxPlayers: 22,
    currentSeason: '2024 Spring',
    wins: 12,
    losses: 3,
    draws: 2
  },
  {
    id: '2',
    name: 'Lightning Strikers',
    description: 'Youth development team focused on building foundational skills and sportsmanship.',
    sport: 'Soccer',
    players: samplePlayers.slice(4, 6),
    coachId: 'coach1',
    createdDate: new Date('2023-03-01'),
    lastModified: new Date('2024-01-10'),
    status: 'active',
    teamLogo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
    homeVenue: 'Youth Sports Center',
    maxPlayers: 18,
    currentSeason: '2024 Spring',
    wins: 8,
    losses: 5,
    draws: 1
  },
  {
    id: '3',
    name: 'Storm Eagles',
    description: 'Elite basketball team competing in regional tournaments and championships.',
    sport: 'Basketball',
    players: samplePlayers.slice(6, 8),
    coachId: 'coach1',
    createdDate: new Date('2022-09-01'),
    lastModified: new Date('2023-12-20'),
    status: 'season-ended',
    teamLogo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop&crop=center',
    homeVenue: 'Metro Basketball Arena',
    maxPlayers: 15,
    currentSeason: '2023-2024',
    wins: 15,
    losses: 7,
    draws: 0
  },
  {
    id: '4',
    name: 'Rookie Rangers',
    description: 'Beginner-friendly team for new players to learn the basics of soccer in a supportive environment.',
    sport: 'Soccer',
    players: [],
    coachId: 'coach1',
    createdDate: new Date('2024-01-01'),
    lastModified: new Date('2024-01-01'),
    status: 'inactive',
    homeVenue: 'Community Park Field',
    maxPlayers: 16,
    currentSeason: '2024 Spring',
    wins: 0,
    losses: 0,
    draws: 0
  }
];

// Sample coach dashboard data
export const sampleDashboardData: CoachDashboardData = {
  coach: {
    id: 'coach1',
    name: 'John Smith',
    email: 'john.smith@email.com'
  },
  teams: sampleTeams,
  totalPlayers: samplePlayers.filter(p => p.isActive).length,
  activeTeams: sampleTeams.filter(t => t.status === 'active').length
};

export { sampleTeams, samplePlayers };