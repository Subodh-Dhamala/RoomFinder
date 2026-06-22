'use client'

import { useListings } from '@/hooks/useListings'
import { useListingFilters } from '@/hooks/useListingFilters'
import RoomCard from '@/components/RoomCard'
import SkeletonGrid from '@/components/SkeletonGrid'
import EmptyState from '@/components/EmptyState'
import ErrorState from '@/components/ErrorState'
import FilterBar from '@/components/FilterBar'
import Pagination from '@/components/Pagination'

export default function HomePage() {

  const filters = useListingFilters();
  const { data, isLoading, isError } = useListings(filters)

  return (
    <>
      <FilterBar />
      <main className='p-gutter'>
        {isLoading ? (
          <SkeletonGrid />
        ) : isError ?(
          <ErrorState message='Failed to load Listings.' />
        ) : !data?.rooms?.length ? (
          <EmptyState message='No rooms available right now.' subMessage='Check back later for new listings.'/>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              {data.rooms.map(room => (
              <RoomCard key = {room._id} room= {room} />
              ))}
            </div>
            <Pagination totalPages = {data.totalPages} />
          </>
        )

      }
      </main>
    
    </>
  )

}