// ==============================================
// Column Component - Kanban Board Column
// ==============================================
// Renders one column of the Kanban board (e.g.,
// "To Do", "In Progress", "Done"). Maps through
// the provided tasks and renders a TaskCard for
// each one.
//
// Props:
//   - title      : string → column header text
//   - tasks      : array → tasks belonging to this column
//   - icon       : string → emoji/icon for the header
//   - accentColor: string → Tailwind color class for the header dot
//   - borderColor: string → Tailwind border color on hover
//   - onEdit     : function(task) → passed to each TaskCard
//   - onDelete   : function(taskId) → passed to each TaskCard
// ==============================================

import TaskCard from "./TaskCard";

const Column = ({
  title,
  tasks,
  icon,
  accentColor = "bg-slate-400",
  borderColor = "border-slate-500/30",
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`kanban-column hover:${borderColor} transition-colors`}>
      {/* ------------------------------------------
          COLUMN HEADER
          ------------------------------------------ */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2.5">
          {/* Status indicator dot */}
          <span className={`w-2.5 h-2.5 rounded-full ${accentColor}`}></span>
          {/* Column title with icon */}
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
            {icon} {title}
          </h3>
        </div>
        {/* Task count badge */}
        <span className="text-xs font-medium text-slate-400 bg-slate-700/50 px-2.5 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* ------------------------------------------
          TASK LIST
          ------------------------------------------ */}
      <div className="space-y-3 kanban-column-body">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          // Empty state message
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="w-12 h-12 bg-slate-700/30 rounded-xl flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-slate-600 text-xs text-center">
              No tasks here yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
