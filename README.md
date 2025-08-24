# IQ Design - אדריכלות יוקרה באילת

אתר אדריכלות יוקרה מתקדם עם מערכת הצעות מחיר אוטומטית, CRM מלא ונגישות מתקדמת.

## 🚀 תכונות עיקריות

### Frontend (React + TypeScript)

- **עיצוב רספונסיבי** - עובד מושלם על כל המכשירים
- **נגישות מתקדמת** - תמיכה מלאה ב-WCAG 2.1
- **PWA** - Progressive Web App עם offline support
- **אנימציות חלקות** - Framer Motion
- **Material UI** - עיצוב מודרני ונגיש
- **RTL Support** - תמיכה מלאה בעברית

### Backend (Node.js + Express)

- **API מאובטח** - Rate limiting, CORS, Helmet
- **MongoDB** - בסיס נתונים NoSQL
- **אימייל אוטומטי** - שליחת הצעות מחיר
- **CRM מלא** - ניהול לקוחות, פרויקטים ולידים
- **ולידציה** - Express Validator
- **Logging** - Morgan + custom logging

### מערכת הצעות מחיר

- **טופס רב-שלבי** - UX מתקדם
- **חישוב אוטומטי** - מחירים לפי קטגוריות
- **שליחה אוטומטית** - אימייל/וואטסאפ
- **מעקב מלא** - היסטוריה וסטטוסים

## 📋 דרישות מערכת

- Node.js 18+
- pnpm 8+
- MongoDB 6+
- Git

## 🛠️ התקנה

### 1. Clone הפרויקט

```bash
git clone <repository-url>
cd iq-design2
```

### 2. התקנת תלויות

```bash
pnpm install
```

### 3. הגדרת משתני סביבה

```bash
# העתק את קובץ הדוגמה
cp apps/server/env.example apps/server/.env

# ערוך את הקובץ עם הפרטים שלך
nano apps/server/.env
```

### 4. הפעלת MongoDB

```bash
# התקן MongoDB או השתמש ב-MongoDB Atlas
mongod
```

### 5. הפעלת הפרויקט

```bash
# פיתוח (שני השרתים)
pnpm dev

# או בנפרד:
pnpm --filter server dev  # שרת על פורט 3000
pnpm --filter client dev  # קליינט על פורט 5000
```

## 🌐 גישה לאתר

- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health

## 📁 מבנה הפרויקט

```
iq-design2/
├── apps/
│   ├── client/                 # React Frontend
│   │   ├── src/
│   │   │   ├── components/     # קומפוננטים
│   │   │   ├── pages/         # דפים
│   │   │   ├── types/         # TypeScript types
│   │   │   └── ...
│   │   └── public/            # קבצים סטטיים
│   └── server/                # Node.js Backend
│       ├── src/
│       │   ├── routes/        # API routes
│       │   ├── models/        # MongoDB models
│       │   ├── services/      # שירותים
│       │   ├── middleware/    # middleware
│       │   └── ...
│       └── ...
├── package.json
└── pnpm-workspace.yaml
```

## 🔧 פיתוח

### Scripts זמינים

```bash
# פיתוח
pnpm dev                    # הפעל את שני השרתים
pnpm --filter client dev    # רק קליינט
pnpm --filter server dev    # רק שרת

# בנייה
pnpm build                  # בניית כל הפרויקט
pnpm --filter client build  # בניית קליינט
pnpm --filter server build  # בניית שרת

# בדיקות
pnpm --filter client lint   # ESLint
pnpm --filter client type-check  # TypeScript check

# ניקוי
pnpm clean                  # מחיקת קבצי build
```

### TypeScript

הפרויקט משתמש ב-TypeScript עם הגדרות קפדניות:

- Strict mode מופעל
- No implicit any
- Strict null checks
- Custom types לכל המודלים

### נגישות

האתר עומד בתקני WCAG 2.1 AA:

- **ניווט מקלדת** - Tab, Enter, Space
- **Screen readers** - ARIA labels מלאים
- **ניגודיות** - 4.5:1 minimum
- **גודל טקסט** - ניתן לשינוי
- **Skip links** - קפיצה לתוכן הראשי

## 🔒 אבטחה

### Frontend

- Content Security Policy
- XSS Protection
- HTTPS Only (בפרודקשן)

### Backend

- Rate Limiting
- Input Sanitization
- CORS Configuration
- Helmet Security Headers
- JWT Authentication (מוכן)

## 📊 API Endpoints

### הצעות מחיר

- `POST /api/quotes/create` - יצירת הצעת מחיר
- `GET /api/quotes` - קבלת כל ההצעות
- `GET /api/quotes/:id` - הצעה ספציפית
- `PATCH /api/quotes/:id/status` - עדכון סטטוס

### יצירת קשר

- `POST /api/contact/send` - שליחת הודעה

### CRM

- `GET /api/crm/customers` - לקוחות
- `GET /api/crm/projects` - פרויקטים
- `GET /api/crm/leads` - לידים

## 🚀 פרודקשן

### בנייה

```bash
pnpm build
```

### הפעלה

```bash
pnpm start
```

### Environment Variables

```bash
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
SMTP_USER=your-production-email
SMTP_PASS=your-production-password
```

## 📈 ביצועים

### Frontend

- **Lazy Loading** - קומפוננטים נטענים לפי דרישה
- **Code Splitting** - חלוקה אוטומטית של הקוד
- **Image Optimization** - תמונות מותאמות
- **Caching** - Service Worker

### Backend

- **Compression** - gzip compression
- **Caching** - Redis ready
- **Database Indexing** - אינדקסים אופטימליים
- **Connection Pooling** - MongoDB connection pool

## 🐛 דיבוג

### Frontend

```bash
# Developer Tools
F12 -> Console
F12 -> Network
F12 -> Performance

# React DevTools
npm install -g react-devtools
react-devtools
```

### Backend

```bash
# Logs
tail -f apps/server/logs/app.log

# MongoDB
mongosh
use iq-design
db.quotes.find()
```

## 🤝 תרומה

1. Fork הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📄 רישיון

MIT License - ראה קובץ [LICENSE](LICENSE) לפרטים.

## 📞 תמיכה

- **Email**: support@iq-design.co.il
- **Phone**: 054-1234567
- **Website**: www.iq-design.co.il

## 🔄 עדכונים

### v1.0.0 (2024-01-15)

- ✨ מערכת הצעות מחיר מלאה
- 🎨 עיצוב רספונסיבי
- ♿ נגישות מתקדמת
- 🔒 אבטחה משופרת
- 📱 PWA support
- 🚀 ביצועים אופטימליים

---

**פותח עם ❤️ בישראל**
