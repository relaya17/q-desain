import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, Mail, ArrowLeft } from 'lucide-react'

const ContactCTA = () => {
  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              מוכנים להתחיל את הפרויקט שלכם?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              צרו קשר עכשיו לקביעת פגישה חינם וקבלת הצעת מחיר מותאמת אישית לפרויקט שלכם
            </p>

            {/* Contact Info */}
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 md:space-x-reverse mb-8">
              <div className="flex items-center space-x-3 space-x-reverse text-white">
                <Phone className="w-6 h-6" />
                <span className="text-lg">08-1234567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-white">
                <Mail className="w-6 h-6" />
                <span className="text-lg">info@eilat-arch.com</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <Link
                to="/contact"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center space-x-2 space-x-reverse"
              >
                <span>צור קשר עכשיו</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center space-x-2 space-x-reverse"
              >
                <span>צפה בפרויקטים</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-primary-100">
              <p className="text-lg mb-4">
                פגישה חינם • הצעת מחיר ללא התחייבות • ליווי מקצועי מלא
              </p>
              <p className="text-sm opacity-80">
                שעות פעילות: א-ה 09:00-18:00 | ו' 09:00-13:00
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
