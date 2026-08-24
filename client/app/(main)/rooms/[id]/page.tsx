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
import { FiHeart, FiImage, FiMapPin } from 'react-icons/fi'

export default function RoomDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id ? decodeURIComponent(params.id).trim() : ''

  const { user } = useUser()
  const role = user?.publicMetadata?.role as string | undefined

  const { data: room, isLoading, isError } = useListing(id)
  const { isWishlisted, add, remove } = useWishlist(role === 'tenant')
  const [showBooking, setShowBooking] = useState(false)

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl px-gutter py-lg">
        <SkeletonGrid />
      </main>
    )
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-4xl px-gutter py-lg">
        <ErrorState message="Failed to load room." />
      </main>
    )
  }

  if (!room) return null

  const images = room.images?.filter((image) => Boolean(image?.url)) ?? []
  const wishlisted = isWishlisted(room._id)

  const handleWishlist = () => {
    if (wishlisted) {
      remove.mutate(room._id)
    } else {
      add.mutate(room._id)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-gutter py-lg">
      <section className="overflow-hidden rounded-lg border border-outline-variant/50 bg-surface-container-lowest">
        {images.length > 0 ? (
          <div
            className={`grid gap-1 bg-surface-container ${
              images.length === 1
                ? 'grid-cols-1'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {images.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className="relative aspect-[16/10] overflow-hidden bg-surface-container"
              >
                <Image
                  src={image.url}
                  alt={`${room.title} image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 hover:scale-[1.01]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex aspect-[16/7] min-h-52 flex-col items-center justify-center gap-sm text-on-surface-variant">
            <FiImage size={30} className="text-outline" />
            <p className="text-body-sm">No images added for this listing</p>
          </div>
        )}
      </section>

      <section className="mt-lg">
        <div className="flex items-start justify-between gap-md">
          <div className="min-w-0">
            <h1 className="text-h3 font-h3 text-on-surface">
              {room.title}
            </h1>

            <div className="mt-1.5 flex items-center gap-1.5 text-body-sm text-on-surface-variant">
              <FiMapPin size={14} className="shrink-0" />
              <span className="truncate">{room.location}</span>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-body-lg font-semibold text-primary">
              Rs. {room.price.toLocaleString()}
            </p>
            <p className="text-caption text-on-surface-variant">
              / month
            </p>
          </div>
        </div>

        {room.description && (
          <div className="mt-md border-t border-outline-variant/40 pt-md">
            <h2 className="mb-xs text-label-sm font-semibold text-on-surface">
              About this room
            </h2>

            <p className="max-w-3xl text-body-sm leading-relaxed text-on-surface-variant">
              {room.description}
            </p>
          </div>
        )}

        {role === 'tenant' && (
          <div className="mt-lg flex items-center gap-sm border-t border-outline-variant/40 pt-md">
            <button
              type="button"
              onClick={() => setShowBooking(true)}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-lg text-label-sm font-label-sm text-on-primary transition-colors hover:bg-primary-container"
            >
              Book now
            </button>

            <button
              type="button"
              onClick={handleWishlist}
              disabled={add.isPending || remove.isPending}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors disabled:opacity-50 ${
                wishlisted
                  ? 'border-primary/40 bg-primary/5 text-primary'
                  : 'border-outline-variant/60 text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
              title={
                wishlisted
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
              aria-label={
                wishlisted
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
            >
              <FiHeart
                size={16}
                className={wishlisted ? 'fill-primary' : ''}
              />
            </button>
          </div>
        )}
      </section>

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