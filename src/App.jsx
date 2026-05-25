import { useState, useRef } from 'react'
import useGeoapifyAutocomplete from './hooks/useGeoapifyAutocomplete'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPhone, FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { MdDirectionsCar } from 'react-icons/md'

// ── Steps (both languages) ───────────────────────────────────────────────────
const STEPS = {
  en: [
    { id: 'vehicleType',    question: 'What kind of vehicle are you looking for?',           options: ['Sedan', 'SUV', 'Truck', 'Coupe'] },
    { id: 'birthdate',      type: 'text', question: "What's your birthdate?",                placeholder: 'MM / DD / YYYY', inputType: 'text' },
    { id: 'credit',         question: 'How would you describe your credit right now?',       options: ['Excellent', 'Good', 'Fair', 'Poor', 'Not sure'] },
    { id: 'employment',     question: "What's your employment status?",                      options: ['Employed full-time', 'Employed part-time', 'Self-employed', 'Student', 'Other'] },
    { id: 'biweeklyBudget', question: "Roughly, what's your biweekly budget?",              options: ['$100 – $250', '$251 – $400', '$401 – $600', '$601 – $800', '$801 – $1,000'] },
    { id: 'monthlyIncome',  question: 'Which range best fits your monthly income?',          options: ['$1,000 – $2,500 / month', '$2,501 – $4,000 / month', '$4,001 – $6,000 / month', '$6,001+ / month', 'Prefer not to say'] },
    { id: 'timeAtAddress',  question: 'How long have you been at your current address?',     options: ['Less than 1 year', '1 – 2 years', '3 – 5 years', '6+ years'] },
    { id: 'address',        type: 'text', question: "What's your current address?",         placeholder: 'Street address', inputType: 'text' },
    { id: 'name',           type: 'text', question: "What's your name?",                    placeholder: 'Full name',      inputType: 'text' },
    { id: 'email',          type: 'text', question: "What's the best email for you?",       placeholder: 'you@example.com', inputType: 'email' },
    { id: 'phone',          type: 'text', question: "What's the best phone number to reach you?", placeholder: 'Phone number', inputType: 'tel' },
    { id: 'callTime',       question: "When's the best time for us to call you?",            options: ['Morning (8am – 12pm)', 'Afternoon (12pm – 5pm)', 'Evening (5pm – 8pm)', 'Anytime'] },
  ],
  fr: [
    { id: 'vehicleType',    question: 'Quel type de véhicule cherchez-vous?',                options: ['Berline', 'VUS', 'Camion', 'Coupé'] },
    { id: 'birthdate',      type: 'text', question: 'Quelle est votre date de naissance?',  placeholder: 'MM / JJ / AAAA', inputType: 'text' },
    { id: 'credit',         question: 'Comment décririez-vous votre crédit?',               options: ['Excellent', 'Bon', 'Passable', 'Mauvais', 'Je ne sais pas'] },
    { id: 'employment',     question: "Quel est votre statut d'emploi?",                    options: ['Employé temps plein', 'Employé temps partiel', 'Travailleur autonome', 'Étudiant(e)', 'Autre'] },
    { id: 'biweeklyBudget', question: 'Quel est votre budget bimensuel approximatif?',      options: ['100 $ – 250 $', '251 $ – 400 $', '401 $ – 600 $', '601 $ – 800 $', '801 $ – 1 000 $'] },
    { id: 'monthlyIncome',  question: 'Quelle tranche correspond à votre revenu mensuel?',  options: ['1 000 $ – 2 500 $ / mois', '2 501 $ – 4 000 $ / mois', '4 001 $ – 6 000 $ / mois', '6 001 $+ / mois', 'Préfère ne pas répondre'] },
    { id: 'timeAtAddress',  question: 'Depuis combien de temps êtes-vous à cette adresse?', options: ["Moins d'un an", '1 – 2 ans', '3 – 5 ans', '6 ans et plus'] },
    { id: 'address',        type: 'text', question: 'Quelle est votre adresse actuelle?',   placeholder: 'Adresse', inputType: 'text' },
    { id: 'name',           type: 'text', question: 'Quel est votre nom?',                  placeholder: 'Nom complet',          inputType: 'text' },
    { id: 'email',          type: 'text', question: 'Quel est votre meilleur courriel?',    placeholder: 'vous@exemple.com',     inputType: 'email' },
    { id: 'phone',          type: 'text', question: 'Quel est le meilleur numéro pour vous joindre?', placeholder: 'Numéro de téléphone', inputType: 'tel' },
    { id: 'callTime',       question: 'Quel est le meilleur moment pour vous appeler?',     options: ['Matin (8h – 12h)', 'Après-midi (12h – 17h)', 'Soir (17h – 20h)', "N'importe quand"] },
  ],
}

// ── UI strings ───────────────────────────────────────────────────────────────
const T = {
  en: {
    subtitle:     'Car Dealer · QUEBEC | ONTARIO',
    whatsapp:     'WhatsApp',
    letsTalk:     "Let's talk",
    stepOf:       (s, t) => `Step ${s} of ${t}`,
    goBack:       'Go back',
    skip:         'Skip',
    continue:     'Continue',
    submit:       'Submit',
    sending:      'Sending…',
    successTitle: (name) => `Thanks${name ? `, ${name}` : ''}!`,
    successBody:  "We've received your details and will reach out shortly with the best options for you.",
    chatWA:       'Chat with us on WhatsApp',
    aptPlaceholder: 'Apt / Suite / Unit (optional)',
    invalid: {
      phone:     'Please enter a valid phone number',
      email:     'Please enter a valid email address',
    },
  },
  fr: {
    subtitle:     'Concessionnaire · Montréal, QC',
    whatsapp:     'WhatsApp',
    letsTalk:     'Nous appeler',
    stepOf:       (s, t) => `Étape ${s} sur ${t}`,
    goBack:       'Retour',
    skip:         'Passer',
    continue:     'Continuer',
    submit:       'Envoyer',
    sending:      'Envoi…',
    successTitle: (name) => `Merci${name ? `, ${name}` : ''}!`,
    successBody:  'Nous avons reçu vos informations et vous contacterons rapidement avec les meilleures options.',
    aptPlaceholder: 'App. / Suite / Unité (facultatif)',
    chatWA:       'Discutez avec nous sur WhatsApp',
    invalid: {
      phone:     'Veuillez entrer un numéro de téléphone valide',
      email:     'Veuillez entrer une adresse courriel valide',
    },
  },
}

// ── Field validators ────────────────────────────────────────────────────────
const VALIDATORS = {
  phone:     (v) => /^\D*(\d\D*){10}$/.test(v.trim()),
  email:     (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  birthdate: (v) => {
    const d = v.replace(/\D/g, '')
    if (d.length < 8) return false
    const mm = +d.slice(0, 2), dd = +d.slice(2, 4), yyyy = +d.slice(4, 8)
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return false
    if (yyyy < 1900 || yyyy > new Date().getFullYear()) return false
    const date = new Date(yyyy, mm - 1, dd)
    return !isNaN(date) && date.getMonth() === mm - 1 && date.getDate() === dd
  },
}

const TOTAL = STEPS.en.length

export default function App() {
  const [lang, setLang]       = useState('en')
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({}) // tile steps store option index (number)
  const [status, setStatus]   = useState('idle') // idle | submitting | success | error

  const bdMonthRef = useRef(null)
  const bdDayRef   = useRef(null)
  const bdYearRef  = useRef(null)

  const {
    address,
    setAddress,
    addressSuggestions,
    isAddressSearching,
    showAddressSuggestions,
    setShowAddressSuggestions,
  } = useGeoapifyAutocomplete()

  const steps   = STEPS[lang]
  const txt     = T[lang]
  const current = steps[step]
  const isLast     = step === TOTAL - 1
  const isTile     = !current.type
  const isSkippable = !['name', 'phone'].includes(current.id)

  const canContinue = () => {
    const val = answers[current.id]
    if (isTile) return val !== undefined
    if (typeof val !== 'string' || !val.trim()) return false
    const validator = VALIDATORS[current.id]
    if (validator) return validator(val)
    return true
  }

  const fieldError = current.type === 'text'
    && current.id !== 'birthdate'
    && VALIDATORS[current.id]
    && answers[current.id]
    && !VALIDATORS[current.id](answers[current.id])

  // Store option index so language switching keeps the selection highlighted
  const handleTile = (i) => {
    setAnswers((a) => ({ ...a, [current.id]: i }))
    setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL - 1)), 380)
  }

  const handleContinue = async () => {
    if (!isLast) { setStep((s) => s + 1); return }
    setStatus('submitting')
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
    // Look up English option text by step id — order-independent
    const enOpt = (id, idx) => { const s = STEPS.en.find((x) => x.id === id); return s && idx !== undefined ? s.options[idx] : '' }
    const payload = {
      access_key:             accessKey,
      subject:                `New Car Inquiry from ${answers.name || 'a visitor'} — UnlimitedCars.ca`,
      from_name:              'UnlimitedCars.ca Form',
      'Vehicle Type':         enOpt('vehicleType',    answers.vehicleType),
      'Date of Birth':        answers.birthdate,
      'Credit':               enOpt('credit',          answers.credit),
      'Employment Status':    enOpt('employment',      answers.employment),
      'Biweekly Budget':      enOpt('biweeklyBudget',  answers.biweeklyBudget),
      'Monthly Income':       enOpt('monthlyIncome',   answers.monthlyIncome),
      'Time at Address':      enOpt('timeAtAddress',   answers.timeAtAddress),
      'Address':              answers.apt ? `${answers.address}, ${answers.apt}` : answers.address,
      'Name':                 answers.name,
      'Email':                answers.email,
      'Phone':                answers.phone,
      'Best Time to Call':    enOpt('callTime',        answers.callTime),
    }
    if (!accessKey || accessKey.includes('YOUR_KEY')) {
      await new Promise((r) => setTimeout(r, 1000))
      setStatus('success')
      return
    }
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const LangToggle = () => (
    <div className="flex items-center border border-white/15 rounded-full overflow-hidden text-xs font-bold tracking-widest">
      {['en', 'fr'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 transition-colors uppercase ${lang === l ? 'bg-red-600 text-white' : 'text-white/40 hover:text-white'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )

  // ── Success screen ───────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0b0d1a] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
          <FiCheckCircle className="text-green-400 text-4xl" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          {txt.successTitle(answers.name?.split(' ')[0])}
        </h1>
        <p className="text-white/40 max-w-sm leading-relaxed mb-8 text-lg">
          {txt.successBody}
        </p>
        <a
          href="https://wa.me/14389981746"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3.5 rounded-full transition-colors"
        >
          <FaWhatsapp size={20} />
          {txt.chatWA}
        </a>
      </div>
    )
  }

  // ── Main form ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0b0d1a] flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <a
          href="https://wa.me/14389981746"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-white/35 hover:text-[#25D366] transition-colors text-sm"
        >
          <FaWhatsapp size={16} />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href="tel:+14389981746"
            className="flex items-center gap-1.5 text-white/35 hover:text-white transition-colors text-sm"
          >
            <FiPhone size={13} />
            <span className="hidden sm:inline">(438) 998-1746</span>
          </a>
        </div>
      </div>

      {/* Brand hero */}
      <div className="flex flex-col items-center pt-6 pb-4 px-4">
        <MdDirectionsCar className="text-red-500 text-4xl mb-4" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-white uppercase text-center mb-2">
          UnlimitedCars<span className="text-red-500">.ca</span>
        </h1>
        <p className="text-white/35 tracking-[0.25em] uppercase text-xs font-semibold mb-7">
          {txt.subtitle}
        </p>
        <div className="flex items-center gap-3 mb-10">
          <a
            href="https://wa.me/14389981746"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/15 hover:border-[#25D366] hover:text-[#25D366] text-white/60 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200"
          >
            <FaWhatsapp size={15} />
            {txt.whatsapp}
          </a>
          <a
            href="tel:+14389981746"
            className="flex items-center gap-2 border border-white/15 hover:border-white hover:text-white text-white/60 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200"
          >
            <FiPhone size={13} />
            {txt.letsTalk}
          </a>
        </div>

        {/* Step dot indicators */}
        <div className="flex items-center gap-2 mb-5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => i < step && setStep(i)}
              aria-label={txt.stepOf(i + 1, TOTAL)}
              className={`rounded-full transition-all duration-300 ${
                i === step  ? 'w-5 h-2 bg-red-500'
                : i < step  ? 'w-2 h-2 bg-white/40 cursor-pointer'
                :              'w-2 h-2 bg-white/15 cursor-default'
              }`}
            />
          ))}
        </div>

        {/* Step card */}
        <div className="w-full max-w-2xl bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 sm:p-8 mb-10">

          <p className="text-xs font-semibold tracking-[0.2em] text-white/25 uppercase mb-5">
            {txt.stepOf(step + 1, TOTAL)}
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
            {current.question}
          </h2>

          {/* Tile options */}
          {isTile && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {current.options.map((opt, i) => {
                const spanFull = current.options.length % 2 !== 0 && i === current.options.length - 1
                return (
                  <button
                    key={opt}
                    onClick={() => handleTile(i)}
                    className={[
                      'px-4 py-4 border rounded-xl text-sm font-medium text-left transition-all duration-150',
                      spanFull ? 'col-span-2' : '',
                      answers[current.id] === i
                        ? 'border-red-500 bg-red-500/10 text-white'
                        : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white hover:bg-white/[0.04]',
                    ].join(' ')}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {/* Text input */}
          {current.type === 'text' && (
            <div className="mb-6">
              {current.id === 'birthdate' ? (
                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM / DD / YYYY"
                    autoFocus
                    value={answers.birthdate || ''}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 8)
                      let fmt = digits
                      if (digits.length > 4) fmt = `${digits.slice(0, 2)} / ${digits.slice(2, 4)} / ${digits.slice(4)}`
                      else if (digits.length > 2) fmt = `${digits.slice(0, 2)} / ${digits.slice(2)}`
                      setAnswers((a) => ({ ...a, birthdate: fmt }))
                    }}
                    className="w-full bg-transparent border-b border-white/15 focus:border-red-500 outline-none text-3xl font-light tracking-[0.3em] text-white py-3 transition-colors placeholder-white/15"
                  />
                  <p className="text-white/20 text-xs mt-3 tracking-widest">e.g. 04 / 15 / 1990</p>
                </div>
              ) : current.id === 'address' ? (
                <div className="relative">
                  <input
                    type="text"
                    placeholder={current.placeholder}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                      setAnswers((a) => ({ ...a, address: e.target.value }))
                    }}
                    onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 150)}
                    onFocus={() => addressSuggestions.length > 0 && setShowAddressSuggestions(true)}
                    onKeyDown={(e) => e.key === 'Enter' && canContinue() && handleContinue()}
                    autoFocus
                    className="w-full bg-transparent border-b border-white/15 focus:border-red-500 outline-none text-xl text-white py-3 transition-colors placeholder-white/20"
                  />
                  {(showAddressSuggestions || isAddressSearching) && address.trim().length >= 3 && (
                    <ul className="absolute z-10 w-full mt-1 bg-[#12152a] border border-white/10 rounded-xl overflow-hidden shadow-xl min-h-[60px]">
                      {addressSuggestions.map((s) => (
                        <li
                          key={s.id}
                          onMouseDown={() => {
                            setAddress(s.formatted)
                            setAnswers((a) => ({ ...a, address: s.formatted }))
                            setShowAddressSuggestions(false)
                          }}
                          className="px-4 py-3 hover:bg-white/[0.06] cursor-pointer border-b border-white/[0.05] last:border-0"
                        >
                          <p className="text-white text-sm font-medium truncate">{s.primary}</p>
                          {s.secondary && <p className="text-white/40 text-xs mt-0.5 truncate">{s.secondary}</p>}
                        </li>
                      ))}
                      {isAddressSearching && (
                        <li className="absolute inset-0 flex items-center justify-center bg-[#12152a]/75 rounded-xl pointer-events-none">
                          <div className="w-5 h-5 rounded-full border-2 border-white/15 border-t-red-500 animate-spin" />
                        </li>
                      )}
                    </ul>
                  )}
                  <input
                    type="text"
                    placeholder={txt.aptPlaceholder}
                    value={answers.apt || ''}
                    onChange={(e) => setAnswers((a) => ({ ...a, apt: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && canContinue() && handleContinue()}
                    className="w-full bg-transparent border-b border-white/15 focus:border-red-500 outline-none text-xl text-white py-3 mt-4 transition-colors placeholder-white/20"
                  />
                </div>
              ) : (
                <>
                  <input
                    key={`${lang}-${current.id}`}
                    type={current.inputType}
                    placeholder={current.placeholder}
                    value={answers[current.id] || ''}
                    onChange={(e) => {
                      let val = e.target.value
                      if (current.id === 'phone') {
                        val = val.replace(/\D/g, '').slice(0, 10)
                      }
                      setAnswers((a) => ({ ...a, [current.id]: val }))
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && canContinue() && handleContinue()}
                    autoFocus
                    className={`w-full bg-transparent border-b outline-none text-xl text-white py-3 transition-colors placeholder-white/20 ${
                      fieldError ? 'border-red-500' : 'border-white/15 focus:border-red-500'
                    }`}
                  />
                  {fieldError && (
                    <p className="text-red-400 text-xs mt-2">{txt.invalid[current.id]}</p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-sm font-medium text-white/50 border border-white/15 hover:border-white/30 hover:text-white/80 disabled:opacity-0 disabled:pointer-events-none px-4 py-2 rounded-lg transition-all duration-150"
            >
              <FiArrowLeft size={13} />
              {txt.goBack}
            </button>

            <div className="flex items-center gap-3">
              {isSkippable && !isLast && (
                <button
                  onClick={() => setStep((s) => Math.min(s + 1, TOTAL - 1))}
                  className="text-sm font-medium text-white/40 border border-white/10 hover:border-white/25 hover:text-white/70 px-4 py-2 rounded-lg transition-all duration-150"
                >
                  {txt.skip}
                </button>
              )}
              {(current.type === 'text' || isLast) && (
                <button
                  onClick={handleContinue}
                  disabled={!canContinue() || status === 'submitting'}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-white/10 disabled:text-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150"
                >
                  {isLast ? (status === 'submitting' ? txt.sending : txt.submit) : txt.continue}
                  {!isLast && <FiArrowRight size={14} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
