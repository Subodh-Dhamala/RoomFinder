import api from './axios'
import type { ListingImage } from '@/types/listing'

export const uploadImages = async (files: File[]): Promise<ListingImage[]> => {
  const formData = new FormData()
  files.forEach(file => formData.append('images', file))

  const res = await api.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return res.data
}