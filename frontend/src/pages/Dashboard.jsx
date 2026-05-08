// ==============================================
// Dashboard Page - Full Kanban Board + Drag & Drop
// ==============================================

import { useState, useEffect, useCallback } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAuth } from "../context/AuthContext";
import { getTasks, createTask, updateTask, deleteTask, moveTask } from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CalendarClock, CircleDashed, Clock3, FolderKanban } from "lucide-react";

// Components
import Loader from "../components/Loader";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";

// ------------------------------------------
// COLUMN CONFIGURATION
// ------------------------------------------
const COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    accentColor: "bg-[#64728B]", // Neutral
  },
  {
    id: "in-progress",
    title: "In Progress",
    accentColor: "bg-[#6161FF]", // Primary
  },
  {
    id: "done",
    title: "Review", // Renamed to Review based on design
    accentColor: "bg-[#FF00D9]", // Tertiary
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultStatusForNewTask, setDefaultStatusForNewTask] = useState("todo");

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
  // SEPARATE TASKS BY STATUS
  // ------------------------------------------
  const getColumnTasks = (statusId) =>
    tasks.filter((t) => t.status === statusId);

  // ------------------------------------------
  // DRAG AND DROP HANDLER
  // ------------------------------------------
  const onDragEnd = useCallback(
    async (result) => {
      const { destination, source, draggableId } = result;

      if (!destination) return;
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const newStatus = destination.droppableId;
      const oldStatus = source.droppableId;

      if (newStatus === oldStatus) return;

      const previousTasks = [...tasks];

      setTasks((prev) =>
        prev.map((t) =>
          t._id === draggableId ? { ...t, status: newStatus } : t
        )
      );

      try {
        await moveTask(draggableId, newStatus);
      } catch (error) {
        setTasks(previousTasks);
        toast.error("Failed to move task");
      }
    },
    [tasks]
  );

  // ------------------------------------------
  // MODAL HANDLERS
  // ------------------------------------------
  const openCreateModal = (status = "todo") => {
    setEditingTask(null);
    setDefaultStatusForNewTask(status);
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
        await createTask({ ...taskData, status: taskData.status || defaultStatusForNewTask });
        toast.success("Task created successfully!");
      }
      closeModal();
      await fetchTasks();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ------------------------------------------
  // HANDLE DELETE TASK
  // ------------------------------------------
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully!");
      await fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  if (loading) return <Loader />;

  const todoCount = getColumnTasks("todo").length;
  const inProgressCount = getColumnTasks("in-progress").length;
  const doneCount = getColumnTasks("done").length;

  return (
    <div className="w-full space-y-4 md:space-y-5">
      {/* ============================================
          HEADER SECTION
          ============================================ */}
      <section className="rounded-2xl border border-slate-200/70 bg-white/85 shadow-[0_10px_30px_rgba(15,23,42,0.04)] p-4 md:p-5 lg:p-6">
        {/* Breadcrumbs */}
        <div className="text-[12px] text-slate-500 mb-2.5 font-medium flex items-center gap-1.5">
          <span className="hover:text-slate-800 cursor-pointer transition-colors">Projects</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          <span className="hover:text-slate-800 cursor-pointer transition-colors">2024 Initiatives</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight leading-tight">
              Welcome back, {user?.name?.split(" ")[0] || "there"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              You have {tasks.length} tasks across your active board.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-1 xl:mt-0">
            {/* Filter Buttons */}
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <CircleDashed className="w-4 h-4 text-slate-400" />
              To Do: {todoCount}
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <Clock3 className="w-4 h-4 text-slate-400" />
              In Progress: {inProgressCount}
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <CalendarClock className="w-4 h-4 text-slate-400" />
              Review: {doneCount}
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Total Tasks</p>
          <div className="mt-2.5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-slate-900">{tasks.length}</h3>
            <FolderKanban className="w-5 h-5 text-indigo-500" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Active Sprint</p>
          <div className="mt-2.5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-slate-900">{inProgressCount}</h3>
            <Clock3 className="w-5 h-5 text-violet-500" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Completed</p>
          <div className="mt-2.5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-slate-900">{doneCount}</h3>
            <CalendarClock className="w-5 h-5 text-emerald-500" />
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-slate-200/80 bg-white/80 p-3.5 shadow-sm">
          <p className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Focus Score</p>
          <div className="mt-2.5 flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-slate-900">
              {tasks.length ? Math.min(98, 60 + inProgressCount * 4) : 0}%
            </h3>
            <CircleDashed className="w-5 h-5 text-sky-500" />
          </div>
        </motion.div>
      </section>

      {/* ============================================
          KANBAN BOARD
          ============================================ */}
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="rounded-2xl bg-slate-100/40 border border-slate-200/60 p-2.5 md:p-3.5">
          <div className="flex gap-3 md:gap-4 items-start overflow-x-auto pb-2.5 pt-0.5 snap-x snap-mandatory custom-scrollbar-horizontal">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              columnId={col.id}
              title={col.title}
              tasks={getColumnTasks(col.id)}
              accentColor={col.accentColor}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
              onAddTask={() => openCreateModal(col.id)}
            />
          ))}
          </div>
        </section>
      </DragDropContext>

      {/* ============================================
          TASK MODAL
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
