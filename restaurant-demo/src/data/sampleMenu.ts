import type { MenuItem } from '../types'

export const sampleMenu: MenuItem[] = [
  { id: 1, name: 'Gilafi Seekh Kebab', desc: 'Minced lamb mixed with fresh herbs, chargrilled on skewers', price: 520, category: 'starters', veg: false, tag: "Chef's Pick", active: true },
  { id: 2, name: 'Mushroom Galouti', desc: 'Melt-in-mouth mushroom patties with rose petal chutney', price: 380, category: 'starters', veg: true, tag: 'Bestseller', active: true },
  { id: 3, name: 'Paneer Tikka', desc: 'Cottage cheese marinated in yogurt & spices, tandoor-fired', price: 420, category: 'starters', veg: true, active: true },
  { id: 4, name: 'Butter Chicken', desc: 'Slow-cooked chicken in a rich tomato-butter gravy — the classic', price: 680, category: 'mains', veg: false, tag: 'Bestseller', active: true },
  { id: 5, name: 'Dal Makhani', desc: 'Black lentils slow-cooked overnight with cream and spices', price: 480, category: 'mains', veg: true, active: true },
  { id: 6, name: 'Rogan Josh', desc: 'Kashmiri lamb curry with aromatic whole spices', price: 760, category: 'mains', veg: false, tag: 'Signature', active: true },
  { id: 7, name: 'Palak Paneer', desc: 'Cottage cheese in silky spiced spinach purée', price: 440, category: 'mains', veg: true, active: true },
  { id: 8, name: 'Saffron Old Fashioned', desc: 'Bourbon, saffron syrup, orange bitters, smoke', price: 620, category: 'drinks', veg: true, tag: 'Signature', active: true },
  { id: 9, name: 'Masala Chai Martini', desc: 'Vodka, masala chai reduction, cardamom foam', price: 580, category: 'drinks', veg: true, active: true },
  { id: 10, name: 'Mango Lassi Colada', desc: 'Alphonso mango, coconut cream, yogurt blend', price: 320, category: 'drinks', veg: true, active: true },
  { id: 11, name: 'Gulab Jamun Cheesecake', desc: 'New York cheesecake with gulab jamun, rose compote', price: 380, category: 'desserts', veg: true, tag: "Chef's Pick", active: true },
  { id: 12, name: 'Kulfi Trio', desc: 'House-made pistachio, mango & rose kulfis on skewer', price: 340, category: 'desserts', veg: true, active: true },
]
