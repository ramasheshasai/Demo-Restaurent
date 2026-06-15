export type Category = 'all' | 'starters' | 'mains' | 'drinks' | 'desserts'

export interface MenuItem {
  id: number
  name: string
  desc: string
  price: number
  category: Exclude<Category, 'all'>
  veg: boolean
  tag?: string
  active: boolean
}
