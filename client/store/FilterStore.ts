import { create } from 'zustand';

interface FilterState {
  search: string
  minPrice: string
  maxPrice: string
  page: number
  setFilter: (key: 'search' | 'minPrice' | 'maxPrice', value: string) => void
  setPage: (page: number) => void
  reset: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  search: '',
  minPrice: '',
  maxPrice: '',
  page: 1,
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value, page: 1 })),
  setPage: (page) => set({ page }),
  reset: () => set({ search: '', minPrice: '', maxPrice: '', page: 1 }),
}))