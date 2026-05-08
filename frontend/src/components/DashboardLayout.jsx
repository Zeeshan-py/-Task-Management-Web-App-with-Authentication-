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
    <div className="flex h-screen bg-[#f6f8fb] overflow-hidden font-sans">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isSidebarCollapsed}
      />
      
      <div
        className={`flex-1 flex flex-col w-full transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "md:ml-[78px]" : "md:ml-[224px]"
        }`}
      >
        <Topbar
          onMenuClick={() => setIsSidebarOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebarCollapse={() =>
            setIsSidebarCollapsed((prev) => !prev)
          }
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f6f8fb] px-3 py-4 sm:px-4 md:px-6 md:py-6 lg:px-8">
          <div className="w-full max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
