import express from "express";
import { body, validationResult } from "express-validator";
import { sendContactEmail } from "../services/emailService.js";

const router = express.Router();

// Middleware לטיפול בשגיאות ולידציה
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "שגיאות ולידציה",
      details: errors.array(),
    });
  }
  next();
};

// שליחת הודעת יצירת קשר
router.post(
  "/send",
  [
    body("name").notEmpty().withMessage("שם הוא שדה חובה"),
    body("email").isEmail().withMessage("כתובת אימייל לא תקינה"),
    body("phone").notEmpty().withMessage("מספר טלפון הוא שדה חובה"),
    body("message").notEmpty().withMessage("הודעה היא שדה חובה"),
    body("subject").optional().isString(),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;

      // שליחת אימייל
      await sendContactEmail({ name, email, phone, subject, message });

      res.json({
        success: true,
        message: "ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.",
      });
    } catch (error) {
      console.error("Error sending contact message:", error);
      res.status(500).json({
        error: "שגיאה בשליחת ההודעה",
        message: error.message,
      });
    }
  }
);

export default router;
