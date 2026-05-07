// ==============================================
// Dashboard Page - Full Kanban Board
// ==============================================
// The main page users see after login. Fetches
// tasks from the backend and displays them in a
// 3-column Kanban layout: To Do, In Progress, Done.
//
// Features:
//   - Fetch all tasks on mount
//   - Separate tasks by status into columns
//   - Create new tasks via modal
//   - Edit existing tasks via modal
//   - Delete tasks with confirmation
//   - Live stats cards (counts per column)
//   - Loading & empty states
//   - Full CRUD integration with backend API
// ==============================================

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import toast from "react-hot-toast";

// Components
import Loader from "../components/Loader";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const { user } = useAuth();

  // ------------------------------------------
  // STATE
  // ------------------------------------------
  const [tasks, setTasks] = useState([]);        // All tasks from backend
  const [loading, setLoading] = useState(true);  // Initial fetch loading
  const [saving, setSaving] = useState(false);   // Create/update saving

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // null = create mode, object = edit mode

  // ------------------------------------------
  // FETCH ALL TASKS
  // ------------------------------------------
  // useCallback memoizes this function so it
  // doesn't get recreated on every render.
  // Called on mount and after any CRUD operation.
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

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ------------------------------------------
  // SEPARATE TASKS BY STATUS
  // ------------------------------------------
  // Filter tasks into three arrays, one for each
  // Kanban column. This runs on every render but
  // is fast because it's just array filtering.
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  // ------------------------------------------
  // OPEN MODAL — CREATE MODE
  // ------------------------------------------
  const openCreateModal = () => {
    setEditingTask(null);  // null = create mode
    setIsModalOpen(true);
  };

  // ------------------------------------------
  // OPEN MODAL — EDIT MODE
  // ------------------------------------------
  const openEditModal = (task) => {
    setEditingTask(task);  // pre-fill form with this task
    setIsModalOpen(true);
  };

  // ------------------------------------------
  // CLOSE MODAL
  // ------------------------------------------
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // ------------------------------------------
  // HANDLE CREATE / UPDATE TASK
  // ------------------------------------------
  // This function handles both operations:
  //   - If editingTask exists → PUT (update)
  //   - If editingTask is null → POST (create)
  const handleSubmitTask = async (taskData) => {
    setSaving(true);

    try {
      if (editingTask) {
        // UPDATE existing task
        await updateTask(editingTask._id, taskData);
        toast.success("Task updated successfully!");
      } else {
        // CREATE new task
        await createTask(taskData);
        toast.success("Task created successfully!");
      }

      // Close modal and refresh task list
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
    // Confirm before deleting
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Welcome, <span className="gradient-text">{user?.name}</span> 👋
          </h1>
          <p className="text-slate-400 text-sm">
            Manage your tasks across the board. Drag-and-drop coming soon!
          </p>
        </div>

        {/* Add Task Button */}
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer shrink-0"
        >
          {/* Plus icon */}
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
          STATS CARDS
          ============================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* To Do stat */}
        <div className="glass-card p-5 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              To Do
            </h3>
            <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
          </div>
          <p className="text-2xl font-bold text-white">{todoTasks.length}</p>
          <p className="text-slate-500 text-xs mt-0.5">tasks pending</p>
        </div>

        {/* In Progress stat */}
        <div className="glass-card p-5 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              In Progress
            </h3>
            <span className="w-2.5 h-2.5 bg-blue-400 rounded-full"></span>
          </div>
          <p className="text-2xl font-bold text-white">{inProgressTasks.length}</p>
          <p className="text-slate-500 text-xs mt-0.5">tasks active</p>
        </div>

        {/* Done stat */}
        <div className="glass-card p-5 hover:border-green-500/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider">
              Done
            </h3>
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full"></span>
          </div>
          <p className="text-2xl font-bold text-white">{doneTasks.length}</p>
          <p className="text-slate-500 text-xs mt-0.5">tasks completed</p>
        </div>
      </div>

      {/* ============================================
          KANBAN BOARD — 3-Column Layout
          ============================================ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TO DO Column */}
        <Column
          title="To Do"
          icon="📋"
          tasks={todoTasks}
          accentColor="bg-yellow-400"
          borderColor="border-yellow-500/30"
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />

        {/* IN PROGRESS Column */}
        <Column
          title="In Progress"
          icon="🔄"
          tasks={inProgressTasks}
          accentColor="bg-blue-400"
          borderColor="border-blue-500/30"
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />

        {/* DONE Column */}
        <Column
          title="Done"
          icon="✅"
          tasks={doneTasks}
          accentColor="bg-green-400"
          borderColor="border-green-500/30"
          onEdit={openEditModal}
          onDelete={handleDeleteTask}
        />
      </div>

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
