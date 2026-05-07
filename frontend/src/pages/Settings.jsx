import { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Account");

  return (
    <div className="max-w-[1000px] mx-auto pb-12">
      <h1 className="text-2xl font-bold text-[#0F172A] mb-8">Settings</h1>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-56 shrink-0">
          <nav className="flex flex-col space-y-1">
            {["Account", "Security", "Notifications", "Workspace", "Billing"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-2.5 rounded-lg text-[15px] transition-colors ${
                  activeTab === tab
                    ? "bg-[#EEF2FF] text-[#6161FF] font-semibold"
                    : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 space-y-8">
          
          {/* Profile Settings Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A] mb-6">Profile Settings</h2>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <img src="https://i.pravatar.cc/150?u=jane" alt="Jane Doe" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#64728B] uppercase tracking-wide mb-2">Full Name</label>
                  <input type="text" defaultValue="Jane Doe" className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#6161FF] focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#64728B] uppercase tracking-wide mb-2">Email Address</label>
                  <input type="email" defaultValue="jane.doe@example.com" className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#6161FF] focus:bg-white transition-colors" />
                </div>
              </div>
            </div>

            <div className="mb-6 ml-0 sm:ml-28">
              <label className="block text-xs font-semibold text-[#64728B] uppercase tracking-wide mb-2">Bio</label>
              <textarea 
                defaultValue="Product Manager focused on agile workflows and team efficiency."
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] min-h-[100px] resize-none focus:outline-none focus:border-[#6161FF] focus:bg-white transition-colors"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button className="px-6 py-2 bg-[#6161FF] text-white font-medium rounded-lg hover:bg-[#4F46E5] transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </div>

          {/* Appearance Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Appearance</h2>
            <p className="text-[14px] text-[#64728B] mb-6">Customize the visual theme of TaskFlow.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Light Theme */}
              <div className="cursor-pointer group">
                <div className="h-32 rounded-xl border-2 border-[#6161FF] bg-[#F8FAFC] p-3 mb-3 relative overflow-hidden">
                  <div className="w-full h-4 bg-white rounded shadow-sm mb-2"></div>
                  <div className="w-3/4 h-16 bg-white rounded shadow-sm"></div>
                  <div className="absolute bottom-3 right-3 text-[#6161FF]">
                    <svg className="w-5 h-5 bg-white rounded-full" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#0F172A] text-center">Light</p>
              </div>

              {/* Dark Theme */}
              <div className="cursor-pointer group">
                <div className="h-32 rounded-xl border-2 border-transparent bg-[#1E293B] p-3 mb-3 hover:border-[#94A3B8] transition-colors overflow-hidden">
                  <div className="w-full h-4 bg-[#334155] rounded mb-2"></div>
                  <div className="w-3/4 h-16 bg-[#334155] rounded"></div>
                </div>
                <p className="text-sm font-medium text-[#64728B] text-center group-hover:text-[#0F172A] transition-colors">Dark</p>
              </div>

              {/* System Theme */}
              <div className="cursor-pointer group">
                <div className="h-32 rounded-xl border-2 border-transparent bg-gradient-to-r from-[#F8FAFC] from-50% to-[#1E293B] to-50% p-3 mb-3 hover:border-[#94A3B8] transition-colors overflow-hidden flex">
                  <div className="w-1/2 pr-1">
                    <div className="w-full h-4 bg-white rounded shadow-sm mb-2"></div>
                  </div>
                  <div className="w-1/2 pl-1">
                     <div className="w-full h-4 bg-[#334155] rounded mb-2"></div>
                  </div>
                </div>
                <p className="text-sm font-medium text-[#64728B] text-center group-hover:text-[#0F172A] transition-colors">System</p>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A] mb-6">Notification Preferences</h2>
            
            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Email Notifications</h3>
                  <p className="text-[13px] text-[#64728B]">Receive daily digests and critical alerts.</p>
                </div>
                <div className="relative w-11 h-6 bg-[#6161FF] rounded-full cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Desktop Push */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Desktop Push</h3>
                  <p className="text-[13px] text-[#64728B]">Real-time alerts for @mentions and assignments.</p>
                </div>
                <div className="relative w-11 h-6 bg-[#CBD5E1] rounded-full cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Slack Integration */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Slack Integration</h3>
                  <p className="text-[13px] text-[#64728B]">Sync notifications to your connected workspace.</p>
                </div>
                <div className="relative w-11 h-6 bg-[#6161FF] rounded-full cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
