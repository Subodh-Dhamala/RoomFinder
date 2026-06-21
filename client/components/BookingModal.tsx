'use client'

import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

interface BookingModalProps {
  listingId: string
  listingTitle: string
  price: number
  onClose: () => void
}

export default function BookingModal({ listingId, listingTitle, price, onClose }: BookingModalProps) {
  const queryClient = useQueryClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  const createBookingMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        roomId: listingId
      }, { withCredentials: true })
      return response.data
    },
    onMutate: () => {
      setIsSubmitting(true)
    },
    onSuccess: () => {
      toast.success('Booking request sent successfully!')
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      onClose()
    },
    onError: (error: any) => {
      const serverMessage = error.response?.data?.message || 'Failed to send request.'
      toast.error(serverMessage)
    },
    onSettled: () => {
      setIsSubmitting(false)
    }
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={isSubmitting ? undefined : onClose} />

      <div 
        className="relative w-full bg-surface text-on-surface rounded-xl shadow-xl z-10 flex flex-col p-6 border border-outline-variant max-h-[90vh]"
        style={{ maxWidth: '440px', minWidth: '320px' }}
      >
        <div className="flex items-center justify-between pb-sm border-b border-outline-variant mb-sm shrink-0">
          <div>
            <h3 className="text-h3 font-h3 text-on-surface">Confirm Booking</h3>
            <p className="text-caption text-on-surface-variant">Send a reservation request to the landlord</p>
          </div>
          <button 
            onClick={onClose} 
            disabled={isSubmitting}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-xs space-y-sm my-xs min-h-0">
          <div className="bg-surface-container p-sm rounded-lg">
            <p className="text-caption font-bold text-on-surface-variant uppercase tracking-wider mb-1">Room Selected</p>
            <p className="text-body-md font-medium text-on-surface mb-2">{listingTitle}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-h2 font-h2 text-primary">Rs. {price.toLocaleString()}</span>
              <span className="text-caption text-on-surface-variant">/month</span>
            </div>
          </div>

          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            Your request will be sent to the landlord. You will be notified via your dashboard system once they accept or reject your active booking application.
          </p>
        </div>

        <div className="flex items-center gap-3 justify-end pt-sm border-t border-outline-variant shrink-0 mt-xs">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-md py-sm border border-outline-variant text-on-surface rounded-lg text-label-sm font-label-sm hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={() => createBookingMutation.mutate()}
            disabled={isSubmitting}
            className="px-md py-sm bg-primary text-on-primary rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center justify-center min-w-[120px]"
          >
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </button>
        </div>

      </div>
    </div>
  )
}