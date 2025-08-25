import { motion } from 'framer-motion';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import SEO from '../components/common/SEO';
import {
  ExpandMore,
  DesignServices,
  Construction,
  Business,
  Home,
  Hotel,
  Store,
  CheckCircle,
  Timeline,
  Group,
  Star
} from '@mui/icons-material';

const ServicesPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  };

  const services = [
    {
      id: 1,
      title: 'אדריכלות מגורים',
      icon: <Home />,
      description: 'תכנון ועיצוב בתים פרטיים, וילות יוקרתיות ודירות יוקרה עם דגש על פונקציונליות ועיצוב מודרני',
      features: [
        'תכנון בתים פרטיים ווילות',
        'עיצוב דירות יוקרה',
        'תכנון נטהאוסים',
        'שיפוץ והרחבה',
        'תכנון גינות ונוף',
        'מערכות חכם לבית'
      ],
      process: [
        'פגישה ראשונית וניתוח צרכים',
        'פיתוח קונספט עיצובי',
        'תכנון אדריכלי מפורט',
        'הכנת תוכניות בנייה',
        'ליווי בתהליך הבנייה',
        'מסירת הפרויקט'
      ],
      price: 'מתחיל מ-15,000 ₪'
    },
    {
      id: 2,
      title: 'אדריכלות מסחרית',
      icon: <Store />,
      description: 'תכנון ועיצוב מרכזים מסחריים, משרדים, מסעדות וחנויות עם דגש על חוויית לקוח ורווחיות',
      features: [
        'תכנון מרכזים מסחריים',
        'עיצוב משרדים וחנויות',
        'תכנון מסעדות ובתי קפה',
        'תכנון מרחבים ציבוריים',
        'עיצוב חוויית לקוח',
        'תכנון מערכות תאורה'
      ],
      process: [
        'ניתוח צרכי העסק',
        'חקר שוק וניתוח מתחרים',
        'פיתוח קונספט מסחרי',
        'תכנון אדריכלי מפורט',
        'תיאום עם קבלנים',
        'פיקוח על הבנייה'
      ],
      price: 'מתחיל מ-25,000 ₪'
    },
    {
      id: 3,
      title: 'אדריכלות מלונות',
      icon: <Hotel />,
      description: 'תכנון ועיצוב מלונות, בתי הארחה ובתי נופש עם דגש על חוויית אירוח יוקרתית',
      features: [
        'תכנון מלונות בוטיק',
        'עיצוב חדרי אירוח',
        'תכנון מתחמי נופש',
        'עיצוב אזורים ציבוריים',
        'תכנון בריכות וספא',
        'מערכות ניהול מלון'
      ],
      process: [
        'ניתוח דרישות המלון',
        'חקר שוק ותחרות',
        'פיתוח קונספט יוקרתי',
        'תכנון אדריכלי מפורט',
        'תיאום עם קבלני משנה',
        'פיקוח על הבנייה והעיצוב'
      ],
      price: 'מתחיל מ-50,000 ₪'
    },
    {
      id: 4,
      title: 'עיצוב פנים',
      icon: <DesignServices />,
      description: 'עיצוב פנים מקצועי למגורים ומסחר עם דגש על אסתטיקה, פונקציונליות ואיכות חיים',
      features: [
        'עיצוב פנים למגורים',
        'עיצוב פנים מסחרי',
        'בחירת ריהוט ואביזרים',
        'תכנון תאורה',
        'בחירת חומרים וצבעים',
        'עיצוב מטבחים'
      ],
      process: [
        'פגישה ראשונית וניתוח צרכים',
        'פיתוח קונספט עיצובי',
        'הכנת תוכניות עיצוב',
        'בחירת ריהוט וחומרים',
        'ליווי בהתקנה',
        'מסירת הפרויקט'
      ],
      price: 'מתחיל מ-8,000 ₪'
    },
    {
      id: 5,
      title: 'ניהול פרויקטים',
      icon: <Business />,
      description: 'ניהול מקצועי של פרויקטים אדריכליים משלב התכנון ועד למסירה הסופית',
      features: [
        'ניהול תקציב וזמנים',
        'תיאום עם קבלנים',
        'פיקוח על איכות',
        'ניהול מסמכים',
        'תיאום עם רשויות',
        'מעקב אחר התקדמות'
      ],
      process: [
        'ניתוח דרישות הפרויקט',
        'הכנת תוכנית עבודה',
        'בחירת קבלנים',
        'פיקוח על הבנייה',
        'בדיקות איכות',
        'מסירת הפרויקט'
      ],
      price: '8-15% מעלות הפרויקט'
    },
    {
      id: 6,
      title: 'שיפוץ והרחבה',
      icon: <Construction />,
      description: 'שיפוץ מקצועי של מבנים קיימים והרחבת שטחים עם שמירה על איכות ועיצוב',
      features: [
        'שיפוץ בתים פרטיים',
        'הרחבת שטחים',
        'שיפוץ מסחרי',
        'חידוש פנים וחוץ',
        'שיפור אנרגטי',
        'התאמה לנגישות'
      ],
      process: [
        'בדיקת המבנה הקיים',
        'ניתוח אפשרויות שיפוץ',
        'תכנון השיפוץ',
        'הכנת תוכניות עבודה',
        'ביצוע השיפוץ',
        'בדיקה ומסירה'
      ],
      price: 'מתחיל מ-10,000 ₪'
    }
  ];

  return (
    <>
      <SEO 
        title="שירותי אדריכלות - iq-design אילת"
        description="שירותי אדריכלות מקיפים באילת: תכנון בתים פרטיים, פרויקטים מסחריים, מלונות ומלונאות. צוות אדריכלים מקצועיים עם ניסיון של שנים"
        image="https://iq-design.netlify.app/og-image.jpg"
      />
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
            השירותים שלנו
          </Typography>
          <Typography variant="h5" className="text-blue-100 max-w-2xl mx-auto">
            מגוון רחב של שירותי אדריכלות ועיצוב מקצועיים באילת
          </Typography>
        </Container>
      </motion.div>

      <Container maxWidth="lg" className="py-16">
        {/* Services Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 4 }}>
          {services.map((service, index) => (
            <Box key={service.id}>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Box className="flex items-center gap-4 mb-6">
                      <Avatar sx={{ bgcolor: '#1e3a8a', width: 64, height: 64 }}>
                        {service.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" className="font-bold text-gray-900">
                          {service.title}
                        </Typography>
                        <Chip 
                          label={service.price} 
                          size="small"
                          sx={{ bgcolor: '#f0f4ff', color: '#1e3a8a', fontWeight: 600 }}
                        />
                      </Box>
                    </Box>

                    <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </Typography>

                    <Accordion sx={{ mb: 2 }}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6" className="font-semibold text-gray-900">
                          תכונות השירות
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {service.features.map((feature, idx) => (
                            <ListItem key={idx} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <CheckCircle sx={{ color: '#1e3a8a', fontSize: 20 }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={feature}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6" className="font-semibold text-gray-900">
                          תהליך העבודה
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List dense>
                          {service.process.map((step, idx) => (
                            <ListItem key={idx} sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <Box 
                                  sx={{ 
                                    width: 24, 
                                    height: 24, 
                                    borderRadius: '50%', 
                                    bgcolor: '#1e3a8a',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold'
                                  }}
                                >
                                  {idx + 1}
                                </Box>
                              </ListItemIcon>
                              <ListItemText 
                                primary={step}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>

        {/* Why Choose Us Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <Typography variant="h3" component="h2" className="text-center font-bold text-gray-900 mb-12">
            למה לבחור ב-iq-design?
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            {[
              {
                title: '25+ שנות ניסיון',
                description: 'ניסיון עשיר בתחום האדריכלות והעיצוב באילת',
                icon: <Timeline />
              },
              {
                title: 'צוות מקצועי',
                description: 'צוות של אדריכלים ומעצבים מוכשרים ומנוסים',
                icon: <Group />
              },
              {
                title: 'איכות ללא פשרות',
                description: 'מתחייבים לאיכות הגבוהה ביותר בכל פרויקט',
                icon: <Star />
              },
              {
                title: 'שירות אישי',
                description: 'ליווי אישי ומקצועי לאורך כל תהליך הפרויקט',
                icon: <CheckCircle />
              }
            ].map((item, index) => (
              <Box key={index}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Box className="flex justify-center mb-4">
                      <Avatar sx={{ bgcolor: '#1e3a8a', width: 56, height: 56 }}>
                        {item.icon}
                      </Avatar>
                    </Box>
                    <Typography variant="h6" className="font-bold text-gray-900 mb-2">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </div>
    </>
  );
};

export default ServicesPage;
