// ==============================================
// JWT Token Generator Utility
// ==============================================
// This utility creates a reusable function to
// generate JSON Web Tokens (JWT).
//
// WHAT IS A JWT?
// - A JWT is a digitally signed string that
//   contains user data (called "payload").
// - The server signs it with a secret key.
// - The client stores it and sends it back
//   with each request to prove identity.
//
// JWT STRUCTURE: header.payload.signature
//   - Header: algorithm + token type
//   - Payload: user data (we store the user ID)
//   - Signature: created using JWT_SECRET
//
// WHY store only the user ID in the payload?
// - JWTs can be decoded by anyone (they're
//   base64 encoded, NOT encrypted).
// - Never store passwords or sensitive data.
// - We only need the ID to look up the user.
// ==============================================

const jwt = require("jsonwebtoken");

/**
 * generateToken - Creates a signed JWT
 *
 * @param {String} id - The MongoDB user _id
 * @returns {String} - A signed JWT string
 *
 * OPTIONS:
 *   expiresIn: "30d" → Token expires in 30 days.
 *   After 30 days, the user must log in again.
 *   This is a security measure — if a token is
 *   stolen, it won't work forever.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
