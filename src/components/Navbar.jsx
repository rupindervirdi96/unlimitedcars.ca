import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'
import { MdDirectionsCar } from 'react-icons/md'
import { useT } from '../context/LanguageContext'

export default function Navbar() {
  const { lang, setLang, t } = useT()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = t.navbar.links.map((label, i) => ({
    label,
    href: t.navbar.hrefs[i],
  }))

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-900/95 backdrop-blur-md shadow-lg shadow-black/40 py-0'
          : 'bg-transparent py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <MdDirectionsCar className="text-gold-500 text-3xl group-hover:scale-110 transition-transform" />
            <span className="font-display text-xl font-bold text-white">
              Unlimited<span className="text-gold-500">Cars</span><span className="text-white/40 text-sm font-sans">.ca</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-gold-500 transition-colors font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Language Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language toggle */}
            <div className="flex items-center rounded-sm overflow-hidden border border-white/20">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold tracking-widest transition-colors ${
                  lang === 'en'
                    ? 'bg-gold-500 text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-2.5 py-1 text-xs font-bold tracking-widest transition-colors ${
                  lang === 'fr'
                    ? 'bg-gold-500 text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                FR
              </button>
            </div>

            <a
              href="tel:+14389981746"
              className="flex items-center gap-1.5 text-white/60 hover:text-gold-500 transition-colors text-sm"
            >
              <FiPhone className="text-gold-500" size={14} />
              <span>(438) 998-1746</span>
            </a>
            <a href="#contact" className="btn-primary !py-2 !text-xs">
              {t.navbar.cta}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2 hover:text-gold-500 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-brand-800 border-t border-white/10 shadow-2xl">
          <div className="px-5 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/70 hover:text-gold-500 transition-colors font-medium py-3 border-b border-white/5 last:border-0"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile language toggle */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setLang('en')}
                className={`flex-1 py-2 text-xs font-bold tracking-widest rounded-sm transition-colors ${
                  lang === 'en'
                    ? 'bg-gold-500 text-black'
                    : 'border border-white/20 text-white/50'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`flex-1 py-2 text-xs font-bold tracking-widest rounded-sm transition-colors ${
                  lang === 'fr'
                    ? 'bg-gold-500 text-black'
                    : 'border border-white/20 text-white/50'
                }`}
              >
                Français
              </button>
            </div>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary justify-center mt-2"
            >
              {t.navbar.cta}
            </a>
            <a
              href="tel:+14389981746"
              className="flex items-center justify-center gap-2 text-white/50 text-sm mt-2"
            >
              <FiPhone size={14} className="text-gold-500" />
              (555) 123-4567
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
