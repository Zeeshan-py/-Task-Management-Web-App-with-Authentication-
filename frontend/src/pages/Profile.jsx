import { Link } from "react-router-dom";

const Profile = () => {
  // Generate dummy heatmap data (7 rows, approx 20 cols)
  const heatmapData = Array.from({ length: 140 }).map((_, i) => {
    const value = Math.random();
    if (value > 0.8) return 'bg-[#6161FF]';
    if (value > 0.6) return 'bg-[#818cf8]';
    if (value > 0.4) return 'bg-[#a5b4fc]';
    if (value > 0.2) return 'bg-[#c7d2fe]';
    return 'bg-[#F1F5F9]';
  });

  return (
    <div className="max-w-[1200px] mx-auto pb-12">
      
      {/* ------------------------------------------
          HEADER CARD
          ------------------------------------------ */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 relative">
        <div className="absolute right-8 top-8">
          <Link to="/settings" className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#0F172A] font-medium text-sm rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 shadow-sm">
            <svg className="w-4 h-4 text-[#64728B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Edit Profile
          </Link>
        </div>

        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
          <img src="https://i.pravatar.cc/300?u=elena" alt="Elena Rostova" className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 text-center md:text-left mt-2">
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Elena Rostova</h1>
          <p className="text-xl font-medium text-[#6161FF] mt-1 mb-4">VP of Engineering</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F5F9] text-[#475569] text-sm font-medium rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              San Francisco, CA
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E0E7FF] text-[#4F46E5] text-sm font-medium rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Joined 2021
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------
          STATS ROW
          ------------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Stat 1 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#6161FF]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="text-xs font-semibold text-[#64728B] uppercase tracking-wider">Total Tasks Completed</p>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-[#0F172A] tracking-tight leading-none">450</span>
            <span className="text-sm font-medium text-[#FF00D9] flex items-center gap-0.5 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              +12%
            </span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FDF4FF] flex items-center justify-center text-[#FF00D9]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <p className="text-xs font-semibold text-[#64728B] uppercase tracking-wider">Active Projects</p>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-[#0F172A] tracking-tight leading-none">12</span>
            <span className="text-sm font-medium text-[#64728B] max-w-[80px] leading-tight mb-1">cross-functional</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-[#475569]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <p className="text-xs font-semibold text-[#64728B] uppercase tracking-wider">Contribution Rank</p>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-[#6161FF] tracking-tight leading-none">Top 5%</span>
          </div>
        </div>

      </div>

      {/* ------------------------------------------
          MAIN CONTENT (2 Columns)
          ------------------------------------------ */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN - Heatmap */}
        <div className="flex-1 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <svg className="w-5 h-5 text-[#6161FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              Productivity Heatmap
            </h2>
            <div className="inline-flex items-center gap-2 border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-sm font-medium text-[#64728B] hover:bg-[#F8FAFC] cursor-pointer">
              Last 6 Months
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Days Column */}
            <div className="flex flex-col justify-between text-xs text-[#94A3B8] pt-2 pb-2">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            
            {/* Heatmap Grid */}
            <div className="flex-1 grid grid-rows-7 grid-flow-col gap-1.5 overflow-x-auto pb-2">
              {heatmapData.map((colorClass, i) => (
                <div key={i} className={`w-3.5 h-3.5 rounded-[3px] ${colorClass}`}></div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-end items-center gap-2 mt-4 text-xs text-[#94A3B8]">
            <span>Less</span>
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#F1F5F9]"></div>
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#c7d2fe]"></div>
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#a5b4fc]"></div>
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#818cf8]"></div>
            <div className="w-3.5 h-3.5 rounded-[3px] bg-[#6161FF]"></div>
            <span>More</span>
          </div>
        </div>

        {/* RIGHT COLUMN - Achievements */}
        <div className="w-full lg:w-[360px] shrink-0 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#FF00D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            Achievements
          </h2>
          
          <div className="space-y-4">
            
            {/* Achievement 1 */}
            <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-12 h-12 shrink-0 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#6161FF]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Project Lead</h3>
                <p className="text-[13px] text-[#475569] leading-snug">Successfully delivered 'Atlas' migration 2 weeks ahead of schedule.</p>
              </div>
            </div>

            {/* Achievement 2 */}
            <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-12 h-12 shrink-0 rounded-full bg-[#FDF4FF] flex items-center justify-center text-[#FF00D9]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[#0F172A] mb-1">Early Adopter</h3>
                <p className="text-[13px] text-[#475569] leading-snug">First 100 users of the new TaskFlow beta features.</p>
              </div>
            </div>

            {/* Locked Achievement */}
            <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] opacity-60">
              <div className="w-12 h-12 shrink-0 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#94A3B8]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[#64728B] mb-1">Code Master</h3>
                <p className="text-[13px] text-[#94A3B8] leading-snug">Complete 1000 peer reviews to unlock.</p>
              </div>
            </div>

          </div>

          <button className="w-full mt-4 py-2 text-sm font-semibold text-[#6161FF] hover:text-[#4F46E5] transition-colors flex items-center justify-center gap-1">
            View All Badges
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>

      </div>

    </div>
  );
};

export default Profile;
