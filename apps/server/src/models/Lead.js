import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "שם הליד הוא שדה חובה"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "אימייל הוא שדה חובה"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "מספר טלפון הוא שדה חובה"],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: [
        "website",
        "referral",
        "social_media",
        "advertisement",
        "cold_call",
        "exhibition",
        "other",
      ],
      default: "website",
    },
    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "qualified",
        "proposal_sent",
        "negotiation",
        "won",
        "lost",
      ],
      default: "new",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    project: {
      type: {
        type: String,
        enum: [
          "residential",
          "commercial",
          "hotel",
          "interior",
          "renovation",
          "other",
        ],
        required: [true, "סוג הפרויקט הוא שדה חובה"],
      },
      description: {
        type: String,
        trim: true,
      },
      budget: {
        min: Number,
        max: Number,
        currency: {
          type: String,
          default: "ILS",
        },
      },
      timeline: {
        startDate: Date,
        endDate: Date,
      },
      location: {
        address: String,
        city: String,
      },
    },
    notes: [
      {
        content: {
          type: String,
          required: true,
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    activities: [
      {
        type: {
          type: String,
          enum: ["call", "email", "meeting", "proposal", "follow_up", "other"],
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        outcome: {
          type: String,
          enum: ["positive", "neutral", "negative"],
          default: "neutral",
        },
      },
    ],
    nextFollowUp: {
      type: Date,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    customFields: {
      type: Map,
      of: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for lead age
leadSchema.virtual("age").get(function () {
  return Math.ceil((new Date() - this.createdAt) / (1000 * 60 * 60 * 24)); // days
});

// Virtual for last activity
leadSchema.virtual("lastActivity").get(function () {
  if (!this.activities || this.activities.length === 0) return null;
  return this.activities[this.activities.length - 1];
});

// Virtual for is overdue follow up
leadSchema.virtual("isOverdueFollowUp").get(function () {
  if (!this.nextFollowUp) return false;
  return new Date() > new Date(this.nextFollowUp);
});

// Virtual for budget range
leadSchema.virtual("budgetRange").get(function () {
  if (!this.project.budget.min && !this.project.budget.max) return "לא צוין";
  if (!this.project.budget.min)
    return `עד ${this.project.budget.max.toLocaleString()} ₪`;
  if (!this.project.budget.max)
    return `מ-${this.project.budget.min.toLocaleString()} ₪`;
  return `${this.project.budget.min.toLocaleString()} - ${this.project.budget.max.toLocaleString()} ₪`;
});

// Indexes for better performance
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ priority: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ assignedTo: 1 });
leadSchema.index({ nextFollowUp: 1 });
leadSchema.index({ isDeleted: 1 });

// Pre-save middleware
leadSchema.pre("save", function (next) {
  // Set next follow up if not set and status is new
  if (this.isNew && this.status === "new" && !this.nextFollowUp) {
    this.nextFollowUp = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  }
  next();
});

// Static methods
leadSchema.statics.findNew = function () {
  return this.find({ status: "new", isDeleted: false });
};

leadSchema.statics.findOverdueFollowUp = function () {
  return this.find({
    nextFollowUp: { $lt: new Date() },
    status: { $nin: ["won", "lost"] },
    isDeleted: false,
  });
};

leadSchema.statics.findByStatus = function (status) {
  return this.find({ status, isDeleted: false });
};

leadSchema.statics.getStats = async function () {
  const stats = await this.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        totalLeads: { $sum: 1 },
        newLeads: { $sum: { $cond: [{ $eq: ["$status", "new"] }, 1, 0] } },
        qualifiedLeads: {
          $sum: { $cond: [{ $eq: ["$status", "qualified"] }, 1, 0] },
        },
        wonLeads: { $sum: { $cond: [{ $eq: ["$status", "won"] }, 1, 0] } },
        lostLeads: { $sum: { $cond: [{ $eq: ["$status", "lost"] }, 1, 0] } },
        conversionRate: {
          $cond: [
            { $gt: ["$totalLeads", 0] },
            { $multiply: [{ $divide: ["$wonLeads", "$totalLeads"] }, 100] },
            0,
          ],
        },
      },
    },
  ]);

  return (
    stats[0] || {
      totalLeads: 0,
      newLeads: 0,
      qualifiedLeads: 0,
      wonLeads: 0,
      lostLeads: 0,
      conversionRate: 0,
    }
  );
};

// Instance methods
leadSchema.methods.addActivity = function (activity) {
  this.activities.push(activity);
  this.lastActivity = new Date();
  return this.save();
};

leadSchema.methods.addNote = function (content, author) {
  this.notes.push({ content, author });
  return this.save();
};

leadSchema.methods.updateStatus = function (status) {
  this.status = status;

  // Update next follow up based on status
  switch (status) {
    case "contacted":
      this.nextFollowUp = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days
      break;
    case "qualified":
      this.nextFollowUp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week
      break;
    case "proposal_sent":
      this.nextFollowUp = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days
      break;
    case "negotiation":
      this.nextFollowUp = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days
      break;
    case "won":
    case "lost":
      this.nextFollowUp = null;
      break;
  }

  return this.save();
};

leadSchema.methods.convertToCustomer = function () {
  // This method would be used to convert a lead to a customer
  // In a real implementation, this would create a new Customer document
  this.status = "won";
  this.nextFollowUp = null;
  return this.save();
};

leadSchema.methods.softDelete = function () {
  this.isDeleted = true;
  return this.save();
};

export default mongoose.model("Lead", leadSchema);
