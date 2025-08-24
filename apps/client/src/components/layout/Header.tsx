import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '../common/Logo'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'בית', href: '/' },
    { name: 'אודות', href: '/about' },
    { name: 'תיק עבודות', href: '/portfolio' },
    { name: 'שירותים', href: '/services' },
    { name: 'המלצות', href: '/testimonials' },
    { name: 'בלוג', href: '/blog' },
    { name: 'הצעת מחיר', href: '/quote' },
    { name: 'צור קשר', href: '/contact' },
    { name: 'דשבורד', href: '/dashboard' }, // Added dashboard link
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

    return (
    <>
      <a href="#main-content" className="skip-link">
        קפוץ לתוכן הראשי
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-black/20 backdrop-blur-sm shadow-lg'
        }`}
      >
      {/* Main Navigation */}
      <nav className="py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <Logo size="md" className="shadow-lg header-logo" />
              <div>
                                 <h1 className={`text-xl font-bold tracking-wide font-logo header-title ${isScrolled ? 'text-primary-600' : 'text-white'}`}>iq-design</h1>
                 <p className={`text-sm font-medium header-subtitle ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>אדריכלות יוקרה</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 space-x-reverse header-nav">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                                     className={`font-medium transition-colors duration-200 ${
                     location.pathname === item.href
                       ? isScrolled ? 'text-primary-600' : 'text-white'
                       : isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-gray-200 hover:text-white'
                   }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="btn-primary"
              >
                פגישה חינם
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
                         className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="btn-primary text-center"
                >
                  פגישה חינם
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
};

export default Header
