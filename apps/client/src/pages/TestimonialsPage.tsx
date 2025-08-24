import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Avatar,
  Rating,
  Chip,
  Tabs,
  Tab,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import {
  Star,
  FormatQuote,
  Home,
  Hotel,
  Store,
  Send
} from '@mui/icons-material';

const TestimonialsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    renovationType: '',
    renovationTime: '',
    budget: '',
    description: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const categories = [
    { value: 'all', label: 'הכל', icon: <Star /> },
    { value: 'residential', label: 'מגורים', icon: <Home /> },
    { value: 'commercial', label: 'מסחרי', icon: <Store /> },
    { value: 'hotels', label: 'מלונות', icon: <Hotel /> }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'דוד כהן',
      role: 'בעל וילה יוקרתית',
      company: 'חוף אלמוג, אילת',
      category: 'residential',
      rating: 5,
      date: '2023',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      text: 'העבודה עם iq-design הייתה חוויה מדהימה! הצוות המקצועי הפך את החלום שלנו למציאות. הוילה שלנו היא בדיוק מה שרצינו - יוקרתית, פונקציונלית ועם נוף מדהים לים. התהליך היה חלק ומקצועי משלב התכנון ועד למסירה הסופית.',
      project: 'וילה יוקרתית - חוף אלמוג',
      features: ['נוף לים', 'בריכה פרטית', 'עיצוב מודרני']
    },
    {
      id: 2,
      name: 'שרה לוי',
      role: 'מנכ"לית',
      company: 'רשת מלונות יוקרה',
      category: 'hotels',
      rating: 5,
      date: '2023',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      text: 'בחרנו ב-iq-design לפרויקט המלון שלנו באילת והתוצאה מדהימה! המלון קיבל דירוג 5 כוכבים והאורחים מרוצים מאוד מהעיצוב והפונקציונליות. הצוות היה מקצועי, יצירתי ועבד בדיוק לפי הזמנים.',
      project: 'מלון בוטיק - הרי אילת',
      features: ['25 חדרים', 'בריכה אינפיניטי', 'ספא יוקרתי']
    },
    {
      id: 3,
      name: 'מיכאל רוזן',
      role: 'בעלים',
      company: 'מסעדת "ים של טעמים"',
      category: 'commercial',
      rating: 5,
      date: '2022',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      text: 'העיצוב של המסעדה שלנו הוא פשוט מושלם! הצוות של iq-design הבין בדיוק מה אנחנו רוצים - מסעדה יוקרתית עם אווירה ים תיכונית. האורחים אוהבים את האווירה והעיצוב תורם רבות להצלחה שלנו.',
      project: 'מסעדה יוקרתית - נמל אילת',
      features: ['מרפסת ים', 'מטבח פתוח', 'בר יין']
    },
    {
      id: 4,
      name: 'נועה כהן',
      role: 'בעלת דירה',
      company: 'מגדל הים, אילת',
      category: 'residential',
      rating: 5,
      date: '2022',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      text: 'השיפוץ של הדירה שלנו היה חוויה נהדרת! הצוות היה מקצועי, יצירתי ועבד בדיוק לפי התקציב. התוצאה מדהימה - דירה מודרנית, פונקציונלית ועם נוף פנורמי לים. ממליצה בחום!',
      project: 'דירה יוקרתית - מגדל הים',
      features: ['נוף פנורמי', 'מטבח פתוח', 'מערכת חכם']
    },
    {
      id: 5,
      name: 'יוסי אברהם',
      role: 'מנכ"ל',
      company: 'קבוצת נדל״ן אילת',
      category: 'commercial',
      rating: 5,
      date: '2022',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      text: 'הפרויקט של המרכז המסחרי היה מורכב ומאתגר, אבל הצוות של iq-design התמודד עם כל האתגרים בצורה מקצועית. התוצאה היא מרכז מסחרי מודרני ומצליח שמשרת את הקהילה באילת.',
      project: 'מרכז מסחרי - מרכז העיר',
      features: ['50 חנויות', 'חניה תת קרקעית', 'מרחב ציבורי']
    },
    {
      id: 6,
      name: 'רחל גולדברג',
      role: 'בעלת נטהאוס',
      company: 'מגדל השמש, אילת',
      category: 'residential',
      rating: 5,
      date: '2021',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      text: 'הנטהאוס שלנו הוא פשוט חלום! הצוות של iq-design תכנן כל פרט בקפידה - מהגגון הפרטי ועד למטבח היוקרתי. האיכות והעיצוב הם ברמה הגבוהה ביותר. תודה על חוויה מדהימה!',
      project: 'נטהאוס - מגדל השמש',
      features: ['גגון פרטי', 'בריכה קטנה', 'מעלית פרטית']
    }
  ];

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category === selectedCategory);

  const handleCategoryChange = (_event: any, newValue: any) => {
    setSelectedCategory(newValue);
  };

  const handleQuoteFormChange = (field: string, value: string) => {
    setQuoteForm(prev => ({ ...prev, [field]: value }));
  };

  const handleQuoteSubmit = async () => {
    setSubmitStatus('loading');
    try {
      const response = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          address: quoteForm.address,
          projectType: quoteForm.renovationType,
          description: `סוג שיפוץ: ${quoteForm.renovationType}\nזמן שיפוץ: ${quoteForm.renovationTime}\nתקציב: ${quoteForm.budget}\nתיאור: ${quoteForm.description}`,
          status: 'new',
          source: 'testimonials-page'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setQuoteForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          renovationType: '',
          renovationTime: '',
          budget: '',
          description: ''
        });
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const stats = [
    { number: '500+', label: 'לקוחות מרוצים' },
    { number: '4.9', label: 'דירוג ממוצע' },
    { number: '150+', label: 'פרויקטים הושלמו' },
    { number: '25+', label: 'שנות ניסיון' }
  ];

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
            המלצות לקוחות
          </Typography>
          <Typography variant="h5" className="text-blue-100 max-w-2xl mx-auto">
            מה הלקוחות שלנו אומרים על העבודה שלנו
          </Typography>
        </Container>
      </motion.div>

      <Container maxWidth="lg" className="py-16">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            {stats.map((stat, index) => (
              <Box key={index}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Typography variant="h3" className="font-bold text-blue-600 mb-2">
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" className="text-gray-600">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </motion.div>

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

        {/* Testimonials Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
          <AnimatePresence mode="wait">
            {filteredTestimonials.map((testimonial, index) => (
              <Box key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedTestimonial(testimonial)}
                  >
                    <CardContent className="p-6">
                      <Box className="flex items-start gap-4 mb-4">
                        <Avatar 
                          src={testimonial.image} 
                          sx={{ width: 60, height: 60 }}
                        />
                        <Box className="flex-1">
                          <Typography variant="h6" className="font-bold text-gray-900">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" className="text-blue-600 mb-1">
                            {testimonial.role}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {testimonial.company}
                          </Typography>
                        </Box>
                        <Box className="text-left">
                          <Rating value={testimonial.rating} readOnly size="small" />
                          <Typography variant="caption" className="text-gray-500">
                            {testimonial.date}
                          </Typography>
                        </Box>
                      </Box>

                      <Box className="mb-4">
                        <FormatQuote sx={{ color: '#1e3a8a', fontSize: 24, mb: 1 }} />
                        <Typography variant="body1" className="text-gray-700 leading-relaxed">
                          {testimonial.text.length > 200 
                            ? `${testimonial.text.substring(0, 200)}...` 
                            : testimonial.text
                          }
                        </Typography>
                      </Box>

                      <Box className="flex flex-wrap gap-2">
                        {testimonial.features.map((feature: any, idx: any) => (
                          <Chip 
                            key={idx}
                            label={feature} 
                            size="small"
                            sx={{ bgcolor: '#f0f4ff', color: '#1e3a8a' }}
                          />
                        ))}
                      </Box>

                      <Typography variant="body2" className="text-gray-500 mt-3">
                        פרויקט: {testimonial.project}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </AnimatePresence>
        </Box>

        {/* Quote Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-green-600 to-green-800 text-white">
            <CardContent className="p-8">
              <Typography variant="h4" className="font-bold mb-4 text-center">
                הצעת מחיר ראשונית
              </Typography>
              <Typography variant="h6" className="mb-6 text-center opacity-90">
                מלאו את הפרטים וקבלו הצעת מחיר ראשונית תוך 24 שעות
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="שם מלא"
                    value={quoteForm.name}
                    onChange={(e) => handleQuoteFormChange('name', e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="אימייל"
                    type="email"
                    value={quoteForm.email}
                    onChange={(e) => handleQuoteFormChange('email', e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="טלפון"
                    value={quoteForm.phone}
                    onChange={(e) => handleQuoteFormChange('phone', e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="כתובת"
                    value={quoteForm.address}
                    onChange={(e) => handleQuoteFormChange('address', e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                </Box>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>סוג שיפוץ</InputLabel>
                    <Select
                      value={quoteForm.renovationType}
                      onChange={(e) => handleQuoteFormChange('renovationType', e.target.value)}
                      sx={{ 
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                        '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.7)' },
                        '& .MuiSelect-select': { color: 'white' }
                      }}
                    >
                      <MenuItem value="דירה">דירה</MenuItem>
                      <MenuItem value="בית פרטי">בית פרטי</MenuItem>
                      <MenuItem value="מסחרי">מסחרי</MenuItem>
                      <MenuItem value="מלון">מלון</MenuItem>
                      <MenuItem value="משרד">משרד</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="מתי רוצים את השיפוץ"
                    value={quoteForm.renovationTime}
                    onChange={(e) => handleQuoteFormChange('renovationTime', e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="תקציב משוער"
                    value={quoteForm.budget}
                    onChange={(e) => handleQuoteFormChange('budget', e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                </Box>
                <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }}>
                  <TextField
                    fullWidth
                    label="תיאור הפרויקט"
                    multiline
                    rows={4}
                    value={quoteForm.description}
                    onChange={(e) => handleQuoteFormChange('description', e.target.value)}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                      },
                      '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                      '& .MuiInputBase-input': { color: 'white' }
                    }}
                  />
                </Box>
              </Box>

              {submitStatus === 'success' && (
                <Alert severity="success" className="mt-4">
                  הצעת המחיר נשלחה בהצלחה! נחזור אליכם תוך 24 שעות.
                </Alert>
              )}

              {submitStatus === 'error' && (
                <Alert severity="error" className="mt-4">
                  שגיאה בשליחת ההצעה. אנא נסו שוב.
                </Alert>
              )}

              <Box className="text-center mt-6">
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={handleQuoteSubmit}
                  disabled={submitStatus === 'loading'}
                  startIcon={<Send />}
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#059669',
                    '&:hover': {
                      bgcolor: '#f0f4ff'
                    }
                  }}
                >
                  {submitStatus === 'loading' ? 'שולח...' : 'שלח הצעת מחיר'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Testimonial Details Dialog */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent className="p-8">
                <Box className="flex items-start gap-4 mb-6">
                  <Avatar 
                    src={selectedTestimonial.image} 
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box className="flex-1">
                    <Typography variant="h5" className="font-bold text-gray-900">
                      {selectedTestimonial.name}
                    </Typography>
                    <Typography variant="body1" className="text-blue-600 mb-1">
                      {selectedTestimonial.role}
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 mb-2">
                      {selectedTestimonial.company}
                    </Typography>
                    <Rating value={selectedTestimonial.rating} readOnly />
                  </Box>
                </Box>

                <Box className="mb-6">
                  <FormatQuote sx={{ color: '#1e3a8a', fontSize: 32, mb: 2 }} />
                  <Typography variant="body1" className="text-gray-700 leading-relaxed text-lg">
                    {selectedTestimonial.text}
                  </Typography>
                </Box>

                <Box className="mb-4">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-2">
                    פרויקט: {selectedTestimonial.project}
                  </Typography>
                  <Box className="flex flex-wrap gap-2">
                    {selectedTestimonial.features.map((feature: any, idx: any) => (
                      <Chip 
                        key={idx}
                        label={feature} 
                        sx={{ bgcolor: '#1e3a8a', color: 'white' }}
                      />
                    ))}
                  </Box>
                </Box>

                <Button 
                  variant="outlined" 
                  onClick={() => setSelectedTestimonial(null)}
                  sx={{ borderColor: '#1e3a8a', color: '#1e3a8a' }}
                >
                  סגור
                </Button>
              </CardContent>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestimonialsPage;
