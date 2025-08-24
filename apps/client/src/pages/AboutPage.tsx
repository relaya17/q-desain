import { motion } from 'framer-motion';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Avatar,
  Chip
} from '@mui/material';
import {
  Business,
  LocationOn,
  Star,
  EmojiEvents,
  Group,
  DesignServices,
  Construction
} from '@mui/icons-material';

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  };

  const stats = [
    { number: '150+', label: 'פרויקטים הושלמו', icon: <Construction /> },
    { number: '25+', label: 'שנות ניסיון', icon: <EmojiEvents /> },
    { number: '500+', label: 'לקוחות מרוצים', icon: <Star /> },
    { number: '15+', label: 'צוות מקצועי', icon: <Group /> }
  ];

  const values = [
    {
      title: 'איכות ללא פשרות',
      description: 'אנו מתחייבים לאיכות הגבוהה ביותר בכל פרויקט, עם תשומת לב לפרטים הקטנים ביותר',
      icon: <Star sx={{ color: '#1e3a8a' }} />
    },
    {
      title: 'חדשנות מתמדת',
      description: 'אנו משלבים טכנולוגיות מתקדמות עם עיצוב קלאסי ליצירת חללים ייחודיים',
      icon: <DesignServices sx={{ color: '#1e3a8a' }} />
    },
    {
      title: 'שירות אישי',
      description: 'כל פרויקט מקבל ליווי אישי ומקצועי מהרגע הראשון ועד לסיום המושלם',
      icon: <Business sx={{ color: '#1e3a8a' }} />
    }
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
            על iq-design
          </Typography>
          <Typography variant="h5" className="text-blue-100 max-w-2xl mx-auto">
            מובילים בתחום האדריכלות היוקרתית באילת עם 25+ שנות ניסיון ביצירת חללים ייחודיים ומרהיבים
          </Typography>
        </Container>
      </motion.div>

      <Container maxWidth="lg" className="py-16">
        {/* Story Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" component="h2" className="font-bold text-gray-900 mb-6">
                הסיפור שלנו
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4 leading-relaxed">
                iq-design נוסד בשנת 1998 על ידי האדריכל דוד כהן, עם חזון ליצור אדריכלות יוקרתית 
                שמשלבת עיצוב מודרני עם פונקציונליות מעולה. מאז הקמתה, החברה הפכה לאחד המותגים 
                המובילים בתחום האדריכלות באילת.
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-4 leading-relaxed">
                הצוות שלנו כולל אדריכלים מנוסים, מעצבי פנים מוכשרים ומהנדסים מקצועיים 
                שעובדים יחד כדי להפוך את החלומות שלכם למציאות.
              </Typography>
              <Box className="flex items-center gap-4 mt-6">
                <LocationOn sx={{ color: '#1e3a8a' }} />
                <Typography variant="body1" className="text-gray-700">
                  אילת, ישראל
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                <Box className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <Typography variant="h6" className="font-bold text-gray-900">
                    דוד כהן
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    מייסד ומנכ"ל
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Typography variant="h3" component="h2" className="text-center font-bold text-gray-900 mb-12">
            המספרים מדברים בעד עצמם
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            {stats.map((stat, index) => (
              <Box key={index}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Box className="flex justify-center mb-3">
                      <Avatar sx={{ bgcolor: '#1e3a8a', width: 56, height: 56 }}>
                        {stat.icon}
                      </Avatar>
                    </Box>
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

        {/* Values Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Typography variant="h3" component="h2" className="text-center font-bold text-gray-900 mb-12">
            הערכים שלנו
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {values.map((value, index) => (
              <Box key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <Box className="flex justify-center mb-4">
                      <Avatar sx={{ bgcolor: '#f0f4ff', width: 64, height: 64 }}>
                        {value.icon}
                      </Avatar>
                    </Box>
                    <Typography variant="h5" className="font-bold text-gray-900 mb-3">
                      {value.title}
                    </Typography>
                    <Typography variant="body1" className="text-gray-600 leading-relaxed">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* Team Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" component="h2" className="text-center font-bold text-gray-900 mb-12">
            הצוות שלנו
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            {[
              { name: 'דוד כהן', role: 'מייסד ומנכ"ל', experience: '25+ שנים' },
              { name: 'שרה לוי', role: 'מנהלת עיצוב', experience: '15+ שנים' },
              { name: 'מיכאל רוזן', role: 'אדריכל בכיר', experience: '12+ שנים' },
              { name: 'נועה כהן', role: 'מעצבת פנים', experience: '8+ שנים' }
            ].map((member, index) => (
              <Box key={index}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Avatar 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        bgcolor: '#1e3a8a',
                        mx: 'auto',
                        mb: 2,
                        fontSize: '1.5rem'
                      }}
                    >
                      {member.name.split(' ')[0][0]}
                    </Avatar>
                    <Typography variant="h6" className="font-bold text-gray-900 mb-1">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" className="text-blue-600 mb-2">
                      {member.role}
                    </Typography>
                    <Chip 
                      label={member.experience} 
                      size="small" 
                      sx={{ bgcolor: '#f0f4ff', color: '#1e3a8a' }}
                    />
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </div>
  );
};

export default AboutPage;
