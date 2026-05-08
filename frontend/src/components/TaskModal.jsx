// ==============================================
// TaskModal Component - Reusable Modal Overlay
// ==============================================
// A reusable modal that renders a centered overlay
// with a glassmorphism card. Accepts children so
// any content (forms, confirmations) can be placed
// inside it.
//
// Props:
//   - isOpen   : boolean → controls visibility
//   - onClose  : function → called when backdrop
//                or close button is clicked
//   - title    : string → modal header text
//   - children : JSX → content to render inside
// ==============================================

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const TaskModal = ({ isOpen, onClose, title, children }) => {
  // ------------------------------------------
  // CLOSE ON ESCAPE KEY
  // ------------------------------------------
  // Listen for the Escape key and close the modal.
  // We add the listener when modal opens and clean
  // it up when it closes (or component unmounts).
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body from scrolling while modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-2xl bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-slate-200 transform transition-all overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 shrink-0">
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
