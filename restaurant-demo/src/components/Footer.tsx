import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

const navCols = [
  {
    heading: 'Explore',
    links: ['About Us', 'Our Menu', 'Gallery', 'Events & Banquets', 'Reservations'],
    hrefs: ['#about', '#menu', '#gallery', '#events', '#reservations'],
  },
  {
    heading: 'Services',
    links: ['Fine Dining', 'Private Dining', 'Wedding Banquets', 'Corporate Events', 'Live Music Nights'],
    hrefs: ['#', '#', '#events', '#events', '#events'],
  },
]

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal border-t border-white/5">
      <div className="container-max px-4 md:px-8 lg:px-16 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl font-light text-cream mb-2">
              Saffron<span className="text-gold">&</span>Spice
            </h3>
            <div className="w-12 h-px bg-gold mb-5" />
            <p className="font-body text-cream/55 text-sm leading-relaxed mb-6">
              Fine Indian dining in the heart of Bengaluru. Where every meal becomes a memory.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-gold/30 flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold transition-colors duration-200"
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.heading}>
              <h4 className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((link, i) => (
                  <li key={link}>
                    <a
                      href={col.hrefs[i]}
                      className="font-body text-sm text-cream/55 hover:text-gold transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-5">Contact</h4>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: '42, 12th Main, Banashankari 2nd Stage, Bengaluru — 560070' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: Mail, text: 'hello@saffronandspice.in' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex gap-3 items-start">
                  <Icon size={14} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="font-body text-sm text-cream/55 leading-relaxed">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border border-gold/20 bg-gold/5">
              <p className="font-body text-xs text-cream/60 leading-relaxed">
                <span className="text-gold font-medium">Lunch:</span> 12:00 – 3:00 PM<br />
                <span className="text-gold font-medium">Dinner:</span> 7:00 – 11:00 PM<br />
                <span className="text-cream/40 text-[11px]">Open all 7 days · Last orders 30 min before closing</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/30">
            © 2024 Saffron & Spice. All rights reserved.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xs text-cream/25"
          >
            Crafted with care · Powered by your local web studio
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
