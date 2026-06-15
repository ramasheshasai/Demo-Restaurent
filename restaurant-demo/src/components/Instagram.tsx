import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram as InstagramIcon, Heart, MessageCircle } from 'lucide-react'

const posts = [
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=75&auto=format&fit=crop', likes: '1.2K', comments: '34' },
  { src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=75&auto=format&fit=crop', likes: '987', comments: '21' },
  { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=75&auto=format&fit=crop', likes: '2.1K', comments: '58' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=75&auto=format&fit=crop', likes: '1.8K', comments: '42' },
  { src: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=75&auto=format&fit=crop', likes: '3.4K', comments: '76' },
  { src: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=75&auto=format&fit=crop', likes: '765', comments: '18' },
]

export default function Instagram() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true })

  return (
    <section className="section-pad bg-charcoal-2">
      <div className="container-max">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <InstagramIcon size={20} className="text-gold" strokeWidth={1.5} />
            <p className="section-label">@saffronandspice.blr</p>
          </div>
          <h2 className="section-title text-cream mt-1">
            Follow Our <span className="italic text-gold">Journey</span>
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-cream/55 text-sm">Tag us for a chance to be featured · #SaffronAndSpice</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {posts.map((p, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="relative overflow-hidden aspect-square group block"
              aria-label={`Instagram post with ${p.likes} likes`}
            >
              <img
                src={p.src}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/70 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-1 text-cream text-sm font-body">
                  <Heart size={14} className="fill-cream" />
                  <span>{p.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-cream text-sm font-body">
                  <MessageCircle size={14} className="fill-cream" />
                  <span>{p.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            <InstagramIcon size={14} />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}
