import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { useT } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useT()
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/60 to-brand-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36 w-full">
        <div className="max-w-2xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-5 border border-gold-500/30 px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            {t.hero.tag}
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-white leading-none mb-6 tracking-tight">
            {t.hero.headline1}
            <span className="block text-gold-500 italic">{t.hero.headline2}</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-white/80 font-normal mt-1">
              {t.hero.headline3}
            </span>
          </h1>

          <p className="text-white/65 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#inventory" className="btn-primary !text-sm !px-8 !py-4">
              {t.hero.cta1} <FiArrowRight />
            </a>
            <a href="#contact" className="btn-outline !text-sm !px-8 !py-4">
              {t.hero.cta2}
            </a>
          </div>

          {/* Stat strip */}
          <div className="mt-14 flex flex-wrap gap-10 pt-10 border-t border-white/10">
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-bold text-gold-500">
                  {stat.value}
                </div>
                <div className="text-white/45 text-xs mt-0.5 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#inventory"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-gold-500 transition-colors animate-bounce"
        aria-label="Scroll to inventory"
      >
        <FiChevronDown size={30} />
      </a>
    </section>
  )
}
