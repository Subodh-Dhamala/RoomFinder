'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getIncomingBookings, updateBookingStatus } from '@/api/bookings.api'
import type { BookingStatus } from '@/api/bookings.api'
import StatusBadge from '@/components/StatusBadge'
import EmptyState from '@/components/EmptyState'
import ErrorState from '@/components/ErrorState'
import SkeletonGrid from '@/components/SkeletonGrid'
import toast from 'react-hot-toast'

export default function LandlordBookingsPage() {
  const queryClient = useQueryClient()

  const { data: bookings, isLoading, isError } = useQuery({
    queryKey: ['incoming-bookings'],
    queryFn: getIncomingBookings,
  })

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      updateBookingStatus(id, status),
    onSuccess: () => {
      toast.success('Booking updated')
      queryClient.invalidateQueries({ queryKey: ['incoming-bookings'] })
    },
    onError: () => toast.error('Failed to update booking'),
  })

  if (isLoading) return <main className="p-gutter"><SkeletonGrid /></main>
  if (isError) return <main className="p-gutter"><ErrorState message="Failed to load bookings." /></main>

  return (
    <main className="max-w-4xl mx-auto px-gutter py-lg">
      <h1 className="text-h2 font-h2 text-on-surface mb-lg">Incoming Bookings</h1>

      {!bookings?.length ? (
        <EmptyState
          message="No bookings yet"
          subMessage="Bookings from tenants will appear here"
        />
      ) : (
        <div className="flex flex-col gap-md">
          {bookings.map(booking => (
            <div
              key={booking._id}
              className="border border-outline-variant rounded-xl p-md bg-white flex flex-col gap-sm"
            >
              {/* Room info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-h3 font-h3 text-on-surface">
                    {booking.roomId.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant">
                    {booking.roomId.location}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              {/* Tenant info */}
              <div className="border-t border-outline-variant/30 pt-sm">
                <p className="text-body-md text-on-surface-variant">
                  <span className="font-medium text-on-surface">Tenant: </span>
                  {booking.tenantId.name} — {booking.tenantId.email}
                </p>
                {booking.message && (
                  <p className="text-body-md text-on-surface-variant mt-xs">
                    <span className="font-medium text-on-surface">Message: </span>
                    {booking.message}
                  </p>
                )}
              </div>

              {/* Actions — only show if pending */}
              {booking.status === 'pending' && (
                <div className="flex gap-sm pt-xs">
                  <button
                    onClick={() => updateStatus({ id: booking._id, status: 'accepted' })}
                    disabled={isPending}
                    className="flex-1 bg-primary text-on-primary py-sm rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-colors disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus({ id: booking._id, status: 'rejected' })}
                    disabled={isPending}
                    className="flex-1 border border-error text-error py-sm rounded-lg text-label-sm font-label-sm hover:bg-error-container transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}