// ==============================================
// Dashboard Page - Full Kanban Board + Drag & Drop
// ==============================================
// The main page users see after login. Now features:
//   - @hello-pangea/dnd drag-and-drop between columns
//   - Optimistic UI updates (instant visual feedback)
//   - Search tasks by title in real-time
//   - Filter tasks by priority
//   - Full CRUD (create, read, update, delete)
//   - Live stat cards with real-time counts
//
// DRAG & DROP ARCHITECTURE:
//   1. DragDropContext wraps the entire board
//   2. Each Column is a Droppable zone
//   3. Each TaskCard is a Draggable item
//   4. onDragEnd handles the drop → calls moveTask API
//   5. Optimistic update: UI updates instantly, then
//      syncs with the backend. If the API fails, the
//      UI reverts to the previous state.
// ==============================================

import { useState, useEffect, useCallback, useMemo } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAuth } from "../context/AuthContext";
import { getTasks, createTask, updateTask, deleteTask, moveTask } from "../services/api";
import toast from "react-hot-toast";

// Components
import Loader from "../components/Loader";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";
import SearchFilter from "../components/SearchFilter";

// ------------------------------------------
// COLUMN CONFIGURATION
// ------------------------------------------
// Centralised config for all three Kanban columns.
// The key matches the backend status value.
const COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    icon: "📋",
    accentColor: "bg-yellow-400",
    statBorder: "hover:border-yellow-500/30",
    statLabel: "tasks pending",
  },
  {
    id: "in-progress",
    title: "In Progress",
    icon: "🔄",
    accentColor: "bg-blue-400",
    statBorder: "hover:border-blue-500/30",
    statLabel: "tasks active",
  },
  {
    id: "done",
    title: "Done",
    icon: "✅",
    accentColor: "bg-green-400",
    statBorder: "hover:border-green-500/30",
    statLabel: "tasks completed",
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  // ------------------------------------------
  // STATE
  // ------------------------------------------
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // ------------------------------------------
  // FETCH ALL TASKS
  // ------------------------------------------
  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks();
      setTasks(data.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ------------------------------------------
  // FILTER & SEARCH TASKS
  // ------------------------------------------
  // useMemo ensures filtering only runs when
  // tasks, searchQuery, or priorityFilter change.
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filter by search query (case-insensitive title match)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.description && t.description.toLowerCase().includes(query))
      );
    }

    // Filter by priority
    if (priorityFilter !== "all") {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    return result;
  }, [tasks, searchQuery, priorityFilter]);

  // ------------------------------------------
  // SEPARATE TASKS BY STATUS
  // ------------------------------------------
  // These use the filteredTasks (search/filter applied)
  // for display, but stats use the raw tasks array.
  const getColumnTasks = (statusId) =>
    filteredTasks.filter((t) => t.status === statusId);

  // Raw counts (unfiltered) for stat cards
  const rawCounts = useMemo(() => ({
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  }), [tasks]);

  // ------------------------------------------
  // DRAG AND DROP HANDLER
  // ------------------------------------------
  // Called when a card is dropped. If the card
  // landed in a different column, we:
  //   1. Optimistically update the UI
  //   2. Call the moveTask API
  //   3. Revert if the API fails
  const onDragEnd = useCallback(
    async (result) => {
      const { destination, source, draggableId } = result;

      // Dropped outside a valid zone
      if (!destination) return;

      // Dropped in the same position
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const newStatus = destination.droppableId;
      const oldStatus = source.droppableId;

      // Same column reorder — just visual, no API call needed
      // (backend doesn't track order within a column)
      if (newStatus === oldStatus) return;

      // ------------------------------------------
      // OPTIMISTIC UPDATE
      // ------------------------------------------
      // Update the UI immediately before the API call.
      // This makes the drag feel instant and responsive.
      const previousTasks = [...tasks];

      setTasks((prev) =>
        prev.map((t) =>
          t._id === draggableId ? { ...t, status: newStatus } : t
        )
      );

      // ------------------------------------------
      // API CALL
      // ------------------------------------------
      try {
        await moveTask(draggableId, newStatus);

        // Get the task title for the toast
        const task = previousTasks.find((t) => t._id === draggableId);
        const columnName = COLUMNS.find((c) => c.id === newStatus)?.title || newStatus;
        toast.success(`"${task?.title}" moved to ${columnName}`);
      } catch (error) {
        // ------------------------------------------
        // REVERT ON FAILURE
        // ------------------------------------------
        // If the API call fails, revert the UI back
        // to the previous state so data stays in sync.
        setTasks(previousTasks);
        const message = error.response?.data?.message || "Failed to move task";
        toast.error(message);
      }
    },
    [tasks]
  );

  // ------------------------------------------
  // MODAL HANDLERS
  // ------------------------------------------
  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // ------------------------------------------
  // HANDLE CREATE / UPDATE TASK
  // ------------------------------------------
  const handleSubmitTask = async (taskData) => {
    setSaving(true);

    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
        toast.success("Task updated successfully!");
      } else {
        await createTask(taskData);
        toast.success("Task created successfully!");
      }

      closeModal();
      await fetchTasks();
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  // ------------------------------------------
  // HANDLE DELETE TASK
  // ------------------------------------------
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully!");
      await fetchTasks();
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete task";
      toast.error(message);
    }
  };

  // ------------------------------------------
  // LOADING STATE
  // ------------------------------------------
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ============================================
          HEADER SECTION
          ============================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Welcome, <span className="gradient-text">{user?.name}</span> 👋
          </h1>
          <p className="text-slate-400 text-sm">
            Drag tasks between columns to update their status.
          </p>
        </div>

        {/* Add Task Button */}
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Task
        </button>
      </div>

      {/* ============================================
          SEARCH & FILTER TOOLBAR
          ============================================ */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        totalCount={tasks.length}
      />

      {/* ============================================
          STATS CARDS
          ============================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className={`glass-card p-5 ${col.statBorder} transition-colors`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                {col.title}
              </h3>
              <span className={`w-2.5 h-2.5 ${col.accentColor} rounded-full`}></span>
            </div>
            <p className="text-2xl font-bold text-white">{rawCounts[col.id]}</p>
            <p className="text-slate-500 text-xs mt-0.5">{col.statLabel}</p>
          </div>
        ))}
      </div>

      {/* ============================================
          KANBAN BOARD — Drag & Drop Enabled
          ============================================
          DragDropContext must wrap all Droppable areas.
          onDragEnd fires when the user drops a card. */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              columnId={col.id}
              title={col.title}
              icon={col.icon}
              tasks={getColumnTasks(col.id)}
              accentColor={col.accentColor}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>

      {/* ============================================
          TASK MODAL — Create / Edit
          ============================================ */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          onSubmit={handleSubmitTask}
          initialData={editingTask}
          isLoading={saving}
          onCancel={closeModal}
        />
      </TaskModal>
    </div>
  );
};

export default Dashboard;
