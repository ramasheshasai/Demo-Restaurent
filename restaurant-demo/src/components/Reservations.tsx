import { useState, useRef, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, Users, Check } from 'lucide-react'

interface FormState {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: string
  occasion: string
  requests: string
}

const INIT: FormState = {
  name: '', phone: '', email: '', date: '', time: '', guests: '2', occasion: '', requests: '',
}

const timeSlots = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM',
]

export default function Reservations() {
  const [form, setForm] = useState<FormState>(INIT)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true })

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  const inputClass = 'w-full bg-charcoal border border-white/10 text-cream placeholder-cream/30 font-body text-sm px-4 py-3.5 focus:outline-none focus:border-gold transition-colors duration-200'
  const labelClass = 'block font-body text-xs tracking-[0.15em] uppercase text-cream/60 mb-2'

  return (
    <section id="reservations" className="section-pad bg-charcoal relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="container-max relative">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Dine With Us</p>
            <h2 className="section-title text-cream mt-3">
              Reserve Your <span className="italic text-gold">Table</span>
            </h2>
            <div className="gold-divider mx-0" />
            <p className="font-body text-cream/65 leading-relaxed text-sm mb-8">
              Book a table online and our team will confirm within 2 hours. For parties of 10 or more,
              please call us directly.
            </p>

            <div className="space-y-5">
              {[
                { icon: Calendar, label: 'Opening Hours', value: 'Mon–Sun · Lunch 12–3 PM · Dinner 7–11 PM' },
                { icon: Clock, label: 'Reservation Policy', value: 'We hold tables for 15 minutes past reservation time' },
                { icon: Users, label: 'Large Groups', value: 'Call +91 98765 43210 for groups of 10+' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-9 h-9 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-body text-xs text-cream/50 uppercase tracking-widest mb-0.5">{label}</p>
                    <p className="font-body text-sm text-cream/80">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ambience image */}
            <div className="mt-8 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=75&auto=format&fit=crop"
                alt="Restaurant ambience"
                className="w-full object-cover aspect-[16/9]"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-gold/30 bg-gold/5 p-10 text-center h-full flex flex-col items-center justify-center gap-4"
              >
                <div className="w-16 h-16 bg-gold/20 border border-gold flex items-center justify-center">
                  <Check size={28} className="text-gold" />
                </div>
                <h3 className="font-display text-3xl text-cream font-light">Reservation Confirmed!</h3>
                <p className="font-body text-cream/60 text-sm text-center max-w-xs">
                  Thank you, <span className="text-gold">{form.name}</span>. We'll send a confirmation to{' '}
                  <span className="text-gold">{form.email}</span> shortly.
                </p>
                <p className="font-body text-xs text-cream/40 mt-2">
                  {form.date} · {form.time} · {form.guests} guests
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(INIT) }}
                  className="btn-outline mt-4"
                >
                  Make Another Reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input required type="text" placeholder="Your name" value={form.name} onChange={set('name')} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input required type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input required type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} className={inputClass} />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Date *</label>
                    <input
                      required
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={form.date}
                      onChange={set('date')}
                      className={inputClass + ' [color-scheme:dark]'}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Time *</label>
                    <select required value={form.time} onChange={set('time')} className={inputClass + ' cursor-pointer'}>
                      <option value="">Select a time</option>
                      <optgroup label="Lunch">
                        {timeSlots.slice(0, 6).map((t) => <option key={t} value={t}>{t}</option>)}
                      </optgroup>
                      <optgroup label="Dinner">
                        {timeSlots.slice(6).map((t) => <option key={t} value={t}>{t}</option>)}
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Number of Guests *</label>
                    <select required value={form.guests} onChange={set('guests')} className={inputClass + ' cursor-pointer'}>
                      {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Occasion</label>
                    <select value={form.occasion} onChange={set('occasion')} className={inputClass + ' cursor-pointer'}>
                      <option value="">No special occasion</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="date">Date Night</option>
                      <option value="business">Business Dinner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Special Requests</label>
                  <textarea
                    placeholder="Dietary requirements, seating preferences, allergies..."
                    value={form.requests}
                    onChange={set('requests')}
                    rows={3}
                    className={inputClass + ' resize-none'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-charcoal/40 border-t-charcoal rounded-full animate-spin" />
                      Confirming...
                    </span>
                  ) : 'Confirm Reservation'}
                </button>

                <p className="font-body text-[11px] text-cream/35 text-center leading-relaxed">
                  By reserving, you agree to our cancellation policy. Tables held for 15 minutes.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
