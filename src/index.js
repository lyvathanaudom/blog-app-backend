const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const basicAuth = require("express-basic-auth");
const postsRoute = require("./routes/posts");
dotenv.config();

const app = express();

// 1. Security headers first
app.use(helmet());

// 2. CORS configuration
const whitelist = [
  'http://localhost:3000',
  'https://leearchive.vercel.app' // No trailing slash
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight for all routes

// 3. Basic authentication for protected routes only
const authMiddleware = basicAuth({
  users: { [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASSWORD },
  challenge: true,
  unauthorizedResponse: "Unauthorized access. Please provide valid credentials."
});

// 4. Regular middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 5. Public routes
app.get("/", (req, res) => {
  res.send("API Server Running");
});

// 6. Protected routes with authentication
app.use("/api/posts", authMiddleware, postsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Environment:", process.env.NODE_ENV || "development");
});