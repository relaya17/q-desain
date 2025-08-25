import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import SEO from '../components/common/SEO';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Send,
  CheckCircle
} from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });

  return (
    <>
      <SEO 
        title="צור קשר - iq-design אילת"
        description="צור קשר עם צוות האדריכלים המקצועי שלנו באילת. קבל ייעוץ חינם לתכנון ועיצוב הבית או הפרויקט המסחרי שלך"
        image="https://iq-design.netlify.app/og-image.jpg"
      />

  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'שגיאה בשליחת ההודעה');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: ''
      });
    },
    onError: (error) => {
      console.error('Error sending contact form:', error);
      alert('שגיאה בשליחת ההודעה. אנא נסה שוב.');
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: <Phone />,
      title: 'טלפון',
      content: '08-1234567',
      subtitle: 'א-ה 09:00-18:00'
    },
    {
      icon: <Email />,
      title: 'אימייל',
      content: 'info@eilat-arch.com',
      subtitle: 'נענה תוך 24 שעות'
    },
    {
      icon: <LocationOn />,
      title: 'כתובת',
      content: 'רחוב הים 123, אילת',
      subtitle: 'ישראל'
    },
    {
      icon: <Schedule />,
      title: 'שעות פעילות',
      content: 'א-ה 09:00-18:00',
      subtitle: 'ו׳ 09:00-14:00'
    }
  ];

  const services = [
    'אדריכלות מגורים',
    'אדריכלות מסחרית',
    'אדריכלות מלונות',
    'עיצוב פנים',
    'ניהול פרויקטים',
    'שיפוץ והרחבה',
    'אחר'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Container maxWidth="md">
          <Card className="text-center p-8">
            <CheckCircle sx={{ fontSize: 64, color: '#10b981', mb: 3 }} />
            <Typography variant="h4" className="font-bold text-gray-900 mb-4">
              תודה על פנייתך!
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-6">
              הודעתך נשלחה בהצלחה. נציג שלנו יצור איתך קשר בהקדם האפשרי.
            </Typography>
            <Button 
              variant="contained"
              onClick={() => setIsSubmitted(false)}
              sx={{ 
                bgcolor: '#1e3a8a',
                '&:hover': {
                  bgcolor: '#1e40af'
                }
              }}
            >
              שלח הודעה נוספת
            </Button>
          </Card>
        </Container>
      </div>
    );
  }

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
            צור קשר
          </Typography>
          <Typography variant="h5" className="text-blue-100 max-w-2xl mx-auto">
            נשמח לשמוע ממך ולעזור לך להגשים את החלום האדריכלי שלך
          </Typography>
        </Container>
      </motion.div>

      <Container maxWidth="lg" className="py-16">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '58.333333% 41.666667%' }, gap: 6 }}>
          {/* Contact Form */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <Typography variant="h4" className="font-bold text-gray-900 mb-6">
                    שלח לנו הודעה
                  </Typography>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                      <TextField
                        fullWidth
                        label="שם מלא"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="אימייל"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="מספר טלפון"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        variant="outlined"
                      />
                      <FormControl fullWidth required>
                        <InputLabel>שירות מבוקש</InputLabel>
                        <Select
                          value={formData.service}
                          onChange={(e) => handleInputChange('service', e.target.value)}
                          label="שירות מבוקש"
                        >
                          {services.map((service) => (
                            <MenuItem key={service} value={service}>
                              {service}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        label="נושא"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                        variant="outlined"
                        sx={{ gridColumn: { xs: '1 / -1', sm: '1 / -1' } }}
                      />
                      <TextField
                        fullWidth
                        label="תוכן ההודעה"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        variant="outlined"
                        placeholder="ספר לנו על הפרויקט שלך..."
                        sx={{ gridColumn: { xs: '1 / -1', sm: '1 / -1' } }}
                      />
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={contactMutation.isPending}
                      endIcon={<Send />}
                      sx={{ 
                        bgcolor: '#1e3a8a',
                        py: 2,
                        '&:hover': {
                          bgcolor: '#1e40af'
                        }
                      }}
                    >
                      {contactMutation.isPending ? 'שולח...' : 'שלח הודעה'}
                    </Button>

                    {contactMutation.isError && (
                      <Alert severity="error" className="mt-4">
                        שגיאה בשליחת ההודעה. אנא נסה שוב.
                      </Alert>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Box>

          {/* Contact Info */}
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box className="space-y-6">
                {/* Contact Info Cards */}
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <Box className="flex items-start gap-4">
                        <Box 
                          sx={{ 
                            bgcolor: '#1e3a8a', 
                            color: 'white',
                            borderRadius: '50%',
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" className="font-bold text-gray-900 mb-1">
                            {info.title}
                          </Typography>
                          <Typography variant="body1" className="text-blue-600 font-medium mb-1">
                            {info.content}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600">
                            {info.subtitle}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}

                {/* Map Placeholder */}
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Box 
                      className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"
                      sx={{ position: 'relative' }}
                    >
                      <div className="absolute inset-0 bg-black/20"></div>
                      <Box className="relative z-10 text-center text-white">
                        <LocationOn sx={{ fontSize: 48, mb: 2 }} />
                        <Typography variant="h6" className="font-bold mb-2">
                          iq-design
                        </Typography>
                        <Typography variant="body1">
                          רחוב הים 123, אילת
                        </Typography>
                        <Typography variant="body2" className="opacity-90">
                          ישראל
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Quick Contact */}
                <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <CardContent className="p-6 text-center">
                    <Typography variant="h6" className="font-bold mb-3">
                      צריכים עזרה מהירה?
                    </Typography>
                    <Typography variant="body2" className="mb-4 opacity-90">
                      התקשרו אלינו עכשיו ונשמח לעזור
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="large"
                      startIcon={<Phone />}
                      sx={{ 
                        bgcolor: 'white', 
                        color: '#1e3a8a',
                        '&:hover': {
                          bgcolor: '#f0f4ff'
                        }
                      }}
                    >
                      התקשר עכשיו
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </motion.div>
          </Box>
        </Box>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <Typography variant="h3" className="text-center font-bold text-gray-900 mb-12">
            שאלות נפוצות
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
            {[
              {
                question: 'כמה זמן לוקח תהליך התכנון?',
                answer: 'תהליך התכנון תלוי בגודל ומורכבות הפרויקט. פרויקטים קטנים יכולים לקחת 2-4 שבועות, בעוד שפרויקטים גדולים יכולים לקחת 2-3 חודשים.'
              },
              {
                question: 'האם אתם עובדים בכל הארץ?',
                answer: 'אנו מתמחים בעיקר באזור אילת והדרום, אך אנו מוכנים לשקול פרויקטים מיוחדים באזורים אחרים בארץ.'
              },
              {
                question: 'מה כולל השירות שלכם?',
                answer: 'השירות שלנו כולל תכנון אדריכלי מלא, עיצוב פנים, הכנת תוכניות בנייה, פיקוח על הבנייה וליווי לאורך כל התהליך.'
              },
              {
                question: 'האם אתם מספקים הצעת מחיר חינם?',
                answer: 'כן, אנו מספקים פגישה ראשונית והצעת מחיר ראשונית ללא עלות. זה כולל ניתוח צרכים והצגת קונספט ראשוני.'
              }
            ].map((faq, index) => (
              <Box key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-bold text-gray-900 mb-3">
                      {faq.question}
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 leading-relaxed">
                      {faq.answer}
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

export default ContactPage;
