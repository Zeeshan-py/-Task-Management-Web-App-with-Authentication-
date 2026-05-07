import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

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
    <div className="w-[280px] sm:w-[320px] shrink-0 flex flex-col snap-center bg-slate-100/50 rounded-xl p-2.5 border border-slate-200/50">
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
            className={`space-y-3 kanban-column-body ${
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

            {/* Add Task Button */}
            <button 
              onClick={onAddTask}
              className="w-full mt-2 py-2 border-2 border-transparent hover:border-slate-300 border-dashed rounded-lg text-slate-500 text-[13px] font-medium hover:bg-slate-200/50 hover:text-slate-800 transition-all flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Task
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
