import { LanguageProvider } from './context/LanguageContext'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedCars from './components/FeaturedCars'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-brand-900">
        <Navbar />
        <main>
          <Hero />
          <FeaturedCars />
          <WhyChooseUs />
          <Testimonials />
          <ContactForm />
        </main>
        <Footer />

        {/* Floating WhatsApp button */}
        <a
          href="https://wa.me/14389981746"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white pl-3 pr-4 py-3 rounded-full shadow-lg shadow-black/40 transition-all duration-200 hover:scale-105 group"
        >
          <FaWhatsapp size={22} />
          <span className="text-sm font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
            Chat with us
          </span>
        </a>
      </div>
    </LanguageProvider>
  )
}

export default App
