import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Award, Users, Clock, CheckCircle } from 'lucide-react'

const AboutPreview = () => {
  const stats = [
    { icon: Award, value: '15+', label: 'שנות ניסיון' },
    { icon: Users, value: '200+', label: 'לקוחות מרוצים' },
    { icon: Clock, value: '500+', label: 'פרויקטים הושלמו' },
    { icon: CheckCircle, value: '100%', label: 'שביעות רצון' }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              עלינו
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              אנו צוות אדריכלים ומעצבים מקצועיים המתמחים בתכנון ועיצוב בתים יוקרתיים באילת. 
              עם ניסיון של למעלה מ-15 שנה, אנו מתחייבים לספק פתרונות אדריכליים מתקדמים 
              המשולבים עם עיצוב פנים יוקרתי וחדשני.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              הפילוסופיה שלנו מבוססת על שילוב מושלם בין אסתטיקה, פונקציונליות וחדשנות. 
              אנו מאמינים שכל פרויקט הוא ייחודי ודורש גישה מותאמת אישית.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/about"
              className="btn-primary inline-flex items-center space-x-2 space-x-reverse"
            >
              <span>קרא עוד עלינו</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
                alt="צוות אדריכלים"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg"
              >
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">א</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">אדריכלות יוקרה</div>
                    <div className="text-sm text-gray-600">אילת</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary-100 rounded-full opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
