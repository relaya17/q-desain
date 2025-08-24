import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "שם הלקוח הוא שדה חובה"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "אימייל הוא שדה חובה"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "מספר טלפון הוא שדה חובה"],
      trim: true,
    },
    address: {
      street: String,
      city: String,
      zipCode: String,
      country: {
        type: String,
        default: "ישראל",
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "prospect", "lead"],
      default: "lead",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    source: {
      type: String,
      enum: [
        "website",
        "referral",
        "social_media",
        "advertisement",
        "cold_call",
        "other",
      ],
      default: "website",
    },
    notes: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    totalProjects: {
      type: Number,
      default: 0,
    },
    totalValue: {
      type: Number,
      default: 0,
    },
    lastContact: {
      type: Date,
      default: Date.now,
    },
    nextFollowUp: {
      type: Date,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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

// Virtual for full address
customerSchema.virtual("fullAddress").get(function () {
  if (!this.address) return "";
  const { street, city, zipCode, country } = this.address;
  return [street, city, zipCode, country].filter(Boolean).join(", ");
});

// Virtual for contact info
customerSchema.virtual("contactInfo").get(function () {
  return {
    email: this.email,
    phone: this.phone,
    address: this.fullAddress,
  };
});

// Indexes for better performance
customerSchema.index({ email: 1 });
customerSchema.index({ status: 1 });
customerSchema.index({ priority: 1 });
customerSchema.index({ assignedTo: 1 });
customerSchema.index({ isDeleted: 1 });

// Pre-save middleware
customerSchema.pre("save", function (next) {
  // Update lastContact if any contact info changed
  if (this.isModified("email") || this.isModified("phone")) {
    this.lastContact = new Date();
  }
  next();
});

// Static methods
customerSchema.statics.findActive = function () {
  return this.find({ status: "active", isDeleted: false });
};

customerSchema.statics.findByPriority = function (priority) {
  return this.find({ priority, isDeleted: false });
};

customerSchema.statics.getStats = async function () {
  const stats = await this.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        totalCustomers: { $sum: 1 },
        activeCustomers: {
          $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
        },
        totalValue: { $sum: "$totalValue" },
        avgValue: { $avg: "$totalValue" },
      },
    },
  ]);

  return (
    stats[0] || {
      totalCustomers: 0,
      activeCustomers: 0,
      totalValue: 0,
      avgValue: 0,
    }
  );
};

// Instance methods
customerSchema.methods.updateContact = function () {
  this.lastContact = new Date();
  return this.save();
};

customerSchema.methods.addProject = function (projectValue) {
  this.totalProjects += 1;
  this.totalValue += projectValue;
  return this.save();
};

customerSchema.methods.softDelete = function () {
  this.isDeleted = true;
  return this.save();
};

export default mongoose.model("Customer", customerSchema);
