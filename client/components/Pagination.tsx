'use client'

import { useFilterStore } from '@/store/FilterStore'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface PaginationProps {
  totalPages: number
  isLoading?: boolean
}

export default function Pagination({ totalPages, isLoading = false }: PaginationProps) {
  const { page, setPage } = useFilterStore()

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        type="button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1 || isLoading}
        aria-label="Previous page"
        className="p-2 rounded-lg border border-outline-variant disabled:opacity-40 hover:bg-surface-container"
      >
        <FiChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1
        return (
          <button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            disabled={isLoading || p === page}
            aria-current={p === page ? 'page' : undefined}
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
        type="button"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages || isLoading}
        aria-label="Next page"
        className="p-2 rounded-lg border border-outline-variant disabled:opacity-40 hover:bg-surface-container"
      >
        <FiChevronRight size={16} />
      </button>

      {isLoading && (
        <span className="text-sm text-on-surface-variant" role="status">
          Loading...
        </span>
      )}
    </div>
  )
}