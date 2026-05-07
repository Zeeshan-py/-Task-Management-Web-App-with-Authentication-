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

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    // ------------------------------------------
    // BACKDROP OVERLAY
    // ------------------------------------------
    // Clicking the dark backdrop closes the modal.
    // We use stopPropagation on the modal card so
    // clicks inside the card don't bubble up and
    // trigger the backdrop's onClick.
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      {/* ------------------------------------------
          MODAL CARD
          ------------------------------------------ */}
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            {/* X icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body — renders whatever children are passed */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default TaskModal;
