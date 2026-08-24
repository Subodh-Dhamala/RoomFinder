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
    <main className="mx-auto max-w-2xl px-gutter py-lg">
      {/* <header className="mb-lg">
        <h1 className="text-h3 font-h3 text-on-surface">
          Create listing
        </h1>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Add the details of your room to make it easy to find.
        </p>
      </header> */}

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
                placeholder="Cozy room in Bhaktapur"
                {...register('title', {
                  required: 'Title is required',
                })}
                className="h-9 rounded-md border border-outline-variant/70 bg-surface px-sm text-body-sm text-on-surface placeholder:text-outline outline-none transition-colors focus:border-primary"
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
                placeholder="Sallaghari, Bhaktapur"
                {...register('location', {
                  required: 'Location is required',
                })}
                className="h-9 rounded-md border border-outline-variant/70 bg-surface px-sm text-body-sm text-on-surface placeholder:text-outline outline-none transition-colors focus:border-primary"
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
                  placeholder="25,000"
                  {...register('price', {
                    required: 'Price is required',
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: 'Price must be greater than 0',
                    },
                  })}
                  className="h-9 w-full rounded-md border border-outline-variant/70 bg-surface pl-9 pr-sm text-body-sm text-on-surface placeholder:text-outline outline-none transition-colors focus:border-primary"
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="description"
                className="text-label-sm font-label-sm text-on-surface"
              >
                Description
              </label>

              <span className="text-caption text-outline">
                Optional
              </span>
            </div>

            <textarea
              id="description"
              placeholder="Describe the room, facilities, nearby places..."
              {...register('description')}
              rows={4}
              className="resize-none rounded-md border border-outline-variant/70 bg-surface px-sm py-sm text-body-sm text-on-surface placeholder:text-outline outline-none transition-colors focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div>
              <label className="text-label-sm font-label-sm text-on-surface">
                Images
              </label>

              <p className="mt-0.5 text-caption text-on-surface-variant">
                Add photos that show the room clearly.
              </p>
            </div>

            <div className="rounded-md border border-outline-variant/50 bg-surface-container/30 p-sm">
              <ImageUpload
                value={images}
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
              {isPending ? 'Creating...' : 'Create listing'}
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}
