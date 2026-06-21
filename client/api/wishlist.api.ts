import api from './axios'
import type { Listing } from '@/types/listing'

export const getWishlist = async (): Promise<Listing[]> => {
  const res = await api.get('/api/wishlist')
  return res.data
}

export const addToWishlist = async (roomId: string): Promise<void> => {
  await api.post(`/api/wishlist/${roomId}`)
}

export const removeFromWishlist = async (roomId: string): Promise<void> => {
  await api.delete(`/api/wishlist/${roomId}`)
}