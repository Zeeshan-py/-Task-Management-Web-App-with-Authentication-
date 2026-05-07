import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Topbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 gap-4">
      {/* Mobile Hamburger */}
      <button 
        onClick={onMenuClick}
        className="md:hidden text-slate-500 hover:text-slate-700 p-1 -ml-1 shrink-0"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl min-w-0">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search tasks, projects..." 
            className="w-full pl-9 pr-3 py-2 bg-[#F1F5F9] border-transparent rounded-lg text-[13px] md:text-sm text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#6161FF] focus:ring-2 focus:ring-[#6161FF]/20 transition-all outline-none truncate"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 md:gap-5 shrink-0 pl-1 md:pl-4">
        {/* Icons (Hidden on very small screens) */}
        <div className="hidden sm:flex items-center gap-3 text-slate-400 border-r border-slate-200 pr-5">
          <button className="hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <button className="hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>

        {/* Create Task Button (Icon only on mobile) */}
        <button className="btn-primary py-1.5 px-3 md:px-4 text-[13px] md:text-sm whitespace-nowrap hidden sm:flex">
          Create Task
        </button>
        <button className="btn-primary p-1.5 sm:hidden rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>

        {/* User Profile */}
        {user ? (
          <Link to="/profile" className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-300 cursor-pointer shadow-sm hover:opacity-90 transition-opacity shrink-0">
             <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={user.name} className="w-full h-full object-cover" />
          </Link>
        ) : (
          <Link to="/login" className="text-[13px] md:text-sm font-medium text-slate-600 hover:text-slate-900 shrink-0">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Topbar;
