import { MdDirectionsCar } from 'react-icons/md'
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useT } from '../context/LanguageContext'

const SOCIAL = [FiInstagram, FiFacebook, FiTwitter, FiYoutube]

export default function Footer() {
  const { t } = useT()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4 group w-fit">
              <MdDirectionsCar className="text-gold-500 text-3xl group-hover:scale-110 transition-transform" />
              <span className="font-display text-xl font-bold text-white">
                Unlimited<span className="text-gold-500">Cars</span><span className="text-white/40 text-sm font-sans">.ca</span>
              </span>
            </a>
            <p className="text-white/35 text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex gap-2">
              {SOCIAL.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-gold-500 hover:text-gold-500 text-white/35 rounded-sm transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {t.navbar.links.map((label, i) => (
                <li key={label}>
                  <a
                    href={t.navbar.hrefs[i]}
                    className="text-white/40 hover:text-gold-500 transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              {t.footer.services}
            </h4>
            <ul className="space-y-2.5">
              {t.footer.servicesList.map((s) => (
                <li key={s}>
                  <span className="text-white/40 hover:text-gold-500 transition-colors text-sm cursor-default">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase mb-5">
              {t.footer.contact}
            </h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li>Montréal, QC, Canada</li>
              <li>
                <a
                  href="tel:+14389981746"
                  className="hover:text-gold-500 transition-colors"
                >
                  (438) 998-1746
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/14389981746"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-green-400 transition-colors"
                >
                  <FaWhatsapp size={13} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:rupindervirdi96@gmail.com"
                  className="hover:text-gold-500 transition-colors"
                >
                  rupindervirdi96@gmail.com
                </a>
              </li>
              <li>
                {t.footer.hoursLine1}
                <br />
                {t.footer.hoursLine2}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <span>&copy; {year} {t.footer.copyright}</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-500 transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-gold-500 transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
