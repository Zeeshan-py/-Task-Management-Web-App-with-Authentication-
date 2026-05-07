// ==============================================
// Dashboard Page (Protected)
// ==============================================
// This is the main page users see after login.
// For now, it shows a welcome message and user info.
// The Kanban board will be added here in Day 5.
// ==============================================

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome, <span className="gradient-text">{user?.name}</span> 👋
        </h1>
        <p className="text-slate-400">
          Here&apos;s your task management dashboard. Your Kanban board will appear here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* To Do Card */}
        <div className="glass-card p-6 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">
              To Do
            </h3>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          </div>
          <p className="text-3xl font-bold text-white">—</p>
          <p className="text-slate-500 text-sm mt-1">Tasks pending</p>
        </div>

        {/* In Progress Card */}
        <div className="glass-card p-6 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">
              In Progress
            </h3>
            <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
          </div>
          <p className="text-3xl font-bold text-white">—</p>
          <p className="text-slate-500 text-sm mt-1">Tasks active</p>
        </div>

        {/* Done Card */}
        <div className="glass-card p-6 hover:border-green-500/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">
              Done
            </h3>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          </div>
          <p className="text-3xl font-bold text-white">—</p>
          <p className="text-slate-500 text-sm mt-1">Tasks completed</p>
        </div>
      </div>

      {/* Kanban Board Placeholder */}
      <div className="glass-card p-12 text-center">
        <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">
          Kanban Board Coming Soon
        </h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Your drag-and-drop Kanban board with task columns (To Do, In Progress, Done) 
          will be built here in the next phase.
        </p>
      </div>

      {/* User Info Card */}
      <div className="glass-card p-6 mt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Your Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Name</p>
            <p className="text-white font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Email</p>
            <p className="text-white font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Role</p>
            <p className="text-white font-medium capitalize">{user?.role}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Status</p>
            <span className="inline-flex items-center gap-1.5 text-green-400 font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
