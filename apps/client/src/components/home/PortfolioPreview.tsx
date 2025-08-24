import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye } from 'lucide-react'

const PortfolioPreview = () => {
  const projects = [
    {
      id: 1,
      title: 'וילה יוקרתית באילת',
      category: 'תכנון אדריכלי',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'וילה יוקרתית עם נוף לים האדום'
    },
    {
      id: 2,
      title: 'דירה בפרויקט יוקרה',
      category: 'עיצוב פנים',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2001&q=80',
      description: 'עיצוב פנים מודרני ויוקרתי'
    },
    {
      id: 3,
      title: 'שיפוץ בית פרטי',
      category: 'שיפוץ והרחבה',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
      description: 'שיפוץ מקיף עם הרחבה'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">פרויקטים נבחרים</h2>
          <p className="section-subtitle">
            צפה בכמה מהפרויקטים המובילים שלנו הממחישים את האיכות והחדשנות שלנו
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <div className="text-sm text-primary-200 mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-200 mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center text-primary-200">
                      <Eye className="w-4 h-4 mr-2" />
                      <span className="text-sm">צפה בפרויקט</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/portfolio"
            className="btn-primary inline-flex items-center space-x-2 space-x-reverse"
          >
            <span>צפה בכל הפרויקטים</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default PortfolioPreview
