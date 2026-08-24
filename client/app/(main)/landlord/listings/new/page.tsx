'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiArrowLeft, FiHome, FiImage, FiMapPin, FiPlus } from 'react-icons/fi'
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
      toast.success('Listing created successfully')
      router.push('/landlord/listings')
    },
    onError: () => {
      toast.error('Failed to create listing')
    },
  })

  return (
    <main className="min-h-screen bg-surface px-gutter py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <FiArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to listings
        </button>

        <header className="mb-8">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container/10 text-primary">
            <FiHome size={19} />
          </div>

          <h1 className="text-h3 font-h3 tracking-tight text-on-surface md:text-3xl">
            Create a new listing
          </h1>
        </header>

        <form
          onSubmit={handleSubmit((data) => mutate(data))}
          className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm"
        >
          <section className="p-5 md:p-7">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container/10 text-primary">
                  <FiHome size={15} />
                </span>

                <div>
                  <h2 className="text-sm font-bold text-on-surface">
                    Listing details
                  </h2>
                  <p className="mt-0.5 text-xs text-on-surface-variant">
                    Tell tenants about your room.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-on-surface"
                >
                  Listing title
                </label>

                <input
                  id="title"
                  placeholder="e.g. Cozy room in Bhaktapur"
                  {...register('title', {
                    required: 'Title is required',
                  })}
                  className="h-11 rounded-xl border border-outline-variant/70 bg-surface px-3.5 text-sm text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary focus:ring-4 focus:ring-primary/5"
                />

                {errors.title && (
                  <p className="text-xs font-medium text-error">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="location"
                    className="text-sm font-semibold text-on-surface"
                  >
                    Location
                  </label>

                  <div className="relative">
                    <FiMapPin
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"
                    />

                    <input
                      id="location"
                      placeholder="Sallaghari, Bhaktapur"
                      {...register('location', {
                        required: 'Location is required',
                      })}
                      className="h-11 w-full rounded-xl border border-outline-variant/70 bg-surface pl-10 pr-3.5 text-sm text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary focus:ring-4 focus:ring-primary/5"
                    />
                  </div>

                  {errors.location && (
                    <p className="text-xs font-medium text-error">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="price"
                    className="text-sm font-semibold text-on-surface"
                  >
                    Monthly rent
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant">
                      Rs.
                    </span>

                    <input
                      id="price"
                      type="number"
                      min="1"
                      placeholder="25,000"
                      {...register('price', {
                        required: 'Price is required',
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: 'Price must be greater than 0',
                        },
                      })}
                      className="h-11 w-full rounded-xl border border-outline-variant/70 bg-surface pl-11 pr-3.5 text-sm font-medium text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary focus:ring-4 focus:ring-primary/5"
                    />
                  </div>

                  {errors.price && (
                    <p className="text-xs font-medium text-error">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-on-surface"
                  >
                    Description
                  </label>

                  <span className="text-xs text-on-surface-variant">
                    Optional
                  </span>
                </div>

                <textarea
                  id="description"
                  rows={5}
                  placeholder="Describe the room, facilities, nearby places, transportation, house rules..."
                  {...register('description')}
                  className="resize-none rounded-xl border border-outline-variant/70 bg-surface px-3.5 py-3 text-sm leading-6 text-on-surface outline-none transition-all placeholder:text-on-surface-variant/70 focus:border-primary focus:ring-4 focus:ring-primary/5"
                />

                <p className="text-xs text-on-surface-variant">
                  Give tenants enough information to understand what makes
                  this room a good fit.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-outline-variant/40" />

          <section className="p-5 md:p-7">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container/10 text-primary">
                  <FiImage size={15} />
                </span>

                <div>
                  <h2 className="text-sm font-bold text-on-surface">
                    Photos
                  </h2>
                  <p className="mt-0.5 text-xs text-on-surface-variant">
                    Show tenants what the room looks like.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-outline-variant/70 bg-surface-container-low/40 p-4 transition-colors hover:border-primary/30 hover:bg-primary-container/5 md:p-5">
              <ImageUpload
                value={images}
                onChange={(imgs) =>
                  setValue('images', imgs, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />

              <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-surface-container-low px-3 py-2.5">
                <FiPlus
                  size={14}
                  className="mt-0.5 shrink-0 text-on-surface-variant"
                />

                <p className="text-xs leading-5 text-on-surface-variant">
                  Add clear photos of the room, bathroom, kitchen, and other
                  important areas. Good photos help tenants make faster
                  decisions.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-outline-variant/40" />

          <footer className="flex flex-col-reverse gap-3 bg-surface-container-low/40 px-5 py-4 sm:flex-row sm:justify-end md:px-7">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isPending}
              className="h-11 rounded-xl border border-outline-variant/70 px-5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="h-11 rounded-xl bg-primary px-6 text-sm font-semibold text-on-primary shadow-sm transition-all hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? 'Creating listing...' : 'Create listing'}
            </button>
          </footer>
        </form>

        <p className="mt-4 text-center text-xs text-on-surface-variant">
          You can update your listing details and photos later.
        </p>
      </div>
    </main>
  )
}