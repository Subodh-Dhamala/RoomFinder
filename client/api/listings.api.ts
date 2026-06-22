import api from './axios';
import type {
  Listing,
  ListingsResponse,
  ListingFilters,
  CreateListingInput,
  UpdateListingInput,
} from '@/types/listing';

export const getListing = async (id: string): Promise<Listing> => {
  const res = await api.get(`/api/listings/${id}`)
  return res.data
}

export const getListings = async(filters: {}): Promise <ListingsResponse> =>{
  const res = await api.get('/api/listings',{params: filters});
  return res.data;

}

export const createListing = async(data: CreateListingInput) : Promise<Listing> =>{
  const res = await api.post('/api/listings',data);
  return res.data;
}

export const updateListing = async (id: string, data: UpdateListingInput): Promise<Listing> => {
  const res = await api.patch(`/api/listings/${id}`, data)
  return res.data
}

export const deleteListing = async (id: string): Promise<void> => {
  await api.delete(`/api/listings/${id}`)
}

export const getMyListings = async (): Promise<ListingsResponse> => {
  const res = await api.get('/api/listings/mine')
  return res.data
}