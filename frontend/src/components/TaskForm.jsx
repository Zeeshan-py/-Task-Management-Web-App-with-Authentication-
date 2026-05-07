// ==============================================
// TaskForm Component - Create / Edit Task Form
// ==============================================
// A controlled form component used for both
// creating new tasks and editing existing ones.
//
// Props:
//   - onSubmit     : function(taskData) → called on form submit
//   - initialData  : object → pre-fills form when editing (null for create)
//   - isLoading    : boolean → disables submit button while saving
//   - onCancel     : function → called when Cancel button is clicked
//
// HOW IT WORKS:
//   - If initialData is provided, the form starts
//     pre-filled (edit mode).
//   - If initialData is null/undefined, the form
//     starts empty (create mode).
//   - The parent component handles the API call;
//     this form only collects and validates data.
// ==============================================

import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, initialData = null, isLoading = false, onCancel }) => {
  // ------------------------------------------
  // FORM STATE
  // ------------------------------------------
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });

  // ------------------------------------------
  // PRE-FILL FORM FOR EDITING
  // ------------------------------------------
  // When initialData changes (e.g., user clicks
  // "edit" on a different task), update the form
  // fields with the existing task data.
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "medium",
        status: initialData.status || "todo",
        // Format the date for the HTML date input (YYYY-MM-DD)
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      // Reset form when switching to create mode
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
      });
    }
  }, [initialData]);

  // ------------------------------------------
  // HANDLE INPUT CHANGES
  // ------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------------------------------
  // HANDLE FORM SUBMIT
  // ------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the payload — only include dueDate if set
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
    };

    if (formData.dueDate) {
      payload.dueDate = formData.dueDate;
    } else {
      payload.dueDate = null;
    }

    onSubmit(payload);
  };

  // ------------------------------------------
  // DETERMINE MODE (Create vs Edit)
  // ------------------------------------------
  const isEditMode = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* ---- Title Input ---- */}
      <div>
        <label
          htmlFor="task-title"
          className="block text-sm font-medium text-slate-300 mb-1.5"
        >
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={100}
          placeholder="e.g., Build Kanban Board UI"
          className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
      </div>

      {/* ---- Description Textarea ---- */}
      <div>
        <label
          htmlFor="task-description"
          className="block text-sm font-medium text-slate-300 mb-1.5"
        >
          Description
        </label>
        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={500}
          rows={3}
          placeholder="Add task details..."
          className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
        />
      </div>

      {/* ---- Priority & Status Row ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Priority Select */}
        <div>
          <label
            htmlFor="task-priority"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        {/* Status Select */}
        <div>
          <label
            htmlFor="task-status"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Status
          </label>
          <select
            id="task-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
          >
            <option value="todo">📋 To Do</option>
            <option value="in-progress">🔄 In Progress</option>
            <option value="done">✅ Done</option>
          </select>
        </div>
      </div>

      {/* ---- Due Date Input ---- */}
      <div>
        <label
          htmlFor="task-due-date"
          className="block text-sm font-medium text-slate-300 mb-1.5"
        >
          Due Date
        </label>
        <input
          id="task-due-date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
      </div>

      {/* ---- Action Buttons ---- */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl border border-slate-600 transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.title.trim()}
          className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading
            ? "Saving..."
            : isEditMode
            ? "Update Task"
            : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
