import express from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  securityHeaders,
  corsOptions,
  sanitizeInput,
  requestLogger,
  errorHandler,
  createRateLimit,
} from "./middleware/security.js";

// Routes
import quoteRoutes from "./routes/quotes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import crmRoutes from "./routes/crmRoutes.js"; // Added CRM routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(compression());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(sanitizeInput);
app.use(requestLogger);
app.use(createRateLimit());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/iq-design", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/quotes", quoteRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/crm", crmRoutes); // Added CRM routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "iq-design server is running",
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "הנתיב לא נמצא" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Environment: ${process.env.NODE_ENV || "development"}`);
});
