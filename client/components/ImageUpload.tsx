'use client'

import { useState } from 'react'
import { uploadImages } from '@/api/upload.api'
import type { ListingImage } from '@/types/listing'
import { FiUpload, FiX } from 'react-icons/fi'

interface ImageUploadProps {
  value: ListingImage[]
  onChange: (images: ListingImage[]) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setIsUploading(true)
    try {
      const uploaded = await uploadImages(files)
      onChange([...value, ...uploaded])
    } catch {
      console.error('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Preview */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((img, i) => (
            <div key={i} className="relative aspect-4/3 rounded-lg overflow-hidden bg-surface-container">
              <img src={img.url} alt={`upload ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
              >
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <label className={`flex items-center justify-center gap-2 border-2 border-dashed border-outline-variant rounded-lg px-4 py-6 cursor-pointer hover:border-primary hover:bg-surface-container-low transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
        <FiUpload size={18} className="text-outline" />
        <span className="text-sm text-on-surface-variant">
          {isUploading ? 'Uploading...' : 'Click to upload images'}
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  )
}