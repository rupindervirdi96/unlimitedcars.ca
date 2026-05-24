import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPhone, FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { MdDirectionsCar } from 'react-icons/md'

// ── Steps (both languages) ───────────────────────────────────────────────────
const STEPS = {
  en: [
    { id: 'vehicleType', question: 'What kind of vehicle are you looking for?', options: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Electric', 'Minivan'] },
    { id: 'condition',   question: 'New or used?',                              options: ['New', 'Used', 'Either works for me'] },
    { id: 'budget',      question: "What's your budget?",                       options: ['Under $15,000', '$15,000 – $25,000', '$25,000 – $40,000', '$40,000 – $60,000', '$60,000+'] },
    { id: 'brand',       question: 'Any preferred brand?',                      options: ['No preference', 'Toyota / Honda', 'BMW / Audi / Mercedes', 'Ford / Chevrolet', 'Hyundai / Kia'] },
    { id: 'timeline',    question: "What's your timeline to buy?",              options: ['As soon as possible', '1 – 2 weeks', 'This month', 'Just browsing'] },
    { id: 'tradeIn',     question: 'Do you have a vehicle to trade in?',        options: ['Yes', 'No'] },
    { id: 'financing',   question: 'Are you looking for financing?',            options: ['Yes', 'No', 'Not sure'] },
    { id: 'name',  type: 'text', question: "What's your name?",          placeholder: 'Full name',           inputType: 'text' },
    { id: 'phone', type: 'text', question: "What's your phone number?",  placeholder: 'e.g. (438) 555-1234', inputType: 'tel' },
    { id: 'email', type: 'text', question: "What's your email address?", placeholder: 'name@example.com',    inputType: 'email' },
  ],
  fr: [
    { id: 'vehicleType', question: 'Quel type de véhicule recherchez-vous?',   options: ['Berline', 'VUS', 'Camion', 'Coupé', 'Électrique', 'Minifourgonnette'] },
    { id: 'condition',   question: 'Neuf ou usagé?',                           options: ['Neuf', 'Usagé', 'Les deux me conviennent'] },
    { id: 'budget',      question: 'Quel est votre budget?',                   options: ['Moins de 15 000 $', '15 000 $ – 25 000 $', '25 000 $ – 40 000 $', '40 000 $ – 60 000 $', '60 000 $+'] },
    { id: 'brand',       question: 'Une marque préférée?',                     options: ['Aucune préférence', 'Toyota / Honda', 'BMW / Audi / Mercedes', 'Ford / Chevrolet', 'Hyundai / Kia'] },
    { id: 'timeline',    question: 'Quel est votre délai pour acheter?',       options: ['Dès que possible', '1 – 2 semaines', 'Ce mois-ci', 'Je magasine seulement'] },
    { id: 'tradeIn',     question: 'Avez-vous un véhicule à échanger?',        options: ['Oui', 'Non'] },
    { id: 'financing',   question: 'Cherchez-vous un financement?',            options: ['Oui', 'Non', 'Pas certain(e)'] },
    { id: 'name',  type: 'text', question: 'Quel est votre nom?',                   placeholder: 'Nom complet',        inputType: 'text' },
    { id: 'phone', type: 'text', question: 'Quel est votre numéro de téléphone?',   placeholder: 'ex. (438) 555-1234', inputType: 'tel' },
    { id: 'email', type: 'text', question: 'Quelle est votre adresse courriel?',    placeholder: 'nom@exemple.com',    inputType: 'email' },
  ],
}

// ── UI strings ───────────────────────────────────────────────────────────────
const T = {
  en: {
    subtitle:     'Car Dealer · Montréal, QC',
    whatsapp:     'WhatsApp',
    letsTalk:     "Let's talk",
    stepOf:       (s, t) => `Step ${s} of ${t}`,
    goBack:       'Go back',
    continue:     'Continue',
    submit:       'Submit',
    sending:      'Sending…',
    successTitle: (name) => `Thanks${name ? `, ${name}` : ''}!`,
    successBody:  "We've received your details and will reach out shortly with the best options for you.",
    chatWA:       'Chat with us on WhatsApp',
  },
  fr: {
    subtitle:     'Concessionnaire · Montréal, QC',
    whatsapp:     'WhatsApp',
    letsTalk:     'Nous appeler',
    stepOf:       (s, t) => `Étape ${s} sur ${t}`,
    goBack:       'Retour',
    continue:     'Continuer',
    submit:       'Envoyer',
    sending:      'Envoi…',
    successTitle: (name) => `Merci${name ? `, ${name}` : ''}!`,
    successBody:  'Nous avons reçu vos informations et vous contacterons rapidement avec les meilleures options.',
    chatWA:       'Discutez avec nous sur WhatsApp',
  },
}

const TOTAL = STEPS.en.length

export default function App() {
  const [lang, setLang]       = useState('en')
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({}) // tile steps store option index (number)
  const [status, setStatus]   = useState('idle') // idle | submitting | success | error

  const steps   = STEPS[lang]
  const txt     = T[lang]
  const current = steps[step]
  const isLast  = step === TOTAL - 1
  const isTile  = !current.type

  const canContinue = () => {
    const val = answers[current.id]
    if (isTile) return val !== undefined
    return typeof val === 'string' && val.trim().length > 0
  }

  // Store option index so language switching keeps the selection highlighted
  const handleTile = (i) => {
    setAnswers((a) => ({ ...a, [current.id]: i }))
    setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL - 1)), 380)
  }

  const handleContinue = async () => {
    if (!isLast) { setStep((s) => s + 1); return }
    setStatus('submitting')
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
    // Always send English option labels in the email regardless of UI language
    const en = STEPS.en
    const payload = {
      access_key:        accessKey,
      subject:           `New Car Inquiry from ${answers.name || 'a visitor'} — UnlimitedCars.ca`,
      from_name:         'UnlimitedCars.ca Form',
      'Vehicle Type':    answers.vehicleType !== undefined ? en[0].options[answers.vehicleType] : '',
      'Condition':       answers.condition   !== undefined ? en[1].options[answers.condition]   : '',
      'Budget':          answers.budget      !== undefined ? en[2].options[answers.budget]      : '',
      'Preferred Brand': answers.brand       !== undefined ? en[3].options[answers.brand]       : '',
      'Timeline':        answers.timeline    !== undefined ? en[4].options[answers.timeline]    : '',
      'Trade-In':        answers.tradeIn     !== undefined ? en[5].options[answers.tradeIn]     : '',
      'Financing':       answers.financing   !== undefined ? en[6].options[answers.financing]   : '',
      'Name':            answers.name,
      'Phone':           answers.phone,
      'Email':           answers.email,
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
              <input
                key={`${lang}-${current.id}`}
                type={current.inputType}
                placeholder={current.placeholder}
                value={answers[current.id] || ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [current.id]: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && canContinue() && handleContinue()}
                autoFocus
                className="w-full bg-transparent border-b border-white/15 focus:border-red-500 outline-none text-xl text-white py-3 transition-colors placeholder-white/20"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 disabled:opacity-0 disabled:pointer-events-none transition-colors"
            >
              <FiArrowLeft size={13} />
              {txt.goBack}
            </button>

            {current.type === 'text' && (
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
  )
}
