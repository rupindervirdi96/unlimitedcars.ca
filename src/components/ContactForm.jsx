import { useState } from 'react'
import { FiSend, FiPhone, FiMail, FiMapPin, FiCheckCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { MdAccessTime } from 'react-icons/md'
import { useT } from '../context/LanguageContext'

const INITIAL = {
  fullName: '',
  email: '',
  phone: '',
  carType: '',
  budget: '',
  preferredBrand: '',
  timeline: '',
  tradeIn: false,
  financing: false,
  message: '',
}

export default function ContactForm() {
  const { t } = useT()
  const c = t.contact
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = c.errors.fullName
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = c.errors.email
    if (!form.carType) e.carType = c.errors.carType
    if (!form.budget) e.budget = c.errors.budget
    return e
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus('submitting')

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT

    // Demo mode — no endpoint configured
    if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
      await new Promise((r) => setTimeout(r, 1200))
      setStatus('success')
      setForm(INITIAL)
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm(INITIAL)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 bg-brand-800">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-gold-500 text-4xl" />
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            {c.success.title}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            {c.success.body}
          </p>
          <button onClick={() => setStatus('idle')} className="btn-primary">
            {c.success.again}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 bg-brand-800 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-gold-500/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 xl:gap-16">

          {/* Left — Info */}
          <div className="lg:col-span-2">
            <span className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase">
              {c.tag}
            </span>
            <h2 className="section-title mt-3 mb-6">
              {c.title1}
              <br />
              <span className="text-gold-500 italic">{c.title2}</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-10">
              {c.subtitle}
            </p>

            <div className="space-y-6">
              {[
                { Icon: FiPhone,      label: c.info.callLabel,      value: '(438) 998-1746',               href: 'tel:+14389981746' },
                { Icon: FaWhatsapp,   label: c.info.whatsappLabel,  value: 'WhatsApp: (438) 998-1746',     href: 'https://wa.me/14389981746' },
                { Icon: FiMail,       label: c.info.emailLabel,     value: 'rupindervirdi96@gmail.com',    href: 'mailto:rupindervirdi96@gmail.com' },
                { Icon: FiMapPin,     label: c.info.visitLabel,     value: c.info.address,                 href: null },
                { Icon: MdAccessTime, label: c.info.hoursLabel,     value: c.info.hours,                   href: null },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-gold-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="text-gold-500" size={16} />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        className="text-white/50 hover:text-gold-500 transition-colors text-sm mt-0.5 block"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-white/50 text-sm mt-0.5 block">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 bg-brand-900 rounded-lg p-8 border border-white/5 space-y-5"
          >
            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded">
                {c.form.errorMsg}
              </div>
            )}

            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="form-label">
                  {c.form.fullName} <span className="text-red-400">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder={c.form.fullNamePlaceholder}
                  className={`form-input ${errors.fullName ? 'border-red-500/60' : ''}`}
                />
                {errors.fullName && (
                  <p className="form-error">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  {c.form.email} <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={c.form.emailPlaceholder}
                  className={`form-input ${errors.email ? 'border-red-500/60' : ''}`}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
            </div>

            {/* Phone + Brand */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="form-label">
                  {c.form.phone}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={c.form.phonePlaceholder}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="preferredBrand" className="form-label">
                  {c.form.brand}
                </label>
                <input
                  id="preferredBrand"
                  name="preferredBrand"
                  value={form.preferredBrand}
                  onChange={handleChange}
                  placeholder={c.form.brandPlaceholder}
                  className="form-input"
                />
              </div>
            </div>

            {/* Car Type + Budget */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="carType" className="form-label">
                  {c.form.carType} <span className="text-red-400">*</span>
                </label>
                <select
                  id="carType"
                  name="carType"
                  value={form.carType}
                  onChange={handleChange}
                  className={`form-input ${errors.carType ? 'border-red-500/60' : ''}`}
                >
                  <option value="">{c.form.carTypePlaceholder}</option>
                  {c.carTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.carType && (
                  <p className="form-error">{errors.carType}</p>
                )}
              </div>
              <div>
                <label htmlFor="budget" className="form-label">
                  {c.form.budget} <span className="text-red-400">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={`form-input ${errors.budget ? 'border-red-500/60' : ''}`}
                >
                  <option value="">{c.form.budgetPlaceholder}</option>
                  {c.budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {errors.budget && <p className="form-error">{errors.budget}</p>}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label htmlFor="timeline" className="form-label">
                {c.form.timeline}
              </label>
              <select
                id="timeline"
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">{c.form.timelinePlaceholder}</option>
                {c.timelines.map((tl) => (
                  <option key={tl} value={tl}>{tl}</option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
              <label className="flex items-center gap-2.5 text-white/65 text-sm cursor-pointer group">
                <input
                  type="checkbox"
                  name="tradeIn"
                  checked={form.tradeIn}
                  onChange={handleChange}
                  className="w-4 h-4 rounded accent-[#dc2626] cursor-pointer"
                />
                <span className="group-hover:text-white transition-colors">
                  {c.form.tradeIn}
                </span>
              </label>
              <label className="flex items-center gap-2.5 text-white/65 text-sm cursor-pointer group">
                <input
                  type="checkbox"
                  name="financing"
                  checked={form.financing}
                  onChange={handleChange}
                  className="w-4 h-4 rounded accent-[#dc2626] cursor-pointer"
                />
                <span className="group-hover:text-white transition-colors">
                  {c.form.financing}
                </span>
              </label>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="form-label">
                {c.form.notes}
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder={c.form.notesPlaceholder}
                className="form-input resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary w-full justify-center !py-4 !text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  {c.form.submitting}
                </>
              ) : (
                <>
                  {c.form.submit} <FiSend size={14} />
                </>
              )}
            </button>

            <p className="text-white/25 text-xs text-center leading-relaxed">
              {c.form.privacy}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
