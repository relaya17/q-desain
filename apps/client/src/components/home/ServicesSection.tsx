import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Home, 
  Palette, 
  Hammer, 
  Building, 
  Settings, 
  Users,
  ArrowLeft
} from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'תכנון אדריכלי',
      description: 'תכנון מקיף של מבנים חדשים עם דגש על פונקציונליות, אסתטיקה וחדשנות.',
      icon: Home,
      color: 'primary'
    },
    {
      id: 2,
      title: 'עיצוב פנים',
      description: 'עיצוב חללים פנימיים יוקרתיים המותאמים אישית לכל לקוח ולכל סגנון.',
      icon: Palette,
      color: 'secondary'
    },
    {
      id: 3,
      title: 'שיפוץ והרחבה',
      description: 'שיפוץ מקיף והרחבת מבנים קיימים עם שמירה על איכות ועל עמידה בזמנים.',
      icon: Hammer,
      color: 'accent'
    },
    {
      id: 4,
      title: 'תכנון עירוני',
      description: 'תכנון פרויקטים עירוניים גדולים עם ראייה כוללת של הסביבה והקהילה.',
      icon: Building,
      color: 'primary'
    },
    {
      id: 5,
      title: 'ניהול פרויקטים',
      description: 'ניהול מקצועי של פרויקטים מורכבים משלב התכנון ועד לסיום העבודות.',
      icon: Settings,
      color: 'secondary'
    },
    {
      id: 6,
      title: 'ייעוץ אדריכלי',
      description: 'ייעוץ מקצועי ומותאם אישית לכל שלב בתהליך התכנון והבנייה.',
      icon: Users,
      color: 'accent'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100'
      case 'secondary':
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100'
      case 'accent':
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100'
      default:
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100'
    }
  }

  return (
    <section className="pt-8 pb-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">השירותים שלנו</h2>
          <p className="section-subtitle">
            אנו מתמחים במגוון רחב של שירותי אדריכלות ועיצוב, 
            החל מתכנון מבנים חדשים ועד שיפוץ ועיצוב פנים יוקרתי
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="card group cursor-pointer"
            >
              <div className="flex items-start space-x-4 space-x-reverse mb-4">
                <div className={`p-3 rounded-lg transition-colors duration-200 ${getColorClasses(service.color)}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              
                             <div className="flex items-center justify-center text-white font-medium bg-blue-600 px-4 py-2 rounded-lg group-hover:bg-blue-700 transition-all duration-200 shadow-md">
                 <span className="text-white">למידע נוסף</span>
                 <ArrowLeft className="w-4 h-4 mr-2 text-white group-hover:transform group-hover:-translate-x-1 transition-transform" />
               </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/services"
            className="btn-primary inline-flex items-center space-x-2 space-x-reverse"
          >
            <span>צפה בכל השירותים</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
