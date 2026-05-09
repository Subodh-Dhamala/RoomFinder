import { useQuery } from '@tanstack/react-query'
import { getListings } from '@/api/listings.api'
import type { ListingFilters } from '@/types/listing'

export function useListings(filters: ListingFilters = {}) {
  return useQuery({
    queryKey: [
      'listings',
      filters.search,
      filters.location,
      filters.minPrice,
      filters.maxPrice,
      filters.page,
      filters.limit,
    ],
    queryFn: () => getListings(filters),
    staleTime: 1000 * 60,
  })
}