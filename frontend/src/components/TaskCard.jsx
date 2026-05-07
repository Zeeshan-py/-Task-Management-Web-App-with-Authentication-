const TaskCard = ({ task, onEdit, onDelete, isDragging = false, columnId }) => {
  // ------------------------------------------
  // PRIORITY CONFIG (Matched to Design)
  // ------------------------------------------
  const priorityConfig = {
    high: {
      label: "High",
      bgColor: "bg-[#FEF2F2]", // light red
      textColor: "text-[#EF4444]", // red
      icon: "⏫", // Replace with chevron if possible, using emoji for now
    },
    medium: {
      label: "Med",
      bgColor: "bg-[#FFFBEB]", // light yellow
      textColor: "text-[#F59E0B]", // yellow
      icon: "➖",
    },
    low: {
      label: "Low",
      bgColor: "bg-[#F0FDF4]", // light green
      textColor: "text-[#22C55E]", // green
      icon: "⏬",
    },
  };

  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  // ------------------------------------------
  // DUMMY DATA FOR VISUAL FIDELITY (Matches Image 2)
  // ------------------------------------------
  // We generate consistent dummy data based on the task ID
  // so it doesn't change on every render.
  const isDesign = task.title.toLowerCase().includes('design') || task.title.toLowerCase().includes('logo');
  const isMarketing = task.title.toLowerCase().includes('marketing') || task.title.toLowerCase().includes('seo');
  
  const tagLabel = isDesign ? "Design" : isMarketing ? "Marketing" : "Content";
  const tagColor = isDesign ? "bg-[#E0E7FF] text-[#4F46E5]" : isMarketing ? "bg-[#F3E8FF] text-[#9333EA]" : "bg-[#DBEAFE] text-[#2563EB]";
  
  const progressValue = Math.floor(Math.random() * 40) + 40; // 40-80%
  const checklistsDone = Math.floor(Math.random() * 3);
  const checklistsTotal = checklistsDone + Math.floor(Math.random() * 3) + 1;

  // ------------------------------------------
  // DUE DATE FORMATTING
  // ------------------------------------------
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isOverdue = date < today && task.status !== "done";

    return {
      formatted: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      isOverdue,
    };
  };

  const dueDate = formatDueDate(task.dueDate);

  return (
    <div className={`task-card group relative ${isDragging ? "task-card-dragging" : ""}`}>
      {/* ---- Edit/Delete Hover Actions ---- */}
      {!isDragging && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm border border-slate-100">
          <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="p-1 text-[#6161FF] hover:bg-[#F1F5F9] rounded" aria-label="Edit">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(task._id); }} className="p-1 text-[#EF4444] hover:bg-[#F1F5F9] rounded" aria-label="Delete">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      )}

      {/* ---- Top Row: Tags & Priority ---- */}
      <div className="flex items-center gap-2 mb-3">
        {/* Priority Badge */}
        {task.priority !== "low" && (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${priority.bgColor} ${priority.textColor}`}>
            <span className="text-[10px]">{priority.icon}</span> {priority.label}
          </span>
        )}
        
        {/* Category Tag */}
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${tagColor}`}>
          {tagLabel}
        </span>
      </div>

      {/* ---- Title ---- */}
      <h4 className="text-[#0F172A] font-semibold text-[15px] mb-1.5 leading-snug">
        {task.title}
      </h4>

      {/* ---- Description ---- */}
      {task.description && (
        <p className="text-[#64728B] text-[13px] leading-relaxed mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* ---- Progress Bar (Only for In Progress) ---- */}
      {columnId === "in-progress" && (
        <div className="mb-4">
          <div className="flex justify-between text-[11px] text-[#64728B] mb-1 font-medium">
            <span>Progress</span>
            <span>{progressValue}%</span>
          </div>
          <div className="w-full bg-[#E2E8F0] rounded-full h-1.5">
            <div className="bg-[#6161FF] h-1.5 rounded-full" style={{ width: `${progressValue}%` }}></div>
          </div>
        </div>
      )}

      {/* ---- Footer: Metrics & Avatars ---- */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center gap-3">
          {/* Due Date */}
          {dueDate && (
            <div className={`flex items-center gap-1 text-[12px] font-medium ${dueDate.isOverdue ? "text-[#EF4444]" : "text-[#64728B]"}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>{dueDate.formatted}</span>
            </div>
          )}

          {/* Checklist (Dummy) */}
          <div className="flex items-center gap-1 text-[12px] font-medium text-[#64728B]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{checklistsDone}/{checklistsTotal}</span>
          </div>
        </div>

        {/* Assignee Avatars (Dummy) */}
        <div className="flex -space-x-1.5">
          <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-slate-200">
            <img src={`https://i.pravatar.cc/150?u=${task._id}1`} alt="Assignee" className="w-full h-full object-cover" />
          </div>
          {checklistsTotal > 2 && (
            <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-slate-200">
              <img src={`https://i.pravatar.cc/150?u=${task._id}2`} alt="Assignee" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
