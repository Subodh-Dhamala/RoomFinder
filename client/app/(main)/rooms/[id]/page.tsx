'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useListing } from '@/hooks/useListing'
import { useWishlist } from '@/hooks/useWishlist'
import BookingModal from '@/components/BookingModal'
import SkeletonGrid from '@/components/SkeletonGrid'
import ErrorState from '@/components/ErrorState'
import { FiMapPin, FiHeart } from 'react-icons/fi'

export default function RoomDetailPage() {
  const params = useParams<{ id: string }>()
  
  const id = params?.id ? decodeURIComponent(params.id).trim() : ''

  const { user } = useUser()
  const role = user?.publicMetadata?.role as string | undefined

  const { data: room, isLoading, isError } = useListing(id)
  const { isWishlisted, add, remove } = useWishlist(role === 'tenant')
  const [showBooking, setShowBooking] = useState(false)

  if (isLoading) return <main className="p-gutter"><SkeletonGrid /></main>
  if (isError) return <main className="p-gutter"><ErrorState message="Failed to load room." /></main>
  if (!room) return null

  const wishlisted = isWishlisted(room._id)

  const handleWishlist = () => {
    if (wishlisted) {
      remove.mutate(room._id)
    } else {
      add.mutate(room._id)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-gutter py-lg">

      {/* Images */}
      {room.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm mb-lg rounded-xl overflow-hidden">
          {room.images.map((img, i) => (
            <div key={i} className="relative aspect-4/3 bg-surface-container">
              <Image
                src={img.url}
                alt={`${room.title} image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Title + price */}
      <div className="flex justify-between items-start mb-sm">
        <h1 className="text-h2 font-h2 text-on-surface">{room.title}</h1>
        <div className="text-right shrink-0 ml-4">
          <span className="text-h3 font-h3 text-primary">
            Rs. {room.price.toLocaleString()}
          </span>
          <span className="text-caption text-on-surface-variant">/month</span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-xs text-on-surface-variant text-body-md mb-md">
        <FiMapPin size={16} />
        <span>{room.location}</span>
      </div>

      {/* Description */}
      {room.description && (
        <p className="text-body-md text-on-surface-variant leading-relaxed mb-lg">
          {room.description}
        </p>
      )}

      {/* Actions — tenant only */}
      {role === 'tenant' && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBooking(true)}
            className="bg-primary text-on-primary px-lg py-md rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-colors"
          >
            Book Now
          </button>
          <button
            onClick={handleWishlist}
            disabled={add.isPending || remove.isPending}
            className={`p-3 rounded-lg border transition-colors disabled:opacity-50 ${
              wishlisted
                ? 'border-primary text-primary bg-primary/5'
                : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
            }`}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart className={wishlisted ? 'fill-primary' : ''} size={18} />
          </button>
        </div>
      )}

      {/* Booking modal */}
      {showBooking && (
        <BookingModal
          listingId={room._id}
          listingTitle={room.title}
          price={room.price}
          onClose={() => setShowBooking(false)}
        />
      )}
    </main>
  )
}