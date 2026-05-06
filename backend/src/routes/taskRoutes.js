// ==============================================
// Task Routes - API Endpoints
// ==============================================
// This file defines the URL endpoints for task
// management and links each one to its controller.
//
// SECURITY:
// - ALL task routes are protected by the JWT
//   middleware. We apply protect GLOBALLY using
//   router.use(protect) instead of adding it
//   to each route individually.
// - This means: if you're not logged in, you
//   cannot access ANY task endpoint.
//
// REST ARCHITECTURE:
//   POST   /api/tasks            → Create a task
//   GET    /api/tasks            → Get all my tasks
//   GET    /api/tasks/:id        → Get one task
//   PUT    /api/tasks/:id        → Update a task
//   DELETE /api/tasks/:id        → Delete a task
//   PATCH  /api/tasks/:id/status → Move task (Kanban drag)
// ==============================================

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  moveTask,
} = require("../controllers/taskController");

// Import auth middleware
const { protect } = require("../middleware/authMiddleware");

// ------------------------------------------
// APPLY PROTECT MIDDLEWARE GLOBALLY
// ------------------------------------------
// router.use(protect) runs the protect middleware
// BEFORE every route defined below this line.
//
// WHY use router.use() instead of per-route?
// - Cleaner code: no need to repeat 'protect'
//   on every single route.
// - Less chance of accidentally leaving a route
//   unprotected.
// - If you ever need a public task route (unlikely),
//   define it ABOVE this line.
router.use(protect);

// ------------------------------------------
// TASK CRUD ROUTES
// ------------------------------------------

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
//
// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user
// @access  Private
//
// WHY chain .post() and .get() on the same route("/")?
// - Both "/api/tasks" (POST to create) and
//   "/api/tasks" (GET to list) share the same URL path.
// - Express Router lets us chain handlers for
//   different HTTP methods on the same path.
// - This is a clean REST pattern.
router.route("/").post(createTask).get(getTasks);

// @route   GET /api/tasks/:id
// @desc    Get a single task by its ID
// @access  Private
//
// @route   PUT /api/tasks/:id
// @desc    Update a task by its ID
// @access  Private
//
// @route   DELETE /api/tasks/:id
// @desc    Delete a task by its ID
// @access  Private
//
// WHY use :id?
// - :id is a URL parameter (route parameter).
// - When someone requests GET /api/tasks/abc123,
//   Express stores "abc123" in req.params.id.
// - This lets us identify WHICH task to get/update/delete.
router.route("/:id").get(getSingleTask).put(updateTask).delete(deleteTask);

// @route   PATCH /api/tasks/:id/status
// @desc    Move a task to a different status column
// @access  Private
//
// WHY a separate route for status?
// - This represents the "drag and drop" action
//   on the Kanban board.
// - PATCH is the correct HTTP method for a partial
//   update (only changing the status field).
// - It's semantically different from PUT /:id
//   which replaces the entire task.
router.route("/:id/status").patch(moveTask);

module.exports = router;
