'use client'

import { useState } from 'react'
import { uploadImages } from '@/api/upload.api'
import { FiCamera } from 'react-icons/fi'

interface AvatarUploadProps {
  currentUrl?: string
  name?: string
  onUpload: (avatar: { url: string; public_id: string }) => void
  onUploadingChange?: (isUploading: boolean) => void
}

export default function AvatarUpload({ currentUrl, name, onUpload, onUploadingChange }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
  onUploadingChange?.(true)
    try {
      const uploaded = await uploadImages([file])
      onUpload({ url: uploaded[0].url, public_id: uploaded[0].public_id })
    } catch {
      console.error('Avatar upload failed')
    } finally {
      setIsUploading(false)
      onUploadingChange?.(false)
    }
  }

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <label className="relative cursor-pointer group w-24 h-24">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border-2 border-outline-variant">
        {currentUrl ? (
          <img src={currentUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl font-bold text-primary">{initials}</span>
        )}
      </div>

      {/* Overlay */}
      <div className={`absolute inset-0 rounded-full bg-black/40 flex items-center justify-center transition-opacity ${isUploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        {isUploading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <FiCamera size={20} className="text-white" />
        )}
      </div>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
    </label>
  )
}