import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Button, 
  IconButton, 
  Box, 
  Typography, 
  Container,
  Fab
} from "@mui/material";
import { 
  PlayArrow, 
  Pause,
  NavigateNext,
  NavigateBefore
} from "@mui/icons-material";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "אדריכלות יוקרה באילת",
      subtitle: "תכנון ועיצוב בתים יוקרתיים עם נוף לים האדום",
      description:
        "מתמחים בתכנון אדריכלי מתקדם ועיצוב פנים יוקרתי. שילוב מושלם בין אסתטיקה, פונקציונליות וחדשנות.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2070&q=80",
      cta: "צפה בפרויקטים שלנו",
      ctaLink: "/portfolio",
    },
    {
      id: 2,
      title: "עיצוב פנים יוקרתי",
      subtitle: "יצירת חללים מרהיבים ופונקציונליים",
      description:
        "צוות מקצועי של מעצבי פנים המתמחים בעיצוב יוקרתי המותאם אישית לכל לקוח ולכל חלל.",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2001&q=80",
      cta: "למד על השירותים שלנו",
      ctaLink: "/services",
    },
    {
      id: 3,
      title: "שיפוץ והרחבה",
      subtitle: "הפיכת החלום למציאות",
      description:
        "שיפוץ והרחבת בתים קיימים עם תשומת לב לפרטים הקטנים ביותר ואיכות עבודה מעולה.",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2053&q=80",
      cta: "צור קשר עכשיו",
      ctaLink: "/contact",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0
      }}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2.5rem', md: '4rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {slides[currentSlide].title}
            </Typography>
            
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 3,
                color: 'primary.light',
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {slides[currentSlide].subtitle}
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: 'grey.200',
                fontSize: { xs: '1rem', md: '1.25rem' },
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              {slides[currentSlide].description}
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button
                component={Link}
                to={slides[currentSlide].ctaLink}
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {slides[currentSlide].cta}
              </Button>
              
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'grey.900',
                    borderColor: 'white'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                פגישה חינם
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* Navigation Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          zIndex: 3
        }}
      >
        {/* Play/Pause Button */}
        <Fab
          size="small"
          onClick={() => setIsPlaying(!isPlaying)}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </Fab>

        {/* Dots */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {slides.map((_, index) => (
            <IconButton
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: 12,
                height: 12,
                p: 0,
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.75)'
                },
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Arrow Navigation */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          },
          zIndex: 3
        }}
      >
        <NavigateBefore />
      </IconButton>
      
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          },
          zIndex: 3
        }}
      >
        <NavigateNext />
      </IconButton>
    </Box>
  );
};

export default HeroSlider;

