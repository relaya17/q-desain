import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "שם הפרויקט הוא שדה חובה"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "לקוח הוא שדה חובה"],
    },
    status: {
      type: String,
      enum: ["planning", "in_progress", "on_hold", "completed", "cancelled"],
      default: "planning",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
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
    budget: {
      estimated: {
        type: Number,
        required: [true, "תקציב משוער הוא שדה חובה"],
      },
      actual: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "ILS",
      },
    },
    timeline: {
      startDate: {
        type: Date,
        required: [true, "תאריך התחלה הוא שדה חובה"],
      },
      endDate: {
        type: Date,
        required: [true, "תאריך סיום הוא שדה חובה"],
      },
      actualStartDate: Date,
      actualEndDate: Date,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    location: {
      address: String,
      city: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    team: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: [
            "architect",
            "designer",
            "project_manager",
            "consultant",
            "other",
          ],
          required: true,
        },
        assignedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    services: [
      {
        type: String,
        enum: [
          "architecture",
          "interior_design",
          "project_management",
          "consulting",
          "supervision",
          "other",
        ],
      },
    ],
    milestones: [
      {
        title: {
          type: String,
          required: true,
        },
        description: String,
        dueDate: {
          type: Date,
          required: true,
        },
        completedDate: Date,
        status: {
          type: String,
          enum: ["pending", "in_progress", "completed", "overdue"],
          default: "pending",
        },
      },
    ],
    documents: [
      {
        name: String,
        type: String,
        url: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
        uploadedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
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
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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

// Virtual for project duration
projectSchema.virtual("duration").get(function () {
  if (!this.timeline.startDate || !this.timeline.endDate) return 0;
  const start = new Date(this.timeline.startDate);
  const end = new Date(this.timeline.endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // days
});

// Virtual for actual duration
projectSchema.virtual("actualDuration").get(function () {
  if (!this.timeline.actualStartDate) return 0;
  const start = new Date(this.timeline.actualStartDate);
  const end = this.timeline.actualEndDate
    ? new Date(this.timeline.actualEndDate)
    : new Date();
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // days
});

// Virtual for budget variance
projectSchema.virtual("budgetVariance").get(function () {
  if (!this.budget.estimated || !this.budget.actual) return 0;
  return this.budget.actual - this.budget.estimated;
});

// Virtual for is overdue
projectSchema.virtual("isOverdue").get(function () {
  if (this.status === "completed") return false;
  if (!this.timeline.endDate) return false;
  return new Date() > new Date(this.timeline.endDate);
});

// Indexes for better performance
projectSchema.index({ customer: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ priority: 1 });
projectSchema.index({ type: 1 });
projectSchema.index({ "timeline.endDate": 1 });
projectSchema.index({ isDeleted: 1 });

// Pre-save middleware
projectSchema.pre("save", function (next) {
  // Update actual start date when status changes to in_progress
  if (
    this.isModified("status") &&
    this.status === "in_progress" &&
    !this.timeline.actualStartDate
  ) {
    this.timeline.actualStartDate = new Date();
  }

  // Update actual end date when status changes to completed
  if (
    this.isModified("status") &&
    this.status === "completed" &&
    !this.timeline.actualEndDate
  ) {
    this.timeline.actualEndDate = new Date();
  }

  next();
});

// Static methods
projectSchema.statics.findActive = function () {
  return this.find({
    status: { $in: ["planning", "in_progress"] },
    isDeleted: false,
  }).populate("customer");
};

projectSchema.statics.findOverdue = function () {
  return this.find({
    status: { $in: ["planning", "in_progress"] },
    "timeline.endDate": { $lt: new Date() },
    isDeleted: false,
  }).populate("customer");
};

projectSchema.statics.getStats = async function () {
  const stats = await this.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        totalProjects: { $sum: 1 },
        activeProjects: {
          $sum: {
            $cond: [{ $in: ["$status", ["planning", "in_progress"]] }, 1, 0],
          },
        },
        completedProjects: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
        totalBudget: { $sum: "$budget.estimated" },
        avgProgress: { $avg: "$progress" },
      },
    },
  ]);

  return (
    stats[0] || {
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      totalBudget: 0,
      avgProgress: 0,
    }
  );
};

// Instance methods
projectSchema.methods.updateProgress = function (progress) {
  this.progress = Math.max(0, Math.min(100, progress));
  if (this.progress === 100 && this.status !== "completed") {
    this.status = "completed";
    this.timeline.actualEndDate = new Date();
  }
  return this.save();
};

projectSchema.methods.addMilestone = function (milestone) {
  this.milestones.push(milestone);
  return this.save();
};

projectSchema.methods.addNote = function (content, author) {
  this.notes.push({ content, author });
  return this.save();
};

projectSchema.methods.softDelete = function () {
  this.isDeleted = true;
  return this.save();
};

export default mongoose.model("Project", projectSchema);
