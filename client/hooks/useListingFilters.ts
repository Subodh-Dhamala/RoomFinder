import { useFilterStore } from "@/store/FilterStore"
import { useDebounce } from 'use-debounce'

export function useListingFilters() {
  const { search, minPrice, maxPrice, page } = useFilterStore()
  const [debouncedSearch] = useDebounce(search, 400)

  return {
    search: debouncedSearch,
    minPrice,
    maxPrice,
    page,
  }
}