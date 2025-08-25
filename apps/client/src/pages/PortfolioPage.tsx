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
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import SEO from '../components/common/SEO';
import {
  Close,
  LocationOn,
  CalendarToday,
  SquareFoot,
  ArrowForward
} from '@mui/icons-material';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  description: string;
  image: string;
  details: {
    client: string;
    duration: string;
    services: string[];
    features: string[];
  };
}

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <SEO 
        title="פורטפוליו פרויקטים - iq-design אילת"
        description="פורטפוליו מגוון של פרויקטי אדריכלות באילת: בתים פרטיים, מלונות, מרכזים מסחריים ועיצוב פנים. דוגמאות לעבודות מקצועיות ואיכותיות"
        image="https://iq-design.netlify.app/og-image.jpg"
      />

  const categories = [
    { value: 'all', label: 'הכל' },
    { value: 'residential', label: 'מגורים' },
    { value: 'commercial', label: 'מסחרי' },
    { value: 'hotels', label: 'מלונות' },
    { value: 'interior', label: 'עיצוב פנים' }
  ];

  const projects = [
    {
      id: 1,
      title: 'וילה יוקרתית - חוף אלמוג',
      category: 'residential',
      location: 'אילת, חוף אלמוג',
      year: '2023',
      area: '450 מ״ר',
      description: 'וילה יוקרתית עם נוף לים האדום, עיצוב מודרני המשולב עם אלמנטים טבעיים',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      details: {
        client: 'משפחת כהן',
        duration: '18 חודשים',
        services: ['אדריכלות', 'עיצוב פנים', 'ניהול פרויקט'],
        features: ['בריכה פרטית', 'מרפסת נוף', 'מטבח יוקרתי', 'סלון כפול']
      }
    },
    {
      id: 2,
      title: 'מלון בוטיק - הרי אילת',
      category: 'hotels',
      location: 'אילת, הרי אילת',
      year: '2023',
      area: '2,500 מ״ר',
      description: 'מלון בוטיק יוקרתי עם 25 חדרים, עיצוב מינימליסטי עם נוף להרים',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      details: {
        client: 'רשת מלונות יוקרה',
        duration: '24 חודשים',
        services: ['אדריכלות', 'עיצוב פנים', 'ניהול פרויקט'],
        features: ['בריכה אינפיניטי', 'מסעדה יוקרתית', 'ספא', 'חדרי סוויטה']
      }
    },
    {
      id: 3,
      title: 'מרכז מסחרי - מרכז העיר',
      category: 'commercial',
      location: 'אילת, מרכז העיר',
      year: '2022',
      area: '5,000 מ״ר',
      description: 'מרכז מסחרי מודרני עם 50 חנויות, עיצוב פתוח ומזמין',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      details: {
        client: 'קבוצת נדל״ן אילת',
        duration: '30 חודשים',
        services: ['אדריכלות', 'תכנון עירוני', 'ניהול פרויקט'],
        features: ['חניה תת קרקעית', 'מרחב ציבורי', 'מערכת מיזוג מתקדמת']
      }
    },
    {
      id: 4,
      title: 'דירה יוקרתית - מגדל הים',
      category: 'residential',
      location: 'אילת, מגדל הים',
      year: '2022',
      area: '180 מ״ר',
      description: 'דירה יוקרתית עם נוף פנורמי לים, עיצוב מינימליסטי ואלגנטי',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      details: {
        client: 'משפחת לוי',
        duration: '8 חודשים',
        services: ['עיצוב פנים', 'שיפוץ'],
        features: ['מרפסת נוף', 'מטבח פתוח', 'חדר עבודה', 'מערכת חכם']
      }
    },
    {
      id: 5,
      title: 'מסעדה יוקרתית - נמל אילת',
      category: 'commercial',
      location: 'אילת, נמל אילת',
      year: '2022',
      area: '800 מ״ר',
      description: 'מסעדה יוקרתית עם נוף לים, עיצוב ים תיכוני מודרני',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      details: {
        client: 'שף דוד אברהם',
        duration: '12 חודשים',
        services: ['אדריכלות', 'עיצוב פנים', 'ניהול פרויקט'],
        features: ['מרפסת ים', 'מטבח פתוח', 'בר יין', 'חדר פרטי']
      }
    },
    {
      id: 6,
      title: 'נטהאוס - מגדל השמש',
      category: 'residential',
      location: 'אילת, מגדל השמש',
      year: '2021',
      area: '300 מ״ר',
      description: 'נטהאוס יוקרתי עם גגון פרטי, עיצוב מודרני עם אלמנטים טבעיים',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      details: {
        client: 'משפחת רוזן',
        duration: '14 חודשים',
        services: ['אדריכלות', 'עיצוב פנים', 'ניהול פרויקט'],
        features: ['גגון פרטי', 'בריכה קטנה', 'מטבח יוקרתי', 'מעלית פרטית']
      }
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleCategoryChange = (_event: any, newValue: any) => {
    setSelectedCategory(newValue);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
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
            תיק עבודות
          </Typography>
          <Typography variant="h5" className="text-blue-100 max-w-2xl mx-auto">
            גלריית הפרויקטים שלנו - יצירות אדריכלות יוקרתיות באילת
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
                <Tab key={category.value} value={category.value} label={category.label} />
              ))}
            </Tabs>
          </Box>
        </motion.div>

        {/* Projects Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <Box key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleProjectClick(project)}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={project.image}
                      alt={project.title}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <CardContent className="p-6">
                      <Typography variant="h6" className="font-bold text-gray-900 mb-2">
                        {project.title}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 mb-4">
                        {project.description}
                      </Typography>
                      
                      <Box className="flex flex-wrap gap-2 mb-4">
                        <Chip 
                          icon={<LocationOn />} 
                          label={project.location} 
                          size="small"
                          sx={{ bgcolor: '#f0f4ff', color: '#1e3a8a' }}
                        />
                        <Chip 
                          icon={<CalendarToday />} 
                          label={project.year} 
                          size="small"
                          sx={{ bgcolor: '#f0f4ff', color: '#1e3a8a' }}
                        />
                        <Chip 
                          icon={<SquareFoot />} 
                          label={project.area} 
                          size="small"
                          sx={{ bgcolor: '#f0f4ff', color: '#1e3a8a' }}
                        />
                      </Box>

                      <Button 
                        variant="outlined" 
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
                        פרטים נוספים
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </AnimatePresence>
        </Box>
      </Container>

      {/* Project Details Dialog */}
      <Dialog 
        open={!!selectedProject} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedProject && (
          <DialogContent className="p-0">
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.7)'
                }
              }}
            >
              <Close />
            </IconButton>
            
            <Box className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <Box className="absolute bottom-6 right-6 text-white">
                <Typography variant="h4" className="font-bold mb-2">
                  {selectedProject.title}
                </Typography>
                <Typography variant="body1">
                  {selectedProject.location} • {selectedProject.year}
                </Typography>
              </Box>
            </Box>

            <Box className="p-6">
              <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed">
                {selectedProject.description}
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                <Box>
                  <Typography variant="h6" className="font-bold text-gray-900 mb-3">
                    פרטי הפרויקט
                  </Typography>
                  <Box className="space-y-2">
                    <Box className="flex justify-between">
                      <Typography variant="body2" className="text-gray-600">לקוח:</Typography>
                      <Typography variant="body2" className="font-medium">{selectedProject.details.client}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography variant="body2" className="text-gray-600">משך הפרויקט:</Typography>
                      <Typography variant="body2" className="font-medium">{selectedProject.details.duration}</Typography>
                    </Box>
                    <Box className="flex justify-between">
                      <Typography variant="body2" className="text-gray-600">שטח:</Typography>
                      <Typography variant="body2" className="font-medium">{selectedProject.area}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="h6" className="font-bold text-gray-900 mb-3">
                    שירותים שניתנו
                  </Typography>
                  <Box className="flex flex-wrap gap-2">
                    {selectedProject.details.services.map((service: string, index: number) => (
                      <Chip 
                        key={index}
                        label={service} 
                        size="small"
                        sx={{ bgcolor: '#1e3a8a', color: 'white' }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }}>
                  <Typography variant="h6" className="font-bold text-gray-900 mb-3">
                    תכונות מיוחדות
                  </Typography>
                  <Box className="flex flex-wrap gap-2">
                    {selectedProject.details.features.map((feature: string, index: number) => (
                      <Chip 
                        key={index}
                        label={feature} 
                        variant="outlined"
                        size="small"
                        sx={{ borderColor: '#1e3a8a', color: '#1e3a8a' }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </div>
    </>
  );
};

export default PortfolioPage;
