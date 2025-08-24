import express from "express";
import Quote from "../models/Quote.js";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

// יצירת הצעת מחיר חדשה
router.post("/create", async (req, res) => {
  try {
    const {
      personalInfo,
      projectDetails,
      specificDetails,
      deliveryMethod,
      estimatedPrice,
      createdAt,
    } = req.body;

    // יצירת הצעת מחיר חדשה
    const newQuote = new Quote({
      personalInfo,
      projectDetails,
      specificDetails,
      deliveryMethod,
      estimatedPrice,
      status: "pending",
      createdAt: createdAt || new Date(),
      quoteNumber: generateQuoteNumber(),
    });

    await newQuote.save();

    // שליחת הצעת המחיר לפי השיטה שנבחרה
    if (deliveryMethod === "email") {
      await sendQuoteEmailLocal(personalInfo.email, newQuote);
    } else if (deliveryMethod === "whatsapp") {
      // כאן אפשר להוסיף אינטגרציה עם WhatsApp API
      console.log("WhatsApp quote sent to:", personalInfo.phone);
    }

    res.status(201).json({
      success: true,
      message: "הצעת המחיר נוצרה בהצלחה",
      quoteId: newQuote._id,
      quoteNumber: newQuote.quoteNumber,
    });
  } catch (error) {
    console.error("Error creating quote:", error);
    res.status(500).json({
      success: false,
      message: "שגיאה ביצירת הצעת המחיר",
      error: error.message,
    });
  }
});

// קבלת כל הצעות המחיר
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      quotes,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({
      success: false,
      message: "שגיאה בקבלת הצעות המחיר",
      error: error.message,
    });
  }
});

// קבלת הצעת מחיר ספציפית
router.get("/:id", async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "הצעת המחיר לא נמצאה",
      });
    }
    res.json({
      success: true,
      quote,
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({
      success: false,
      message: "שגיאה בקבלת הצעת המחיר",
      error: error.message,
    });
  }
});

// עדכון סטטוס הצעת מחיר
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "הצעת המחיר לא נמצאה",
      });
    }

    res.json({
      success: true,
      quote,
    });
  } catch (error) {
    console.error("Error updating quote status:", error);
    res.status(500).json({
      success: false,
      message: "שגיאה בעדכון סטטוס הצעת המחיר",
      error: error.message,
    });
  }
});

// מחיקת הצעת מחיר
router.delete("/:id", async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "הצעת המחיר לא נמצאה",
      });
    }
    res.json({
      success: true,
      message: "הצעת המחיר נמחקה בהצלחה",
    });
  } catch (error) {
    console.error("Error deleting quote:", error);
    res.status(500).json({
      success: false,
      message: "שגיאה במחיקת הצעת המחיר",
      error: error.message,
    });
  }
});

// פונקציה ליצירת מספר הצעת מחיר
function generateQuoteNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `IQ-${year}${month}-${random}`;
}

// פונקציה לשליחת הצעת מחיר באימייל
async function sendQuoteEmailLocal(email, quote) {
  const subject = `הצעת מחיר - ${quote.quoteNumber}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>הצעת מחיר - IQ Design</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #1976d2;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #1976d2;
          margin-bottom: 10px;
        }
        .quote-number {
          background-color: #1976d2;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
          margin: 10px 0;
        }
        .price {
          font-size: 32px;
          font-weight: bold;
          color: #1976d2;
          text-align: center;
          margin: 20px 0;
        }
        .details {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
          margin: 20px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          padding: 5px 0;
          border-bottom: 1px solid #eee;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
        }
        .contact-info {
          background-color: #e3f2fd;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">IQ Design</div>
          <div>אדריכלות יוקרה</div>
          <div class="quote-number">${quote.quoteNumber}</div>
        </div>

        <h2>שלום ${quote.personalInfo.name},</h2>
        
        <p>תודה על פנייתך אלינו. להלן הצעת המחיר הראשונית שלך:</p>

        <div class="price">
          ₪${quote.estimatedPrice.toLocaleString()}
        </div>

        <div class="details">
          <h3>פרטי הפרויקט:</h3>
          <div class="detail-row">
            <span><strong>סוג עבודה:</strong></span>
            <span>${getWorkTypeTitle(quote.projectDetails.workType)}</span>
          </div>
          <div class="detail-row">
            <span><strong>שטח:</strong></span>
            <span>${quote.projectDetails.area} מ״ר</span>
          </div>
          <div class="detail-row">
            <span><strong>חדרים:</strong></span>
            <span>${quote.projectDetails.rooms}</span>
          </div>
          <div class="detail-row">
            <span><strong>תיאור:</strong></span>
            <span>${quote.projectDetails.description}</span>
          </div>
        </div>

        <div class="contact-info">
          <h3>צור קשר:</h3>
          <p>📞 טלפון: 054-1234567</p>
          <p>📧 אימייל: info@iq-design.co.il</p>
          <p>🌐 אתר: www.iq-design.co.il</p>
        </div>

        <div class="footer">
          <p><strong>חשוב לדעת:</strong></p>
          <p>זוהי הצעה ראשונית בלבד. המחיר הסופי ייקבע לאחר פגישה ובדיקה מפורטת של הפרויקט.</p>
          <p>נציג שלנו יצור איתך קשר תוך 24 שעות לקביעת פגישה.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendEmail(email, subject, htmlContent);
    console.log("Quote email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending quote email:", error);
    throw error;
  }
}

// פונקציה לקבלת כותרת סוג העבודה
function getWorkTypeTitle(workTypeId) {
  const workTypes = {
    "new-project": "פרויקט חדש",
    flooring: "ריצוף",
    painting: "צביעה",
    bathroom: "שיפוץ אמבטיה",
    kitchen: "שיפוץ מטבח",
    maintenance: "תחזוקה",
    other: "אחר",
  };
  return workTypes[workTypeId] || "לא מוגדר";
}

export default router;
