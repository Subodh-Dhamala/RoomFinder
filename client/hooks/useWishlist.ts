import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWishlist, addToWishlist, removeFromWishlist } from '@/api/wishlist.api'
import toast from 'react-hot-toast'

export const useWishlist = (enabled = true) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    enabled,
  })

  const add = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      toast.success('Added to wishlist')
    },
    onError: () => toast.error('Failed to add to wishlist'),
  })

  const remove = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      toast.success('Removed from wishlist')
    },
    onError: () => toast.error('Failed to remove from wishlist'),
  })

  const isWishlisted = (roomId: string) => {
    if (!query.data || !Array.isArray(query.data)) return false

    return query.data.some((item: any) => {
      if (!item) return false
      
      // Handles both populated objects and unpopulated string IDs gracefully
      const targetId = item.roomId && typeof item.roomId === 'object'
        ? item.roomId._id
        : item.roomId

      return targetId?.toString() === roomId?.toString()
    })
  }

  return { ...query, add, remove, isWishlisted }
}