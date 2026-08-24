import api from './axios'

export type BookingStatus = 'pending' | 'accepted' | 'rejected'

export interface Booking {
  _id: string
  roomId: {
    _id: string
    title: string
    location: string
    price: number
    images: { url: string; public_id: string }[]
  } | string | null
  tenantId: {
    _id: string
    name: string
    email: string
  }
  message: string
  status: BookingStatus
  createdAt: string
}

export const getIncomingBookings = async (): Promise<Booking[]> => {
  const res = await api.get('/api/bookings/incoming')
  return res.data
}

export const getMyBookings = async (): Promise<Booking[]> => {
  const res = await api.get('/api/bookings/mine')
  return res.data
}

export const createBooking = async (roomId: string, message: string): Promise<Booking> => {
  const res = await api.post('/api/bookings', { roomId, message })
  return res.data
}

export const updateBookingStatus = async (id: string, status: BookingStatus): Promise<Booking> => {
  const res = await api.patch(`/api/bookings/${id}/status`, { status })
  return res.data
}