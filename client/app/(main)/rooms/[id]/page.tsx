'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useListing } from '@/hooks/useListing'
import { FiMapPin } from 'react-icons/fi'
import SkeletonGrid from '@/components/SkeletonGrid'
import ErrorState from '@/components/ErrorState'

export default function RoomDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: room, isLoading, isError } = useListing(id)

  if (isLoading) return <main className="p-gutter"><SkeletonGrid /></main>
  if (isError) return <main className="p-gutter"><ErrorState message="Failed to load room." /></main>
  if (!room) return null

  return (
    <main className="max-w-4xl mx-auto px-gutter py-lg">
      
      {room.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm mb-lg rounded-xl overflow-hidden">
          {room.images.map((img, i) => (
            <div key={i} className="relative aspect-[4/3] bg-surface-container">
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
    
      <div className="flex justify-between items-start mb-sm">
        <h1 className="text-h2 font-h2 text-on-surface">{room.title}</h1>
        <div className="text-right shrink-0 ml-4">
          <span className="text-h3 font-h3 text-primary">
            Rs. {room.price.toLocaleString()}
          </span>
          <span className="text-caption text-on-surface-variant">/month</span>
        </div>
      </div>

      <div className="flex items-center gap-xs text-on-surface-variant text-body-md mb-md">
        <FiMapPin size={16} />
        <span>{room.location}</span>
      </div>

      {room.description && (
        <p className="text-body-md text-on-surface-variant leading-relaxed mb-lg">
          {room.description}
        </p>
      )}

      <button className="bg-primary text-on-primary px-lg py-md rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-colors">
        Book Now
      </button>
    </main>
  )
}