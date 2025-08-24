
import HeroSlider from '../components/home/HeroSlider'
import ServicesSection from '../components/home/ServicesSection'
import AboutPreview from '../components/home/AboutPreview'
import PortfolioPreview from '../components/home/PortfolioPreview'
import TestimonialsSection from '../components/home/TestimonialsSection'
import StatsSection from '../components/home/StatsSection'
import ContactCTA from '../components/home/ContactCTA'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider />

      {/* Services Section */}
      <ServicesSection />

      {/* About Preview */}
      <AboutPreview />

      {/* Stats Section */}
      <StatsSection />

      {/* Portfolio Preview */}
      <PortfolioPreview />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  )
}

export default HomePage
