import { motion } from 'framer-motion'
import { Award, Users, Clock, CheckCircle } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: Award,
      value: '15+',
      label: 'שנות ניסיון',
      description: 'בתחום האדריכלות'
    },
    {
      icon: Users,
      value: '200+',
      label: 'לקוחות מרוצים',
      description: 'שבחרו בנו'
    },
    {
      icon: Clock,
      value: '500+',
      label: 'פרויקטים הושלמו',
      description: 'בהצלחה'
    },
    {
      icon: CheckCircle,
      value: '100%',
      label: 'שביעות רצון',
      description: 'מהלקוחות'
    }
  ]

  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            המספרים מדברים בעד עצמם
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            שנים של ניסיון, מאות פרויקטים מוצלחים ואלפי לקוחות מרוצים
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-primary-100">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
