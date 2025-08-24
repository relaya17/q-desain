import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuoteFormData, ApiResponse } from '../../types';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Paper,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Chip
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { 
  Home, 
  Palette, 
  Bath, 
  ChefHat, 
  Wrench, 
  Settings,
  Mail,
  MessageCircle,
  CheckCircle
} from 'lucide-react';

// שלבי הטופס
const steps = [
  'פרטים אישיים',
  'בחירת סוג עבודה', 
  'פרטי הפרויקט',
  'הצעת מחיר',
  'שליחה'
];

// סוגי עבודה
const workTypes = [
  {
    id: 'new-project',
    title: 'פרויקט חדש',
    description: 'בניית בית או דירה חדשה',
    icon: Home,
    color: '#1976d2'
  },
  {
    id: 'flooring',
    title: 'ריצוף',
    description: 'ריצוף חדרים או חללים',
    icon: Palette,
    color: '#388e3c'
  },
  {
    id: 'painting',
    title: 'צביעה',
    description: 'צביעת קירות, תקרות או חוץ',
    icon: Palette,
    color: '#f57c00'
  },
  {
    id: 'bathroom',
    title: 'שיפוץ אמבטיה',
    description: 'שיפוץ מלא או חלקי של חדר אמבטיה',
    icon: Bath,
    color: '#7b1fa2'
  },
  {
    id: 'kitchen',
    title: 'שיפוץ מטבח',
    description: 'שיפוץ או החלפת מטבח',
    icon: ChefHat,
    color: '#d32f2f'
  },
  {
    id: 'maintenance',
    title: 'תחזוקה',
    description: 'עבודות תחזוקה ותיקונים',
    icon: Wrench,
    color: '#5d4037'
  },
  {
    id: 'other',
    title: 'אחר',
    description: 'עבודות נוספות',
    icon: Settings,
    color: '#616161'
  }
];

const QuoteForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedWorkType, setSelectedWorkType] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // שינוי צבע הלוגו כשנמצאים בדף הצעת מחיר
  useEffect(() => {
    document.body.classList.add('quote-page-active');
    return () => {
      document.body.classList.remove('quote-page-active');
    };
  }, []);

  const [formData, setFormData] = useState<QuoteFormData>({
    // פרטים אישיים
    personalInfo: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    // פרטי הפרויקט
    projectDetails: {
      workType: 'new-project',
      area: '',
      rooms: '',
      description: '',
      urgency: 'normal', // low, normal, high
      budget: 'medium' // low, medium, high
    },
    // פרטים ספציפיים לפי סוג עבודה
    specificDetails: {}
  });

  const quoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData & { deliveryMethod: string; estimatedPrice: number; createdAt: string }) => {
      const response = await fetch('/api/quotes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'שגיאה ביצירת הצעת המחיר');
      }
      
      return response.json();
    },
    onSuccess: (data: ApiResponse<{ quoteId: string; quoteNumber: string }>) => {
      console.log('Quote created successfully:', data);
      setIsSubmitted(true);
      // מעבר לדף התודה עם פרטי הצעת המחיר
      if (data.data) {
        navigate(`/thank-you?quoteNumber=${data.data.quoteNumber}&deliveryMethod=${deliveryMethod}`);
      }
    },
    onError: (error: Error) => {
      console.error('Error creating quote:', error);
    }
  });

  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      // שליחת הצעת המחיר
      const finalData = {
        ...formData,
        deliveryMethod,
        estimatedPrice: calculateEstimatedPrice(),
        createdAt: new Date().toISOString()
      };
      quoteMutation.mutate(finalData);
    } else {
      setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleWorkTypeSelect = (workTypeId: string) => {
    setSelectedWorkType(workTypeId);
    setFormData((prev: QuoteFormData) => ({
      ...prev,
      projectDetails: {
        ...prev.projectDetails,
        workType: workTypeId as QuoteFormData['projectDetails']['workType']
      }
    }));
  };

  const updateFormData = (section: keyof QuoteFormData, field: string, value: any) => {
    setFormData((prev: QuoteFormData) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // חישוב הצעת מחיר ראשונית
  const calculateEstimatedPrice = () => {
    const { workType, area, rooms, urgency, budget } = formData.projectDetails;
    let basePrice = 0;

    // מחיר בסיס לפי סוג עבודה
    switch (workType) {
      case 'new-project':
        basePrice = parseInt(area) * 8000; // 8000 ₪ למ"ר
        break;
      case 'flooring':
        basePrice = parseInt(area) * 200; // 200 ₪ למ"ר
        break;
      case 'painting':
        basePrice = parseInt(area) * 80; // 80 ₪ למ"ר
        break;
      case 'bathroom':
        basePrice = parseInt(rooms) * 15000; // 15000 ₪ לחדר
        break;
      case 'kitchen':
        basePrice = parseInt(area) * 3000; // 3000 ₪ למ"ר
        break;
      case 'maintenance':
        basePrice = 5000; // מחיר בסיס לתחזוקה
        break;
      default:
        basePrice = 10000;
    }

    // התאמה לפי דחיפות
    const urgencyMultiplier = urgency === 'high' ? 1.3 : urgency === 'low' ? 0.8 : 1;

    // התאמה לפי תקציב
    const budgetMultiplier = budget === 'high' ? 1.5 : budget === 'low' ? 0.7 : 1;

    return Math.round(basePrice * urgencyMultiplier * budgetMultiplier);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom textAlign="center" sx={{ mb: 4 }}>
              פרטים אישיים
            </Typography>
            <Box sx={{ display: 'grid', gap: 3 }}>
              <TextField
                fullWidth
                label="שם מלא"
                value={formData.personalInfo.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('personalInfo', 'name', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="מספר טלפון"
                value={formData.personalInfo.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('personalInfo', 'phone', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="אימייל"
                type="email"
                value={formData.personalInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('personalInfo', 'email', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="כתובת"
                value={formData.personalInfo.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('personalInfo', 'address', e.target.value)}
                required
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom textAlign="center" sx={{ mb: 4 }}>
              בחר את סוג העבודה הנדרשת
            </Typography>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
              gap: 3 
            }}>
              {workTypes.map((workType) => (
                <Card
                  key={workType.id}
                  sx={{
                    cursor: 'pointer',
                    border: selectedWorkType === workType.id ? `2px solid ${workType.color}` : '2px solid transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                  onClick={() => handleWorkTypeSelect(workType.id)}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 2,
                      color: workType.color 
                    }}>
                      <workType.icon size={48} />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {workType.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {workType.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom textAlign="center" sx={{ mb: 4 }}>
              פרטי הפרויקט
            </Typography>
            <Box sx={{ display: 'grid', gap: 3 }}>
              <TextField
                fullWidth
                label="שטח (מ״ר)"
                type="number"
                value={formData.projectDetails.area}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('projectDetails', 'area', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="מספר חדרים"
                type="number"
                value={formData.projectDetails.rooms}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('projectDetails', 'rooms', e.target.value)}
              />
              <TextField
                fullWidth
                label="תיאור הפרויקט"
                multiline
                rows={4}
                value={formData.projectDetails.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('projectDetails', 'description', e.target.value)}
                placeholder="תאר את הפרויקט בפירוט..."
              />
              
              <FormControl fullWidth>
                <InputLabel>דחיפות הפרויקט</InputLabel>
                <Select
                  value={formData.projectDetails.urgency}
                  onChange={(e) => updateFormData('projectDetails', 'urgency', e.target.value)}
                  label="דחיפות הפרויקט"
                >
                  <MenuItem value="low">לא דחוף</MenuItem>
                  <MenuItem value="normal">רגיל</MenuItem>
                  <MenuItem value="high">דחוף מאוד</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>תקציב משוער</InputLabel>
                <Select
                  value={formData.projectDetails.budget}
                  onChange={(e) => updateFormData('projectDetails', 'budget', e.target.value)}
                  label="תקציב משוער"
                >
                  <MenuItem value="low">תקציב נמוך</MenuItem>
                  <MenuItem value="medium">תקציב בינוני</MenuItem>
                  <MenuItem value="high">תקציב גבוה</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        );

      case 3:
        const estimatedPrice = calculateEstimatedPrice();
        return (
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom textAlign="center" sx={{ mb: 4 }}>
              הצעת מחיר ראשונית
            </Typography>
            
            <Paper sx={{ p: 4, mb: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  ₪{estimatedPrice.toLocaleString()}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  הצעת מחיר ראשונית
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>פרטי הפרויקט:</Typography>
                <Box sx={{ display: 'grid', gap: 1 }}>
                  <Typography variant="body2">
                    <strong>סוג עבודה:</strong> {workTypes.find(w => w.id === selectedWorkType)?.title}
                  </Typography>
                  <Typography variant="body2">
                    <strong>שטח:</strong> {formData.projectDetails.area} מ״ר
                  </Typography>
                  <Typography variant="body2">
                    <strong>חדרים:</strong> {formData.projectDetails.rooms}
                  </Typography>
                  <Typography variant="body2">
                    <strong>דחיפות:</strong> {
                      formData.projectDetails.urgency === 'high' ? 'דחוף מאוד' :
                      formData.projectDetails.urgency === 'low' ? 'לא דחוף' : 'רגיל'
                    }
                  </Typography>
                </Box>
              </Box>

              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  זוהי הצעה ראשונית בלבד. המחיר הסופי ייקבע לאחר פגישה ובדיקה מפורטת של הפרויקט.
                </Typography>
              </Alert>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>איך תרצה לקבל את ההצעה?</Typography>
                <RadioGroup
                  value={deliveryMethod}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeliveryMethod(e.target.value)}
                >
                  <FormControlLabel 
                    value="email" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Mail size={20} />
                        <span>אימייל</span>
                      </Box>
                    }
                  />
                  <FormControlLabel 
                    value="whatsapp" 
                    control={<Radio />} 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MessageCircle size={20} />
                        <span>וואטסאפ</span>
                      </Box>
                    }
                  />
                </RadioGroup>
              </Box>
            </Paper>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
            {isSubmitted ? (
              <>
                <CheckCircle size={80} color="#4caf50" style={{ margin: '0 auto 24px' }} />
                <Typography variant="h4" gutterBottom color="success.main">
                  הצעת המחיר נשלחה בהצלחה!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  קיבלנו את הפרטים שלך ונשלח לך הצעת מחיר מפורטת תוך 24 שעות.
                </Typography>
                <Chip 
                  label={`שלח ל${deliveryMethod === 'email' ? 'אימייל' : 'וואטסאפ'}`} 
                  color="primary" 
                  variant="outlined"
                />
              </>
            ) : (
              <CircularProgress />
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return formData.personalInfo.name && formData.personalInfo.phone && 
               formData.personalInfo.email && formData.personalInfo.address;
      case 1:
        return selectedWorkType !== '';
      case 2:
        return formData.projectDetails.area && formData.projectDetails.description;
      case 3:
        return deliveryMethod !== '';
      default:
        return true;
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        הצעת מחיר מפורטת
      </Typography>
      
      <Typography variant="body1" textAlign="center" sx={{ mb: 4 }}>
        מלא את הפרטים וקבל הצעת מחיר ראשונית תוך דקות
      </Typography>

      <Paper sx={{ width: '100%', p: 3 }}>
        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* תוכן השלב */}
        <Box sx={{ minHeight: 400 }}>
          {renderStepContent(activeStep)}
        </Box>

        {/* כפתורי ניווט */}
        {activeStep < steps.length - 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              חזור
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid(activeStep) || quoteMutation.isPending}
              startIcon={quoteMutation.isPending ? <CircularProgress size={20} /> : null}
            >
              {activeStep === steps.length - 2 ? 'שלח הצעת מחיר' : 'המשך'}
            </Button>
          </Box>
        )}

        {quoteMutation.isError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            שגיאה בשליחת הצעת המחיר. אנא נסה שוב.
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default QuoteForm;
