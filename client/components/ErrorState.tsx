interface ErrorStateProps {
  message?: string
}

export default function ErrorState({ message = 'Something went wrong. Please try again.' }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-red-500 text-sm">{message}</p>
    </div>
  )
}