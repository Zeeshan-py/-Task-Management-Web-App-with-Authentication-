import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BarChart3,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Users,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen, isCollapsed }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/dashboard", icon: FolderKanban },
    { name: "Team", path: "/profile", icon: Users },
    { name: "Analytics", path: "/dashboard", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-400 flex flex-col fixed left-0 top-0 z-50 transform transition-all duration-300 ease-in-out border-r border-slate-800/60 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } ${isCollapsed ? "w-[78px]" : "w-[224px]"}`}
      >
        {/* Logo Area */}
        <div
          className={`h-14 flex items-center justify-between border-b border-white/10 shrink-0 ${
            isCollapsed ? "px-2.5" : "px-3.5"
          }`}
        >
          <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-xs tracking-wider">TF</span>
            </div>
            <div
              className={`min-w-0 flex flex-col transition-all duration-200 ${
                isCollapsed ? "opacity-0 w-0" : "opacity-100"
              }`}
            >
              <h1 className="text-slate-100 font-semibold text-[14px] leading-tight truncate tracking-tight">
                TaskFlow Pro
              </h1>
              <p className="text-[11px] text-slate-400">Productivity Suite</p>
            </div>
          </Link>
          
          {/* Close button for mobile */}
          <button 
            className="md:hidden text-slate-400 hover:text-white p-1"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Project Button */}
        <div className={`mt-4 mb-3 ${isCollapsed ? "px-2.5" : "px-3.5"}`}>
          <button
            className={`w-full bg-white/10 text-white rounded-lg text-[13px] font-medium hover:bg-white/15 transition-all flex items-center justify-center gap-2 border border-white/10 shadow-sm ${
              isCollapsed ? "py-2 px-0" : "py-2 px-3"
            }`}
          >
            <Plus className="w-4 h-4" />
            {!isCollapsed && <span>New Project</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 space-y-1 overflow-y-auto custom-scrollbar ${isCollapsed ? "px-2.5" : "px-3"}`}>
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === "/dashboard" && location.pathname === "/dashboard");
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12.5px] font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-gradient-to-r from-indigo-500/25 to-fuchsia-500/15 text-white border border-indigo-400/30" 
                    : "text-slate-300 hover:bg-white/5 hover:text-slate-100"
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon
                  className={`w-[15px] h-[15px] shrink-0 ${
                    isActive ? "text-indigo-300" : "text-slate-500"
                  }`}
                />
                {!isCollapsed && <span className="truncate tracking-wide">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className={`mb-2 shrink-0 border-t border-white/10 pt-2 ${isCollapsed ? "px-2.5" : "px-3"}`}>
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 px-2.5 py-2 text-[12.5px] font-medium text-slate-300 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all"
            title={isCollapsed ? "Help Center" : undefined}
          >
            <HelpCircle className="w-4 h-4 shrink-0 text-slate-500" />
            {!isCollapsed && <span className="truncate tracking-wide">Help Center</span>}
          </Link>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 text-[12.5px] font-medium text-slate-300 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-all cursor-pointer mt-0.5"
            title={isCollapsed ? "Log Out" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0 text-slate-500" />
            {!isCollapsed && <span className="truncate tracking-wide">Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
