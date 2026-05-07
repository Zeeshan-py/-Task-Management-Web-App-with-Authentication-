// ==============================================
// TaskCard Component - Individual Task Display
// ==============================================
// Renders a single task as a card inside a Kanban
// column. Displays:
//   - Title
//   - Description (truncated)
//   - Priority badge (color-coded)
//   - Due date (with overdue warning)
//   - Edit & Delete action buttons
//
// Props:
//   - task     : object → the task data
//   - onEdit   : function(task) → opens edit modal
//   - onDelete : function(taskId) → triggers delete
// ==============================================

const TaskCard = ({ task, onEdit, onDelete }) => {
  // ------------------------------------------
  // PRIORITY CONFIG
  // ------------------------------------------
  // Maps priority strings to display colors.
  // Used for the badge background and text.
  const priorityConfig = {
    high: {
      label: "High",
      bgColor: "bg-red-500/15",
      textColor: "text-red-400",
      dotColor: "bg-red-400",
    },
    medium: {
      label: "Medium",
      bgColor: "bg-yellow-500/15",
      textColor: "text-yellow-400",
      dotColor: "bg-yellow-400",
    },
    low: {
      label: "Low",
      bgColor: "bg-green-500/15",
      textColor: "text-green-400",
      dotColor: "bg-green-400",
    },
  };

  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  // ------------------------------------------
  // DUE DATE FORMATTING
  // ------------------------------------------
  // Format the due date and check if it's overdue.
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isOverdue = date < today && task.status !== "done";

    return {
      formatted: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      isOverdue,
    };
  };

  const dueDate = formatDueDate(task.dueDate);

  return (
    <div className="task-card group">
      {/* ---- Top Row: Priority Badge ---- */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${priority.bgColor} ${priority.textColor}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dotColor}`}></span>
          {priority.label}
        </span>
      </div>

      {/* ---- Title ---- */}
      <h4 className="text-white font-semibold text-sm mb-1.5 leading-snug">
        {task.title}
      </h4>

      {/* ---- Description (truncated to 2 lines) ---- */}
      {task.description && (
        <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* ---- Due Date ---- */}
      {dueDate && (
        <div
          className={`flex items-center gap-1.5 text-xs mb-3 ${
            dueDate.isOverdue ? "text-red-400" : "text-slate-500"
          }`}
        >
          {/* Calendar icon */}
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {dueDate.formatted}
            {dueDate.isOverdue && " (Overdue)"}
          </span>
        </div>
      )}

      {/* ---- Action Buttons (visible on hover) ---- */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Edit Button */}
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-all cursor-pointer"
          aria-label={`Edit task: ${task.title}`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
          aria-label={`Delete task: ${task.title}`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
