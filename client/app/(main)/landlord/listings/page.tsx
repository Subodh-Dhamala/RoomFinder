'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyListings, deleteListing } from '@/api/listings.api'
import SkeletonGrid from '@/components/SkeletonGrid'
import EmptyState from '@/components/EmptyState'
import ErrorState from '@/components/ErrorState'
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function LandlordListingsPage() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['landlord-listings'],
    queryFn: () => getMyListings(),
  })

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteListing(id),
    onSuccess: () => {
      toast.success('Listing deleted')
      queryClient.invalidateQueries({ queryKey: ['landlord-listings'] })
    },
    onError: () => toast.error('Failed to delete listing'),
  })

  if (isLoading) return <main className="p-gutter"><SkeletonGrid /></main>
  if (isError) return <main className="p-gutter"><ErrorState message="Failed to load listings." /></main>

  return (
    <main className="max-w-4xl mx-auto px-gutter py-lg">
      <div className="flex items-center justify-between mb-lg">
        <h1 className="text-h2 font-h2 text-on-surface">My Listings</h1>
        <Link
          href="/landlord/listings/new"
          className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-colors"
        >
          <FiPlus size={16} />
          New listing
        </Link>
      </div>

      {!data?.rooms?.length ? (
        <EmptyState
          message="No listings yet"
          subMessage="Create your first listing to get started"
        />
      ) : (
        <div className="flex flex-col gap-md">
          {data.rooms.map(room => (
            <div
              key={room._id}
              className="flex gap-md border border-outline-variant rounded-xl overflow-hidden bg-white"
            >
              {/* Image */}
              <div className="relative w-40 shrink-0 bg-surface-container">
                {room.images?.[0]?.url ? (
                  <Image
                    src={room.images[0].url}
                    alt={room.title}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-outline text-sm">
                    No image
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 items-center justify-between p-md">
                <div>
                  <h3 className="text-h3 font-h3 text-on-surface">{room.title}</h3>
                  <p className="text-body-md text-on-surface-variant">{room.location}</p>
                  <p className="text-primary font-medium mt-xs">
                    Rs. {room.price.toLocaleString()}/mo
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-sm">
                  <Link
                    href={`/landlord/listings/${room._id}/edit`}
                    className="p-2 rounded-lg border border-outline-variant hover:bg-surface-container transition-colors"
                  >
                    <FiEdit2 size={16} className="text-on-surface-variant" />
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm('Delete this listing?')) handleDelete(room._id)
                    }}
                    disabled={isDeleting}
                    className="p-2 rounded-lg border border-outline-variant hover:bg-error-container transition-colors disabled:opacity-50"
                  >
                    <FiTrash2 size={16} className="text-error" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}