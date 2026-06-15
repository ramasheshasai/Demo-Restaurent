import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Heart, Briefcase, Music } from 'lucide-react'

const events = [
  {
    icon: Heart,
    title: 'Weddings & Receptions',
    desc: 'Celebrate your special day in our grand banquet hall. Capacity up to 500 guests, customisable menus, and dedicated event planners.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=75&auto=format&fit=crop',
    capacity: 'Up to 500 guests',
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    desc: 'Conferences, product launches, team dinners — our team ensures seamless execution for businesses of all sizes.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=75&auto=format&fit=crop',
    capacity: 'Up to 200 guests',
  },
  {
    icon: Users,
    title: 'Private Dining',
    desc: 'Book our exclusive private dining room for intimate celebrations. A curated menu crafted just for your evening.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75&auto=format&fit=crop',
    capacity: '10–30 guests',
  },
  {
    icon: Music,
    title: 'Live Nights',
    desc: 'Every Friday and Saturday, enjoy live classical Indian music performances paired with our finest tasting menu.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75&auto=format&fit=crop',
    capacity: 'Walk-ins welcome',
  },
]

export default function Events() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true })

  return (
    <section id="events" className="section-pad bg-charcoal-2">
      <div className="container-max">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="section-label">Celebrate With Us</p>
          <h2 className="section-title text-cream mt-3">
            Events &amp; <span className="italic text-gold">Banquets</span>
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-cream/60 max-w-lg mx-auto text-sm leading-relaxed">
            From intimate gatherings to grand celebrations — we bring the same obsessive care to every event.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map(({ icon: Icon, title, desc, image, capacity }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-400"
            >
              {/* BG Image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/50 flex items-center justify-center flex-shrink-0 bg-charcoal/60">
                    <Icon size={18} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-cream font-medium mb-1">{title}</h3>
                    <p className="font-body text-cream/65 text-xs leading-relaxed mb-3">{desc}</p>
                    <span className="inline-block font-body text-[10px] tracking-widest uppercase text-gold border border-gold/40 px-3 py-1">
                      {capacity}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-radial from-gold/10 to-transparent border border-gold/20 p-8 text-center"
        >
          <h3 className="font-display text-3xl text-cream font-light mb-3">
            Planning an <span className="italic text-gold">event?</span>
          </h3>
          <p className="font-body text-cream/60 text-sm mb-6">
            Get in touch and our team will craft a bespoke experience for your occasion.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Send an Enquiry
          </button>
        </motion.div>
      </div>
    </section>
  )
}
