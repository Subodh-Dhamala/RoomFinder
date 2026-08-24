import { useQuery } from '@tanstack/react-query'
import { getMyBookings } from '@/api/bookings.api'

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: getMyBookings,
  })
}