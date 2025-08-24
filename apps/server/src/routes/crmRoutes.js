import express from "express";
import { body, validationResult } from "express-validator";
import Customer from "../models/Customer.js";
import Project from "../models/Project.js";
import Lead from "../models/Lead.js";

const router = express.Router();

// ===== CUSTOMERS ROUTES =====

// Get all customers
router.get("/customers", async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    let query = { isDeleted: false };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const customers = await Customer.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(customers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בקבלת לקוחות", message: error.message });
  }
});

// Get customer by ID
router.get("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer || customer.isDeleted) {
      return res.status(404).json({ error: "לקוח לא נמצא" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: "שגיאה בקבלת לקוח", message: error.message });
  }
});

// Create new customer
router.post(
  "/customers",
  [
    body("name").notEmpty().withMessage("שם הלקוח הוא שדה חובה"),
    body("email").isEmail().withMessage("אימייל לא תקין"),
    body("phone").notEmpty().withMessage("מספר טלפון הוא שדה חובה"),
    body("status")
      .isIn(["active", "inactive", "prospect", "lead"])
      .withMessage("סטטוס לא תקין"),
    body("priority")
      .isIn(["low", "medium", "high", "urgent"])
      .withMessage("עדיפות לא תקינה"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const customer = new Customer(req.body);
      await customer.save();
      res.status(201).json(customer);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ error: "לקוח עם אימייל זה כבר קיים" });
      } else {
        res
          .status(500)
          .json({ error: "שגיאה ביצירת לקוח", message: error.message });
      }
    }
  }
);

// Update customer
router.put("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res.status(404).json({ error: "לקוח לא נמצא" });
    }
    res.json(customer);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בעדכון לקוח", message: error.message });
  }
});

// Delete customer (soft delete)
router.delete("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "לקוח לא נמצא" });
    }
    await customer.softDelete();
    res.json({ message: "לקוח נמחק בהצלחה" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה במחיקת לקוח", message: error.message });
  }
});

// Get customer stats
router.get("/customers/stats/overview", async (req, res) => {
  try {
    const stats = await Customer.getStats();
    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בקבלת סטטיסטיקות", message: error.message });
  }
});

// ===== PROJECTS ROUTES =====

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const { status, type, customer } = req.query;
    let query = { isDeleted: false };

    if (status) query.status = status;
    if (type) query.type = type;
    if (customer) query.customer = customer;

    const projects = await Project.find(query)
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בקבלת פרויקטים", message: error.message });
  }
});

// Get project by ID
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("team.user", "name email");

    if (!project || project.isDeleted) {
      return res.status(404).json({ error: "פרויקט לא נמצא" });
    }
    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בקבלת פרויקט", message: error.message });
  }
});

// Create new project
router.post(
  "/projects",
  [
    body("name").notEmpty().withMessage("שם הפרויקט הוא שדה חובה"),
    body("customer").isMongoId().withMessage("לקוח לא תקין"),
    body("type")
      .isIn([
        "residential",
        "commercial",
        "hotel",
        "interior",
        "renovation",
        "other",
      ])
      .withMessage("סוג פרויקט לא תקין"),
    body("budget.estimated")
      .isNumeric()
      .withMessage("תקציב משוער הוא שדה חובה"),
    body("timeline.startDate").isISO8601().withMessage("תאריך התחלה לא תקין"),
    body("timeline.endDate").isISO8601().withMessage("תאריך סיום לא תקין"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const project = new Project(req.body);
      await project.save();

      // Update customer's project count and total value
      const customer = await Customer.findById(req.body.customer);
      if (customer) {
        await customer.addProject(req.body.budget.estimated);
      }

      res.status(201).json(project);
    } catch (error) {
      res
        .status(500)
        .json({ error: "שגיאה ביצירת פרויקט", message: error.message });
    }
  }
);

// Update project
router.put("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("customer", "name email phone");

    if (!project) {
      return res.status(404).json({ error: "פרויקט לא נמצא" });
    }
    res.json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בעדכון פרויקט", message: error.message });
  }
});

// Update project progress
router.patch(
  "/projects/:id/progress",
  [
    body("progress")
      .isInt({ min: 0, max: 100 })
      .withMessage("התקדמות חייבת להיות בין 0 ל-100"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "פרויקט לא נמצא" });
      }

      await project.updateProgress(req.body.progress);
      res.json(project);
    } catch (error) {
      res
        .status(500)
        .json({ error: "שגיאה בעדכון התקדמות", message: error.message });
    }
  }
);

// Delete project (soft delete)
router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "פרויקט לא נמצא" });
    }
    await project.softDelete();
    res.json({ message: "פרויקט נמחק בהצלחה" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה במחיקת פרויקט", message: error.message });
  }
});

// Get project stats
router.get("/projects/stats/overview", async (req, res) => {
  try {
    const stats = await Project.getStats();
    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בקבלת סטטיסטיקות", message: error.message });
  }
});

// ===== LEADS ROUTES =====

// Get all leads
router.get("/leads", async (req, res) => {
  try {
    const { status, priority, source } = req.query;
    let query = { isDeleted: false };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (source) query.source = source;

    const leads = await Lead.find(query).sort({ createdAt: -1 }).limit(100);

    res.json(leads);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בקבלת לידים", message: error.message });
  }
});

// Get lead by ID
router.get("/leads/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead || lead.isDeleted) {
      return res.status(404).json({ error: "ליד לא נמצא" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: "שגיאה בקבלת ליד", message: error.message });
  }
});

// Create new lead
router.post(
  "/leads",
  [
    body("name").notEmpty().withMessage("שם הליד הוא שדה חובה"),
    body("email").isEmail().withMessage("אימייל לא תקין"),
    body("phone").notEmpty().withMessage("מספר טלפון הוא שדה חובה"),
    body("project.type")
      .isIn([
        "residential",
        "commercial",
        "hotel",
        "interior",
        "renovation",
        "other",
      ])
      .withMessage("סוג פרויקט לא תקין"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const lead = new Lead(req.body);
      await lead.save();
      res.status(201).json(lead);
    } catch (error) {
      res
        .status(500)
        .json({ error: "שגיאה ביצירת ליד", message: error.message });
    }
  }
);

// Update lead
router.put("/leads/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) {
      return res.status(404).json({ error: "ליד לא נמצא" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: "שגיאה בעדכון ליד", message: error.message });
  }
});

// Add activity to lead
router.post(
  "/leads/:id/activities",
  [
    body("type")
      .isIn(["call", "email", "meeting", "proposal", "follow_up", "other"])
      .withMessage("סוג פעילות לא תקין"),
    body("description").notEmpty().withMessage("תיאור הפעילות הוא שדה חובה"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "ליד לא נמצא" });
      }

      await lead.addActivity(req.body);
      res.json(lead);
    } catch (error) {
      res
        .status(500)
        .json({ error: "שגיאה בהוספת פעילות", message: error.message });
    }
  }
);

// Update lead status
router.patch(
  "/leads/:id/status",
  [
    body("status")
      .isIn([
        "new",
        "contacted",
        "qualified",
        "proposal_sent",
        "negotiation",
        "won",
        "lost",
      ])
      .withMessage("סטטוס לא תקין"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const lead = await Lead.findById(req.params.id);
      if (!lead) {
        return res.status(404).json({ error: "ליד לא נמצא" });
      }

      await lead.updateStatus(req.body.status);
      res.json(lead);
    } catch (error) {
      res
        .status(500)
        .json({ error: "שגיאה בעדכון סטטוס", message: error.message });
    }
  }
);

// Convert lead to customer
router.post("/leads/:id/convert", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "ליד לא נמצא" });
    }

    // Create new customer from lead
    const customerData = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      source: lead.source,
      status: "active",
      priority: lead.priority,
      notes: lead.notes.map((note) => note.content).join("\n"),
      tags: lead.tags,
    };

    const customer = new Customer(customerData);
    await customer.save();

    // Update lead status
    await lead.convertToCustomer();

    res.json({
      message: "ליד הומר ללקוח בהצלחה",
      customer: customer,
      lead: lead,
    });
  } catch (error) {
    res.status(500).json({ error: "שגיאה בהמרת ליד", message: error.message });
  }
});

// Delete lead (soft delete)
router.delete("/leads/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "ליד לא נמצא" });
    }
    await lead.softDelete();
    res.json({ message: "ליד נמחק בהצלחה" });
  } catch (error) {
    res.status(500).json({ error: "שגיאה במחיקת ליד", message: error.message });
  }
});

// Get lead stats
router.get("/leads/stats/overview", async (req, res) => {
  try {
    const stats = await Lead.getStats();
    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בקבלת סטטיסטיקות", message: error.message });
  }
});

// ===== DASHBOARD ROUTES =====

// Get dashboard overview
router.get("/dashboard/overview", async (req, res) => {
  try {
    const [customerStats, projectStats, leadStats] = await Promise.all([
      Customer.getStats(),
      Project.getStats(),
      Lead.getStats(),
    ]);

    const overview = {
      customers: customerStats,
      projects: projectStats,
      leads: leadStats,
      totalRevenue: projectStats.totalBudget || 0,
      activeProjects: projectStats.activeProjects || 0,
      newLeads: leadStats.newLeads || 0,
    };

    res.json(overview);
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בקבלת סקירה כללית", message: error.message });
  }
});

// Get overdue items
router.get("/dashboard/overdue", async (req, res) => {
  try {
    const [overdueProjects, overdueFollowUps] = await Promise.all([
      Project.findOverdue(),
      Lead.findOverdueFollowUp(),
    ]);

    res.json({
      overdueProjects,
      overdueFollowUps,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "שגיאה בקבלת פריטים באיחור", message: error.message });
  }
});

export default router;
