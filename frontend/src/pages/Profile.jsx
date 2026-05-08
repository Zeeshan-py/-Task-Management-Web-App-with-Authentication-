import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ChartNoAxesCombined, CheckCircle2, Sparkles } from "lucide-react";

const Profile = () => {
  // Generate dummy heatmap data (7 rows, approx 20 cols)
  const heatmapData = Array.from({ length: 140 }).map((_, i) => {
    const value = (Math.sin(i * 0.37) + 1) / 2;
    if (value > 0.8) return 'bg-[#6161FF]';
    if (value > 0.6) return 'bg-[#818cf8]';
    if (value > 0.4) return 'bg-[#a5b4fc]';
    if (value > 0.2) return 'bg-[#c7d2fe]';
    return 'bg-[#F1F5F9]';
  });

  return (
    <div className="max-w-[1200px] mx-auto pb-12 space-y-6">
      
      {/* ------------------------------------------
          HEADER CARD
          ------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 relative"
      >
        <div className="absolute right-4 top-4 md:right-6 md:top-6">
          <Link to="/settings" className="px-3 md:px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium text-[13px] rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 shadow-sm">
            <Sparkles className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Edit Profile</span>
          </Link>
        </div>

        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-slate-200 shadow-sm shrink-0">
          <img src="https://i.pravatar.cc/300?u=elena" alt="Elena Rostova" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 text-center sm:text-left mt-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Elena Rostova</h1>
          <p className="text-[15px] font-medium text-indigo-600 mt-0.5 mb-3">VP of Engineering</p>
          
          <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium rounded-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              San Francisco, CA
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium rounded-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Joined 2021
            </span>
          </div>
        </div>
      </motion.div>

      {/* ------------------------------------------
          STATS ROW
          ------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Stat 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Tasks Completed</p>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-slate-900 tracking-tight leading-none">450</span>
            <span className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5 mb-0.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              12%
            </span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-md bg-fuchsia-50 flex items-center justify-center text-fuchsia-600">
              <ChartNoAxesCombined className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Projects</p>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-slate-900 tracking-tight leading-none">12</span>
            <span className="text-xs font-medium text-slate-500 max-w-[80px] leading-tight mb-0.5">cross-functional</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
              <Award className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contribution Rank</p>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-indigo-600 tracking-tight leading-none">Top 5%</span>
          </div>
        </div>

      </div>

      {/* ------------------------------------------
          MAIN CONTENT (2 Columns)
          ------------------------------------------ */}
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* LEFT COLUMN - Heatmap */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-[15px] font-semibold text-slate-800 flex items-center gap-2">
              <ChartNoAxesCombined className="w-4 h-4 text-indigo-500" />
              Productivity Heatmap
            </h2>
            <div className="inline-flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer self-start sm:self-auto">
              Last 6 Months
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          <div className="flex gap-3">
            {/* Days Column */}
            <div className="flex flex-col justify-between text-[11px] font-medium text-slate-400 pt-1.5 pb-1.5">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            
            {/* Heatmap Grid */}
            <div className="flex-1 grid grid-rows-7 grid-flow-col gap-1 overflow-x-auto pb-2 custom-scrollbar-horizontal">
              {heatmapData.map((colorClass, i) => (
                <div key={i} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2px] ${colorClass}`}></div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-end items-center gap-1.5 mt-3 text-[11px] font-medium text-slate-400">
            <span>Less</span>
            <div className="w-3 h-3 rounded-[2px] bg-slate-100"></div>
            <div className="w-3 h-3 rounded-[2px] bg-indigo-200"></div>
            <div className="w-3 h-3 rounded-[2px] bg-indigo-300"></div>
            <div className="w-3 h-3 rounded-[2px] bg-indigo-400"></div>
            <div className="w-3 h-3 rounded-[2px] bg-indigo-600"></div>
            <span>More</span>
          </div>
        </div>

        {/* RIGHT COLUMN - Achievements */}
        <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-[15px] font-semibold text-slate-800 mb-5 flex items-center gap-2">
            <Award className="w-4 h-4 text-fuchsia-500" />
            Achievements
          </h2>
          
          <div className="space-y-3">
            
            {/* Achievement 1 */}
            <div className="flex gap-3.5 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 shrink-0 rounded-md bg-indigo-50 flex items-center justify-center text-indigo-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </div>
              <div>
                <h3 className="text-[13.5px] font-semibold text-slate-800 mb-0.5">Project Lead</h3>
                <p className="text-[12.5px] text-slate-500 leading-snug">Successfully delivered 'Atlas' migration 2 weeks ahead of schedule.</p>
              </div>
            </div>

            {/* Achievement 2 */}
            <div className="flex gap-3.5 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="w-10 h-10 shrink-0 rounded-md bg-fuchsia-50 flex items-center justify-center text-fuchsia-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <div>
                <h3 className="text-[13.5px] font-semibold text-slate-800 mb-0.5">Early Adopter</h3>
                <p className="text-[12.5px] text-slate-500 leading-snug">First 100 users of the new TaskFlow beta features.</p>
              </div>
            </div>

            {/* Locked Achievement */}
            <div className="flex gap-3.5 p-3 rounded-xl border border-slate-100 opacity-60 bg-slate-50/50">
              <div className="w-10 h-10 shrink-0 rounded-md bg-slate-200/60 flex items-center justify-center text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <h3 className="text-[13.5px] font-semibold text-slate-600 mb-0.5">Code Master</h3>
                <p className="text-[12.5px] text-slate-400 leading-snug">Complete 1000 peer reviews to unlock.</p>
              </div>
            </div>

          </div>

          <button className="w-full mt-4 py-1.5 text-[13px] font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors flex items-center justify-center gap-1.5 border border-transparent">
            View All Badges
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>

      </div>

    </div>
  );
};

export default Profile;
