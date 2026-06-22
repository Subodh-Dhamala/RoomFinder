'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import StatusBadge from '@/components/StatusBadge'
import EmptyState from '@/components/EmptyState'
import ErrorState from '@/components/ErrorState'
import SkeletonGrid from '@/components/SkeletonGrid'
import toast from 'react-hot-toast'
import Link from 'next/link' // ✅ import Link for client-side navigation

export default function LandlordBookingsPage() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  const { data: bookings, isLoading, isError } = useQuery({
    queryKey: ['incoming-bookings'],
    queryFn: async () => {
      const token = await getToken()
      const response = await axios.get('http://localhost:5000/api/bookings/incoming', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: false
      })
      return response.data
    },
  })

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'accepted' | 'rejected' }) => {
      const token = await getToken()
      const response = await axios.patch(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: false
        }
      )
      return response.data
    },
    onSuccess: () => {
      toast.success('Booking updated')
      queryClient.invalidateQueries({ queryKey: ['incoming-bookings'] })
    },
    onError: (error: any) => {
      const serverMessage = error.response?.data?.message || 'Failed to update booking'
      toast.error(serverMessage)
    },
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
          {bookings.map((booking: any) => (
            <div
              key={booking._id}
              className="border border-outline-variant rounded-xl p-md bg-white flex flex-col gap-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-h3 font-h3 text-on-surface">
                    {booking.roomId?.title || 'Unknown Room'}
                  </h3>
                  <p className="text-body-md text-on-surface-variant">
                    {booking.roomId?.location || 'No location provided'}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              <div className="border-t border-outline-variant/30 pt-sm">
                <p className="text-body-md text-on-surface-variant">
                  <span className="font-medium text-on-surface">Tenant: </span>
                  {/* ✅ Clickable tenant name */}
                  {booking.tenantId?._id ? (
                    <Link
                      href={`/profile/${booking.tenantId._id}`}
                      className="text-primary hover:underline"
                    >
                      {booking.tenantId?.name || booking.tenantId?.username || 'Unknown Tenant'}
                    </Link>
                  ) : (
                    <span>{booking.tenantId?.name || booking.tenantId?.username || 'Unknown Tenant'}</span>
                  )}
                  {' — '}
                  {booking.tenantId?.email || 'No Email'}
                </p>
                {booking.message && (
                  <p className="text-body-md text-on-surface-variant mt-xs">
                    <span className="font-medium text-on-surface">Message: </span>
                    {booking.message}
                  </p>
                )}
              </div>

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