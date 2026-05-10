import RoomSkeleton from './RoomSkeleton'

export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
      {[...Array(6)].map((_, i) => <RoomSkeleton key={i} />)}
    </div>
  )
}