// ==============================================
// TaskForm Component - Create / Edit Task Form
// ==============================================

import { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, initialData = null, isLoading = false, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "medium",
        status: initialData.status || "todo",
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const isEditMode = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ---- Title Input ---- */}
      <div>
        <label htmlFor="task-title" className="block text-sm font-medium text-[#0F172A] mb-1.5">
          Title <span className="text-[#EF4444]">*</span>
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
          className="input-field"
        />
      </div>

      {/* ---- Description Textarea ---- */}
      <div>
        <label htmlFor="task-description" className="block text-sm font-medium text-[#0F172A] mb-1.5">
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
          className="input-field resize-none"
        />
      </div>

      {/* ---- Priority & Status Row ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Priority Select */}
        <div>
          <label htmlFor="task-priority" className="block text-sm font-medium text-[#0F172A] mb-1.5">
            Priority
          </label>
          <select
            id="task-priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-field cursor-pointer"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        {/* Status Select */}
        <div>
          <label htmlFor="task-status" className="block text-sm font-medium text-[#0F172A] mb-1.5">
            Status
          </label>
          <select
            id="task-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field cursor-pointer"
          >
            <option value="todo">📋 To Do</option>
            <option value="in-progress">🔄 In Progress</option>
            <option value="done">✅ Review</option>
          </select>
        </div>
      </div>

      {/* ---- Due Date Input ---- */}
      <div>
        <label htmlFor="task-due-date" className="block text-sm font-medium text-[#0F172A] mb-1.5">
          Due Date
        </label>
        <input
          id="task-due-date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      {/* ---- Action Buttons ---- */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-sm font-medium text-[#64728B] bg-white hover:bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.title.trim()}
          className="px-5 py-2.5 text-sm font-medium text-white bg-[#6161FF] hover:bg-[#4F46E5] rounded-lg transition-colors shadow-sm disabled:opacity-50"
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
