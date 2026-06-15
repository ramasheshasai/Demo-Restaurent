import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import type { Category, MenuItem } from '../types'
import { useMenuData } from '../hooks/useMenuData'

// Category images pool — cycles through so items look varied
const categoryImages: Record<Exclude<Category, 'all'>, string[]> = {
  starters: [
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=70&auto=format&fit=crop',
  ],
  mains: [
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&q=70&auto=format&fit=crop',
  ],
  drinks: [
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=70&auto=format&fit=crop',
  ],
  desserts: [
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=70&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=70&auto=format&fit=crop',
  ],
}

function getImage(item: MenuItem, indexInCategory: number): string {
  const pool = categoryImages[item.category] ?? categoryImages.mains
  return pool[indexInCategory % pool.length]
}

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'starters', label: 'Starters' },
  { key: 'mains', label: 'Mains' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'desserts', label: 'Desserts' },
]

function VegBadge({ veg }: { veg: boolean }) {
  return (
    <span className={`inline-flex items-center justify-center w-4 h-4 border-2 rounded-sm flex-shrink-0 ${veg ? 'border-green-500' : 'border-red-500'}`}>
      <span className={`w-2 h-2 rounded-full ${veg ? 'bg-green-500' : 'bg-red-500'}`} />
    </span>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-charcoal-2 border border-white/5 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-white/5" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-2/3" />
      </div>
    </div>
  )
}

function MenuCard({ item, indexInCategory, globalIndex }: { item: MenuItem; indexInCategory: number; globalIndex: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const image = getImage(item, indexInCategory)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (globalIndex % 4) * 0.08 }}
      className="group relative bg-charcoal-2 border border-white/5 hover:border-gold/30 transition-all duration-300 overflow-hidden"
    >
      <div className="overflow-hidden aspect-[4/3] relative">
        <img
          src={image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-2 via-transparent to-transparent" />
        {item.tag && (
          <span className="absolute top-3 left-3 bg-gold text-charcoal text-[10px] font-body font-semibold tracking-widest uppercase px-2.5 py-1">
            {item.tag}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <VegBadge veg={item.veg} />
            <h3 className="font-display text-lg text-cream font-medium leading-tight truncate">{item.name}</h3>
          </div>
          <span className="font-body text-gold font-semibold text-sm flex-shrink-0">₹{item.price}</span>
        </div>
        <p className="font-body text-cream/50 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Menu() {
  const [active, setActive] = useState<Category>('all')
  const { items, loading, error } = useMenuData()
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const filtered = active === 'all' ? items : items.filter(i => i.category === active)

  // Track per-category index for image assignment
  const categoryCounters: Record<string, number> = {}
  const enriched = filtered.map(item => {
    categoryCounters[item.category] = (categoryCounters[item.category] ?? 0)
    const idx = categoryCounters[item.category]++
    return { item, idx }
  })

  return (
    <section id="menu" className="section-pad bg-charcoal-2">
      <div className="container-max">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="section-label">Culinary Journey</p>
          <h2 className="section-title text-cream mt-3">
            Our <span className="italic text-gold">Menu</span>
          </h2>
          <div className="gold-divider" />
          <p className="font-body text-cream/60 max-w-lg mx-auto text-sm leading-relaxed">
            Each dish is a story — of tradition, of travel, of the hands that shaped it.
            All prices inclusive of taxes.
          </p>
          {error && (
            <p className="font-body text-amber-400/70 text-xs mt-3">{error}</p>
          )}
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`font-body text-xs tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 cursor-pointer ${
                active === c.key
                  ? 'bg-gold text-charcoal font-semibold'
                  : 'border border-gold/30 text-cream/60 hover:border-gold hover:text-gold'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {enriched.map(({ item, idx }, globalIndex) => (
                <MenuCard key={item.id} item={item} indexInCategory={idx} globalIndex={globalIndex} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
