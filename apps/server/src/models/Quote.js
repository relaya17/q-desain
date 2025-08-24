import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    // מספר הצעת מחיר ייחודי
    quoteNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // פרטים אישיים
    personalInfo: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    // פרטי הפרויקט
    projectDetails: {
      workType: {
        type: String,
        required: true,
        enum: [
          "new-project",
          "flooring",
          "painting",
          "bathroom",
          "kitchen",
          "maintenance",
          "other",
        ],
      },
      area: {
        type: String,
        required: true,
      },
      rooms: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
      urgency: {
        type: String,
        enum: ["low", "normal", "high"],
        default: "normal",
      },
      budget: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },
    },

    // פרטים ספציפיים לפי סוג עבודה
    specificDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // שיטת משלוח
    deliveryMethod: {
      type: String,
      required: true,
      enum: ["email", "whatsapp"],
    },

    // הצעת מחיר ראשונית
    estimatedPrice: {
      type: Number,
      required: true,
    },

    // הצעת מחיר סופית (אחרי פגישה)
    finalPrice: {
      type: Number,
    },

    // סטטוס הצעת המחיר
    status: {
      type: String,
      enum: [
        "pending",
        "sent",
        "reviewed",
        "accepted",
        "rejected",
        "completed",
      ],
      default: "pending",
    },

    // הערות נוספות
    notes: {
      type: String,
    },

    // תאריכים
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    sentAt: {
      type: Date,
    },
    reviewedAt: {
      type: Date,
    },

    // פרטי נציג
    assignedTo: {
      type: String,
    },

    // היסטוריית עדכונים
    history: [
      {
        action: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        user: {
          type: String,
        },
      },
    ],

    // תגיות לסיווג
    tags: [
      {
        type: String,
      },
    ],

    // עדיפות
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    // מקור הפנייה
    source: {
      type: String,
      enum: ["website", "phone", "referral", "social", "other"],
      default: "website",
    },
  },
  {
    timestamps: true,
  }
);

// אינדקסים לביצועים טובים יותר
quoteSchema.index({ quoteNumber: 1 });
quoteSchema.index({ "personalInfo.email": 1 });
quoteSchema.index({ "personalInfo.phone": 1 });
quoteSchema.index({ status: 1 });
quoteSchema.index({ createdAt: -1 });
quoteSchema.index({ projectDetails: { workType: 1 } });

// Middleware לעדכון תאריך עדכון
quoteSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Middleware להוספת רשומה להיסטוריה
quoteSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    this.history.push({
      action: "status_change",
      description: `סטטוס השתנה ל: ${this.status}`,
      timestamp: new Date(),
    });
  }
  next();
});

// פונקציות סטטיות
quoteSchema.statics.findByEmail = function (email) {
  return this.find({ "personalInfo.email": email });
};

quoteSchema.statics.findByPhone = function (phone) {
  return this.find({ "personalInfo.phone": phone });
};

quoteSchema.statics.findByStatus = function (status) {
  return this.find({ status: status });
};

quoteSchema.statics.findByWorkType = function (workType) {
  return this.find({ "projectDetails.workType": workType });
};

// פונקציות instance
quoteSchema.methods.markAsSent = function () {
  this.status = "sent";
  this.sentAt = new Date();
  this.history.push({
    action: "quote_sent",
    description: "הצעת המחיר נשלחה",
    timestamp: new Date(),
  });
  return this.save();
};

quoteSchema.methods.markAsReviewed = function () {
  this.status = "reviewed";
  this.reviewedAt = new Date();
  this.history.push({
    action: "quote_reviewed",
    description: "הצעת המחיר נבדקה",
    timestamp: new Date(),
  });
  return this.save();
};

quoteSchema.methods.updateFinalPrice = function (price, notes = "") {
  this.finalPrice = price;
  this.notes = notes;
  this.history.push({
    action: "final_price_set",
    description: `מחיר סופי נקבע: ₪${price.toLocaleString()}`,
    timestamp: new Date(),
  });
  return this.save();
};

// Virtual fields
quoteSchema.virtual("isUrgent").get(function () {
  return this.projectDetails.urgency === "high" || this.priority === "urgent";
});

quoteSchema.virtual("daysSinceCreation").get(function () {
  return Math.floor((new Date() - this.createdAt) / (1000 * 60 * 60 * 24));
});

quoteSchema.virtual("formattedCreatedAt").get(function () {
  return this.createdAt.toLocaleDateString("he-IL");
});

quoteSchema.virtual("formattedEstimatedPrice").get(function () {
  return `₪${this.estimatedPrice.toLocaleString()}`;
});

quoteSchema.virtual("formattedFinalPrice").get(function () {
  return this.finalPrice ? `₪${this.finalPrice.toLocaleString()}` : "לא נקבע";
});

// הגדרת JSON transformation
quoteSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Quote", quoteSchema);
