import { useState, useEffect } from 'react'
import type { MenuItem } from '../types'
import { SHEET_CSV_URL, USE_SAMPLE_DATA } from '../config'
import { sampleMenu } from '../data/sampleMenu'

// Parses a single CSV row respecting quoted fields
function parseRow(row: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < row.length; i++) {
    const ch = row[i]
    if (ch === '"') {
      inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current.trim())
  return result
}

function parseCSV(csv: string): MenuItem[] {
  const lines = csv.split('\n').filter(l => l.trim())
  // skip header row
  return lines
    .slice(1)
    .map((line, i) => {
      const [name, desc, price, category, veg, tag, active] = parseRow(line)
      return {
        id: i + 1,
        name: name || '',
        desc: desc || '',
        price: Number(price) || 0,
        category: (category?.toLowerCase() as MenuItem['category']) || 'mains',
        veg: veg?.toUpperCase() === 'TRUE',
        tag: tag || undefined,
        active: active?.toUpperCase() !== 'FALSE',
      }
    })
    .filter(item => item.name && item.active)
}

export function useMenuData() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (USE_SAMPLE_DATA || SHEET_CSV_URL.includes('YOUR_SHEET_ID')) {
      setItems(sampleMenu)
      setLoading(false)
      return
    }

    const controller = new AbortController()

    fetch(SHEET_CSV_URL, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch sheet')
        return res.text()
      })
      .then(csv => {
        const parsed = parseCSV(csv)
        setItems(parsed.length > 0 ? parsed : sampleMenu)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        console.error('Sheet fetch error:', err)
        setError('Could not load menu from sheet. Showing sample menu.')
        setItems(sampleMenu)
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return { items, loading, error }
}
