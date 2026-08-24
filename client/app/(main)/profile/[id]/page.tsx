'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/api/axios'
import ErrorState from '@/components/ErrorState'
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiGlobe, FiPhone, FiMail } from 'react-icons/fi'

type SocialKey = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'website'

const socialLinks: { key: SocialKey; icon: React.ElementType; label: string; color: string }[] = [
  { key: 'facebook', icon: FiFacebook, label: 'Facebook', color: 'text-blue-600' },
  { key: 'instagram', icon: FiInstagram, label: 'Instagram', color: 'text-pink-500' },
  { key: 'twitter', icon: FiTwitter, label: 'Twitter / X', color: 'text-sky-500' },
  { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn', color: 'text-blue-700' },
  { key: 'website', icon: FiGlobe, label: 'Website', color: 'text-primary' },
]

export default function PublicProfilePage() {
  const { id } = useParams()

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['public-profile', id],
    queryFn: async () => {
      const res = await api.get(`/api/profile/${id}`)
      return res.data
    },
    enabled: !!id,
  })

  if (isLoading) return (
    <div className="max-w-2xl mx-auto px-gutter py-10 animate-pulse space-y-6">
      <div className="h-24 w-24 rounded-full bg-outline-variant/30" />
      <div className="h-6 w-48 rounded bg-outline-variant/30" />
      <div className="h-4 w-72 rounded bg-outline-variant/30" />
    </div>
  )

  if (isError) return <ErrorState message="Failed to load profile." />
  if (!user) return null

  const initials = user.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const hasSocial = socialLinks.some(({ key }) => user.social?.[key])

  return (
    <main className="max-w-2xl mx-auto px-gutter py-10 space-y-8">

      <div className="flex items-center gap-5">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border-2 border-outline-variant shrink-0">
          {user.avatar?.url ? (
            <img src={user.avatar.url} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-primary">{initials}</span>
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold text-on-surface">{user.name || 'No name set'}</h1>
          <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
            {user.role}
          </span>
        </div>
      </div>

      <section className="space-y-4 border border-outline-variant rounded-xl p-5">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wide">Info</h2>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <FiMail size={14} />
            <span>{user.email}</span>
          </div>

          {user.phone && (
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <FiPhone size={14} />
              <span>{user.phone}</span>
            </div>
          )}

          {user.bio && (
            <p className="text-sm text-on-surface-variant">{user.bio}</p>
          )}
        </div>
      </section>

      {hasSocial && (
        <section className="space-y-4 border border-outline-variant rounded-xl p-5">
          <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wide">Social Links</h2>
          <div className="space-y-3">
            {socialLinks.map(({ key, icon: Icon, label, color }) => {
              const val = user.social?.[key]
              if (!val) return null
              return (
                <div key={key} className="flex items-center gap-2">
                  <Icon size={14} className={color} />
                  {/* ✅ Fixed missing opening <a> tag */}
                  <a
                    href={val}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline truncate"
                  >
                    {val}
                  </a>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <p className="text-xs text-outline text-center">
  {user.createdAt
    ? `Member since ${new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
    : 'MeroRoom Member'
  }
</p>

    </main>
  )
}