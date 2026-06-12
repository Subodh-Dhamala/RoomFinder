'use client'

import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateListing } from '@/api/listings.api'
import { useListing } from '@/hooks/useListing'
import ImageUpload from '@/components/ImageUpload'
import ErrorState from '@/components/ErrorState'
import toast from 'react-hot-toast'
import type { UpdateListingInput } from '@/types/listing'
import { useEffect } from 'react'

export default function EditListingPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: room, isLoading, isError } = useListing(id)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateListingInput>()

  const images = watch('images')

  // pre-fill form once data loads
  useEffect(() => {
    if (room) {
      reset({
        title: room.title,
        description: room.description,
        price: room.price,
        location: room.location,
        images: room.images,
      })
    }
  }, [room, reset])

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateListingInput) => updateListing(id, data),
    onSuccess: () => {
      toast.success('Listing updated!')
      queryClient.invalidateQueries({ queryKey: ['landlord-listings'] })
      queryClient.invalidateQueries({ queryKey: ['listing', id] })
      router.push('/landlord/listings')
    },
    onError: () => toast.error('Failed to update listing'),
  })

  if (isLoading) return <main className="p-gutter"><p className="text-on-surface-variant">Loading...</p></main>
  if (isError) return <main className="p-gutter"><ErrorState message="Failed to load listing." /></main>

  return (
    <main className="max-w-2xl mx-auto px-gutter py-lg">
      <h1 className="text-h2 font-h2 text-on-surface mb-lg">Edit listing</h1>

      <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col gap-md">
        {/* Title */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="border border-outline-variant rounded-lg px-md py-sm text-body-md focus:outline-none focus:border-primary"
          />
          {errors.title && <p className="text-error text-sm">{errors.title.message}</p>}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Location</label>
          <input
            {...register('location', { required: 'Location is required' })}
            className="border border-outline-variant rounded-lg px-md py-sm text-body-md focus:outline-none focus:border-primary"
          />
          {errors.location && <p className="text-error text-sm">{errors.location.message}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Price per month (Rs.)</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required', valueAsNumber: true })}
            className="border border-outline-variant rounded-lg px-md py-sm text-body-md focus:outline-none focus:border-primary"
          />
          {errors.price && <p className="text-error text-sm">{errors.price.message}</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="border border-outline-variant rounded-lg px-md py-sm text-body-md focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Images */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Images</label>
          <ImageUpload
            value={images || []}
            onChange={(imgs) => setValue('images', imgs)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-on-primary py-md rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-colors disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </main>
  )
}