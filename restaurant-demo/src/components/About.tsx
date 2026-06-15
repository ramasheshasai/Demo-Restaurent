import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Leaf, Award, Clock } from 'lucide-react'

const pillars = [
  {
    icon: Leaf,
    title: 'Farm to Table',
    desc: 'Every ingredient sourced fresh from local farms. We know where our food comes from.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    desc: "Recognised by Times Food Awards 2023 as Bengaluru's Best Fine Dining Experience.",
  },
  {
    icon: Clock,
    title: 'Open Daily',
    desc: 'Lunch 12–3 PM · Dinner 7–11 PM. Private dining available by appointment.',
  },
]

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="section-pad bg-charcoal">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images mosaic */}
          <FadeUp>
            <div className="grid grid-cols-2 gap-3 relative">
              <div className="col-span-2 overflow-hidden rounded-sm aspect-[16/9]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format&fit=crop"
                  alt="Restaurant interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-sm aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&auto=format&fit=crop"
                  alt="Signature dish"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-sm aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80&auto=format&fit=crop"
                  alt="Culinary team"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 hidden lg:flex bg-gold text-charcoal p-5 flex-col items-center justify-center w-28 h-28 rounded-full shadow-2xl">
                <span className="font-display text-3xl font-light leading-none">6</span>
                <span className="font-body text-[9px] tracking-widest uppercase text-center leading-tight mt-1">Years of<br/>Excellence</span>
              </div>
            </div>
          </FadeUp>

          {/* Text content */}
          <div className="space-y-8">
            <FadeUp delay={0.1}>
              <p className="section-label">Our Story</p>
              <h2 className="section-title text-cream mt-3">
                A Love Letter to<br />
                <span className="italic text-gold">Indian Cuisine</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="gold-divider mx-0" />
              <p className="font-body text-cream/70 leading-relaxed text-base">
                Born from a passion for authentic flavours and a belief that Indian cuisine
                deserves its place at the world's finest tables, Saffron & Spice opened its doors
                in 2018. We honour century-old recipes while embracing bold modern presentation.
              </p>
              <p className="font-body text-cream/70 leading-relaxed text-base mt-4">
                Our chefs travel across India every year — from the spice coasts of Kerala to the
                royal kitchens of Rajasthan — bringing back flavours that rarely leave their
                birthplaces.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="grid gap-5 pt-4">
                {pillars.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 border border-gold/40 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/10 transition-colors duration-300">
                      <Icon size={18} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-cream text-sm tracking-wide mb-1">{title}</h4>
                      <p className="font-body text-cream/55 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
