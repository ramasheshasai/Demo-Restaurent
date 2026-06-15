import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const photos = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop', alt: 'Restaurant dining', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&auto=format&fit=crop', alt: 'Plated dish', span: '' },
  { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80&auto=format&fit=crop', alt: 'Chef at work', span: '' },
  { src: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80&auto=format&fit=crop', alt: 'Butter chicken', span: '' },
  { src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80&auto=format&fit=crop', alt: 'Dessert', span: '' },
  { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80&auto=format&fit=crop', alt: 'Cocktails', span: '' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80&auto=format&fit=crop', alt: 'Interior ambience', span: 'col-span-2' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true })

  return (
    <section id="gallery" className="section-pad bg-charcoal">
      <div className="container-max">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="section-label">Visual Journey</p>
          <h2 className="section-title text-cream mt-3">
            A Feast for <span className="italic text-gold">The Eyes</span>
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative overflow-hidden cursor-pointer group ${p.span}`}
              onClick={() => setLightbox(p.src)}
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-cream/70 hover:text-gold transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt="Gallery full view"
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
