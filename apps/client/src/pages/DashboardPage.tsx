import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  LinearProgress,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  TrendingUp,
  People,
  Business,
  AttachMoney
} from '@mui/icons-material';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  projects: number;
  totalValue: number;
  lastContact: string;
  priority: string;
}

interface Project {
  id: number;
  name: string;
  customer: string;
  status: string;
  progress: number;
  budget: number;
  startDate: string;
  endDate: string;
  team: string[];
}

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  project: string;
  budget: number;
  createdDate: string;
  priority: string;
}

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    renovationType: '',
    renovationTime: '',
    preferredStartDate: '',
    budget: '',
    description: '',
    urgency: 'medium'
  });

  // פונקציות לטעינת נתונים מהשרת
  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/crm/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.map((customer: any) => ({
          id: customer._id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          status: customer.status,
          projects: customer.projects?.length || 0,
          totalValue: customer.totalSpent || 0,
          lastContact: new Date(customer.updatedAt).toLocaleDateString('he-IL'),
          priority: customer.priority
        })));
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('שגיאה בטעינת לקוחות');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/crm/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.map((project: any) => ({
          id: project._id,
          name: project.name,
          customer: project.customer?.name || 'לא ידוע',
          status: project.status,
          progress: project.progress || 0,
          budget: project.budget?.total || 0,
          startDate: new Date(project.timeline?.startDate).toLocaleDateString('he-IL'),
          endDate: project.timeline?.endDate ? new Date(project.timeline.endDate).toLocaleDateString('he-IL') : 'לא נקבע',
          team: project.team || []
        })));
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('שגיאה בטעינת פרויקטים');
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/crm/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.map((lead: any) => ({
          id: lead._id,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          source: lead.source,
          status: lead.status,
          project: lead.project?.type || 'לא צוין',
          budget: lead.project?.budget?.max || 0,
          createdDate: new Date(lead.createdAt).toLocaleDateString('he-IL'),
          priority: lead.priority
        })));
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      setError('שגיאה בטעינת לידים');
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    setError('');
    try {
      await Promise.all([
        fetchCustomers(),
        fetchProjects(), 
        fetchLeads()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('שגיאה בטעינת נתונים');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const stats = [
    {
      title: 'לקוחות פעילים',
      value: customers.filter(c => c.status === 'active').length,
      total: customers.length,
      icon: <People />,
      color: '#059669' // ירוק כהה
    },
    {
      title: 'פרויקטים פעילים',
      value: projects.filter(p => p.status === 'in_progress').length,
      total: projects.length,
      icon: <Business />,
      color: '#dc2626' // אדום
    },
    {
      title: 'לידים חדשים',
      value: leads.filter(l => l.status === 'new').length,
      total: leads.length,
      icon: <TrendingUp />,
      color: '#ea580c' // כתום
    },
    {
      title: 'הכנסות השנה',
      value: '₪2,450,000',
      total: '₪3,000,000',
      icon: <AttachMoney />,
      color: '#7c3aed' // סגול
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'high':
        return '#059669';
      case 'in_progress':
      case 'contacted':
      case 'medium':
        return '#dc2626';
      case 'planning':
      case 'new':
        return '#ea580c';
      case 'inactive':
      case 'low':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'פעיל';
      case 'inactive': return 'לא פעיל';
      case 'in_progress': return 'בביצוע';
      case 'planning': return 'בתכנון';
      case 'completed': return 'הושלם';
      case 'new': return 'חדש';
      case 'contacted': return 'נוצר קשר';
      case 'high': return 'גבוה';
      case 'medium': return 'בינוני';
      case 'low': return 'נמוך';
      default: return status;
    }
  };

  const handleTabChange = (_event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAdd = (type: string) => {
    setDialogType(type);
    setSelectedItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: any, type: string) => {
    setDialogType(type);
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number, type: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) {
      switch (type) {
        case 'customer':
          setCustomers(customers.filter(c => c.id !== id));
          break;
        case 'project':
          setProjects(projects.filter(p => p.id !== id));
          break;
        case 'lead':
          setLeads(leads.filter(l => l.id !== id));
          break;
      }
    }
  };

  const handleQuoteSubmit = async () => {
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
          company: '',
          source: 'website',
          status: 'new',
          priority: quoteForm.urgency,
          project: {
            type: quoteForm.renovationType,
            description: quoteForm.description,
            budget: {
              min: parseInt(quoteForm.budget) || 0,
              max: parseInt(quoteForm.budget) * 1.2 || 0
            },
            timeline: {
              startDate: quoteForm.preferredStartDate,
              endDate: null
            },
            location: {
              address: quoteForm.address,
              city: 'אילת'
            }
          },
          notes: [{
            content: `סוג שיפוץ: ${quoteForm.renovationType}\nזמן שיפוץ: ${quoteForm.renovationTime}\nתקציב: ${quoteForm.budget} ₪\nתיאור: ${quoteForm.description}`
          }]
        })
      });

      if (response.ok) {
        alert('הצעת המחיר נשלחה בהצלחה! נציג יצור איתך קשר בקרוב.');
        setQuoteForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          renovationType: '',
          renovationTime: '',
          preferredStartDate: '',
          budget: '',
          description: '',
          urgency: 'medium'
        });
        // רענון רשימת הלידים
        await fetchLeads();
      } else {
        alert('שגיאה בשליחת הצעת המחיר. אנא נסה שוב.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('שגיאה בשליחת הצעת המחיר. אנא נסה שוב.');
    }
  };

  const renderQuoteForm = () => (
    <Card className="mb-6">
      <CardContent className="p-6">
        <Typography variant="h5" className="font-bold mb-4 text-center">
          הצעת מחיר מותאמת אישית
        </Typography>
        <Typography variant="body1" className="text-gray-600 mb-6 text-center">
          מלאו את הפרטים ונחזור אליכם עם הצעת מחיר מדויקת
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <TextField
              fullWidth
              label="שם מלא *"
              value={quoteForm.name}
              onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
              required
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="אימייל *"
              type="email"
              value={quoteForm.email}
              onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
              required
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="מספר טלפון *"
              value={quoteForm.phone}
              onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
              required
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="כתובת הפרויקט *"
              value={quoteForm.address}
              onChange={(e) => setQuoteForm({...quoteForm, address: e.target.value})}
              required
            />
          </Box>
          <Box>
            <FormControl fullWidth required>
              <InputLabel>סוג השיפוץ *</InputLabel>
              <Select
                value={quoteForm.renovationType}
                onChange={(e) => setQuoteForm({...quoteForm, renovationType: e.target.value})}
                label="סוג השיפוץ *"
              >
                <MenuItem value="residential">דירה פרטית</MenuItem>
                <MenuItem value="villa">וילה</MenuItem>
                <MenuItem value="apartment">דירה בבניין</MenuItem>
                <MenuItem value="commercial">מסחרי</MenuItem>
                <MenuItem value="hotel">מלון/בית הארחה</MenuItem>
                <MenuItem value="office">משרד</MenuItem>
                <MenuItem value="other">אחר</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth required>
              <InputLabel>זמן השיפוץ *</InputLabel>
              <Select
                value={quoteForm.renovationTime}
                onChange={(e) => setQuoteForm({...quoteForm, renovationTime: e.target.value})}
                label="זמן השיפוץ *"
              >
                <MenuItem value="urgent">דחוף - תוך חודש</MenuItem>
                <MenuItem value="soon">בקרוב - תוך 3 חודשים</MenuItem>
                <MenuItem value="flexible">גמיש - תוך 6 חודשים</MenuItem>
                <MenuItem value="future">עתידי - מעל 6 חודשים</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <TextField
              fullWidth
              label="תקציב משוער (₪)"
              type="number"
              value={quoteForm.budget}
              onChange={(e) => setQuoteForm({...quoteForm, budget: e.target.value})}
              placeholder="לדוגמה: 500000"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="תאריך התחלה מועדף"
              type="date"
              value={quoteForm.preferredStartDate}
              onChange={(e) => setQuoteForm({...quoteForm, preferredStartDate: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }}>
            <TextField
              fullWidth
              label="תיאור הפרויקט"
              multiline
              rows={4}
              value={quoteForm.description}
              onChange={(e) => setQuoteForm({...quoteForm, description: e.target.value})}
              placeholder="תארו את הפרויקט, הדרישות המיוחדות, הסגנון המועדף וכו'"
            />
          </Box>
          <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }}>
            <FormControl fullWidth>
              <InputLabel>דחיפות</InputLabel>
              <Select
                value={quoteForm.urgency}
                onChange={(e) => setQuoteForm({...quoteForm, urgency: e.target.value})}
                label="דחיפות"
              >
                <MenuItem value="low">נמוכה</MenuItem>
                <MenuItem value="medium">בינונית</MenuItem>
                <MenuItem value="high">גבוהה</MenuItem>
                <MenuItem value="urgent">דחופה מאוד</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className="mt-6 text-center">
          <Button
            variant="contained"
            size="large"
            onClick={handleQuoteSubmit}
            sx={{ 
              bgcolor: '#059669',
              '&:hover': { bgcolor: '#047857' }
            }}
            disabled={!quoteForm.name || !quoteForm.email || !quoteForm.phone}
          >
            שלח הצעת מחיר
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const renderCustomersTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>לקוח</TableCell>
            <TableCell>אימייל</TableCell>
            <TableCell>טלפון</TableCell>
            <TableCell>סטטוס</TableCell>
            <TableCell>פרויקטים</TableCell>
            <TableCell>ערך כולל</TableCell>
            <TableCell>קשר אחרון</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <Box className="flex items-center gap-3">
                  <Avatar>{customer.name[0]}</Avatar>
                  <Box>
                    <Typography variant="body1" className="font-medium">
                      {customer.name}
                    </Typography>
                    <Chip 
                      label={getStatusText(customer.priority)} 
                      size="small"
                      sx={{ bgcolor: getStatusColor(customer.priority), color: 'white' }}
                    />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>
                <Chip 
                  label={getStatusText(customer.status)} 
                  size="small"
                  sx={{ bgcolor: getStatusColor(customer.status), color: 'white' }}
                />
              </TableCell>
              <TableCell>{customer.projects}</TableCell>
              <TableCell>₪{customer.totalValue.toLocaleString()}</TableCell>
              <TableCell>{customer.lastContact}</TableCell>
              <TableCell>
                <Box className="flex gap-1">
                  <IconButton size="small" onClick={() => handleEdit(customer, 'customer')}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(customer.id, 'customer')}>
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderProjectsTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>פרויקט</TableCell>
            <TableCell>לקוח</TableCell>
            <TableCell>סטטוס</TableCell>
            <TableCell>התקדמות</TableCell>
            <TableCell>תקציב</TableCell>
            <TableCell>תאריכים</TableCell>
            <TableCell>צוות</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <Typography variant="body1" className="font-medium">
                  {project.name}
                </Typography>
              </TableCell>
              <TableCell>{project.customer}</TableCell>
              <TableCell>
                <Chip 
                  label={getStatusText(project.status)} 
                  size="small"
                  sx={{ bgcolor: getStatusColor(project.status), color: 'white' }}
                />
              </TableCell>
              <TableCell>
                <Box className="w-24">
                  <LinearProgress 
                    variant="determinate" 
                    value={project.progress} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption">{project.progress}%</Typography>
                </Box>
              </TableCell>
              <TableCell>₪{project.budget.toLocaleString()}</TableCell>
              <TableCell>
                <Typography variant="body2">
                  {project.startDate} - {project.endDate}
                </Typography>
              </TableCell>
              <TableCell>
                <Box className="flex gap-1">
                  {project.team.map((member, index) => (
                    <Avatar key={index} sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                      {member[0]}
                    </Avatar>
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex gap-1">
                  <IconButton size="small" onClick={() => handleEdit(project, 'project')}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(project.id, 'project')}>
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderLeadsTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ליד</TableCell>
            <TableCell>אימייל</TableCell>
            <TableCell>טלפון</TableCell>
            <TableCell>מקור</TableCell>
            <TableCell>סטטוס</TableCell>
            <TableCell>פרויקט</TableCell>
            <TableCell>תקציב</TableCell>
            <TableCell>תאריך יצירה</TableCell>
            <TableCell>פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <Box className="flex items-center gap-3">
                  <Avatar>{lead.name[0]}</Avatar>
                  <Box>
                    <Typography variant="body1" className="font-medium">
                      {lead.name}
                    </Typography>
                    <Chip 
                      label={getStatusText(lead.priority)} 
                      size="small"
                      sx={{ bgcolor: getStatusColor(lead.priority), color: 'white' }}
                    />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell>
                <Chip 
                  label={getStatusText(lead.status)} 
                  size="small"
                  sx={{ bgcolor: getStatusColor(lead.status), color: 'white' }}
                />
              </TableCell>
              <TableCell>{lead.project}</TableCell>
              <TableCell>₪{lead.budget.toLocaleString()}</TableCell>
              <TableCell>{lead.createdDate}</TableCell>
              <TableCell>
                <Box className="flex gap-1">
                  <IconButton size="small" onClick={() => handleEdit(lead, 'lead')}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(lead.id, 'lead')}>
                    <Delete />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Container maxWidth="xl" className="py-8">
        {/* Header */}
        <Box className="mb-8">
          <Typography variant="h3" className="font-bold text-gray-900 mb-2">
            דשבורד CRM
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            ניהול לקוחות, פרויקטים ולידים
          </Typography>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert severity="error" className="mb-6" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Loading Indicator */}
        {loading && (
          <Box className="flex justify-center items-center py-8">
            <CircularProgress />
            <Typography variant="body1" className="ml-4">
              טוען נתונים...
            </Typography>
          </Box>
        )}

        {/* Stats Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }} className="mb-8">
          {stats.map((stat, index) => (
            <Box key={index}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <Box className="flex items-center justify-between">
                    <Box>
                      <Typography variant="h4" className="font-bold text-gray-900">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {stat.title}
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        bgcolor: stat.color, 
                        color: 'white',
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Quote Form */}
        {renderQuoteForm()}

        {/* Tabs */}
        <Card className="mb-6">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="לקוחות" />
              <Tab label="פרויקטים" />
              <Tab label="לידים" />
            </Tabs>
          </Box>
        </Card>

        {/* Content */}
        <Card>
          <CardContent className="p-6">
            <Box className="flex justify-between items-center mb-4">
              <Typography variant="h5" className="font-bold">
                {activeTab === 0 ? 'לקוחות' : activeTab === 1 ? 'פרויקטים' : 'לידים'}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleAdd(activeTab === 0 ? 'customer' : activeTab === 1 ? 'project' : 'lead')}
                sx={{ bgcolor: '#059669' }}
              >
                הוסף {activeTab === 0 ? 'לקוח' : activeTab === 1 ? 'פרויקט' : 'ליד'}
              </Button>
            </Box>

            {activeTab === 0 && renderCustomersTable()}
            {activeTab === 1 && renderProjectsTable()}
            {activeTab === 2 && renderLeadsTable()}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedItem ? 'ערוך' : 'הוסף'} {dialogType === 'customer' ? 'לקוח' : dialogType === 'project' ? 'פרויקט' : 'ליד'}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" className="text-gray-600 mb-4">
              טופס זה יפותח בהמשך עם ולידציה מלאה ושליחה לשרת
            </Typography>
            <Alert severity="info">
              זוהי גרסה ראשונית של הדשבורד. הפונקציונליות המלאה תתווסף בהמשך.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>ביטול</Button>
            <Button variant="contained" onClick={() => setIsDialogOpen(false)}>
              שמור
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default DashboardPage;
