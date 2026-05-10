'use client'

import { useListings } from '@/hooks/useListings'
import RoomCard from '@/components/RoomCard'
import SkeletonGrid from '@/components/SkeletonGrid'
import EmptyState from '@/components/EmptyState'

export default function HomePage() {
  const { data, isLoading, isError } = useListings()

  if (isLoading) return <main className="p-gutter"><SkeletonGrid /></main>
  if (isError) return (
    <main className="flex items-center justify-center min-h-[60vh]">
      <p className="text-error text-sm">Failed to load listings.</p>
    </main>
  )
  if (!data?.rooms?.length) return (
    <main className="p-gutter">
      <EmptyState message="No rooms available" subMessage="Check back later for new listings" />
    </main>
  )

  return (
    <main className="p-gutter">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {data.rooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </main>
  )
}