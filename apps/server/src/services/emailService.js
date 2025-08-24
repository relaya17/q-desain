import nodemailer from "nodemailer";

// פונקציה כללית לשליחת אימייל
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"IQ Design" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// יצירת transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// שליחת הצעת מחיר
export const sendQuoteEmail = async (quote) => {
  try {
    const { clientInfo, projectInfo, pricing, dates } = quote;

    const emailContent = generateQuoteEmailContent(quote);

    const mailOptions = {
      from: `"iq-design" <${process.env.SMTP_USER}>`,
      to: clientInfo.email,
      subject: `הצעת מחיר - ${projectInfo.type} - ${clientInfo.name}`,
      html: emailContent,
      attachments: [
        {
          filename: `quote-${quote._id}.pdf`,
          content: await generateQuotePDF(quote),
        },
      ],
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Quote email sent successfully:", result.messageId);

    return result;
  } catch (error) {
    console.error("Error sending quote email:", error);
    throw error;
  }
};

// שליחת אימייל אישור יצירת הצעת מחיר
export const sendQuoteConfirmation = async (quote) => {
  try {
    const { clientInfo, projectInfo } = quote;

    const emailContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">הצעת המחיר שלך נוצרה בהצלחה!</h2>
        
        <p>שלום ${clientInfo.name},</p>
        
        <p>תודה על פנייתך ל-iq-design. הצעת המחיר עבור הפרויקט שלך נוצרה בהצלחה.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>פרטי הפרויקט:</h3>
          <p><strong>סוג פרויקט:</strong> ${projectInfo.type}</p>
          <p><strong>שטח:</strong> ${projectInfo.area} מ"ר</p>
          <p><strong>מספר חדרים:</strong> ${projectInfo.rooms}</p>
          <p><strong>מספר הצעת מחיר:</strong> ${quote._id}</p>
        </div>
        
        <p>אנו נבדוק את הפרטים ונשלח לך הצעת מחיר מפורטת תוך 24-48 שעות.</p>
        
        <p>לשאלות נוספות, אנא צור קשר:</p>
        <p>📞 08-1234567</p>
        <p>📧 info@eilat-arch.com</p>
        
        <p>בברכה,<br>צוות iq-design</p>
      </div>
    `;

    const mailOptions = {
      from: `"iq-design" <${process.env.SMTP_USER}>`,
      to: clientInfo.email,
      subject: "אישור יצירת הצעת מחיר - iq-design",
      html: emailContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(
      "Quote confirmation email sent successfully:",
      result.messageId
    );

    return result;
  } catch (error) {
    console.error("Error sending quote confirmation:", error);
    throw error;
  }
};

// יצירת תוכן אימייל הצעת מחיר
const generateQuoteEmailContent = (quote) => {
  const { clientInfo, projectInfo, pricing, dates, services, materials } =
    quote;

  const servicesList = services
    .map(
      (service) =>
        `<tr><td>${service.name}</td><td>${service.quantity} ${
          service.unit
        }</td><td>${service.basePrice.toLocaleString()} ₪</td></tr>`
    )
    .join("");

  const materialsList = materials
    .map(
      (material) =>
        `<tr><td>${material.name} (${material.quality})</td><td>${
          material.quantity
        } ${
          material.unit
        }</td><td>${material.basePrice.toLocaleString()} ₪</td></tr>`
    )
    .join("");

  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 40px; text-align: center;">
        <h1 style="margin: 0; font-size: 2.5em;">iq-design</h1>
        <p style="margin: 10px 0 0 0; font-size: 1.2em;">אדריכלות יוקרה באילת</p>
      </div>
      
      <div style="padding: 40px;">
        <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">
          הצעת מחיר
        </h2>
        
        <div style="display: flex; justify-content: space-between; margin: 30px 0;">
          <div>
            <h3>פרטי לקוח:</h3>
            <p><strong>שם:</strong> ${clientInfo.name}</p>
            <p><strong>אימייל:</strong> ${clientInfo.email}</p>
            <p><strong>טלפון:</strong> ${clientInfo.phone}</p>
            <p><strong>כתובת:</strong> ${clientInfo.address}</p>
          </div>
          
          <div>
            <h3>פרטי הצעה:</h3>
            <p><strong>מספר הצעה:</strong> ${quote._id}</p>
            <p><strong>תאריך יצירה:</strong> ${new Date(
              dates.created
            ).toLocaleDateString("he-IL")}</p>
            <p><strong>תוקף עד:</strong> ${new Date(
              dates.expires
            ).toLocaleDateString("he-IL")}</p>
          </div>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>פרטי הפרויקט:</h3>
          <p><strong>סוג פרויקט:</strong> ${projectInfo.type}</p>
          <p><strong>שטח:</strong> ${projectInfo.area} מ"ר</p>
          <p><strong>מספר חדרים:</strong> ${projectInfo.rooms}</p>
          <p><strong>מספר קומות:</strong> ${projectInfo.floors}</p>
          <p><strong>תיאור:</strong> ${projectInfo.description}</p>
        </div>
        
        ${
          services.length > 0
            ? `
          <h3>שירותים:</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #1e3a8a; color: white;">
                <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">שירות</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">כמות</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">מחיר</th>
              </tr>
            </thead>
            <tbody>
              ${servicesList}
            </tbody>
          </table>
        `
            : ""
        }
        
        ${
          materials.length > 0
            ? `
          <h3>חומרים:</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #1e3a8a; color: white;">
                <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">חומר</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">כמות</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">מחיר</th>
              </tr>
            </thead>
            <tbody>
              ${materialsList}
            </tbody>
          </table>
        `
            : ""
        }
        
        <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #1e3a8a;">
          <h3>סיכום כספי:</h3>
          <p><strong>סכום לפני הנחה:</strong> ${pricing.subtotal.toLocaleString()} ₪</p>
          ${
            pricing.discount > 0
              ? `<p><strong>הנחה (${
                  pricing.discount
                }%):</strong> ${pricing.discountAmount.toLocaleString()} ₪</p>`
              : ""
          }
          <h2 style="color: #1e3a8a; margin: 10px 0;"><strong>סה"כ לתשלום:</strong> ${pricing.total.toLocaleString()} ₪</h2>
        </div>
        
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ffeaa7;">
          <h3>⚠️ חשוב לדעת:</h3>
          <ul>
            <li>הצעת מחיר זו תקפה ל-30 ימים מיום יצירתה</li>
            <li>המחיר כולל מע"מ</li>
            <li>תנאי תשלום: 30% מקדמה, 70% עם סיום העבודה</li>
            <li>זמן ביצוע משוער: 3-6 חודשים</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <p>לשאלות נוספות או לקביעת פגישה:</p>
          <p style="font-size: 1.2em; font-weight: bold;">📞 08-1234567</p>
          <p style="font-size: 1.2em; font-weight: bold;">📧 info@eilat-arch.com</p>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #666;">בברכה, צוות iq-design</p>
          <p style="color: #666;">אדריכלות יוקרה באילת</p>
        </div>
      </div>
    </div>
  `;
};

// שליחת הודעת יצירת קשר
export const sendContactEmail = async (contactData) => {
  try {
    const { name, email, phone, subject, message } = contactData;

    const emailContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">הודעת יצירת קשר חדשה</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>פרטי השולח:</h3>
          <p><strong>שם:</strong> ${name}</p>
          <p><strong>אימייל:</strong> ${email}</p>
          <p><strong>טלפון:</strong> ${phone}</p>
          ${subject ? `<p><strong>נושא:</strong> ${subject}</p>` : ""}
        </div>
        
        <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>תוכן ההודעה:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        </div>
        
        <p style="color: #666; font-size: 0.9em;">
          הודעה זו נשלחה מהאתר של iq-design
        </p>
      </div>
    `;

    const mailOptions = {
      from: `"iq-design Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // שליחה לעצמנו
      subject: `הודעת יצירת קשר - ${subject || "ללא נושא"}`,
      html: emailContent,
      replyTo: email, // כדי שנוכל לענות ישירות ללקוח
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully:", result.messageId);

    return result;
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};

// יצירת PDF הצעת מחיר (placeholder)
const generateQuotePDF = async (quote) => {
  // כאן תהיה לוגיקה ליצירת PDF
  // כרגע נחזיר buffer ריק
  return Buffer.from("");
};

export default {
  sendQuoteEmail,
  sendQuoteConfirmation,
  sendContactEmail,
};
