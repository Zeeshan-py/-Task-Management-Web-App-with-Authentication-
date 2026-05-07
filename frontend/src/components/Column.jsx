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
    <div className="w-[85vw] max-w-[320px] shrink-0 kanban-column snap-center">
      {/* ------------------------------------------
          COLUMN HEADER
          ------------------------------------------ */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          {/* Status indicator dot */}
          <span className={`w-2.5 h-2.5 rounded-full ${accentColor}`}></span>
          {/* Column title */}
          <h3 className="text-[15px] font-semibold text-[#0F172A]">
            {title}
          </h3>
          {/* Task count badge */}
          <span className="text-xs font-medium text-[#64728B] bg-[#E2E8F0] px-2 py-0.5 rounded-full ml-1">
            {tasks.length}
          </span>
        </div>
        {/* More options icon */}
        <button className="text-[#64728B] hover:text-[#0F172A] transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
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

            {/* Add Task Button (Matches Image 2) */}
            <button 
              onClick={onAddTask}
              className="w-full mt-2 py-2.5 border border-dashed border-[#CBD5E1] rounded-lg text-[#64728B] text-sm font-medium hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors flex items-center justify-center gap-2"
            >
              <span>+</span> Add Task
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
