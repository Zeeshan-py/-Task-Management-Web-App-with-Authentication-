import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Topbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 gap-4">
      {/* Mobile Hamburger */}
      <button 
        onClick={onMenuClick}
        className="md:hidden text-slate-500 hover:text-slate-800 p-1.5 -ml-1.5 rounded-md hover:bg-slate-100 transition-colors shrink-0"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md min-w-0 lg:max-w-lg">
        <div className="relative group">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search tasks, projects..." 
            className="w-full pl-9 pr-3 py-1.5 bg-slate-100/80 border border-transparent rounded-md text-[13px] text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none truncate shadow-sm"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0 pl-1 md:pl-4">
        {/* Icons (Hidden on very small screens) */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400 border-r border-slate-200 pr-4">
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors">
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>

        {/* Create Task Button (Icon only on mobile) */}
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm py-1.5 px-3 md:px-3.5 text-[13px] rounded-md transition-all hidden sm:flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Create Task
        </button>
        <button className="bg-indigo-600 text-white p-1.5 sm:hidden rounded-md flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>

        {/* User Profile */}
        {user ? (
          <Link to="/profile" className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-slate-200 cursor-pointer shadow-sm hover:ring-2 hover:ring-indigo-500/30 transition-all shrink-0 ml-1">
             <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt={user.name} className="w-full h-full object-cover" />
          </Link>
        ) : (
          <Link to="/login" className="text-[13px] font-medium text-slate-600 hover:text-slate-900 shrink-0 ml-1">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Topbar;
