'use client'

import Link from 'next/link'
import { FiArrowRight, FiHelpCircle, FiMail, FiMessageCircle } from 'react-icons/fi'

const faqs = [
  {
    question: 'How do I contact a landlord?',
    answer: 'Open a room listing and send a booking request. The landlord can review it from their bookings dashboard.',
  },
  {
    question: 'How do I post a room?',
    answer: 'Sign in as a landlord, choose Post Listing from the navigation, and add your room details and photos.',
  },
  {
    question: 'Can I save rooms for later?',
    answer: 'Yes. Use the wishlist action on a room you like, then find your saved rooms in the Wishlist section.',
  },
  {
    question: 'What should I do if a listing looks incorrect?',
    answer: 'Send us the listing title and what needs attention. We will review the report as soon as possible.',
  },
]

export default function SupportPage() {
  return (
    <main className="mx-auto max-w-container-max px-gutter py-lg">
      <header className="max-w-2xl">
        <p className="mb-xs text-label-sm font-label-sm uppercase tracking-wider text-primary">
          RoomFinder support
        </p>
        <h1 className="text-h2 font-h2 text-on-surface">How can we help?</h1>
        <p className="mt-sm text-body-md leading-relaxed text-on-surface-variant">
          Find quick answers about finding rooms, managing listings, and sending booking requests.
        </p>
      </header>

      <section className="mt-lg grid gap-sm md:grid-cols-2" aria-label="Support options">
        <a
          href="mailto:subodhdhamala@gmail.com"
          className="group flex items-start gap-sm rounded-lg border border-outline-variant/60 bg-surface-container-lowest p-md transition-colors hover:border-primary/50 hover:bg-surface-container-low"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-container/15 text-primary">
            <FiMail size={19} />
          </span>
          <span>
            <span className="flex items-center gap-xs text-body-md font-semibold text-on-surface">
              Email support <FiArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
            </span>
            <span className="mt-1 block text-body-sm text-on-surface-variant">subodhdhamala@gmail.com</span>
          </span>
        </a>

        <Link
          href="/"
          className="group flex items-start gap-sm rounded-lg border border-outline-variant/60 bg-surface-container-lowest p-md transition-colors hover:border-primary/50 hover:bg-surface-container-low"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-container/15 text-secondary">
            <FiMessageCircle size={19} />
          </span>
          <span>
            <span className="flex items-center gap-xs text-body-md font-semibold text-on-surface">
              Browse rooms <FiArrowRight className="transition-transform group-hover:translate-x-1" size={15} />
            </span>
            <span className="mt-1 block text-body-sm text-on-surface-variant">Return to available listings</span>
          </span>
        </Link>
      </section>

      <section className="mt-xl max-w-3xl" aria-labelledby="faq-heading">
        <div className="mb-md flex items-center gap-sm">
          <FiHelpCircle className="text-primary" size={20} />
          <h2 id="faq-heading" className="text-h3 font-h3 text-on-surface">Frequently asked questions</h2>
        </div>

        <div className="divide-y divide-outline-variant/50 rounded-lg border border-outline-variant/60 bg-surface-container-lowest">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-md first:rounded-t-lg last:rounded-b-lg">
              <summary className="cursor-pointer list-none pr-lg text-body-md font-semibold text-on-surface marker:hidden">
                <span className="flex items-center justify-between gap-md">
                  {faq.question}
                  <span className="text-xl font-normal text-primary transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-sm max-w-2xl text-body-sm leading-relaxed text-on-surface-variant">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}
