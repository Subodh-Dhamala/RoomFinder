import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'

export const useBookings = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const token = await getToken()
      const response = await axios.get('http://localhost:5000/api/bookings/mine', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: false,
      })
      return response.data
    },
  })
}