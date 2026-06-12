import type { BookingStatus } from '@/api/bookings.api'

interface StatusBadgeProps {
  status: BookingStatus
}

const styles: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const labels: Record<BookingStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`px-sm py-1 rounded-full text-label-sm font-label-sm ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}