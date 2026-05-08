import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Camera, CreditCard, Shield, User, Workflow } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Toggle = ({ active = false }) => (
  <button
    type="button"
    className={`relative w-10 h-5 rounded-full cursor-pointer shadow-inner transition-colors ${
      active ? "bg-indigo-600" : "bg-slate-200"
    }`}
    aria-pressed={active}
  >
    <span
      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
        active ? "translate-x-[21px]" : "translate-x-0.5"
      }`}
    />
  </button>
);

const Field = ({ label, children }) => (
  <div>
    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13.5px] text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const [avatarPreview, setAvatarPreview] = useState("https://i.pravatar.cc/150?u=jane");
  const { user } = useAuth();

  const tabs = [
    { label: "Account", icon: User },
    { label: "Security", icon: Shield },
    { label: "Notifications", icon: Bell },
    { label: "Workspace", icon: Workflow },
    { label: "Billing", icon: CreditCard },
  ];

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Settings</h1>

      <div className="flex flex-col md:flex-row gap-10">
        <aside className="w-full md:w-56 shrink-0 border-b md:border-b-0 border-slate-200 pb-2 md:pb-0">
          <nav className="flex overflow-x-auto md:flex-col gap-2 md:gap-0 md:space-y-1 pb-1 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.label)}
                  className={`whitespace-nowrap text-left px-4 py-2.5 rounded-lg text-[15px] transition-colors ${
                    activeTab === tab.label
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 space-y-8">
          {activeTab === "Account" && (
            <>
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-[16px] font-semibold text-slate-800 mb-6">Profile Settings</h2>

                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                      <img src={avatarPreview} alt="Profile preview" className="w-full h-full object-cover" />
                    </div>
                    <label className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[12px] font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm">
                      <Camera className="w-3.5 h-3.5 text-slate-400" />
                      Update Photo
                      <input type="file" accept="image/*" onChange={handleAvatarChange} className="sr-only" />
                    </label>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-xl">
                    <Field label="Full Name">
                      <input type="text" defaultValue={user?.name || "Jane Doe"} className={inputClass} />
                    </Field>
                    <Field label="Email Address">
                      <input type="email" defaultValue={user?.email || "jane.doe@example.com"} className={inputClass} />
                    </Field>
                  </div>
                </div>

                <div className="mb-6 max-w-xl sm:ml-[104px]">
                  <Field label="Bio">
                    <textarea
                      defaultValue="Product Manager focused on agile workflows and team efficiency."
                      className={`${inputClass} min-h-[90px] resize-none`}
                    />
                  </Field>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-5 mt-2">
                  <button className="px-5 py-2 bg-indigo-600 text-white text-[13px] font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                    Save Changes
                  </button>
                </div>
              </motion.section>

              <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-[16px] font-semibold text-slate-800 mb-1">Appearance</h2>
                <p className="text-[13px] text-slate-500 mb-6">Customize the visual theme of TaskFlow.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl">
                  {["Light", "Dark", "System"].map((theme) => (
                    <div key={theme} className="cursor-pointer group">
                      <div
                        className={`h-28 rounded-lg border-2 p-2.5 mb-2 overflow-hidden shadow-sm ${
                          theme === "Light"
                            ? "border-indigo-500 bg-slate-50"
                            : theme === "Dark"
                            ? "border-transparent bg-slate-900 hover:border-slate-300"
                            : "border-transparent bg-gradient-to-r from-slate-50 from-50% to-slate-900 to-50% hover:border-slate-300"
                        }`}
                      >
                        <div className={`w-full h-3 rounded mb-2 ${theme === "Dark" ? "bg-slate-800" : "bg-white shadow-sm"}`} />
                        <div className={`w-3/4 h-12 rounded ${theme === "Dark" ? "bg-slate-800" : "bg-white shadow-sm"}`} />
                      </div>
                      <p className={`text-[13px] text-center ${theme === "Light" ? "font-semibold text-slate-800" : "font-medium text-slate-500 group-hover:text-slate-800"}`}>
                        {theme}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === "Security" && (
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-[16px] font-semibold text-slate-800 mb-1">Security</h2>
              <p className="text-[13px] text-slate-500 mb-6">Manage sign-in methods and workspace access.</p>
              <div className="space-y-4 max-w-2xl">
                {[
                  ["Password", "Last updated recently", "Active"],
                  ["Google sign in", "Available when OAuth keys are configured", "Ready"],
                  ["GitHub sign in", "Available when OAuth keys are configured", "Ready"],
                  ["Session tokens", "JWT authentication is enabled for protected routes", "Enabled"],
                ].map(([title, description, status]) => (
                  <div key={title} className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100 last:border-b-0">
                    <div>
                      <h3 className="text-[14px] font-semibold text-slate-800 mb-0.5">{title}</h3>
                      <p className="text-[13px] text-slate-500">{description}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "Notifications" && (
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-[16px] font-semibold text-slate-800 mb-6">Notification Preferences</h2>
              <div className="space-y-4 max-w-2xl">
                {[
                  ["Email Notifications", "Receive daily digests and critical alerts.", true],
                  ["Desktop Push", "Real-time alerts for @mentions and assignments.", false],
                  ["Slack Integration", "Sync notifications to your connected workspace.", true],
                ].map(([title, description, active]) => (
                  <div key={title} className="flex items-center justify-between gap-5 pb-4 border-b border-slate-100 last:border-b-0">
                    <div>
                      <h3 className="text-[14px] font-semibold text-slate-800 mb-0.5">{title}</h3>
                      <p className="text-[13px] text-slate-500">{description}</p>
                    </div>
                    <Toggle active={active} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "Workspace" && (
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-[16px] font-semibold text-slate-800 mb-1">Workspace</h2>
              <p className="text-[13px] text-slate-500 mb-6">Configure your workspace identity and defaults.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
                <Field label="Workspace Name">
                  <input type="text" defaultValue="TaskFlow Workspace" className={inputClass} />
                </Field>
                <Field label="Default View">
                  <select defaultValue="Kanban" className={inputClass}>
                    <option>Kanban</option>
                    <option>List</option>
                    <option>Calendar</option>
                  </select>
                </Field>
                <Field label="Task Prefix">
                  <input type="text" defaultValue="TF" className={inputClass} />
                </Field>
                <Field label="Timezone">
                  <select defaultValue="Asia/Karachi" className={inputClass}>
                    <option>Asia/Karachi</option>
                    <option>UTC</option>
                    <option>America/New_York</option>
                  </select>
                </Field>
              </div>
            </section>
          )}

          {activeTab === "Billing" && (
            <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-[16px] font-semibold text-slate-800 mb-1">Billing</h2>
              <p className="text-[13px] text-slate-500 mb-6">Review your plan and payment status.</p>
              <div className="max-w-2xl rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Starter Plan</p>
                    <p className="text-[13px] text-slate-500 mt-1">Perfect for internship and portfolio project usage.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700">
                    Free
                  </span>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
