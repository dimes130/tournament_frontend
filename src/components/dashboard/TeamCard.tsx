import { motion } from 'framer-motion';
import { Team, TeamStats } from '../../types/Team';
import { useState } from 'react';

interface TeamCardProps {
  team: Team;
  onEdit: (team: Team) => void;
  onViewDetails: (team: Team) => void;
  onDelete: (teamId: string) => void;
}

export default function TeamCard({ team, onEdit, onViewDetails, onDelete }: TeamCardProps) {
  const [showActions, setShowActions] = useState(false);

  // Calculate team statistics
  const teamStats: TeamStats = {
    totalPlayers: team.players.length,
    activePlayers: team.players.filter(p => p.isActive).length,
    averageAge: team.players.length > 0 
      ? Math.round(team.players.reduce((sum, p) => sum + p.age, 0) / team.players.length)
      : 0,
    gamesPlayed: team.wins + team.losses + team.draws,
    winPercentage: team.wins + team.losses + team.draws > 0 
      ? Math.round((team.wins / (team.wins + team.losses + team.draws)) * 100)
      : 0
  };

  const getStatusColor = (status: Team['status']) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-warning';
      case 'season-ended': return 'badge-neutral';
      default: return 'badge-ghost';
    }
  };

  const getStatusText = (status: Team['status']) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'season-ended': return 'Season Ended';
      default: return 'Unknown';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="card-title text-xl font-bold mb-2">{team.name}</h2>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm opacity-60">{team.sport}</span>
              <div className={`badge ${getStatusColor(team.status)} badge-sm`}>
                {getStatusText(team.status)}
              </div>
            </div>
          </div>
          {team.teamLogo && (
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img src={team.teamLogo} alt={`${team.name} logo`} />
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm opacity-70 mb-4 line-clamp-2">{team.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-title text-xs">Players</div>
            <div className="stat-value text-lg">{teamStats.activePlayers}/{teamStats.totalPlayers}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-3">
            <div className="stat-title text-xs">Win Rate</div>
            <div className="stat-value text-lg">{teamStats.winPercentage}%</div>
          </div>
        </div>

        {/* Record */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm opacity-60">
            <span className="font-semibold text-success">{team.wins}W</span>
            <span className="mx-1">-</span>
            <span className="font-semibold text-error">{team.losses}L</span>
            {team.draws > 0 && (
              <>
                <span className="mx-1">-</span>
                <span className="font-semibold text-warning">{team.draws}D</span>
              </>
            )}
          </div>
          <div className="text-xs opacity-50">
            {team.currentSeason}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-xs opacity-60 mb-4">
          {team.homeVenue && (
            <div className="flex items-center gap-1 mb-1">
              <span>🏟️</span>
              <span>{team.homeVenue}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span>Created {new Date(team.createdDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showActions ? 1 : 0 }}
          className="card-actions justify-end gap-2"
        >
          <button 
            className="btn btn-sm btn-outline btn-primary"
            onClick={() => onViewDetails(team)}
          >
            View Details
          </button>
          <button 
            className="btn btn-sm btn-outline"
            onClick={() => onEdit(team)}
          >
            Edit
          </button>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
              ⋮
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
              <li>
                <button onClick={() => onDelete(team.id)} className="text-error">
                  Delete Team
                </button>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}