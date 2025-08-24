import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Rate limiting
export const createRateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: "יותר מדי בקשות, אנא נסה שוב מאוחר יותר",
      retryAfter: Math.ceil(windowMs / 1000),
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Specific rate limits
export const quoteRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 quotes per 15 minutes
  message: {
    error: "יותר מדי הצעות מחיר, אנא נסה שוב מאוחר יותר",
    retryAfter: 900,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 contact messages per hour
  message: {
    error: "יותר מדי הודעות יצירת קשר, אנא נסה שוב מאוחר יותר",
    retryAfter: 3600,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security headers
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
});

// CORS configuration
export const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
};

// Input sanitization
export const sanitizeInput = (req, res, next) => {
  // Remove potential XSS characters
  const sanitize = (obj) => {
    if (typeof obj === "string") {
      return obj.replace(/[<>]/g, "").trim();
    }
    if (typeof obj === "object" && obj !== null) {
      Object.keys(obj).forEach((key) => {
        obj[key] = sanitize(obj[key]);
      });
    }
    return obj;
  };

  if (req.body) {
    req.body = sanitize(req.body);
  }
  if (req.query) {
    req.query = sanitize(req.query);
  }
  if (req.params) {
    req.params = sanitize(req.params);
  }

  next();
};

// Request logging
export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });

  next();
};

// Error handling
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === "development";

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "שגיאת ולידציה",
      details: isDevelopment ? err.message : "הנתונים שהוזנו אינם תקינים",
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "מזהה לא תקין",
      details: isDevelopment ? err.message : "המזהה שהוזן אינו תקין",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      error: "נתון כבר קיים",
      details: isDevelopment ? err.message : "הנתון כבר קיים במערכת",
    });
  }

  res.status(500).json({
    error: "שגיאה פנימית בשרת",
    details: isDevelopment ? err.message : "משהו השתבש, אנא נסה שוב מאוחר יותר",
  });
};
