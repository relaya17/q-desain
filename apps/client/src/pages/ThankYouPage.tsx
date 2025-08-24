import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  CheckCircle, 
  Mail, 
  MessageCircle, 
  Phone, 
  Home,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const [quoteData, setQuoteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const quoteNumber = searchParams.get('quoteNumber');
  const deliveryMethod = searchParams.get('deliveryMethod');

  useEffect(() => {
    if (quoteNumber) {
      fetchQuoteData();
    } else {
      setLoading(false);
    }
  }, [quoteNumber]);

  const fetchQuoteData = async () => {
    try {
      const response = await fetch(`/api/quotes/${quoteNumber}`);
      if (response.ok) {
        const data = await response.json();
        setQuoteData(data.quote);
      } else {
        setError('לא ניתן לטעון פרטי הצעת המחיר');
      }
    } catch (err) {
      setError('שגיאה בטעינת פרטי הצעת המחיר');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
        {/* לוגו */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 1
            }}
          >
            IQ Design
          </Typography>
          <Typography variant="h6" color="text.secondary">
            אדריכלות יוקרה
          </Typography>
        </Box>

        {/* אייקון הצלחה */}
        <Box sx={{ mb: 4 }}>
          <CheckCircle 
            size={80} 
            color="#4caf50" 
            style={{ margin: '0 auto' }} 
          />
        </Box>

        {/* כותרת */}
        <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
          תודה על פנייתך!
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
          קיבלנו את הפרטים שלך בהצלחה ונציג שלנו יצור איתך קשר תוך 24 שעות.
        </Typography>

        {/* פרטי הצעת המחיר */}
        {quoteData && (
          <Box sx={{ 
            bgcolor: '#f8f9fa', 
            p: 3, 
            borderRadius: 2, 
            mb: 4,
            border: '2px solid #e3f2fd'
          }}>
            <Typography variant="h6" gutterBottom color="primary">
              פרטי הצעת המחיר
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>מספר הצעה:</strong> {quoteData.quoteNumber}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>סוג עבודה:</strong> {quoteData.projectDetails.workType}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>שטח:</strong> {quoteData.projectDetails.area} מ״ר
            </Typography>
            <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
              הצעה ראשונית: ₪{quoteData.estimatedPrice.toLocaleString()}
            </Typography>
          </Box>
        )}

        {/* שיטת משלוח */}
        {deliveryMethod && (
          <Alert severity="info" sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {deliveryMethod === 'email' ? <Mail size={20} /> : <MessageCircle size={20} />}
              <Typography>
                הצעת המחיר נשלחה ל{deliveryMethod === 'email' ? 'אימייל' : 'וואטסאפ'} שלך
              </Typography>
            </Box>
          </Alert>
        )}

        {/* מידע נוסף */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            מה קורה עכשיו?
          </Typography>
          <Box sx={{ textAlign: 'right', maxWidth: 500, mx: 'auto' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              ✅ נציג מקצועי יבדוק את הפרטים שלך
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              ✅ יצור איתך קשר לקביעת פגישה
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              ✅ יבצע מדידה מקצועית במקום
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              ✅ יגיש לך הצעת מחיר מפורטת ומדויקת
            </Typography>
          </Box>
        </Box>

        {/* פרטי קשר */}
        <Box sx={{ 
          bgcolor: '#e3f2fd', 
          p: 3, 
          borderRadius: 2, 
          mb: 4 
        }}>
          <Typography variant="h6" gutterBottom>
            צור קשר
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Phone size={16} />
              <Typography variant="body2">054-1234567</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                              <Mail size={16} />
              <Typography variant="body2">info@iq-design.co.il</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Home size={16} />
              <Typography variant="body2">www.iq-design.co.il</Typography>
            </Box>
          </Box>
        </Box>

        {/* כפתורים */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<ArrowLeft />}
            sx={{ px: 4, py: 1.5 }}
          >
            חזרה לדף הבית
          </Button>
          
          <Button
            variant="outlined"
            component={Link}
            to="/portfolio"
            sx={{ px: 4, py: 1.5 }}
          >
            צפה בפרויקטים שלנו
          </Button>
        </Box>

        {/* הערה חשובה */}
        <Alert severity="warning" sx={{ mt: 4 }}>
          <Typography variant="body2">
            <strong>חשוב לדעת:</strong> זוהי הצעה ראשונית בלבד. המחיר הסופי ייקבע לאחר פגישה ובדיקה מפורטת של הפרויקט.
          </Typography>
        </Alert>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default ThankYouPage;
