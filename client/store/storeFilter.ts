import {create} from 'zustand';

interface FilterState {
  search: string,
  location: string,
  minPrice: string,
  maxPrice: string,
  page: number

  setFilter :(key: 'search' | 'location' | 'minPrice' | 'maxPrice', value:string ) => void
  setPage: (page:number) => void
  reset: ()=> void

}

export const useFilterStore = create<FilterState>((set) =>({

search : '',
location: '',
minPrice: '',
maxPrice: '',
page: 1,

setFilter: (key,value) => set((state) => ({ ...state, [key] : value, page: 1})),
setPage: (page) => set({page}),
reset: () => set({ search: '', location: '', minPrice: '', maxPrice: '', page: 1 }),

}
));