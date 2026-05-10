export default function RoomSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden animate-pulse border border-outline-variant/30">
      <div className="bg-surface-container aspect-4/3 w-full" />
      <div className="p-md flex flex-col gap-sm">
        <div className="bg-surface-container h-4 rounded-full w-3/4" />
        <div className="bg-surface-container h-3 rounded-full w-1/2" />
        <div className="bg-surface-container h-4 rounded-full w-1/4 mt-1" />
      </div>
    </div>
  )
}