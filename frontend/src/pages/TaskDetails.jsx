import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();

  // Dummy data matching Image 1
  const [subtasks, setSubtasks] = useState([
    { id: 1, text: "Review competitor branding", completed: true },
    { id: 2, text: "Create moodboard", completed: true },
    { id: 3, text: "Draft 3 initial concepts", completed: true },
    { id: 4, text: "Present concepts to stakeholders", completed: false },
  ]);

  const toggleSubtask = (id) => {
    setSubtasks(subtasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = subtasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / subtasks.length) * 100);

  return (
    <div className="max-w-[1200px] mx-auto pb-12">
      {/* ------------------------------------------
          HEADER ROW
          ------------------------------------------ */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard" className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F1F5F9] text-[#64728B] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <span className="text-sm font-medium text-[#64728B] bg-[#F1F5F9] px-2.5 py-1 rounded-md">Task-1042</span>
        <span className="text-sm font-medium text-[#6161FF] bg-[#EEF2FF] border border-[#C7D2FE] px-2.5 py-1 rounded-md flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          In Progress
        </span>
        <span className="text-sm font-medium text-[#EF4444] bg-[#FEF2F2] border border-[#FECACA] px-2.5 py-1 rounded-md flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
          High Priority
        </span>
      </div>

      <h1 className="text-4xl font-bold text-[#0F172A] mb-8 tracking-tight">Design new logo</h1>

      {/* ------------------------------------------
          MAIN LAYOUT (2 Columns)
          ------------------------------------------ */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN - Main Content */}
        <div className="flex-1 space-y-6">
          
          {/* Description Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Description</h2>
            <div className="text-[#475569] text-[15px] leading-relaxed space-y-4">
              <p>We are initiating a comprehensive rebrand for the upcoming 2024 Marketing Launch. The new logo needs to reflect our evolved product positioning: moving from a simple task manager to an enterprise-grade productivity suite.</p>
              <p>Key requirements:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Must maintain a subtle connection to our original 'flow' concept.</li>
                <li>Needs to work seamlessly in both light and dark modes.</li>
                <li>Scalable from tiny favicons to massive billboard formats.</li>
              </ul>
              <p>Please review the attached moodboard before starting initial sketches. Aim for 3 distinct directions by next Tuesday.</p>
            </div>
          </div>

          {/* Subtasks Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-semibold text-[#0F172A]">Subtasks</h2>
              <span className="text-sm font-medium text-[#64728B]">{completedCount}/{subtasks.length} Completed</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 mb-6 overflow-hidden">
              <div className="bg-[#6161FF] h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              {subtasks.map(task => (
                <label key={task.id} className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={task.completed}
                      onChange={() => toggleSubtask(task.id)}
                    />
                    <div className="w-5 h-5 rounded border-2 border-[#CBD5E1] bg-white peer-checked:bg-[#6161FF] peer-checked:border-[#6161FF] transition-colors flex items-center justify-center">
                      <svg className={`w-3.5 h-3.5 text-white ${task.completed ? 'opacity-100' : 'opacity-0'} transition-opacity`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </div>
                  <span className={`text-[15px] select-none ${task.completed ? 'text-[#94A3B8] line-through' : 'text-[#334155]'}`}>
                    {task.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Attachments Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-[#0F172A]">Attachments</h2>
              <button className="text-sm font-medium text-[#6161FF] hover:underline flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add File
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Image Attachment */}
              <div className="group border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#CBD5E1] transition-colors cursor-pointer">
                <div className="h-24 bg-[#F1F5F9] flex items-center justify-center text-[#94A3B8] group-hover:bg-[#E2E8F0] transition-colors">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 3h2v2H8V9zm8 7H8v-2l3-3 2 2 3-3 2 2v4z"/></svg>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-[#0F172A] truncate">moodboard_v1.png</p>
                  <p className="text-xs text-[#64728B]">2.4 MB</p>
                </div>
              </div>
              {/* PDF Attachment */}
              <div className="group border border-[#E2E8F0] rounded-xl overflow-hidden hover:border-[#CBD5E1] transition-colors cursor-pointer">
                <div className="h-24 bg-[#F8FAFC] flex items-center justify-center text-[#EF4444] group-hover:bg-[#F1F5F9] transition-colors">
                  <div className="flex flex-col items-center">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9.5 11.5c0 .8-.7 1.5-1.5 1.5H7v2H5.5V7H8c.8 0 1.5.7 1.5 1.5v3zm5 2c0 .8-.7 1.5-1.5 1.5h-2.5V7H13c.8 0 1.5.7 1.5 1.5v5zm4-3H17v1.5h1.5v1.5H17V15h-1.5V7h3v1.5zM7 8.5v1.5h1V8.5H7zm6.5 4.5h-1v-3h1v3z"/></svg>
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-[#0F172A] truncate">Brand_Guidelines_2023.pdf</p>
                  <p className="text-xs text-[#64728B]">8.1 MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-6">Activity</h2>
            
            <div className="space-y-6">
              {/* Activity Item 1 */}
              <div className="flex gap-4">
                <div className="relative mt-1">
                  <div className="w-2.5 h-2.5 bg-[#CBD5E1] rounded-full z-10 relative"></div>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-[#E2E8F0]"></div>
                </div>
                <div>
                  <p className="text-[14px] text-[#334155]">
                    <span className="font-semibold text-[#0F172A]">Sarah Chen</span> changed status from 
                    <span className="inline-flex mx-1 px-1.5 py-0.5 bg-[#F1F5F9] text-[#475569] text-xs font-medium rounded">To Do</span> to 
                    <span className="inline-flex mx-1 px-1.5 py-0.5 bg-[#EEF2FF] text-[#6161FF] text-xs font-medium rounded">In Progress</span>
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-1">2 hours ago</p>
                </div>
              </div>

              {/* Comment Item */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                   <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Chen" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-[#0F172A] text-sm">Sarah Chen</span>
                      <span className="text-xs text-[#94A3B8]">Yesterday at 4:30 PM</span>
                    </div>
                    <p className="text-[14px] text-[#475569] leading-relaxed">
                      I've attached the old brand guidelines for reference. <span className="text-[#6161FF] font-medium cursor-pointer">@Alex Rivera</span> let's make sure we steer clear of the old color palette entirely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="flex gap-4 pt-4 border-t border-[#E2E8F0]">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                   <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Current User" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="border border-[#E2E8F0] rounded-xl overflow-hidden focus-within:border-[#6161FF] focus-within:ring-1 focus-within:ring-[#6161FF] transition-all">
                    <textarea 
                      placeholder="Write a comment... use @ to mention" 
                      className="w-full p-3 min-h-[100px] text-[14px] text-[#0F172A] placeholder-[#94A3B8] outline-none resize-none"
                    ></textarea>
                    <div className="bg-[#F8FAFC] px-3 py-2 border-t border-[#E2E8F0] flex justify-between items-center">
                      <div className="flex gap-2 text-[#64728B]">
                        <button className="p-1.5 hover:bg-[#E2E8F0] rounded transition-colors"><strong className="font-serif">B</strong></button>
                        <button className="p-1.5 hover:bg-[#E2E8F0] rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></button>
                        <button className="p-1.5 hover:bg-[#E2E8F0] rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg></button>
                      </div>
                      <button className="px-4 py-1.5 bg-[#6161FF] text-white text-sm font-medium rounded-lg hover:bg-[#4F46E5] transition-colors">
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN - Sidebar */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-6">
          
          {/* Action Buttons */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm flex flex-col gap-3">
            <button className="w-full py-2.5 bg-[#6161FF] text-white font-medium rounded-lg hover:bg-[#4F46E5] transition-colors flex items-center justify-center gap-2 shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Mark as Done
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-2 bg-white border border-[#E2E8F0] text-[#0F172A] font-medium text-sm rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-[#64728B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                Edit Task
              </button>
              <button className="py-2 bg-white border border-[#FECACA] text-[#EF4444] font-medium text-sm rounded-lg hover:bg-[#FEF2F2] transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Delete
              </button>
            </div>
          </div>

          {/* Properties Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-5">Properties</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#64728B] uppercase tracking-wide mb-2">Assignee</p>
                <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[14px] font-medium text-[#0F172A] cursor-pointer hover:bg-[#F1F5F9] transition-colors">
                  <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Rivera" className="w-5 h-5 rounded-full" />
                  Alex Rivera
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#64728B] uppercase tracking-wide mb-2">Due Date</p>
                <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[14px] font-medium text-[#0F172A] cursor-pointer hover:bg-[#F1F5F9] transition-colors">
                  <svg className="w-4 h-4 text-[#64728B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Oct 12, 2024
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#64728B] uppercase tracking-wide mb-2">Project</p>
                <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[14px] font-medium text-[#0F172A] cursor-pointer hover:bg-[#F1F5F9] transition-colors">
                  <svg className="w-4 h-4 text-[#FF00D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                  Marketing Launch 2024
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#64728B] uppercase tracking-wide mb-2">Labels</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#EEF2FF] text-[#6161FF] text-xs font-semibold">Design</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#FFF7ED] text-[#F97316] text-xs font-semibold">Branding</span>
                  <button className="w-6 h-6 rounded bg-[#F1F5F9] flex items-center justify-center text-[#64728B] hover:bg-[#E2E8F0] transition-colors">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Linked Items */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Linked Items</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2.5 rounded-lg border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors cursor-pointer bg-white">
                <svg className="w-4 h-4 text-[#64728B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span className="text-sm font-medium text-[#0F172A]">Marketing Strategy Doc</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors cursor-pointer bg-white">
                <svg className="w-4 h-4 text-[#64728B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                <span className="text-sm font-medium text-[#0F172A]">Epic: Brand Refresh</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
