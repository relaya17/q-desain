import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  CardMedia,
  Chip,
  Button,
  Tabs,
  Tab,
  Avatar
} from '@mui/material';
import {
  CalendarToday,
  ArrowForward,
  DesignServices,
  Home,
  Hotel,
  Store,
  TrendingUp
} from '@mui/icons-material';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'הכל', icon: <TrendingUp /> },
    { value: 'architecture', label: 'אדריכלות', icon: <Home /> },
    { value: 'design', label: 'עיצוב', icon: <DesignServices /> },
    { value: 'hotels', label: 'מלונות', icon: <Hotel /> },
    { value: 'commercial', label: 'מסחרי', icon: <Store /> }
  ];

  const articles = [
    {
      id: 1,
      title: 'טרנדים חדשים באדריכלות יוקרתית 2024',
      excerpt: 'גלה את הטרנדים החדשים ביותר באדריכלות יוקרתית לשנת 2024 - מחומרים טבעיים ועד לטכנולוגיה מתקדמת',
      content: 'השנה 2024 מביאה איתה טרנדים חדשים ומרתקים בתחום האדריכלות היוקרתית. אנו רואים חזרה לחומרים טבעיים כמו עץ, אבן וחימר, לצד שילוב של טכנולוגיה מתקדמת כמו מערכות בית חכם ואינטגרציה של אנרגיה מתחדשת. הטרנד המרכזי הוא יצירת חללים שמשלבים פונקציונליות עם אסתטיקה, תוך שמירה על קיימות וסביבה.',
      category: 'architecture',
      author: 'דוד כהן',
      date: '15 בינואר 2024',
      readTime: '5 דקות',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=400&fit=crop',
      tags: ['טרנדים', 'יוקרה', '2024', 'חומרים טבעיים']
    },
    {
      id: 2,
      title: 'עיצוב פנים מינימליסטי - המדריך המלא',
      excerpt: 'למד כיצד ליצור חללים מינימליסטיים ואלגנטיים שמשלבים פשטות עם פונקציונליות',
      content: 'עיצוב מינימליסטי הוא לא רק טרנד חולף, אלא פילוסופיה שמתמקדת בפשטות, פונקציונליות ואיכות. המפתח לעיצוב מינימליסטי מוצלח הוא בחירת ריהוט איכותי, שימוש בצבעים ניטרליים ויצירת חללים נקיים ומאורגנים. חשוב לזכור שמינימליזם לא אומר ריק, אלא בחירה מוקפדת של כל פריט בחלל.',
      category: 'design',
      author: 'שרה לוי',
      date: '10 בינואר 2024',
      readTime: '7 דקות',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=400&fit=crop',
      tags: ['מינימליזם', 'עיצוב פנים', 'אלגנטיות', 'פונקציונליות']
    },
    {
      id: 3,
      title: 'תכנון מלונות בוטיק - האתגרים והיתרונות',
      excerpt: 'כיצד לתכנן מלון בוטיק יוקרתי שמשלב אינטימיות עם שירות ברמה הגבוהה ביותר',
      content: 'מלונות בוטיק הם הטרנד החם בתעשיית האירוח. בניגוד למלונות גדולים, מלונות בוטיק מתמקדים בחוויית אירוח אישית ואינטימית. התכנון האדריכלי חייב לקחת בחשבון את הצורך בחללים ציבוריים מזמינים, חדרים יוקרתיים ושילוב של פרטיות עם אינטראקציה חברתית. המפתח הוא יצירת אווירה ייחודית שמבדילה את המלון מהמתחרים.',
      category: 'hotels',
      author: 'מיכאל רוזן',
      date: '5 בינואר 2024',
      readTime: '8 דקות',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
      tags: ['מלונות בוטיק', 'אירוח', 'יוקרה', 'תכנון']
    },
    {
      id: 4,
      title: 'אדריכלות בת קיימא - העתיד של הבנייה',
      excerpt: 'כיצד אדריכלות בת קיימא משנה את הדרך בה אנו בונים ומתכננים מבנים',
      content: 'אדריכלות בת קיימא היא לא רק טרנד, אלא הכרח בעולם המודרני. השימוש בחומרים ידידותיים לסביבה, מערכות אנרגיה מתחדשת ותכנון שמתחשב באקלים המקומי הם המפתח ליצירת מבנים שמכבדים את הסביבה ומשרתים את הדורות הבאים. חשוב לשלב טכנולוגיות מתקדמות עם עקרונות בנייה מסורתיים.',
      category: 'architecture',
      author: 'נועה כהן',
      date: '1 בינואר 2024',
      readTime: '6 דקות',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
      tags: ['קיימות', 'סביבה', 'אנרגיה מתחדשת', 'בנייה ירוקה']
    },
    {
      id: 5,
      title: 'עיצוב מרכזים מסחריים מודרניים',
      excerpt: 'כיצד לתכנן מרכז מסחרי שמשלב קניות עם חוויית בילוי יוקרתית',
      content: 'מרכזים מסחריים מודרניים הם כבר לא רק מקום לקניות, אלא מרחבים חברתיים שמשלבים קניות, בילוי, אוכל ובידור. התכנון חייב לקחת בחשבון את הצורך בחללים ציבוריים מזמינים, מערכות תאורה מתקדמות ושילוב של חנויות עם אזורי בילוי. המפתח הוא יצירת חוויית לקוח ייחודית שמעודדת שהייה ממושכת.',
      category: 'commercial',
      author: 'יוסי אברהם',
      date: '28 בדצמבר 2023',
      readTime: '9 דקות',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop',
      tags: ['מסחרי', 'חוויית לקוח', 'בילוי', 'תכנון עירוני']
    },
    {
      id: 6,
      title: 'השפעת הטכנולוגיה על עיצוב הבית המודרני',
      excerpt: 'כיצד טכנולוגיה מתקדמת משנה את הדרך בה אנו מתכננים ומעצבים בתים',
      content: 'הטכנולוגיה משנה את הדרך בה אנו חיים ועובדים, וזה משתקף גם בעיצוב הבית המודרני. מערכות בית חכם, אינטגרציה של מכשירים חכמים ושימוש בחומרים מתקדמים מאפשרים לנו ליצור חללים שמשלבים נוחות עם יעילות. חשוב לשלב טכנולוגיה בצורה שמשרתת את המשתמש ולא להפך.',
      category: 'design',
      author: 'רחל גולדברג',
      date: '25 בדצמבר 2023',
      readTime: '7 דקות',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=400&fit=crop',
      tags: ['טכנולוגיה', 'בית חכם', 'מודרני', 'אינטגרציה']
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const handleCategoryChange = (_event: any, newValue: any) => {
    setSelectedCategory(newValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <Container maxWidth="lg" className="relative z-10 text-center">
          <Typography variant="h2" component="h1" className="text-white font-bold mb-4">
            הבלוג שלנו
          </Typography>
          <Typography variant="h5" className="text-blue-100 max-w-2xl mx-auto">
            מאמרים מקצועיים על אדריכלות, עיצוב וטרנדים חדשים
          </Typography>
        </Container>
      </motion.div>

      <Container maxWidth="lg" className="py-16">
        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Box className="flex justify-center">
            <Tabs 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  color: '#6b7280',
                  fontWeight: 500,
                  fontSize: '1rem',
                  minWidth: 120,
                  '&.Mui-selected': {
                    color: '#1e3a8a',
                    fontWeight: 600
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1e3a8a'
                }
              }}
            >
              {categories.map((category) => (
                <Tab 
                  key={category.value} 
                  value={category.value} 
                  label={category.label}
                  icon={category.icon}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Box>
        </motion.div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Typography variant="h4" className="font-bold text-gray-900 mb-8 text-center">
              מאמר מומלץ
            </Typography>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                <Box>
                  <CardMedia
                    component="img"
                    height="400"
                    image={filteredArticles[0].image}
                    alt={filteredArticles[0].title}
                    className="h-full object-cover"
                  />
                </Box>
                <Box>
                  <CardContent className="p-8 h-full flex flex-col justify-center">
                    <Box className="flex items-center gap-4 mb-4">
                      <Chip 
                        label={filteredArticles[0].category} 
                        size="small"
                        sx={{ bgcolor: '#1e3a8a', color: 'white' }}
                      />
                      <Box className="flex items-center gap-2 text-gray-500">
                        <CalendarToday sx={{ fontSize: 16 }} />
                        <Typography variant="body2">{filteredArticles[0].date}</Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="h4" className="font-bold text-gray-900 mb-4">
                      {filteredArticles[0].title}
                    </Typography>
                    
                    <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed">
                      {filteredArticles[0].excerpt}
                    </Typography>
                    
                    <Box className="flex items-center justify-between">
                      <Box className="flex items-center gap-2">
                        <Avatar sx={{ width: 32, height: 32 }} />
                        <Typography variant="body2" className="text-gray-600">
                          {filteredArticles[0].author}
                        </Typography>
                      </Box>
                      <Typography variant="body2" className="text-gray-500">
                        {filteredArticles[0].readTime}
                      </Typography>
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      endIcon={<ArrowForward />}
                      sx={{ 
                        bgcolor: '#1e3a8a',
                        mt: 3,
                        '&:hover': {
                          bgcolor: '#1e40af'
                        }
                      }}
                    >
                      קרא עוד
                    </Button>
                  </CardContent>
                </Box>
              </Box>
            </Card>
          </motion.div>
        )}

        {/* Articles Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
          <AnimatePresence mode="wait">
            {filteredArticles.slice(1).map((article, index) => (
              <Box key={article.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                    <CardMedia
                      component="img"
                      height="200"
                      image={article.image}
                      alt={article.title}
                      className="object-cover"
                    />
                    <CardContent className="p-6">
                      <Box className="flex items-center gap-4 mb-4">
                        <Chip 
                          label={article.category} 
                          size="small"
                          sx={{ bgcolor: '#f0f4ff', color: '#1e3a8a' }}
                        />
                        <Box className="flex items-center gap-2 text-gray-500">
                          <CalendarToday sx={{ fontSize: 16 }} />
                          <Typography variant="caption">{article.date}</Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="h6" className="font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.title}
                      </Typography>
                      
                      <Typography variant="body2" className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </Typography>
                      
                      <Box className="flex items-center justify-between mb-4">
                        <Box className="flex items-center gap-2">
                          <Avatar sx={{ width: 24, height: 24 }} />
                          <Typography variant="caption" className="text-gray-600">
                            {article.author}
                          </Typography>
                        </Box>
                        <Typography variant="caption" className="text-gray-500">
                          {article.readTime}
                        </Typography>
                      </Box>
                      
                      <Box className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag, idx) => (
                          <Chip 
                            key={idx}
                            label={tag} 
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: '#1e3a8a', color: '#1e3a8a' }}
                          />
                        ))}
                      </Box>
                      
                      <Button 
                        variant="outlined" 
                        size="small"
                        endIcon={<ArrowForward />}
                        sx={{ 
                          borderColor: '#1e3a8a', 
                          color: '#1e3a8a',
                          '&:hover': {
                            borderColor: '#1e40af',
                            backgroundColor: '#f0f4ff'
                          }
                        }}
                      >
                        קרא עוד
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </AnimatePresence>
        </Box>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="p-8 text-center">
              <Typography variant="h4" className="font-bold mb-4">
                הישארו מעודכנים
              </Typography>
              <Typography variant="h6" className="mb-6 opacity-90">
                הירשמו לניוזלטר שלנו וקבלו מאמרים חדשים ישירות למייל
              </Typography>
              <Box className="flex gap-4 justify-center flex-wrap">
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#1e3a8a',
                    '&:hover': {
                      bgcolor: '#f0f4ff'
                    }
                  }}
                >
                  הירשם לניוזלטר
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  עקבו אחרינו
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default BlogPage;
