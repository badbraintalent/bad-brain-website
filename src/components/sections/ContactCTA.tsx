'use client'

import React, { useRef, useState } from 'react'
import CopyEmail from '@/components/ui/CopyEmail'
import StepBar from '@/components/ui/StepBar'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import { winShadow } from '@/lib/y2k'

// The contact page carries "Come and say hello." in its own hero, so it renders
// this section form-only (showHeading={false}); the homepage keeps the heading.
const ContactCTA = ({ showHeading = true }: { showHeading?: boolean }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    company: '', // honeypot — hidden field, humans never fill it
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  // The stepped "transmitting" bar runs its own 1.5s; the real request runs in
  // parallel and the outcome is read when the bar completes.
  const sendRef = useRef<Promise<boolean> | null>(null)
  // The sending/sent states are much shorter than the form — lock the area's
  // height at submit so the footer below doesn't jump between states.
  const formAreaRef = useRef<HTMLDivElement>(null)
  const [lockedHeight, setLockedHeight] = useState<number | undefined>(undefined)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLockedHeight(formAreaRef.current?.offsetHeight)
    setStatus('sending')
    sendRef.current = fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((r) => r.ok)
      .catch(() => false)
  }

  const onTransmitted = () => {
    const send = sendRef.current
    if (!send) return setStatus('sent')
    send.then((ok) => setStatus(ok ? 'sent' : 'error'))
  }

  const reset = () => {
    setStatus('idle')
    setFormData({ name: '', email: '', service: '', message: '', company: '' })
  }

  return (
    <section className="bg-white border-t border-black/10">
      {/* Top area — massive heading over a halftone logomark field */}
      {showHeading && (
        <>
          <div className="relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/halftones/bb_blue_1600.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute -right-8 top-1/2 -translate-y-1/2 h-[140%] w-auto pointer-events-none"
            />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-24 pb-10 md:pb-16">
              <h2
                // One line from sm up; below that it wraps to two lines so the
                // type can stay large rather than shrinking to fit.
                className="text-black sm:whitespace-nowrap text-display-2 leading-hero"
              >
                Come and say hello.
              </h2>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-black/10" />
        </>
      )}

      {/* Form area */}
      <div ref={formAreaRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16" style={{ minHeight: lockedHeight }}>
        {status === 'sent' ? (
          /* Digital system-confirmation dialog — message.exe */
          <div
            className="max-w-md border border-black bg-white"
            style={{ boxShadow: winShadow(6, 0.18), animation: 'win-open 220ms steps(4) both' }}
            role="status"
            aria-live="polite"
          >
            <WindowTitleBar name="message.exe" className="border-b border-black/15 px-3 py-2" />
            <div className="px-6 py-7 flex items-start gap-4">
              <span
                className="flex-shrink-0 w-10 h-10 border border-black bg-bb-mint flex items-center justify-center text-black text-body-lg leading-none"
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <h3 className="text-display-3 text-black mb-1.5">Message sent.</h3>
                <p className="text-black/50">Thanks — we&rsquo;ll reply within 24 hours.</p>
              </div>
            </div>
            <div className="border-t border-black/10 px-6 py-4 flex justify-end">
              <button
                type="button"
                onClick={reset}
                className="btn-phys border border-black px-7 py-2.5 text-label uppercase tracking-label text-black bg-white hover:bg-bb-blue"
              >
                OK
              </button>
            </div>
          </div>
        ) : status === 'error' ? (
          /* Delivery failure — same window chrome, error voice; form data is
             kept so "try again" goes straight back to the filled form */
          <div
            className="max-w-md border border-black bg-white"
            style={{ boxShadow: winShadow(6, 0.18), animation: 'win-open 220ms steps(4) both' }}
            role="alert"
          >
            <WindowTitleBar name="message.exe" className="border-b border-black/15 px-3 py-2" />
            <div className="px-6 py-7 flex items-start gap-4">
              <span
                className="flex-shrink-0 w-10 h-10 border border-black bg-bb-blue flex items-center justify-center text-black text-body-lg leading-none"
                aria-hidden="true"
              >
                ✕
              </span>
              <div>
                <h3 className="text-display-3 text-black mb-1.5">Not sent.</h3>
                <p className="text-black/50">
                  Something went wrong — try again, or email us at <CopyEmail className="px-underline text-black" />.
                </p>
              </div>
            </div>
            <div className="border-t border-black/10 px-6 py-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="btn-phys border border-black px-7 py-2.5 text-label uppercase tracking-label text-black bg-white hover:bg-bb-blue"
              >
                Try again
              </button>
            </div>
          </div>
        ) : status === 'sending' ? (
          /* Self-driving stepped "transmitting" loader */
          <div className="max-w-md py-4" role="status" aria-live="polite">
            <p className="text-label tracking-label-wide uppercase text-black/60 mb-3">
              transmitting message…
            </p>
            <StepBar autoplay durationMs={1500} onComplete={onTransmitted} className="w-fit" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative grid md:grid-cols-2 gap-x-16 gap-y-0">
            {/* Honeypot — visually hidden and skipped by keyboard/AT; the API
                silently drops any submission that fills it */}
            <div aria-hidden="true" className="absolute w-px h-px overflow-hidden -m-px" style={{ clipPath: 'inset(50%)' }}>
              <label htmlFor="contact-company">Company (leave blank)</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            {/* Left column — name, email, service */}
            <div className="flex flex-col">
              <div className="px-field relative border-b border-black/10 py-6">
                <span className="px-corners" aria-hidden="true" />
                <label
                  htmlFor="contact-name"
                  className="block text-label uppercase tracking-label text-black/60 mb-3"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-transparent text-black text-body-lg border-none outline-none placeholder:text-black/25"
                />
              </div>

              <div className="px-field relative border-b border-black/10 py-6">
                <span className="px-corners" aria-hidden="true" />
                <label
                  htmlFor="contact-email"
                  className="block text-label uppercase tracking-label text-black/60 mb-3"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full bg-transparent text-black text-body-lg border-none outline-none placeholder:text-black/25"
                />
              </div>

              <div className="px-field relative border-b border-black/10 md:border-b-0 py-6">
                <span className="px-corners" aria-hidden="true" />
                <label
                  htmlFor="contact-service"
                  className="block text-label uppercase tracking-label text-black/60 mb-3"
                >
                  Where do you need us?
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-transparent text-black text-body-lg border-none outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select a service</option>
                  <option value="blueprint">Blueprint</option>
                  <option value="studio">Studio</option>
                  <option value="connect">Connect</option>
                  <option value="resonate">Resonate</option>
                  <option value="other">Something else</option>
                </select>
              </div>
            </div>

            {/* Right column — message + submit */}
            <div className="flex flex-col">
              <div className="px-field relative border-b border-black/10 py-6 flex-1">
                <span className="px-corners" aria-hidden="true" />
                <label
                  htmlFor="contact-message"
                  className="block text-label uppercase tracking-label text-black/60 mb-3"
                >
                  What are you working on?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your brand, what you need and when – as much or as little as you like."
                  rows={6}
                  className="w-full bg-transparent text-black text-body-lg border-none outline-none resize-none placeholder:text-black/25"
                />
              </div>

              <div className="py-6 flex items-center justify-between gap-6">
                <span className="text-body-sm text-black/60">
                  Or email us directly at{' '}
                  <CopyEmail className="px-underline text-black" />
                  <span className="block text-black/45 mt-1.5">
                    We aim to come back to you within 24 hours.
                  </span>
                </span>
                <button
                  type="submit"
                  className="btn-phys border border-black px-8 py-3 text-body-sm uppercase tracking-label text-black bg-white hover:bg-bb-blue"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Bottom border */}
      <div className="border-t border-black/10" />

      {/* Subtle sign-off line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <span className="text-label text-black/55 uppercase tracking-label-wide">
          Bad Brain Media
        </span>
        <span className="text-label text-black/55">
          London
        </span>
      </div>
    </section>
  )
}

export default ContactCTA
