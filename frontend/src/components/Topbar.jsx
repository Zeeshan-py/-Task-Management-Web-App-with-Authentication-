import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Bell,
  ChevronsLeftRightEllipsis,
  LayoutGrid,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

const Topbar = ({ onMenuClick, isSidebarCollapsed, onToggleSidebarCollapse }) => {
  const { user } = useAuth();
  const userInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="bg-white/75 backdrop-blur-xl border-b border-white/70 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 gap-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
      {/* Mobile Hamburger */}
      <button 
        onClick={onMenuClick}
        className="md:hidden text-slate-500 hover:text-slate-800 p-1.5 -ml-1.5 rounded-md hover:bg-slate-100 transition-colors shrink-0"
      >
        <Menu className="w-5 h-5" />
      </button>

      <button
        onClick={onToggleSidebarCollapse}
        className="hidden md:inline-flex text-slate-500 hover:text-slate-800 p-1.5 rounded-md hover:bg-slate-100 transition-colors shrink-0"
        title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronsLeftRightEllipsis className="w-4 h-4" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-sm min-w-0 lg:max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search tasks, projects..." 
            className="w-full pl-9 pr-3 py-2 bg-white/90 border border-slate-200 rounded-xl text-[13px] text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none truncate shadow-sm"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0 pl-1 md:pl-4">
        {/* Icons (Hidden on very small screens) */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400 border-r border-slate-200 pr-4">
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-[18px] h-[18px]" />
          </button>
          <button className="p-1.5 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <LayoutGrid className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Create Task Button (Icon only on mobile) */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm py-2 px-3 md:px-3.5 text-[13px] rounded-xl transition-all hidden sm:flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Task
        </motion.button>
        <button className="bg-indigo-600 text-white p-2 sm:hidden rounded-xl flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all">
          <Plus className="w-4 h-4" />
        </button>

        {/* User Profile */}
        {user ? (
          <Link to="/profile" className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-indigo-100 cursor-pointer shadow-sm hover:ring-2 hover:ring-indigo-500/30 transition-all shrink-0 ml-1 bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-indigo-700 flex items-center justify-center font-semibold text-sm">
             <span>{userInitial}</span>
          </Link>
        ) : (
          <Link to="/login" className="text-[13px] font-medium text-slate-600 hover:text-slate-900 shrink-0 ml-1">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Topbar;
