// ==============================================
// User Model - Mongoose Schema
// ==============================================
// This file defines the shape of a User document
// in MongoDB. It also contains:
//   - Pre-save middleware to hash passwords
//   - Instance method to compare passwords
//
// WHAT IS A SCHEMA?
// - A schema is a blueprint that tells MongoDB
//   what fields a document should have, their
//   types, and any validation rules.
//
// WHAT IS A MODEL?
// - A model is a constructor compiled from the
//   schema. It provides CRUD methods like
//   .find(), .create(), .findById(), etc.
// ==============================================

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// ------------------------------------------
// DEFINE THE USER SCHEMA
// ------------------------------------------
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true, // Removes whitespace from both ends
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true, // No two users can have the same email
      lowercase: true, // Converts "John@Gmail.COM" → "john@gmail.com"
      trim: true,
      validate: {
        // Custom validator using the 'validator' package
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid email address",
      },
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
      // WHY select: false?
      // By default, when you query a user (e.g., User.findById()),
      // the password field will NOT be included in the result.
      // This prevents accidentally sending the hashed password
      // to the client. When you NEED the password (like during
      // login), you explicitly ask for it with .select("+password").
    },

    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role must be either 'user' or 'admin'",
      },
      default: "user",
      // WHY default to "user"?
      // New users should never be admins automatically.
      // Admin role should be assigned manually or
      // through a separate admin endpoint.
    },
  },
  {
    // ------------------------------------------
    // SCHEMA OPTIONS
    // ------------------------------------------
    timestamps: true,
    // timestamps: true automatically adds:
    //   - createdAt: Date when the document was created
    //   - updatedAt: Date when the document was last modified
    // You don't need to manage these manually.
  }
);

// ------------------------------------------
// PRE-SAVE MIDDLEWARE - Hash Password
// ------------------------------------------
// This runs BEFORE every .save() call on a User document.
//
// WHY use pre("save") instead of hashing in the controller?
// - Separation of concerns: the model handles its own
//   data integrity. No matter WHERE you save a user,
//   the password will always be hashed.
//
// WHY check isModified("password")?
// - If a user updates their name (not password),
//   we don't want to re-hash the already-hashed
//   password. We only hash when the password field
//   has actually been changed or set for the first time.
//
// WHAT IS A SALT?
// - A salt is random data added to the password
//   before hashing. It ensures that even if two
//   users have the same password, their hashes
//   will be different.
// - genSalt(10) → 10 rounds of salting.
//   Higher = more secure but slower.
//   10 is the industry standard balance.
userSchema.pre("save", async function () {
  // Skip hashing if password wasn't modified
  if (!this.isModified("password")) {
    return;
  }

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ------------------------------------------
// INSTANCE METHOD - Compare Password
// ------------------------------------------
// This method is available on every User document.
// It compares a plain-text password (from login)
// with the hashed password stored in the database.
//
// HOW bcrypt.compare() WORKS:
// 1. Takes the plain-text password the user typed
// 2. Hashes it using the same salt from the stored hash
// 3. Compares the two hashes
// 4. Returns true if they match, false if not
//
// WHY is this an instance method (not a static)?
// - Instance methods operate on a specific document.
// - We call it like: user.matchPassword("mypassword")
// - The 'this' keyword refers to the specific user document.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ------------------------------------------
// COMPILE AND EXPORT THE MODEL
// ------------------------------------------
// mongoose.model("User", userSchema) does two things:
// 1. Creates a "User" model from the schema
// 2. Creates/connects to a "users" collection in MongoDB
//    (Mongoose auto-pluralizes and lowercases the name)
const User = mongoose.model("User", userSchema);

module.exports = User;
