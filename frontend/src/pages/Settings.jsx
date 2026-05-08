import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CreditCard, Shield, User, Workflow } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const tabs = [
    { label: "Account", icon: User },
    { label: "Security", icon: Shield },
    { label: "Notifications", icon: Bell },
    { label: "Workspace", icon: Workflow },
    { label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="max-w-[1000px] mx-auto pb-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Settings</h1>

      <div className="flex flex-col md:flex-row gap-10">
        
        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-56 shrink-0 border-b md:border-b-0 border-[#E2E8F0] pb-2 md:pb-0">
          <nav className="flex overflow-x-auto md:flex-col gap-2 md:gap-0 md:space-y-1 pb-1 md:pb-0 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`whitespace-nowrap text-left px-4 py-2.5 rounded-lg text-[15px] transition-colors ${
                  activeTab === tab.label
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </span>
              </button>
            )})}
          </nav>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 space-y-8">
          
          {/* Profile Settings Card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-[16px] font-semibold text-slate-800 mb-6">Profile Settings</h2>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                <img src="https://i.pravatar.cc/150?u=jane" alt="Jane Doe" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-xl">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" defaultValue="Jane Doe" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13.5px] text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" defaultValue="jane.doe@example.com" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13.5px] text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm" />
                </div>
              </div>
            </div>

            <div className="mb-6 ml-0 sm:ml-26 max-w-xl">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Bio</label>
              <textarea 
                defaultValue="Product Manager focused on agile workflows and team efficiency."
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13.5px] text-slate-800 min-h-[90px] resize-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
              ></textarea>
            </div>

            <div className="flex justify-end border-t border-slate-100 pt-5 mt-2">
              <button className="px-5 py-2 bg-indigo-600 text-white text-[13px] font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                Save Changes
              </button>
            </div>
          </motion.div>

          {/* Appearance Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-[16px] font-semibold text-slate-800 mb-1">Appearance</h2>
            <p className="text-[13px] text-slate-500 mb-6">Customize the visual theme of TaskFlow.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl">
              {/* Light Theme */}
              <div className="cursor-pointer group">
                <div className="h-28 rounded-lg border-2 border-indigo-500 bg-slate-50 p-2.5 mb-2 relative overflow-hidden shadow-sm">
                  <div className="w-full h-3 bg-white rounded shadow-sm mb-2"></div>
                  <div className="w-3/4 h-12 bg-white rounded shadow-sm"></div>
                  <div className="absolute bottom-2 right-2 text-indigo-500">
                    <svg className="w-4 h-4 bg-white rounded-full" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                <p className="text-[13px] font-semibold text-slate-800 text-center">Light</p>
              </div>

              {/* Dark Theme */}
              <div className="cursor-pointer group">
                <div className="h-28 rounded-lg border-2 border-transparent bg-slate-900 p-2.5 mb-2 hover:border-slate-300 transition-all overflow-hidden shadow-sm">
                  <div className="w-full h-3 bg-slate-800 rounded mb-2"></div>
                  <div className="w-3/4 h-12 bg-slate-800 rounded"></div>
                </div>
                <p className="text-[13px] font-medium text-slate-500 text-center group-hover:text-slate-800 transition-colors">Dark</p>
              </div>

              {/* System Theme */}
              <div className="cursor-pointer group">
                <div className="h-28 rounded-lg border-2 border-transparent bg-gradient-to-r from-slate-50 from-50% to-slate-900 to-50% p-2.5 mb-2 hover:border-slate-300 transition-all overflow-hidden flex shadow-sm">
                  <div className="w-1/2 pr-1">
                    <div className="w-full h-3 bg-white rounded shadow-sm mb-2"></div>
                  </div>
                  <div className="w-1/2 pl-1">
                     <div className="w-full h-3 bg-slate-800 rounded mb-2"></div>
                  </div>
                </div>
                <p className="text-[13px] font-medium text-slate-500 text-center group-hover:text-slate-800 transition-colors">System</p>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-[16px] font-semibold text-slate-800 mb-6">Notification Preferences</h2>
            
            <div className="space-y-4 max-w-2xl">
              {/* Email Notifications */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-[14px] font-semibold text-slate-800 mb-0.5">Email Notifications</h3>
                  <p className="text-[13px] text-slate-500">Receive daily digests and critical alerts.</p>
                </div>
                <div className="relative w-10 h-5 bg-indigo-600 rounded-full cursor-pointer shadow-inner">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>

              {/* Desktop Push */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-[14px] font-semibold text-slate-800 mb-0.5">Desktop Push</h3>
                  <p className="text-[13px] text-slate-500">Real-time alerts for @mentions and assignments.</p>
                </div>
                <div className="relative w-10 h-5 bg-slate-200 rounded-full cursor-pointer shadow-inner">
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>

              {/* Slack Integration */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <h3 className="text-[14px] font-semibold text-slate-800 mb-0.5">Slack Integration</h3>
                  <p className="text-[13px] text-slate-500">Sync notifications to your connected workspace.</p>
                </div>
                <div className="relative w-10 h-5 bg-indigo-600 rounded-full cursor-pointer shadow-inner">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
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
