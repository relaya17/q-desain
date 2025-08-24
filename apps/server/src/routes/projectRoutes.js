import express from "express";

const router = express.Router();

// קבלת רשימת פרויקטים
router.get("/", (req, res) => {
  res.json({
    success: true,
    projects: [
      {
        id: 1,
        title: "בית יוקרה באילת",
        type: "בית פרטי",
        area: 180,
        description: "בית יוקרתי עם נוף לים האדום",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2070&q=80",
      },
      {
        id: 2,
        title: "דירה מעוצבת",
        type: "דירה",
        area: 120,
        description: "עיצוב פנים יוקרתי לדירה",
        image:
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2001&q=80",
      },
    ],
  });
});

export default router;
