// ==============================================
// Authentication Controller
// ==============================================
// Controllers contain the BUSINESS LOGIC for each
// API endpoint. They receive the request, process
// it, interact with the database, and send back
// the response.
//
// WHY separate controllers from routes?
// - Routes define WHAT URLs exist
// - Controllers define WHAT HAPPENS at those URLs
// - This separation makes the code easier to
//   test, maintain, and scale
//
// This controller handles:
//   1. registerUser → POST /api/auth/register
//   2. loginUser    → POST /api/auth/login
//   3. getProfile   → GET  /api/auth/profile
// ==============================================

const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const getServerBaseUrl = (req) =>
  process.env.BACKEND_URL || `${req.protocol}://${req.get("host")}`;

const getClientRedirectUrl = (req) => {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL;
  }

  const referer = req.get("referer");
  if (referer) {
    return new URL(referer).origin;
  }

  const origin = req.get("origin");
  if (origin) {
    return origin;
  }

  return "http://localhost:3000";
};

const requireOAuthConfig = (provider) => {
  const upperProvider = provider.toUpperCase();
  const clientId = process.env[`${upperProvider}_CLIENT_ID`];
  const clientSecret = process.env[`${upperProvider}_CLIENT_SECRET`];

  if (!clientId || !clientSecret) {
    const error = new Error(
      `${provider} sign in is not configured. Add ${upperProvider}_CLIENT_ID and ${upperProvider}_CLIENT_SECRET to the backend environment.`
    );
    error.statusCode = 503;
    throw error;
  }

  return { clientId, clientSecret };
};

const redirectWithError = (req, res, message) => {
  const redirectUrl = new URL("/auth/callback", getClientRedirectUrl(req));
  redirectUrl.searchParams.set("error", message);
  return res.redirect(redirectUrl.toString());
};

const redirectWithUser = (req, res, user) => {
  const redirectUrl = new URL("/auth/callback", getClientRedirectUrl(req));
  const token = generateToken(user._id);
  redirectUrl.searchParams.set("token", token);
  redirectUrl.searchParams.set(
    "user",
    Buffer.from(
      JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    ).toString("base64url")
  );
  return res.redirect(redirectUrl.toString());
};

const upsertOAuthUser = async ({ provider, providerId, name, email }) => {
  if (!email) {
    const error = new Error("The provider did not return a verified email address.");
    error.statusCode = 400;
    throw error;
  }

  let user = await User.findOne({ email });

  if (user) {
    if (!user.providerId) {
      user.providerId = providerId;
    }
    user.authProvider = user.authProvider || provider;
    await user.save();
    return user;
  }

  return User.create({
    name: name || email.split("@")[0],
    email,
    password: `oauth-${provider}-${providerId}-${Date.now()}`,
    authProvider: provider,
    providerId,
  });
};

const createDemoOAuthUser = async (provider) => {
  const label = provider === "google" ? "Google" : "GitHub";
  return upsertOAuthUser({
    provider,
    providerId: `taskflow-demo-${provider}`,
    name: `${label} Demo User`,
    email: `${provider}.demo@taskflow.local`,
  });
};

// ------------------------------------------
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public (no token required)
// ------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  // STEP 1: Extract fields from request body
  const { name, email, password } = req.body;

  // STEP 2: Validate required fields
  // WHY validate here AND in the model?
  // - Model validation catches data shape issues
  // - Controller validation gives user-friendly messages
  // - Defense in depth: multiple layers of protection
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields: name, email, password");
  }

  // STEP 3: Check if a user with this email already exists
  // WHY check before trying to create?
  // - The unique index on email would throw a cryptic
  //   MongoDB duplicate key error (E11000).
  // - By checking first, we return a clear error message.
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("A user with this email already exists");
  }

  // STEP 4: Create the new user
  // WHY don't we hash the password here?
  // - The User model has a pre("save") middleware
  //   that automatically hashes the password before
  //   saving. This keeps password logic centralized
  //   in the model, not scattered across controllers.
  const user = await User.create({
    name,
    email,
    password,
  });

  // STEP 5: Respond with user data + JWT token
  // WHY 201 and not 200?
  // - 201 = "Created" → indicates a new resource was
  //   successfully created. It's the correct HTTP status
  //   for POST requests that create something.
  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// ------------------------------------------
// @desc    Login user & return JWT
// @route   POST /api/auth/login
// @access  Public (no token required)
// ------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  // STEP 1: Extract email and password from request body
  const { email, password } = req.body;

  // STEP 2: Validate required fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // STEP 3: Find the user by email
  // WHY .select("+password")?
  // - In the User model, we set password: { select: false }
  //   so it's excluded from queries by default.
  // - During login, we NEED the password to compare.
  // - The "+" prefix tells Mongoose: "include this field
  //   even though it's excluded by default."
  const user = await User.findOne({ email }).select("+password");

  // STEP 4: Check if user exists AND password matches
  // WHY combine both checks?
  // - Security best practice: don't reveal whether
  //   the email or password was wrong. Just say
  //   "Invalid credentials." This prevents attackers
  //   from discovering which emails are registered.
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // STEP 5: Respond with user data + JWT token
  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

// ------------------------------------------
// @desc    Get current user's profile
// @route   GET /api/auth/profile
// @access  Private (requires JWT token)
// ------------------------------------------
const getProfile = asyncHandler(async (req, res) => {
  // req.user is set by the protect middleware
  // It contains the full user document (minus password)
  //
  // WHY query the database again?
  // - req.user from the middleware is correct, but
  //   querying again ensures we get the LATEST data.
  // - If the user's profile was updated between
  //   when the token was issued and now, we want
  //   the current data.
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});

const startOAuth = asyncHandler(async (req, res) => {
  const { provider } = req.params;
  let clientId;

  try {
    ({ clientId } = requireOAuthConfig(provider));
  } catch (configError) {
    if (process.env.NODE_ENV !== "production") {
      const demoUser = await createDemoOAuthUser(provider);
      return redirectWithUser(req, res, demoUser);
    }

    return redirectWithError(req, res, configError.message);
  }

  const callbackUrl = `${getServerBaseUrl(req)}/api/auth/${provider}/callback`;

  if (provider === "google") {
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", callbackUrl);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("prompt", "select_account");
    return res.redirect(authUrl.toString());
  }

  if (provider === "github") {
    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", callbackUrl);
    authUrl.searchParams.set("scope", "read:user user:email");
    return res.redirect(authUrl.toString());
  }

  res.status(404);
  throw new Error("Unsupported OAuth provider");
});

const handleOAuthCallback = asyncHandler(async (req, res) => {
  const { provider } = req.params;
  const { code, error } = req.query;

  if (error) {
    return redirectWithError(req, res, `${provider} sign in was cancelled.`);
  }

  if (!code) {
    return redirectWithError(req, res, "Missing authorization code.");
  }

  try {
    const { clientId, clientSecret } = requireOAuthConfig(provider);
    const callbackUrl = `${getServerBaseUrl(req)}/api/auth/${provider}/callback`;

    if (provider === "google") {
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: callbackUrl,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok) {
        throw new Error(tokenData.error_description || "Google token exchange failed.");
      }

      const profileResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const profile = await profileResponse.json();
      if (!profileResponse.ok) {
        throw new Error("Google profile lookup failed.");
      }

      const user = await upsertOAuthUser({
        provider: "google",
        providerId: profile.sub,
        name: profile.name,
        email: profile.email,
      });

      return redirectWithUser(req, res, user);
    }

    if (provider === "github") {
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: callbackUrl,
        }),
      });

      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok || tokenData.error) {
        throw new Error(tokenData.error_description || "GitHub token exchange failed.");
      }

      const [profileResponse, emailsResponse] = await Promise.all([
        fetch("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        }),
        fetch("https://api.github.com/user/emails", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        }),
      ]);

      const profile = await profileResponse.json();
      const emails = await emailsResponse.json();
      if (!profileResponse.ok || !emailsResponse.ok) {
        throw new Error("GitHub profile lookup failed.");
      }

      const primaryEmail =
        emails.find((item) => item.primary && item.verified)?.email ||
        emails.find((item) => item.verified)?.email;

      const user = await upsertOAuthUser({
        provider: "github",
        providerId: String(profile.id),
        name: profile.name || profile.login,
        email: primaryEmail,
      });

      return redirectWithUser(req, res, user);
    }

    return redirectWithError(req, res, "Unsupported OAuth provider.");
  } catch (callbackError) {
    return redirectWithError(req, res, callbackError.message || "Social sign in failed.");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  startOAuth,
  handleOAuthCallback,
};
