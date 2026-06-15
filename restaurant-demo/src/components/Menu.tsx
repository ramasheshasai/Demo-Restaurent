import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type Category = 'all' | 'starters' | 'mains' | 'drinks' | 'desserts'

interface MenuItem {
  id: number
  name: string
  desc: string
  price: number
  category: Exclude<Category, 'all'>
  veg: boolean
  tag?: string
  image: string
}

const items: MenuItem[] = [
  { id: 1, name: 'Gilafi Seekh Kebab', desc: 'Minced lamb mixed with fresh herbs, chargrilled on skewers', price: 520, category: 'starters', veg: false, tag: 'Chef\'s Pick', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=70&auto=format&fit=crop' },
  { id: 2, name: 'Mushroom Galouti', desc: 'Melt-in-mouth mushroom patties with rose petal chutney', price: 380, category: 'starters', veg: true, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=70&auto=format&fit=crop' },
  { id: 3, name: 'Paneer Tikka', desc: 'Cottage cheese marinated in yogurt & spices, tandoor-fired', price: 420, category: 'starters', veg: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=70&auto=format&fit=crop' },
  { id: 4, name: 'Butter Chicken', desc: 'Slow-cooked chicken in a rich tomato-butter gravy — the classic', price: 680, category: 'mains', veg: false, tag: 'Bestseller', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=70&auto=format&fit=crop' },
  { id: 5, name: 'Dal Makhani', desc: 'Black lentils slow-cooked overnight with cream and spices', price: 480, category: 'mains', veg: true, image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=70&auto=format&fit=crop' },
  { id: 6, name: 'Rogan Josh', desc: 'Kashmiri lamb curry with aromatic whole spices', price: 760, category: 'mains', veg: false, tag: 'Signature', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=70&auto=format&fit=crop' },
  { id: 7, name: 'Palak Paneer', desc: 'Cottage cheese in silky spiced spinach purée', price: 440, category: 'mains', veg: true, image: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&q=70&auto=format&fit=crop' },
  { id: 8, name: 'Saffron Old Fashioned', desc: 'Bourbon, saffron syrup, orange bitters, smoke', price: 620, category: 'drinks', veg: true, tag: 'Signature', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=70&auto=format&fit=crop' },
  { id: 9, name: 'Masala Chai Martini', desc: 'Vodka, masala chai reduction, cardamom foam', price: 580, category: 'drinks', veg: true, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=70&auto=format&fit=crop' },
  { id: 10, name: 'Mango Lassi Colada', desc: 'Alphonso mango, coconut cream, yogurt blend', price: 320, category: 'drinks', veg: true, image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=70&auto=format&fit=crop' },
  { id: 11, name: 'Gulab Jamun Cheesecake', desc: 'New York cheesecake with gulab jamun, rose compote', price: 380, category: 'desserts', veg: true, tag: 'Chef\'s Pick', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=70&auto=format&fit=crop' },
  { id: 12, name: 'Kulfi Trio', desc: 'House-made pistachio, mango & rose kulfis on skewer', price: 340, category: 'desserts', veg: true, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=70&auto=format&fit=crop' },
]

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

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative bg-charcoal-2 border border-white/5 hover:border-gold/30 transition-all duration-400 overflow-hidden"
    >
      {/* Image */}
      <div className="overflow-hidden aspect-[4/3] relative">
        <img
          src={item.image}
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

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <VegBadge veg={item.veg} />
            <h3 className="font-display text-lg text-cream font-medium leading-tight">{item.name}</h3>
          </div>
          <span className="font-body text-gold font-semibold text-sm flex-shrink-0">₹{item.price}</span>
        </div>
        <p className="font-body text-cream/50 text-xs leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Menu() {
  const [active, setActive] = useState<Category>('all')
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  const filtered = active === 'all' ? items : items.filter((i) => i.category === active)

  return (
    <section id="menu" className="section-pad bg-charcoal-2">
      <div className="container-max">
        {/* Header */}
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
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
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
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View full menu CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="btn-outline">
            Download Full Menu (PDF)
          </button>
        </motion.div>
      </div>
    </section>
  )
}
