import { useFilterStore } from "@/store/FilterStore";

import {useDebounce} from 'use-debounce';

export function useListingFilters(){
  const {search, location, minPrice, maxPrice, page} = useFilterStore();

  const  [debouncedSearch] = useDebounce(search, 400);
  const [debouncedLocation] = useDebounce(location, 400);

  return {

    search: debouncedSearch,
    location: debouncedLocation,
    minPrice,
    maxPrice,
    page,

  }
}