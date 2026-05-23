import { FiCheckCircle } from 'react-icons/fi'
import { MdVerified, MdStar, MdSupportAgent, MdLocalOffer } from 'react-icons/md'
import { useT } from '../context/LanguageContext'

const ICONS = [MdVerified, MdStar, MdSupportAgent, MdLocalOffer]

export default function WhyChooseUs() {
  const { t } = useT()
  const features = t.whyUs.features.map((f, i) => ({ ...f, Icon: ICONS[i] }))
  return (
    <section
      id="why-us"
      className="py-24 bg-brand-800 relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute top-0 right-0 w-[32rem] h-[32rem] bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-gold-500/4 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
          {/* Left — copy */}
          <div>
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
              {t.whyUs.tag}
            </span>
            <h2 className="section-title mt-3 mb-6">
              {t.whyUs.title1}
              <br />
              <span className="text-gold-500 italic">{t.whyUs.title2}</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">
              {t.whyUs.subtitle}
            </p>
            <ul className="space-y-3">
              {t.whyUs.promises.map((promise) => (
                <li key={promise} className="flex items-center gap-3 text-white/75">
                  <FiCheckCircle className="text-gold-500 shrink-0" size={17} />
                  <span>{promise}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-brand-900 border border-white/5 hover:border-gold-500/30 rounded-lg p-6 transition-all duration-300 group hover:-translate-y-1"
              >
                <Icon className="text-gold-500 text-4xl mb-4 group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-white font-semibold mb-2 text-sm">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
