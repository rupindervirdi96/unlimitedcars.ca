import { MdFormatQuote, MdStar } from 'react-icons/md'
import { useT } from '../context/LanguageContext'

export default function Testimonials() {
  const { t } = useT()
  return (
    <section id="testimonials" className="py-24 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
            {t.testimonials.tag}
          </span>
          <h2 className="section-title mt-3 mb-4">{t.testimonials.title}</h2>
          <p className="text-white/55 max-w-md mx-auto leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.items.map((item) => (
            <div
              key={item.name}
              className="relative bg-brand-800 rounded-lg p-8 border border-white/5 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              <MdFormatQuote className="absolute top-4 right-5 text-gold-500/15 text-8xl pointer-events-none" />

              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <MdStar key={i} className="text-gold-500 text-base" />
                ))}
              </div>

              <p className="text-white/65 leading-relaxed mb-7 relative z-10 flex-1">
                &ldquo;{item.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-white/8">
                <div className="w-10 h-10 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-500 font-bold text-sm shrink-0">
                  {item.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{item.name}</div>
                  <div className="text-white/35 text-xs mt-0.5">
                    {item.location} &mdash; {item.car}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
