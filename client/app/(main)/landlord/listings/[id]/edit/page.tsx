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

  if (isLoading) {
    return (
      <main className="mx-auto max-w-container-max px-gutter py-lg">
        <p className="text-body-sm text-on-surface-variant">Loading...</p>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-container-max px-gutter py-lg">
        <ErrorState message="Failed to load listing." />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl px-gutter py-lg">
      <header className="mb-lg">
        <h1 className="text-h3 font-h3 text-on-surface">
          Edit listing
        </h1>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Update your room details and photos.
        </p>
      </header>

      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-md shadow-sm"
      >
        <div className="grid gap-md">
          <div className="grid gap-md sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label
                htmlFor="title"
                className="text-label-sm font-label-sm text-on-surface"
              >
                Title
              </label>

              <input
                id="title"
                {...register('title', {
                  required: 'Title is required',
                })}
                className="h-9 rounded-md border border-outline-variant/70 bg-surface px-sm text-body-sm text-on-surface outline-none transition-colors focus:border-primary"
              />

              {errors.title && (
                <p className="text-caption text-error">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="location"
                className="text-label-sm font-label-sm text-on-surface"
              >
                Location
              </label>

              <input
                id="location"
                {...register('location', {
                  required: 'Location is required',
                })}
                className="h-9 rounded-md border border-outline-variant/70 bg-surface px-sm text-body-sm text-on-surface outline-none transition-colors focus:border-primary"
              />

              {errors.location && (
                <p className="text-caption text-error">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="price"
                className="text-label-sm font-label-sm text-on-surface"
              >
                Monthly rent
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-sm top-1/2 -translate-y-1/2 text-caption text-on-surface-variant">
                  Rs.
                </span>

                <input
                  id="price"
                  type="number"
                  {...register('price', {
                    required: 'Price is required',
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: 'Price must be greater than 0',
                    },
                  })}
                  className="h-9 w-full rounded-md border border-outline-variant/70 bg-surface pl-9 pr-sm text-body-sm text-on-surface outline-none transition-colors focus:border-primary"
                />
              </div>

              {errors.price && (
                <p className="text-caption text-error">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="description"
              className="text-label-sm font-label-sm text-on-surface"
            >
              Description
            </label>

            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className="resize-none rounded-md border border-outline-variant/70 bg-surface px-sm py-sm text-body-sm text-on-surface outline-none transition-colors focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div>
              <label className="text-label-sm font-label-sm text-on-surface">
                Images
              </label>

              <p className="mt-0.5 text-caption text-on-surface-variant">
                Update the photos shown with your listing.
              </p>
            </div>

            <div className="rounded-md border border-outline-variant/50 bg-surface-container/30 p-sm">
              <ImageUpload
                value={images || []}
                onChange={(imgs) => setValue('images', imgs)}
              />
            </div>
          </div>

          <div className="h-px bg-outline-variant/40" />

          <div className="flex flex-col-reverse gap-sm sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isPending}
              className="h-9 rounded-md border border-outline-variant/70 px-md text-label-sm font-label-sm text-on-surface transition-colors hover:bg-surface-container disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="h-9 rounded-md bg-primary px-lg text-label-sm font-label-sm text-on-primary transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}