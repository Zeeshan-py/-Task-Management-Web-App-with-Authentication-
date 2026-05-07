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
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="p-6 space-y-5">
        
        {/* ---- Title Input ---- */}
        <div>
          <label htmlFor="task-title" className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
            Task Title
          </label>
          <input
            id="task-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={100}
            placeholder="What needs to be done?"
            className="w-full px-3 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#6161FF] focus:ring-1 focus:ring-[#6161FF] transition-colors"
          />
        </div>

        {/* ---- Description Textarea ---- */}
        <div>
          <label htmlFor="task-description" className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
            Description
          </label>
          <div className="border border-[#E2E8F0] rounded-lg overflow-hidden focus-within:border-[#6161FF] focus-within:ring-1 focus-within:ring-[#6161FF] transition-all bg-[#F8FAFC]">
            {/* Rich Text Toolbar Mockup */}
            <div className="px-3 py-2 border-b border-[#E2E8F0] flex gap-2 text-[#0F172A] bg-[#F8FAFC]">
              <button type="button" className="p-1 hover:bg-[#E2E8F0] rounded transition-colors"><strong className="font-serif text-[15px]">B</strong></button>
              <button type="button" className="p-1 hover:bg-[#E2E8F0] rounded transition-colors"><em className="font-serif text-[15px]">I</em></button>
              <div className="w-px h-5 bg-[#E2E8F0] mx-1 mt-1"></div>
              <button type="button" className="p-1 hover:bg-[#E2E8F0] rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
              <button type="button" className="p-1 hover:bg-[#E2E8F0] rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></button>
            </div>
            <textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={500}
              rows={4}
              placeholder="Add more details..."
              className="w-full px-3 py-3 bg-white text-[14px] text-[#0F172A] placeholder-[#94A3B8] outline-none resize-none"
            />
          </div>
        </div>

        {/* ---- Grid Details ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Priority */}
          <div>
            <label htmlFor="task-priority" className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
              Priority
            </label>
            <div className="relative">
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] appearance-none focus:outline-none focus:border-[#6161FF] focus:ring-1 focus:ring-[#6161FF] transition-colors cursor-pointer"
              >
                <option value="medium">Select priority</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#64728B]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
              Assignee
            </label>
            <div className="relative">
              <select className="w-full px-3 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] appearance-none focus:outline-none focus:border-[#6161FF] focus:ring-1 focus:ring-[#6161FF] transition-colors cursor-pointer">
                <option>Unassigned</option>
                <option>Jane Doe</option>
                <option>Alex Rivera</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#64728B]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="task-due-date" className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
              Due Date
            </label>
            <div className="relative">
              <input
                id="task-due-date"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#6161FF] focus:ring-1 focus:ring-[#6161FF] transition-colors"
              />
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">
              Labels
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Add labels (comma separated)"
                className="w-full px-3 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#6161FF] focus:ring-1 focus:ring-[#6161FF] transition-colors"
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#64728B]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ---- Action Buttons Footer ---- */}
      <div className="bg-[#F8FAFC] px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3 rounded-b-xl">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-[#64728B] hover:text-[#0F172A] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.title.trim()}
          className="px-5 py-2 text-sm font-medium text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-lg transition-colors shadow-sm disabled:opacity-50"
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
