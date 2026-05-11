'use client'

import { useFilterStore } from '@/store/FilterStore'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface PaginationProps {
  totalPages: number
}

export default function Pagination({ totalPages }: PaginationProps) {
  const { page, setPage } = useFilterStore()

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg border border-outline-variant disabled:opacity-40 hover:bg-surface-container"
      >
        <FiChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1
        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors ${
              p === page
                ? 'bg-primary text-on-primary border-primary'
                : 'border-outline-variant hover:bg-surface-container'
            }`}
          >
            {p}
          </button>
        )
      })}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg border border-outline-variant disabled:opacity-40 hover:bg-surface-container"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  )
}