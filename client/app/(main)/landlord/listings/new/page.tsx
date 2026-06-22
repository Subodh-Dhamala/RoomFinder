'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { createListing } from '@/api/listings.api'
import ImageUpload from '@/components/ImageUpload'
import type { CreateListingInput } from '@/types/listing'

export default function NewListingPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateListingInput>({
    defaultValues: {
      images: [],
    },
  })

  const images = watch('images')

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateListingInput) => createListing(data),
    onSuccess: () => {
      toast.success('Listing created!')
      router.push('/landlord/listings')
    },
    onError: () => toast.error('Failed to create listing'),
  })

  return (
    <main className="max-w-2xl mx-auto px-gutter py-lg">
      <h1 className="text-h2 font-h2 text-on-surface mb-lg">Create listing</h1>

      <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col gap-md">
        {/* Title */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Title</label>
          <input
            placeholder="Cozy room in Bhaktapur"
            {...register('title', { required: 'Title is required' })}
            className="border border-outline-variant rounded-lg px-md py-sm text-body-md focus:outline-none focus:border-primary"
          />
          {errors.title && <p className="text-error text-sm">{errors.title.message}</p>}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Location</label>
          <input
            placeholder="Sallaghari, Bhaktapur"
            {...register('location', { required: 'Location is required' })}
            className="border border-outline-variant rounded-lg px-md py-sm text-body-md focus:outline-none focus:border-primary"
          />
          {errors.location && <p className="text-error text-sm">{errors.location.message}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Price per month (Rs.)</label>
          <input
            placeholder="99999"
            type="number"
           {...register('price', {
                required: 'Price is required',
                valueAsNumber: true,
                 min: { value: 1, message: 'Price must be greater than 0' }
            })}
            className="border border-outline-variant rounded-lg px-md py-sm text-body-md focus:outline-none focus:border-primary"
          />
          {errors.price && <p className="text-error text-sm">{errors.price.message}</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Description</label>
          <textarea
            placeholder="Describe the room..."
            {...register('description')}
            rows={4}
            className="border border-outline-variant rounded-lg px-md py-sm text-body-md focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Images */}
        <div className="flex flex-col gap-xs">
          <label className="text-label-sm font-label-sm text-on-surface">Images</label>
          <ImageUpload
            value={images}
            onChange={(imgs) => setValue('images', imgs)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-on-primary py-md rounded-lg text-label-sm font-label-sm hover:bg-primary-container transition-colors disabled:opacity-50"
        >
          {isPending ? 'Creating...' : 'Create listing'}
        </button>
      </form>
    </main>
  )
}