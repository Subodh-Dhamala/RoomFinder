'use client'

import { useState, useEffect } from 'react'
import {
  useProfile,
  useUpdateProfile,
  useUpdateAvatar,
} from '@/hooks/useProfile'
import AvatarUpload from '@/components/AvatarUpload'
import ErrorState from '@/components/ErrorState'
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiPhone,
  FiMail,
  FiEdit2,
  FiCheck,
  FiX,
} from 'react-icons/fi'

type SocialKey =
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'linkedin'
  | 'website'

export default function ProfilePage() {
  const { data, isLoading, isError } = useProfile()
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile()
  const { mutate: updateAvatar } = useUpdateAvatar()

  const user = data?.user

  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    name: '',
    bio: '',
    phone: '',
    social: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      website: '',
    },
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        bio: user.bio || '',
        phone: user.phone || '',
        social: {
          facebook: user.social?.facebook || '',
          instagram: user.social?.instagram || '',
          twitter: user.social?.twitter || '',
          linkedin: user.social?.linkedin || '',
          website: user.social?.website || '',
        },
      })
    }
  }, [user])

  const handleSave = () => {
    updateProfile(
      {
        name: form.name,
        bio: form.bio,
        phone: form.phone,
        social: {
          facebook: form.social.facebook || undefined,
          instagram: form.social.instagram || undefined,
          twitter: form.social.twitter || undefined,
          linkedin: form.social.linkedin || undefined,
          website: form.social.website || undefined,
        },
      },
      {
        onSuccess: () => setIsEditing(false),
      }
    )
  }

  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name || '',
        bio: user.bio || '',
        phone: user.phone || '',
        social: {
          facebook: user.social?.facebook || '',
          instagram: user.social?.instagram || '',
          twitter: user.social?.twitter || '',
          linkedin: user.social?.linkedin || '',
          website: user.social?.website || '',
        },
      })
    }

    setIsEditing(false)
  }

  const renderSocialValue = (val: string | undefined) => {
    if (val) {
      return (
        <a
          href={val}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-body-sm text-primary hover:underline"
        >
          {val}
        </a>
      )
    }

    return <span className="text-body-sm text-outline">—</span>
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-gutter py-lg">
        <div className="animate-pulse space-y-md">
          <div className="h-16 w-16 rounded-full bg-outline-variant/30" />
          <div className="h-5 w-40 rounded bg-outline-variant/30" />
          <div className="h-4 w-64 rounded bg-outline-variant/30" />
          <div className="h-40 rounded-lg bg-outline-variant/20" />
        </div>
      </main>
    )
  }

  if (isError) {
    return <ErrorState message="Failed to load profile." />
  }

  if (!user) return null

  const socialLinks: {
    key: SocialKey
    icon: React.ElementType
    label: string
    placeholder: string
    color: string
  }[] = [
    {
      key: 'facebook',
      icon: FiFacebook,
      label: 'Facebook',
      placeholder: 'https://facebook.com/yourprofile',
      color: 'text-blue-600',
    },
    {
      key: 'instagram',
      icon: FiInstagram,
      label: 'Instagram',
      placeholder: 'https://instagram.com/yourhandle',
      color: 'text-pink-500',
    },
    {
      key: 'twitter',
      icon: FiTwitter,
      label: 'Twitter / X',
      placeholder: 'https://twitter.com/yourhandle',
      color: 'text-sky-500',
    },
    {
      key: 'linkedin',
      icon: FiLinkedin,
      label: 'LinkedIn',
      placeholder: 'https://linkedin.com/in/yourprofile',
      color: 'text-blue-700',
    },
    {
      key: 'website',
      icon: FiGlobe,
      label: 'Website',
      placeholder: 'https://yourwebsite.com',
      color: 'text-primary',
    },
  ]

  return (
    <main className="mx-auto max-w-2xl px-gutter py-lg">
      <header className="mb-lg flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-md">
          <AvatarUpload
            currentUrl={user.avatar?.url}
            name={user.name}
            onUpload={updateAvatar}
          />

          <div className="min-w-0">
            <h1 className="truncate text-body-lg font-semibold text-on-surface">
              {user.name || 'No name set'}
            </h1>

            <span className="mt-1 inline-flex rounded-full bg-primary/10 px-sm py-0.5 text-caption font-medium capitalize text-primary">
              {user.role}
            </span>
          </div>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-outline-variant/60 px-sm text-caption font-medium text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
          >
            <FiEdit2 size={13} />
            Edit
          </button>
        ) : (
          <div className="flex shrink-0 items-center gap-xs">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="inline-flex h-8 items-center gap-1.5 rounded-md px-sm text-caption font-medium text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-50"
            >
              <FiX size={13} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-md text-caption font-medium text-on-primary transition-colors hover:bg-primary-container disabled:opacity-50"
            >
              <FiCheck size={13} />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </header>

      <div className="space-y-sm">
        <section className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-md shadow-sm">
          <h2 className="mb-md text-label-sm font-semibold uppercase tracking-wide text-on-surface-variant">
            Basic info
          </h2>

          <div className="grid gap-md sm:grid-cols-2">
            <div className="min-w-0">
              <label className="mb-1 block text-caption text-outline">
                Name
              </label>

              {isEditing ? (
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      name: e.target.value,
                    }))
                  }
                  className="h-9 w-full rounded-md border border-outline-variant/70 bg-surface px-sm text-body-sm text-on-surface outline-none transition-colors focus:border-primary"
                  placeholder="Your name"
                />
              ) : (
                <p className="truncate text-body-sm text-on-surface">
                  {user.name || '—'}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <label className="mb-1 block text-caption text-outline">
                Email
              </label>

              <div className="flex h-9 items-center gap-2 truncate text-body-sm text-on-surface-variant">
                <FiMail size={13} className="shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>

            <div className="min-w-0">
              <label className="mb-1 block text-caption text-outline">
                Phone
              </label>

              {isEditing ? (
                <div className="relative">
                  <FiPhone
                    size={13}
                    className="absolute left-sm top-1/2 -translate-y-1/2 text-outline"
                  />

                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        phone: e.target.value,
                      }))
                    }
                    className="h-9 w-full rounded-md border border-outline-variant/70 bg-surface pl-8 pr-sm text-body-sm text-on-surface outline-none transition-colors focus:border-primary"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>
              ) : (
                <div className="flex h-9 items-center gap-2 text-body-sm text-on-surface-variant">
                  <FiPhone size={13} />
                  <span>{user.phone || '—'}</span>
                </div>
              )}
            </div>

            <div className="min-w-0 sm:col-span-2">
              <label className="mb-1 block text-caption text-outline">
                Bio
              </label>

              {isEditing ? (
                <textarea
                  value={form.bio}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      bio: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full resize-none rounded-md border border-outline-variant/70 bg-surface px-sm py-sm text-body-sm text-on-surface outline-none transition-colors focus:border-primary"
                  placeholder="Tell others a bit about yourself..."
                />
              ) : (
                <p className="text-body-sm leading-relaxed text-on-surface-variant">
                  {user.bio || '—'}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-md shadow-sm">
          <h2 className="mb-md text-label-sm font-semibold uppercase tracking-wide text-on-surface-variant">
            Social links
          </h2>

          <div className="grid gap-md sm:grid-cols-2">
            {socialLinks.map(
              ({ key, icon: Icon, label, placeholder, color }) => (
                <div key={key} className="min-w-0">
                  <label className="mb-1 block text-caption text-outline">
                    {label}
                  </label>

                  {isEditing ? (
                    <div className="relative">
                      <Icon
                        size={13}
                        className={`absolute left-sm top-1/2 -translate-y-1/2 ${color}`}
                      />

                      <input
                        value={form.social[key]}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            social: {
                              ...f.social,
                              [key]: e.target.value,
                            },
                          }))
                        }
                        className="h-9 w-full rounded-md border border-outline-variant/70 bg-surface pl-8 pr-sm text-body-sm text-on-surface outline-none transition-colors focus:border-primary"
                        placeholder={placeholder}
                      />
                    </div>
                  ) : (
                    <div className="flex h-9 min-w-0 items-center gap-2">
                      <Icon size={13} className={color} />
                      {renderSocialValue(user.social?.[key])}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </section>
      </div>

      <p className="mt-md text-center text-caption text-outline">
        {user.createdAt
          ? `Member since ${new Date(user.createdAt).toLocaleDateString(
              'en-US',
              {
                month: 'long',
                year: 'numeric',
              }
            )}`
          : 'RoomFinder Member'}
      </p>
    </main>
  )
}