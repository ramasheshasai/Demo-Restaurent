import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80&auto=format&fit=crop'

export default function Hero() {
  const scrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Restaurant ambience"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="section-label mb-6"
        >
          Est. 2018 · Bengaluru, India
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-[1.05] mb-6"
        >
          Where Every
          <br />
          <span className="italic text-gold-gradient">Meal Becomes</span>
          <br />
          A Memory
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="w-20 h-px bg-gold mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="font-body text-cream/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          Authentic Indian cuisine reimagined for the modern palate.
          Dine in, celebrate, and create unforgettable moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button onClick={scrollToMenu} className="btn-primary">
            Explore Our Menu
          </button>
          <button
            onClick={() => document.querySelector('#reservations')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            Book a Table
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 0.5, y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } }}
        onClick={scrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60 hover:text-gold transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </motion.button>

      {/* Bottom stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="absolute bottom-0 left-0 right-0 bg-charcoal/80 backdrop-blur-md border-t border-gold-subtle"
      >
        <div className="container-max px-4 md:px-8 lg:px-16 py-4 grid grid-cols-3 divide-x divide-gold/20">
          {[
            { num: '200+', label: 'Menu Items' },
            { num: '6 Yrs', label: 'Of Excellence' },
            { num: '10K+', label: 'Happy Guests' },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <p className="font-display text-xl md:text-2xl text-gold font-light">{s.num}</p>
              <p className="font-body text-[10px] md:text-xs text-cream/50 tracking-widest uppercase mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
