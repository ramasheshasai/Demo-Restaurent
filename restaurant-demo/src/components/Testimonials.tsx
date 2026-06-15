import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const reviews = [
  {
    name: 'Priya Menon',
    location: 'Bengaluru',
    avatar: 'https://i.pravatar.cc/80?img=47',
    rating: 5,
    text: "The Rogan Josh was unlike anything I've had in the city. You could taste the care in every layer of spice. The private dining room setting made our anniversary truly unforgettable.",
    occasion: 'Anniversary Dinner',
  },
  {
    name: 'Arjun Krishnan',
    location: 'Chennai',
    avatar: 'https://i.pravatar.cc/80?img=52',
    rating: 5,
    text: "Flew in from Chennai for a work event and chose Saffron & Spice for the team dinner. The banquet service was flawless — every single guest left impressed. We'll be back.",
    occasion: 'Corporate Dinner',
  },
  {
    name: 'Sneha Rajan',
    location: 'Hyderabad',
    avatar: 'https://i.pravatar.cc/80?img=45',
    rating: 5,
    text: "The Gulab Jamun Cheesecake deserves its own award. And the Saffron Old Fashioned? Poetry in a glass. Hands down the finest restaurant experience in South India.",
    occasion: 'Date Night',
  },
  {
    name: 'Vikram Nair',
    location: 'Bengaluru',
    avatar: 'https://i.pravatar.cc/80?img=60',
    rating: 5,
    text: "We hosted a 200-person wedding reception here. The team was extraordinary — seamless coordination, customised menu, and the space looked stunning. Cannot recommend enough.",
    occasion: 'Wedding Reception',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const next = useCallback(() => setCurrent((c) => (c + 1) % reviews.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + reviews.length) % reviews.length), [])

  useEffect(() => {
    if (paused) return
    timeoutRef.current = setTimeout(next, 5000)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [current, paused, next])

  const r = reviews[current]

  return (
    <section className="section-pad bg-charcoal-3 relative overflow-hidden">
      {/* Decorative bg text */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.025]"
      >
        <span className="font-display text-[20vw] font-bold text-cream whitespace-nowrap">Reviews</span>
      </div>

      <div className="container-max relative">
        <div className="text-center mb-12">
          <p className="section-label">What Our Guests Say</p>
          <h2 className="section-title text-cream mt-3">
            Stories of <span className="italic text-gold">Delight</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-center px-4"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display text-2xl md:text-3xl text-cream font-light italic leading-relaxed mb-8">
                "{r.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold/40"
                  loading="lazy"
                />
                <div className="text-left">
                  <p className="font-body font-semibold text-cream text-sm">{r.name}</p>
                  <p className="font-body text-cream/50 text-xs">
                    {r.location} · <span className="text-gold">{r.occasion}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 border border-gold/30 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors duration-200 cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === current ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-cream/20 hover:bg-cream/40'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 border border-gold/30 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-colors duration-200 cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Platform logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-white/10"
        >
          {['Google Reviews', 'Zomato', 'Swiggy', 'TripAdvisor', 'Times Food'].map((p) => (
            <span key={p} className="font-body text-xs text-cream/30 tracking-widest uppercase hover:text-cream/60 transition-colors duration-200">
              {p}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
