'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FiMapPin } from 'react-icons/fi'
import type { Listing } from '@/types/listing'

export default function RoomCard({ room }: { room: Listing }) {
  const image = room.images?.[0]?.url

  return (
    <Link href={`/rooms/${room._id}`}>
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden group border border-outline-variant/30 hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative h-44 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={room.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-surface-container flex items-center justify-center text-on-surface-variant text-sm">
              No image
            </div>
          )}
        </div>

        <div className="p-md">
          <div className="flex justify-between items-start mb-xs">
            <h3 className="text-h3 font-h3 text-on-surface truncate flex-1 mr-2">{room.title}</h3>
            <span className="text-primary font-bold shrink-0">
              Rs. {room.price.toLocaleString()}
              <span className="text-caption text-on-surface-variant font-normal">/mo</span>
            </span>
          </div>

          <p className="flex items-center gap-xs text-on-surface-variant text-body-md">
            <FiMapPin size={14} />
            {room.location}
          </p>
        </div>
      </div>
    </Link>
  )
}