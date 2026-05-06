// ==============================================
// Task Model - Mongoose Schema
// ==============================================
// This file defines the shape of a Task document
// in MongoDB. Tasks are the core entity of our
// Kanban-style task management app.
//
// KEY CONCEPTS:
//
// 1. REFERENCES (ref: "User")
//    - Instead of storing the entire user object
//      inside each task, we store only the user's
//      ObjectId. This is called a "reference."
//    - When we need the user's data (like name),
//      we use Mongoose's .populate() method to
//      fetch it automatically.
//    - This keeps data normalized and prevents
//      duplication across documents.
//
// 2. ENUMS
//    - An enum restricts a field to specific
//      allowed values. If someone tries to set
//      status to "banana", Mongoose will throw
//      a validation error.
//
// 3. OWNERSHIP (createdBy)
//    - Every task stores who created it.
//    - This allows us to filter tasks per user
//      and enforce ownership rules (users can
//      only edit/delete their own tasks).
// ==============================================

const mongoose = require("mongoose");

// ------------------------------------------
// DEFINE THE TASK SCHEMA
// ------------------------------------------
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a task title"],
      trim: true,
      maxlength: [100, "Task title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
      // WHY default to empty string instead of required?
      // - Not every task needs a description.
      // - A quick task like "Fix login bug" might
      //   not need further explanation.
      // - Default "" prevents null values in the DB.
    },

    status: {
      type: String,
      enum: {
        values: ["todo", "in-progress", "done"],
        message: "Status must be 'todo', 'in-progress', or 'done'",
      },
      default: "todo",
      // WHY default to "todo"?
      // - In a Kanban board, new tasks always start
      //   in the "To Do" column. Users then drag
      //   them to "In Progress" and "Done."
    },

    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "Priority must be 'low', 'medium', or 'high'",
      },
      default: "medium",
      // WHY default to "medium"?
      // - If the user doesn't specify priority,
      //   we assume a neutral importance level.
      // - This prevents unintentional "high" priority
      //   flooding the board.
    },

    dueDate: {
      type: Date,
      default: null,
      // WHY allow null?
      // - Not every task has a deadline.
      // - Forcing a due date would add unnecessary
      //   friction for quick tasks.
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      // WHY ref: "User"?
      // - This tells Mongoose that assignedTo holds
      //   a reference to a document in the "users"
      //   collection. We can then use .populate()
      //   to fetch the user's name and email.
      //
      // WHY default null?
      // - A task might be created without being
      //   assigned to anyone yet. The creator can
      //   assign it later.
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task must have a creator"],
      // WHY required?
      // - Every task MUST have an owner. This is
      //   critical for:
      //   1. Security: only the creator can edit/delete
      //   2. Filtering: showing "my tasks" on the board
      //   3. Auditing: knowing who created what
    },
  },
  {
    // ------------------------------------------
    // SCHEMA OPTIONS
    // ------------------------------------------
    timestamps: true,
    // Automatically adds createdAt and updatedAt
    // - createdAt: when the task was created
    // - updatedAt: when the task was last modified
    //   (e.g., status change, title edit)
  }
);

// ------------------------------------------
// INDEXES
// ------------------------------------------
// Indexes speed up database queries. Without
// them, MongoDB scans every document (slow).
//
// WHY index createdBy?
// - We query tasks by creator frequently
//   (GET /api/tasks → find all MY tasks).
// - An index on createdBy makes this O(log n)
//   instead of O(n).
//
// WHY compound index {createdBy, status}?
// - We often filter tasks by both owner AND status
//   (e.g., "show me all my in-progress tasks").
// - A compound index covers both filters efficiently.
taskSchema.index({ createdBy: 1 });
taskSchema.index({ createdBy: 1, status: 1 });

// ------------------------------------------
// COMPILE AND EXPORT THE MODEL
// ------------------------------------------
// Creates a "Task" model → connects to "tasks" collection
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
