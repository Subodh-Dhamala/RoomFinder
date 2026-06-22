'use client'

import Image from 'next/image'
import { useBookings } from '@/hooks/useBookings'
import StatusBadge from '@/components/StatusBadge'
import { FiHome, FiMapPin } from 'react-icons/fi'

export default function TenantBookingsPage() {
  const { data: bookings = [], isLoading, isError } = useBookings()

  if (isLoading) return <BookingsSkeleton />

  if (isError) {
    return (
      <main className="max-w-4xl mx-auto px-gutter py-lg text-center">
        <p className="text-on-surface-variant">Could not load your bookings.</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-gutter py-lg">
      <div className="mb-lg">
        <h1 className="text-h2 font-h2 text-on-surface">My Bookings</h1>
        <p className="text-caption text-on-surface-variant mt-1">
          {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
        </p>
      </div>

      {bookings.length === 0 && (
        <div 
          className="w-full flex flex-col items-center justify-center text-center border border-dashed border-outline-variant rounded-xl bg-surface-container-low"
          style={{ padding: '3rem 1.5rem' }}
        >
          <FiHome 
            className="text-outline-variant" 
            style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }} 
          />
          
          <h2 
            className="text-on-surface font-bold"
            style={{ 
              display: 'block', 
              width: '100%', 
              fontSize: '1.25rem', 
              marginBottom: '0.5rem',
              whiteSpace: 'normal' 
            }}
          >
            No bookings yet
          </h2>
          
          <p 
            className="text-on-surface-variant"
            style={{ 
              display: 'block', 
              width: '100%', 
              maxWidth: '440px', 
              margin: '0 auto', 
              fontSize: '0.875rem',
              lineHeight: '1.5',
              whiteSpace: 'normal',
              wordBreak: 'break-word'
            }}
          >
            Browse rooms and send a booking request to get started.
          </p>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="space-y-sm">
          {bookings.map((booking: any) => {
            // BACKEND ALIGNMENT: Fallback check for roomId or room if listing is undefined
            const listing = booking.listing || booking.roomId || booking.room
            if (!listing || typeof listing === 'string') return null

            const cover = listing.images?.[0]?.url

            return (
              <div
                key={booking._id}
                className="bg-surface border border-outline-variant rounded-xl p-sm flex flex-col sm:flex-row sm:items-center gap-sm transition-all hover:shadow-sm"
              >
                <div className="relative w-full sm:w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={listing.title || 'Room image'}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline-variant">
                      <FiHome className="text-xl" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-xs">
                  <p className="text-body-md font-medium text-on-surface truncate">
                    {listing.title}
                  </p>
                  <p className="text-body-sm text-on-surface-variant flex items-center gap-xs truncate">
                    <FiMapPin className="shrink-0 text-on-surface-variant" size={14} />
                    <span>{listing.location}</span>
                  </p>
                  <p className="text-body-sm text-primary font-medium">
                    Rs. {listing.price?.toLocaleString()} <span className="text-caption text-on-surface-variant font-normal">/ month</span>
                  </p>
                </div>

                <div className="shrink-0 sm:pl-md flex items-center">
                  <StatusBadge status={booking.status} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

function BookingsSkeleton() {
  return (
    <main className="max-w-4xl mx-auto px-gutter py-lg">
      <div className="space-y-xs mb-lg">
        <div className="h-7 w-36 bg-surface-container rounded-lg animate-pulse" />
        <div className="h-4 w-20 bg-surface-container rounded animate-pulse" />
      </div>
      <div className="space-y-sm">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-surface border border-outline-variant rounded-xl p-sm flex flex-col sm:flex-row gap-sm">
            <div className="w-full sm:w-24 h-20 rounded-lg bg-surface-container animate-pulse shrink-0" />
            <div className="flex-1 space-y-xs py-xs">
              <div className="h-4 w-48 bg-surface-container rounded animate-pulse" />
              <div className="h-3 w-32 bg-surface-container rounded animate-pulse" />
              <div className="h-3 w-24 bg-surface-container rounded animate-pulse" />
            </div>
            <div className="h-7 w-20 bg-surface-container rounded-full animate-pulse self-start sm:self-center shrink-0" />
          </div>
        ))}
      </div>
    </main>
  )
}