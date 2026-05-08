import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Pencil, Trash2 } from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, isDragging = false, columnId }) => {
  const hashValue = [...String(task._id || task.title || "task")].reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  // ------------------------------------------
  // PRIORITY CONFIG (Matched to Design)
  // ------------------------------------------
  const priorityConfig = {
    high: {
      label: "High",
      bgColor: "bg-rose-50",
      textColor: "text-rose-600",
      icon: "H",
    },
    medium: {
      label: "Med",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      icon: "M",
    },
    low: {
      label: "Low",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      icon: "L",
    },
  };

  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  // ------------------------------------------
  // ------------------------------------------
  // Lightweight deterministic display values
  // ------------------------------------------
  // Derive UI-only values from task id so cards do not visually
  // jump on every render (Math.random was causing inconsistency).
  const isDesign = task.title.toLowerCase().includes('design') || task.title.toLowerCase().includes('logo');
  const isMarketing = task.title.toLowerCase().includes('marketing') || task.title.toLowerCase().includes('seo');
  
  const tagLabel = isDesign ? "Design" : isMarketing ? "Marketing" : "Content";
  const tagColor = isDesign ? "bg-indigo-50 text-indigo-700" : isMarketing ? "bg-fuchsia-50 text-fuchsia-700" : "bg-sky-50 text-sky-700";
  
  const progressValue = 45 + (hashValue % 45); // 45-89%
  const checklistsTotal = 2 + (hashValue % 4); // 2-5
  const checklistsDone = hashValue % (checklistsTotal + 1);

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
    <motion.div
      whileHover={{ y: -2 }}
      className={`group relative bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/90 hover:shadow-md hover:shadow-slate-200/70 hover:border-slate-300 transition-all cursor-pointer min-h-[156px] ${isDragging ? "rotate-2 scale-105 shadow-xl opacity-90 border-indigo-300" : ""}`}
    >
      {/* ---- Edit/Delete Hover Actions ---- */}
      {!isDragging && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white/95 backdrop-blur p-1 rounded-md shadow-sm border border-slate-100">
          <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="p-1 text-indigo-500 hover:bg-slate-100 rounded transition-colors" aria-label="Edit">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(task._id); }} className="p-1 text-red-500 hover:bg-slate-100 rounded transition-colors" aria-label="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ---- Top Row: Tags & Priority ---- */}
      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
        {/* Priority Badge */}
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider ${priority.bgColor} ${priority.textColor}`}>
            <span>{priority.icon}</span> {priority.label}
        </span>
        
        {/* Category Tag */}
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider ${tagColor}`}>
          {tagLabel}
        </span>
      </div>

      {/* ---- Title ---- */}
      <h4 className="text-slate-900 font-semibold text-[13.5px] mb-1 leading-snug">
        {task.title}
      </h4>

      {/* ---- Description ---- */}
      {task.description ? (
        <p className="text-slate-500 text-[12px] leading-relaxed mb-2.5 line-clamp-2">
          {task.description}
        </p>
      ) : (
        <p className="text-slate-400 text-[11.5px] leading-relaxed mb-2.5 line-clamp-2">
          No description provided yet.
        </p>
      )}

      {/* ---- Progress Bar (Only for In Progress) ---- */}
      {columnId === "in-progress" && (
        <div className="mb-2.5">
          <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-medium">
            <span>Progress</span>
            <span>{progressValue}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-1.5 rounded-full" style={{ width: `${progressValue}%` }}></div>
          </div>
        </div>
      )}

      {/* ---- Footer: Metrics & Avatars ---- */}
      <div className="flex items-center justify-between mt-auto pt-0.5">
        <div className="flex items-center gap-2.5">
          {/* Due Date */}
          {dueDate && (
            <div className={`flex items-center gap-1 text-[11.5px] font-medium ${dueDate.isOverdue ? "text-red-500" : "text-slate-400"}`}>
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{dueDate.formatted}</span>
            </div>
          )}

          {/* Checklist (Dummy) */}
          <div className="flex items-center gap-1 text-[11.5px] font-medium text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
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
    </motion.div>
  );
};

export default TaskCard;
