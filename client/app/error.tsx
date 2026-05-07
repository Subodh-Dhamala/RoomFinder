'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <button onClick={reset} className="underline text-gray-500">
        Try again
      </button>
    </div>
  )
}