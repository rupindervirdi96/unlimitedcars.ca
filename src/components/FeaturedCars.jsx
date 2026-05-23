import { FiArrowRight } from 'react-icons/fi'
import { MdSpeed, MdCalendarToday, MdTune } from 'react-icons/md'
import { featuredCars } from '../data/cars'
import { useT } from '../context/LanguageContext'

const BADGE_STYLES = {
  Featured: 'bg-gold-500 text-white',
  Popular: 'bg-blue-500 text-white',
  'Hot Deal': 'bg-orange-500 text-white',
  Electric: 'bg-emerald-500 text-white',
  Certified: 'bg-purple-500 text-white',
}

export default function FeaturedCars() {
  const { t } = useT()
  return (
    <section id="inventory" className="py-24 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
            {t.inventory.tag}
          </span>
          <h2 className="section-title mt-3 mb-4">{t.inventory.title}</h2>
          <p className="text-white/55 max-w-lg mx-auto leading-relaxed">
            {t.inventory.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <article
              key={car.id}
              className="group bg-brand-800 rounded-lg overflow-hidden border border-white/5 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold-500/10 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <img
                  src={car.image}
                  alt={`${car.year} ${car.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-800/70 to-transparent" />
                {car.badge && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full tracking-wide ${
                      BADGE_STYLES[car.badge] || 'bg-gold-500 text-black'
                    }`}
                  >
                    {t.inventory.badges[car.badge] || car.badge}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold text-lg leading-snug">
                      {car.name}
                    </h3>
                    <span className="text-white/45 text-xs">{car.type}</span>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <div className="text-gold-500 font-bold text-xl">
                      ${car.price.toLocaleString()}
                    </div>
                    <span className="text-white/35 text-xs">Starting at</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 py-3 mt-1 border-t border-white/8 text-xs text-white/45">
                  <span className="flex items-center gap-1">
                    <MdCalendarToday className="text-gold-500" size={13} />
                    {car.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdSpeed className="text-gold-500" size={13} />
                    {car.mileage === 'New' ? t.inventory.mileageNew : car.mileage}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdTune className="text-gold-500" size={13} />
                    {car.engine}
                  </span>
                </div>

                <a
                  href="#contact"
                  className="mt-auto flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-gold-500 hover:text-black text-white/60 text-sm font-medium rounded-sm transition-all duration-200 group/btn"
                >
                  <span>{t.inventory.inquire}</span>
                  <FiArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-0.5 transition-transform"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm mb-4">
            {t.inventory.notFound}
          </p>
          <a href="#contact" className="btn-outline">
            {t.inventory.request} <FiArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
