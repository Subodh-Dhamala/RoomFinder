export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="text-gray-500">Page not found</p>
      <a href="/" className="underline">Go home</a>
    </div>
  )
}