'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  FiArrowRight,
  FiHelpCircle,
  FiMail,
  FiSearch,
} from 'react-icons/fi'

const faqs = [
  {
    category: 'Tenants',
    question: 'How do I contact a landlord?',
    answer:
      'Open a room listing and send a booking request. The landlord can review it from their bookings dashboard.',
  },
  {
    category: 'Tenants',
    question: 'Can I save rooms for later?',
    answer:
      'Yes. Use the wishlist action on a room you like, then find your saved rooms in the Wishlist section.',
  },
  {
    category: 'Landlords',
    question: 'How do I post a room?',
    answer:
      'Sign in as a landlord, choose Post Listing from the navigation, and add your room details and photos.',
  },
  {
    category: 'Listings',
    question: 'What should I do if a listing looks incorrect?',
    answer:
      'Send us the listing title and what needs attention. We will review the report as soon as possible.',
  },
]

const SUPPORT_EMAIL = 'subodhdhamala@gmail.com'

export default function SupportPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()

    if (!q) return faqs

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <main className="min-h-screen bg-surface px-gutter py-8 md:py-14">
      <div className="mx-auto max-w-container-max">
        <section className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-container/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <FiHelpCircle size={14} />
            MeroRoom Support
          </div>

          <h1 className="mt-5 text-h2 font-h2 tracking-tight text-on-surface md:text-5xl">
            How can we help?
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="group inline-flex items-center gap-2 font-medium text-primary"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-container/10 transition-colors group-hover:bg-primary-container/20">
                <FiMail size={14} />
              </span>

              <span className="underline-offset-4 group-hover:underline">
                {SUPPORT_EMAIL}
              </span>
            </a>

            <span className="hidden h-4 w-px bg-outline-variant sm:block" />

            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 text-on-surface-variant transition-colors hover:text-on-surface"
            >
              Browse rooms
              <FiArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </section>

        <section
          className="mx-auto mt-10 max-w-4xl"
          aria-label="Frequently asked questions"
        >
          <div className="mb-5 flex items-end justify-between gap-4 px-1">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
                Help center
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-on-surface">
                Frequently asked questions
              </h2>

              <p className="mt-1 text-sm text-on-surface-variant">
                Quick answers to common questions.
              </p>
            </div>

            {results.length > 0 && (
              <span className="hidden rounded-full bg-surface-container-low px-3 py-1 text-xs font-medium text-on-surface-variant sm:inline-flex">
                {results.length} {results.length === 1 ? 'article' : 'articles'}
              </span>
            )}
          </div>

          <div className="space-y-3">
            {results.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm transition-all duration-200 hover:border-outline-variant hover:shadow-md open:border-primary/20"
              >
                <summary className="cursor-pointer list-none px-5 py-5 md:px-6 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 min-w-9 items-center justify-center rounded-xl bg-primary-container/10 text-primary">
                      <FiHelpCircle size={16} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-sm font-bold text-on-surface md:text-[15px]">
                            {faq.question}
                          </span>

                          <span className="mt-2 inline-flex rounded-md bg-surface-container-low px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                            {faq.category}
                          </span>
                        </div>

                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-outline-variant/70 text-lg text-on-surface-variant transition-all duration-200 group-hover:border-primary/30 group-hover:text-primary group-open:rotate-45 group-open:border-primary/30 group-open:bg-primary-container/10 group-open:text-primary">
                          +
                        </span>
                      </div>

                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <div className="mt-4 border-t border-outline-variant/40 pt-4">
                            <p className="max-w-2xl text-sm leading-6 text-on-surface-variant">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </summary>
              </details>
            ))}

            {results.length === 0 && (
              <div className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest px-6 py-14 text-center shadow-sm">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant">
                  <FiSearch size={20} />
                </span>

                <h3 className="mt-4 text-sm font-bold text-on-surface">
                  No matching questions
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-on-surface-variant">
                  We couldn&apos;t find anything matching &ldquo;{query}
                  &rdquo;. Try another search or contact us directly.
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded-xl border border-outline-variant/70 px-4 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container-low"
                  >
                    Clear search
                  </button>

                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-all hover:opacity-90 hover:shadow-md"
                  >
                    Email support
                    <FiArrowRight size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-primary/15 bg-primary-container/10">
          <div className="flex flex-col gap-5 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-7">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiMail size={18} />
              </span>

              <div>
                <h3 className="text-sm font-bold text-on-surface">
                  Still need help?
                </h3>

                <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                  Send us a message and we&apos;ll get back to you as soon as
                  possible.
                </p>
              </div>
            </div>

            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-all hover:opacity-90 hover:shadow-md"
            >
              Contact support
              <FiArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}