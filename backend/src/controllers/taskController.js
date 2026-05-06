// ==============================================
// Task Controller - Business Logic
// ==============================================
// This controller handles all task-related
// operations. Each function corresponds to
// one API endpoint.
//
// OWNERSHIP RULE:
// - Every task has a createdBy field.
// - When querying tasks, we ALWAYS filter by
//   the logged-in user's ID (req.user._id).
// - This ensures users can ONLY see, edit,
//   and delete their OWN tasks.
//
// CONTROLLER FUNCTIONS:
//   1. createTask    → POST   /api/tasks
//   2. getTasks      → GET    /api/tasks
//   3. getSingleTask → GET    /api/tasks/:id
//   4. updateTask    → PUT    /api/tasks/:id
//   5. deleteTask    → DELETE /api/tasks/:id
//   6. moveTask      → PATCH  /api/tasks/:id/status
// ==============================================

const asyncHandler = require("../utils/asyncHandler");
const Task = require("../models/Task");

// ------------------------------------------
// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (requires JWT)
// ------------------------------------------
const createTask = asyncHandler(async (req, res) => {
  // STEP 1: Extract fields from request body
  const { title, description, status, priority, dueDate, assignedTo } =
    req.body;

  // STEP 2: Validate required fields
  if (!title) {
    res.status(400);
    throw new Error("Please provide a task title");
  }

  // STEP 3: Create the task
  // WHY set createdBy to req.user._id?
  // - req.user is set by the protect middleware
  //   after verifying the JWT token.
  // - This automatically links the task to the
  //   logged-in user without them providing their ID.
  // - Users CANNOT create tasks under someone else's name.
  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    assignedTo,
    createdBy: req.user._id,
  });

  // STEP 4: Respond with the created task
  // WHY 201?
  // - 201 = "Created" → a new resource was successfully
  //   created in the database.
  res.status(201).json({
    success: true,
    data: task,
  });
});

// ------------------------------------------
// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private (requires JWT)
// ------------------------------------------
const getTasks = asyncHandler(async (req, res) => {
  // ------------------------------------------
  // QUERY FILTERING
  // ------------------------------------------
  // We build a filter object dynamically based
  // on query parameters the user sends in the URL.
  //
  // Examples:
  //   GET /api/tasks                    → all my tasks
  //   GET /api/tasks?status=todo        → only my "todo" tasks
  //   GET /api/tasks?priority=high      → only my "high" priority tasks
  //   GET /api/tasks?status=done&priority=low → combined filters
  const filter = { createdBy: req.user._id };

  // Add optional filters from query string
  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.priority) {
    filter.priority = req.query.priority;
  }

  // ------------------------------------------
  // EXECUTE QUERY
  // ------------------------------------------
  const tasks = await Task.find(filter)
    .populate("assignedTo", "name email")
    // WHY .populate("assignedTo", "name email")?
    // - Without populate, assignedTo would just be
    //   an ObjectId like "69fb321526ebc32be26ce2eb".
    // - With populate, Mongoose fetches the referenced
    //   User document and replaces the ID with:
    //   { _id: "...", name: "Zeeshan", email: "..." }
    // - "name email" = only include these fields
    //   (not the password or other sensitive data).
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
  // WHY sort by createdAt: -1?
  // - -1 = descending order (newest first).
  // - On a Kanban board, the most recent tasks
  //   should appear at the top of each column.

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// ------------------------------------------
// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private (requires JWT)
// ------------------------------------------
const getSingleTask = asyncHandler(async (req, res) => {
  // STEP 1: Find the task by ID
  const task = await Task.findById(req.params.id)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  // STEP 2: Check if task exists
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // STEP 3: Verify ownership
  // WHY .toString()?
  // - task.createdBy is a Mongoose ObjectId object.
  // - req.user._id is also an ObjectId object.
  // - Two different ObjectId objects with the same
  //   value are NOT equal with === (they're different
  //   object references in memory).
  // - Converting both to strings allows proper comparison.
  if (task.createdBy._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to access this task");
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// ------------------------------------------
// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private (requires JWT)
// ------------------------------------------
const updateTask = asyncHandler(async (req, res) => {
  // STEP 1: Find the task
  let task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // STEP 2: Verify ownership
  if (task.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this task");
  }

  // STEP 3: Update the task
  // WHY findByIdAndUpdate instead of task.save()?
  // - findByIdAndUpdate is a single database operation
  //   (find + update atomically).
  // - { new: true } returns the UPDATED document
  //   (without it, you get the OLD document).
  // - { runValidators: true } ensures the update
  //   still passes schema validations (e.g., if
  //   someone tries to set status to "banana",
  //   the enum validation catches it).
  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  res.status(200).json({
    success: true,
    data: task,
  });
});

// ------------------------------------------
// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private (requires JWT)
// ------------------------------------------
const deleteTask = asyncHandler(async (req, res) => {
  // STEP 1: Find the task
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // STEP 2: Verify ownership
  if (task.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this task");
  }

  // STEP 3: Delete the task
  // WHY deleteOne() instead of remove()?
  // - .remove() is deprecated in Mongoose 9.x.
  // - .deleteOne() is the modern replacement.
  // - We already have the document, so we call
  //   deleteOne() directly on it.
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: { _id: req.params.id },
  });
});

// ------------------------------------------
// @desc    Move task to a different status column
// @route   PATCH /api/tasks/:id/status
// @access  Private (requires JWT)
// ------------------------------------------
// WHY a separate endpoint for status changes?
// - In a Kanban board, the most common action is
//   dragging a task from one column to another.
// - Using PATCH (not PUT) because we're partially
//   updating the resource (only the status field).
// - PUT = replace the entire resource.
// - PATCH = modify specific fields.
// - This is a REST best practice.
const moveTask = asyncHandler(async (req, res) => {
  const { status } = req.body;

  // STEP 1: Validate the status value
  const validStatuses = ["todo", "in-progress", "done"];

  if (!status) {
    res.status(400);
    throw new Error("Please provide a status value");
  }

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error(
      `Invalid status '${status}'. Allowed values: ${validStatuses.join(", ")}`
    );
  }

  // STEP 2: Find the task
  let task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // STEP 3: Verify ownership
  if (task.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to move this task");
  }

  // STEP 4: Update only the status field
  task.status = status;
  await task.save();

  // Re-fetch with populated fields for the response
  task = await Task.findById(req.params.id)
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email");

  res.status(200).json({
    success: true,
    message: `Task moved to '${status}'`,
    data: task,
  });
});

module.exports = {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  moveTask,
};
