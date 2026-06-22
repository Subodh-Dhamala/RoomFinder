'use client'

import { useState, useEffect } from 'react'
import { useProfile, useUpdateProfile, useUpdateAvatar } from '@/hooks/useProfile'
import AvatarUpload from '@/components/AvatarUpload'
import ErrorState from '@/components/ErrorState'
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiGlobe, FiPhone, FiMail, FiEdit2, FiCheck, FiX } from 'react-icons/fi'

type SocialKey = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'website'

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
    }
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
        }
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
        }
      },
      { onSuccess: () => setIsEditing(false) }
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
        }
      })
    }
    setIsEditing(false)
  }

  // ✅ Fixed renderSocialValue – now returns a proper <a> element
  const renderSocialValue = (val: string | undefined) => {
    if (val) {
      return (
        <a
          href={val}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline truncate"
        >
          {val}
        </a>
      )
    }
    return <span className="text-sm text-outline">—</span>
  }

  if (isLoading) return (
    <div className="max-w-2xl mx-auto px-gutter py-10 animate-pulse space-y-6">
      <div className="h-24 w-24 rounded-full bg-outline-variant/30" />
      <div className="h-6 w-48 rounded bg-outline-variant/30" />
      <div className="h-4 w-72 rounded bg-outline-variant/30" />
      <div className="h-4 w-60 rounded bg-outline-variant/30" />
    </div>
  )

  if (isError) return <ErrorState message="Failed to load profile." />

  if (!user) return null

  const socialLinks: { key: SocialKey; icon: React.ElementType; label: string; placeholder: string; color: string }[] = [
    { key: 'facebook', icon: FiFacebook, label: 'Facebook', placeholder: 'https://facebook.com/yourprofile', color: 'text-blue-600' },
    { key: 'instagram', icon: FiInstagram, label: 'Instagram', placeholder: 'https://instagram.com/yourhandle', color: 'text-pink-500' },
    { key: 'twitter', icon: FiTwitter, label: 'Twitter / X', placeholder: 'https://twitter.com/yourhandle', color: 'text-sky-500' },
    { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn', placeholder: 'https://linkedin.com/in/yourprofile', color: 'text-blue-700' },
    { key: 'website', icon: FiGlobe, label: 'Website', placeholder: 'https://yourwebsite.com', color: 'text-primary' },
  ]

  return (
    <main className="max-w-2xl mx-auto px-gutter py-10 space-y-8">

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-5">
          <AvatarUpload
            currentUrl={user.avatar?.url}
            name={user.name}
            onUpload={updateAvatar}
          />
          <div>
            <h1 className="text-xl font-bold text-on-surface">{user.name || 'No name set'}</h1>
            <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">
              {user.role}
            </span>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            <FiEdit2 size={15} />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 text-sm text-outline hover:text-on-surface transition-colors"
            >
              <FiX size={15} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1 text-sm font-semibold text-white bg-primary px-4 py-1.5 rounded-lg hover:opacity-90 disabled:opacity-60 transition-all"
            >
              <FiCheck size={15} />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>

      <section className="space-y-4 border border-outline-variant rounded-xl p-5">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wide">Basic Info</h2>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-outline mb-1 block">Name</label>
            {isEditing ? (
              <input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Your name"
              />
            ) : (
              <p className="text-sm text-on-surface">{user.name || '—'}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-outline mb-1 block">Email</label>
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <FiMail size={14} />
              <span>{user.email}</span>
            </div>
          </div>

          <div>
            <label className="text-xs text-outline mb-1 block">Phone</label>
            {isEditing ? (
              <div className="relative">
                <FiPhone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="+977 98XXXXXXXX"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <FiPhone size={14} />
                <span>{user.phone || '—'}</span>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-outline mb-1 block">Bio</label>
            {isEditing ? (
              <textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Tell others a bit about yourself..."
              />
            ) : (
              <p className="text-sm text-on-surface-variant">{user.bio || '—'}</p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4 border border-outline-variant rounded-xl p-5">
        <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wide">Social Links</h2>

        <div className="space-y-3">
          {socialLinks.map(({ key, icon: Icon, label, placeholder, color }) => (
            <div key={key}>
              <label className="text-xs text-outline mb-1 block">{label}</label>
              {isEditing ? (
                <div className="relative">
                  <Icon size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${color}`} />
                  <input
                    value={form.social[key]}
                    onChange={e => setForm(f => ({ ...f, social: { ...f.social, [key]: e.target.value } }))}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-outline-variant rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder={placeholder}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon size={14} className={color} />
                  {renderSocialValue(user.social?.[key])}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

<p className="text-xs text-outline text-center">
  {user.createdAt
    ? `Member since ${new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
    : 'RoomFinder Member'
  }
</p>

    </main>
  )
}