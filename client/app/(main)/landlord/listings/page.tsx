'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyListings, deleteListing } from '@/api/listings.api'
import SkeletonGrid from '@/components/SkeletonGrid'
import EmptyState from '@/components/EmptyState'
import ErrorState from '@/components/ErrorState'
import type { Listing } from '@/types/listing'
import {
  FiAlertTriangle,
  FiEdit2,
  FiMapPin,
  FiPlus,
  FiTrash2,
  FiX,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function LandlordListingsPage() {
  const queryClient = useQueryClient()
  const [listingToDelete, setListingToDelete] = useState<Listing | null>(null)

  useEffect(() => {
    if (!listingToDelete) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [listingToDelete])

  useEffect(() => {
    if (!listingToDelete) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isDeleting) {
        setListingToDelete(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [listingToDelete])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['landlord-listings'],
    queryFn: () => getMyListings(),
  })

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteListing(id),
    onSuccess: () => {
      toast.success('Listing deleted')
      setListingToDelete(null)
      queryClient.invalidateQueries({ queryKey: ['landlord-listings'] })
    },
    onError: () => toast.error('Failed to delete listing'),
  })

  if (isLoading) {
    return (
      <main className="mx-auto max-w-container-max px-gutter py-lg">
        <SkeletonGrid />
      </main>
    )
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-container-max px-gutter py-lg">
        <ErrorState message="Failed to load listings." />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-container-max px-gutter py-lg">
      <header className="mb-lg flex flex-col gap-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-sm">
            <h1 className="text-h3 font-h3 text-on-surface">
              My listings
            </h1>

            {data?.rooms?.length ? (
              <span className="rounded-full bg-surface-container px-sm py-0.5 text-caption font-medium text-on-surface-variant">
                {data.rooms.length}
              </span>
            ) : null}
          </div>

          <p className="text-body-sm text-on-surface-variant">
            Manage your available rooms.
          </p>
        </div>

        <Link
          href="/landlord/listings/new"
          className="inline-flex h-9 items-center justify-center gap-xs rounded-lg bg-primary px-md text-label-sm font-label-sm text-on-primary transition-colors hover:bg-primary-container"
        >
          <FiPlus size={15} />
          New listing
        </Link>
      </header>

      {!data?.rooms?.length ? (
        <EmptyState
          message="No listings yet"
          subMessage="Create your first listing to get started"
        />
      ) : (
        <div className="grid grid-cols-1 gap-sm sm:grid-cols-2 lg:grid-cols-3">
          {data.rooms.map((room) => (
            <article
              key={room._id}
              className="group overflow-hidden rounded-lg border border-outline-variant/50 bg-surface-container-lowest transition-all hover:border-outline-variant hover:shadow-sm"
            >
              <div className="relative aspect-[16/8] w-full overflow-hidden bg-surface-container">
                {room.images?.[0]?.url ? (
                  <Image
                    src={room.images[0].url}
                    alt={room.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-caption text-outline">
                    No image
                  </div>
                )}
              </div>

              <div className="p-sm">
                <div className="flex items-start justify-between gap-sm">
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-body-md font-semibold text-on-surface">
                      {room.title}
                    </h2>

                    <div className="mt-1 flex items-center gap-1.5 text-caption text-on-surface-variant">
                      <FiMapPin size={12} className="shrink-0" />
                      <span className="truncate">{room.location}</span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-body-sm font-semibold text-primary">
                      Rs. {room.price.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-on-surface-variant">
                      / month
                    </p>
                  </div>
                </div>

                <div className="mt-sm flex items-center justify-end gap-xs border-t border-outline-variant/40 pt-sm">
                  <Link
                    href={`/landlord/listings/${room._id}/edit`}
                    aria-label={`Edit ${room.title}`}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-outline-variant/60 px-sm text-caption font-medium text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                  >
                    <FiEdit2 size={13} />
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => setListingToDelete(room)}
                    aria-label={`Remove ${room.title}`}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-error/30 px-sm text-caption font-medium text-error transition-colors hover:bg-error-container"
                  >
                    <FiTrash2 size={13} />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {listingToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close delete dialog"
            onClick={() =>
              isDeleting ? undefined : setListingToDelete(null)
            }
            className="absolute inset-0"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-listing-title"
            className="relative z-10 w-full max-w-[360px] rounded-xl border border-outline-variant bg-surface p-5 shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close delete dialog"
              onClick={() => setListingToDelete(null)}
              disabled={isDeleting}
              className="absolute right-3 top-3 rounded-md p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container disabled:pointer-events-none disabled:opacity-50"
            >
              <FiX size={17} />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-error-container text-error">
              <FiAlertTriangle size={18} />
            </div>

            <div className="mt-3 pr-6">
              <h2
                id="delete-listing-title"
                className="text-body-lg font-semibold text-on-surface"
              >
                Remove listing?
              </h2>

              <p className="mt-1.5 text-body-sm leading-relaxed text-on-surface-variant">
                “{listingToDelete.title}” will be permanently removed.
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setListingToDelete(null)}
                disabled={isDeleting}
                className="h-9 rounded-md border border-outline-variant px-4 text-label-sm font-medium text-on-surface transition-colors hover:bg-surface-container disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleDelete(listingToDelete._id)}
                disabled={isDeleting}
                className="h-9 rounded-md bg-error px-4 text-label-sm font-medium text-on-error transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}