import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { motion } from "framer-motion";
import { ClipboardList, Plus } from "lucide-react";

const Column = ({
  title,
  columnId,
  tasks,
  accentColor = "bg-[#64728B]",
  onEdit,
  onDelete,
  onAddTask,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-[290px] sm:w-[340px] lg:w-[360px] shrink-0 flex flex-col snap-center bg-white/70 rounded-2xl p-3 border border-slate-200/70 shadow-sm"
    >
      {/* ------------------------------------------
          COLUMN HEADER
          ------------------------------------------ */}
      <div className="flex items-center justify-between mb-3 px-2 pt-1">
        <div className="flex items-center gap-2.5">
          {/* Status indicator dot */}
          <span className={`w-2 h-2 rounded-full ${accentColor} shadow-sm`}></span>
          {/* Column title */}
          <h3 className="text-[14px] font-semibold text-slate-800 tracking-wide">
            {title}
          </h3>
          {/* Task count badge */}
          <span className="text-[11px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full ml-0.5">
            {tasks.length}
          </span>
        </div>
        {/* More options icon */}
        <button className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 p-1 rounded transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
        </button>
      </div>

      {/* ------------------------------------------
          DROPPABLE ZONE
          ------------------------------------------ */}
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 kanban-column-body min-h-[420px] ${
              snapshot.isDraggingOver ? "drop-zone-active" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task._id}
                draggableId={task._id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? "task-card-dragging" : ""}
                  >
                    <TaskCard
                      task={task}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      isDragging={snapshot.isDragging}
                      columnId={columnId}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {!tasks.length && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-5 text-center">
                <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 mb-3">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <p className="text-[13px] font-medium text-slate-700">No tasks in this lane</p>
                <p className="text-[12px] text-slate-500 mt-1">Add your next action item to get started.</p>
              </div>
            )}

            {/* Add Task Button */}
            <button
              onClick={onAddTask}
              className="w-full mt-2 py-2.5 border border-dashed border-slate-300 rounded-lg text-slate-500 text-[13px] font-medium bg-white hover:bg-slate-50 hover:text-slate-800 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        )}
      </Droppable>
    </motion.section>
  );
};

export default Column;
