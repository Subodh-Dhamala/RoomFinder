'use client'

import { useWishlist } from '@/hooks/useWishlist'
import RoomCard from '@/components/RoomCard'
import SkeletonGrid from '@/components/SkeletonGrid'
import ErrorState from '@/components/ErrorState'
import Link from 'next/link'

export default function WishlistPage() {
  const { data: wishlistItems, isLoading, isError } = useWishlist(true)

  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto px-gutter py-lg">
        <h1 className="text-h2 font-h2 text-on-surface mb-md">Wishlist</h1>
        <SkeletonGrid />
      </main>
    )
  }

  if (isError) {
    return (
      <main className="max-w-6xl mx-auto px-gutter py-lg">
        <ErrorState message="Failed to load your wishlist. Please try again." />
      </main>
    )
  }

  const hasItems = wishlistItems && wishlistItems.length > 0

  return (
    <main className="max-w-6xl mx-auto px-gutter py-lg">
      <div className="mb-lg">
        <h1 className="text-h2 font-h2 text-on-surface">Wishlist</h1>
        <p className="text-caption text-on-surface-variant mt-1">
          {hasItems ? `${wishlistItems.length} saved rooms` : '0 saved rooms'}
        </p>
      </div>

      {!hasItems ? (
        <div 
          className="w-full flex flex-col items-center justify-center text-center border border-dashed border-outline-variant rounded-xl bg-surface-container-low"
          style={{ padding: '3rem 1.5rem' }}
        >
          <p 
            className="text-on-surface font-bold"
            style={{ 
              display: 'block', 
              width: '100%', 
              fontSize: '1.25rem', 
              marginBottom: '0.5rem',
              whiteSpace: 'normal' 
            }}
          >
            No saved rooms
          </p>
          
          <p 
            className="text-on-surface-variant"
            style={{ 
              display: 'block', 
              width: '100%', 
              maxWidth: '440px', 
              margin: '0 auto 1.5rem auto', 
              fontSize: '0.875rem',
              lineHeight: '1.5',
              whiteSpace: 'normal',
              wordBreak: 'break-word'
            }}
          >
            Tap the heart on any listing to save it here for later.
          </p>
          
          <Link
            href="/"
            className="bg-primary text-on-primary rounded-lg transition-colors"
            style={{ 
              display: 'inline-block', 
              padding: '0.625rem 1.25rem', 
              fontSize: '0.875rem', 
              fontWeight: 500,
              whiteSpace: 'nowrap' 
            }}
          >
            Browse rooms
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md">
          {wishlistItems.map((item: any) => {
            const roomData = item.roomId && typeof item.roomId === 'object' ? item.roomId : item;
            
            if (!roomData || !roomData._id) return null;

            return (
              <RoomCard 
                key={item._id} 
                room={roomData} 
              />
            )
          })}
        </div>
      )}
    </main>
  )
}