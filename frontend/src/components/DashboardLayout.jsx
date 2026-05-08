import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (for mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isSidebarCollapsed}
      />
      
      <div
        className={`flex-1 flex flex-col w-full transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "md:ml-[88px]" : "md:ml-[240px]"
        }`}
      >
        <Topbar
          onMenuClick={() => setIsSidebarOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebarCollapse={() =>
            setIsSidebarCollapsed((prev) => !prev)
          }
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[radial-gradient(circle_at_top,#eef2ff_0%,#f8fafc_40%,#f8fafc_100%)] p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
