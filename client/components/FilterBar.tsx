'use client'

import { useFilterStore } from '@/store/FilterStore';
import { FiSearch, FiMapPin, FiX } from 'react-icons/fi'

export default function FilterBar() {
  const { search, location, minPrice, maxPrice, setFilter, reset } = useFilterStore()

  const hasFilters = Boolean(search || location || minPrice || maxPrice)

  return (
    <div className="flex flex-wrap items-center gap-3 px-gutter py-4 border-b border-outline-variant bg-surface">
      <div className="relative">
        <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
        <input
          placeholder="Search rooms..."
          value={search}
          onChange={e => setFilter('search', e.target.value)}
          className="pl-8 pr-3 py-2 text-sm border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-48"
        />
      </div>

      <div className="relative">
        <FiMapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
        <input
          placeholder="Location"
          value={location}
          onChange={e => setFilter('location', e.target.value)}
          className="pl-8 pr-3 py-2 text-sm border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-36"
        />
      </div>

      <input
        placeholder="Min price"
        type="number"
        value={minPrice}
        onChange={e => setFilter('minPrice', e.target.value)}
        className="px-3 py-2 text-sm border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-28"
      />

      <input
        placeholder="Max price"
        type="number"
        value={maxPrice}
        onChange={e => setFilter('maxPrice', e.target.value)}
        className="px-3 py-2 text-sm border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-28"
      />

      {hasFilters && (
        <button
          onClick={reset}
          className="flex items-center gap-1 text-sm text-outline hover:text-on-surface"
        >
          <FiX size={14} />
          Clear
        </button>
      )}
    </div>
  )
}