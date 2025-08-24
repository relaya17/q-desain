import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Clock,
  ArrowUp
} from 'lucide-react'
import Logo from '../common/Logo'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Contact Info Bar */}
      <div className="bg-primary-900 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-6 space-x-reverse text-sm">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-4 h-4" />
                <span>08-1234567</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-4 h-4" />
                <span>info@eilat-arch.com</span>
              </div>
            </div>
            <div className="text-sm">
              שעות פעילות: א-ה 09:00-18:00
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <Logo size="sm" className="shadow-lg" />
              <div>
                <h3 className="text-xl font-bold text-primary-400 tracking-wide font-logo">iq-design</h3>
                <p className="text-gray-400 font-medium">אדריכלות יוקרה</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              מתמחים בתכנון ועיצוב בתים יוקרתיים באילת. 
              שילוב מושלם בין אסתטיקה, פונקציונליות וחדשנות.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">
                  אודות
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-primary-400 transition-colors">
                  תיק עבודות
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-400 transition-colors">
                  שירותים
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-primary-400 transition-colors">
                  המלצות
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors">
                  בלוג
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">השירותים שלנו</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">תכנון אדריכלי</li>
              <li className="text-gray-300">עיצוב פנים</li>
              <li className="text-gray-300">שיפוץ והרחבה</li>
              <li className="text-gray-300">תכנון עירוני</li>
              <li className="text-gray-300">ניהול פרויקטים</li>
              <li className="text-gray-300">ייעוץ אדריכלי</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">צור קשר</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">08-1234567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">info@eilat-arch.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">רחוב הים 123, אילת</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Clock className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">א-ה 09:00-18:00</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} אדריכלות יוקרה אילת. כל הזכויות שמורות.
            </div>
            <div className="flex items-center space-x-6 space-x-reverse text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                מדיניות פרטיות
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                תנאי שימוש
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 space-x-reverse text-primary-400 hover:text-primary-300 transition-colors"
              >
                <span>חזרה למעלה</span>
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
