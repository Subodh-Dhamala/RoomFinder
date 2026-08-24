import RoomSkeleton from './RoomSkeleton';

export default function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
      {[...Array(6)].map((_, i) => <RoomSkeleton key={i} />)}
    </div>
  )
}