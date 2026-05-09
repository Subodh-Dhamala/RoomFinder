'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { setTokenGetter } from '@/api/axios'

export function useApi(): void {
  const { getToken } = useAuth()

  useEffect(() => {
    setTokenGetter(getToken)
  }, [getToken])
}