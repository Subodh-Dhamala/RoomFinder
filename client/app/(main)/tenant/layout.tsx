'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()

  if (!isLoaded) return null

  const role = user?.publicMetadata?.role

  if (isLoaded && role !== 'tenant') {
    redirect('/')
  }

  return <>{children}</>
}