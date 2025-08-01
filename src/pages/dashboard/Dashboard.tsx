import { useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import TeamsManagement from '../../components/dashboard/TeamsManagement';
import { Team } from '../../types/Team';
import { sampleDashboardData } from '../../data/sampleData';

function Dashboard() {
  const { coach_id } = useParams();
  const [dashboardData, setDashboardData] = useState(sampleDashboardData);
  const [currentView, setCurrentView] = useState<'overview' | 'teams' | 'players' | 'schedule'>('teams');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Team management handlers
  const handleAddTeam = () => {
    // In a real app, this would open a modal or navigate to a form
    console.log('Opening add team form...');
    alert('Add Team functionality would open a form here.');
  };

  const handleEditTeam = (team: Team) => {
    setSelectedTeam(team);
    console.log('Editing team:', team.name);
    alert(`Edit Team functionality for "${team.name}" would open a form here.`);
  };

  const handleViewTeamDetails = (team: Team) => {
    setSelectedTeam(team);
    console.log('Viewing team details:', team.name);
    alert(`Team Details for "${team.name}" would open a detailed view here.`);
  };

  const handleDeleteTeam = (teamId: string) => {
    const team = dashboardData.teams.find(t => t.id === teamId);
    if (team && confirm(`Are you sure you want to delete "${team.name}"?`)) {
      setDashboardData(prev => ({
        ...prev,
        teams: prev.teams.filter(t => t.id !== teamId),
        totalPlayers: prev.totalPlayers - team.players.filter(p => p.isActive).length,
        activeTeams: prev.teams.filter(t => t.id !== teamId && t.status === 'active').length
      }));
      console.log('Deleted team:', teamId);
    }
  };

  const navigationItems = [
    { key: 'overview' as const, label: 'Overview', icon: '📊' },
    { key: 'teams' as const, label: 'Teams', icon: '🏆' },
    { key: 'players' as const, label: 'Players', icon: '👥' },
    { key: 'schedule' as const, label: 'Schedule', icon: '📅' }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-base-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-base-content">
                Coach Dashboard
              </h1>
              <p className="text-base-content/60">
                Welcome back, {dashboardData.coach.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="stats stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title text-xs">Teams</div>
                  <div className="stat-value text-lg">{dashboardData.teams.length}</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-xs">Players</div>
                  <div className="stat-value text-lg">{dashboardData.totalPlayers}</div>
                </div>
              </div>
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10">
                  <span className="text-sm">{dashboardData.coach.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-base-200 border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrentView(item.key)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  currentView === item.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-base-content/60 hover:text-base-content hover:border-base-content/30'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'teams' && (
            <TeamsManagement
              dashboardData={dashboardData}
              onAddTeam={handleAddTeam}
              onEditTeam={handleEditTeam}
              onViewTeamDetails={handleViewTeamDetails}
              onDeleteTeam={handleDeleteTeam}
            />
          )}

          {currentView === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat bg-primary text-primary-content rounded-lg shadow">
                  <div className="stat-title">Total Teams</div>
                  <div className="stat-value">{dashboardData.teams.length}</div>
                  <div className="stat-desc">
                    {dashboardData.activeTeams} active teams
                  </div>
                </div>
                <div className="stat bg-secondary text-secondary-content rounded-lg shadow">
                  <div className="stat-title">Total Players</div>
                  <div className="stat-value">{dashboardData.totalPlayers}</div>
                  <div className="stat-desc">Across all teams</div>
                </div>
                <div className="stat bg-accent text-accent-content rounded-lg shadow">
                  <div className="stat-title">Win Rate</div>
                  <div className="stat-value">
                    {dashboardData.teams.length > 0
                      ? Math.round(
                          (dashboardData.teams.reduce((sum, team) => sum + team.wins, 0) /
                            dashboardData.teams.reduce(
                              (sum, team) => sum + team.wins + team.losses + team.draws,
                              0
                            )) * 100
                        )
                      : 0}%
                  </div>
                  <div className="stat-desc">Overall performance</div>
                </div>
                <div className="stat bg-info text-info-content rounded-lg shadow">
                  <div className="stat-title">Sports</div>
                  <div className="stat-value">
                    {new Set(dashboardData.teams.map(t => t.sport)).size}
                  </div>
                  <div className="stat-desc">Different sports</div>
                </div>
              </div>
              <div className="alert alert-info">
                <span>📊</span>
                <span>Navigate to different sections using the tabs above to manage your teams, players, and schedule.</span>
              </div>
            </div>
          )}

          {currentView === 'players' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-2xl font-bold mb-2">Player Management</h2>
              <p className="text-base-content/60 mb-6">
                Player management functionality would be implemented here.
              </p>
              <button className="btn btn-primary" onClick={() => setCurrentView('teams')}>
                View Teams Instead
              </button>
            </div>
          )}

          {currentView === 'schedule' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-2xl font-bold mb-2">Schedule Management</h2>
              <p className="text-base-content/60 mb-6">
                Schedule and calendar functionality would be implemented here.
              </p>
              <button className="btn btn-primary" onClick={() => setCurrentView('teams')}>
                View Teams Instead
              </button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default Dashboard;