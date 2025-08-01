import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Team, CoachDashboardData } from '../../types/Team';
import TeamCard from './TeamCard';

interface TeamsManagementProps {
  dashboardData: CoachDashboardData;
  onAddTeam: () => void;
  onEditTeam: (team: Team) => void;
  onViewTeamDetails: (team: Team) => void;
  onDeleteTeam: (teamId: string) => void;
}

export default function TeamsManagement({
  dashboardData,
  onAddTeam,
  onEditTeam,
  onViewTeamDetails,
  onDeleteTeam
}: TeamsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Team['status']>('all');
  const [sortBy, setSortBy] = useState<'name' | 'players' | 'winRate' | 'created'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort teams
  const filteredAndSortedTeams = useMemo(() => {
    let filtered = dashboardData.teams;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(team => team.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'players':
          comparison = a.players.length - b.players.length;
          break;
        case 'winRate':
          const aWinRate = a.wins + a.losses + a.draws > 0 ? a.wins / (a.wins + a.losses + a.draws) : 0;
          const bWinRate = b.wins + b.losses + b.draws > 0 ? b.wins / (b.wins + b.losses + b.draws) : 0;
          comparison = aWinRate - bWinRate;
          break;
        case 'created':
          comparison = new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [dashboardData.teams, searchTerm, statusFilter, sortBy, sortOrder]);

  const handleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: typeof sortBy) => {
    if (sortBy !== field) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Teams Management</h1>
          <p className="text-base-content/60 mt-1">
            Manage your {dashboardData.teams.length} teams and {dashboardData.totalPlayers} players
          </p>
        </div>
        <button 
          className="btn btn-primary gap-2"
          onClick={onAddTeam}
        >
          <span>+</span>
          Add New Team
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Total Teams</div>
          <div className="stat-value text-primary">{dashboardData.teams.length}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Active Teams</div>
          <div className="stat-value text-success">{dashboardData.activeTeams}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Total Players</div>
          <div className="stat-value text-info">{dashboardData.totalPlayers}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg">
          <div className="stat-title">Avg Players/Team</div>
          <div className="stat-value text-secondary">
            {dashboardData.teams.length > 0 
              ? Math.round(dashboardData.totalPlayers / dashboardData.teams.length)
              : 0
            }
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 bg-base-200 p-4 rounded-lg">
        {/* Search */}
        <div className="flex-1">
          <div className="form-control">
            <div className="input-group">
              <span className="bg-base-300">🔍</span>
              <input
                type="text"
                placeholder="Search teams..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="form-control">
          <select
            className="select select-bordered"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="season-ended">Season Ended</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          <button
            className={`btn btn-sm ${sortBy === 'name' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleSort('name')}
          >
            Name {getSortIcon('name')}
          </button>
          <button
            className={`btn btn-sm ${sortBy === 'players' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleSort('players')}
          >
            Players {getSortIcon('players')}
          </button>
          <button
            className={`btn btn-sm ${sortBy === 'winRate' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleSort('winRate')}
          >
            Win Rate {getSortIcon('winRate')}
          </button>
          <button
            className={`btn btn-sm ${sortBy === 'created' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleSort('created')}
          >
            Created {getSortIcon('created')}
          </button>
        </div>
      </div>

      {/* Teams Grid */}
      {filteredAndSortedTeams.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-2">
            {searchTerm || statusFilter !== 'all' ? 'No teams found' : 'No teams yet'}
          </h3>
          <p className="text-base-content/60 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Create your first team to get started'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button className="btn btn-primary" onClick={onAddTeam}>
              Create Your First Team
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredAndSortedTeams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TeamCard
                  team={team}
                  onEdit={onEditTeam}
                  onViewDetails={onViewTeamDetails}
                  onDelete={onDeleteTeam}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Results Info */}
      {filteredAndSortedTeams.length > 0 && (
        <div className="text-center text-sm opacity-60">
          Showing {filteredAndSortedTeams.length} of {dashboardData.teams.length} teams
        </div>
      )}
    </div>
  );
}