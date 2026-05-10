import { FiInbox } from 'react-icons/fi'

interface EmptyStateProps {
  message?: string
  subMessage?: string
}

export default function EmptyState({
  message = 'Nothing here yet',
  subMessage,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
      <FiInbox size={40} className="text-outline-variant" />
      <p className="text-on-surface-variant font-medium">{message}</p>
      {subMessage && <p className="text-sm text-outline">{subMessage}</p>}
    </div>
  )
}