'use client'

import React, { useRef, useState } from 'react'
import CopyEmail from '@/components/ui/CopyEmail'
import StepBar from '@/components/ui/StepBar'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import { winShadow } from '@/lib/y2k'

/* The capture itself — name, email, message — plus its sending / sent / error
   states. Extracted from ContactCTA so the contact page can put a live form in
   its hero without a second copy of the submit logic.

   `layout` is about available width, not about which page it is on:
   - `wide`    — two columns from md up. The homepage's full-bleed band.
   - `compact` — one column throughout. The contact hero's right-hand pane,
                 which is ~600px at its widest. */
const ContactForm = ({
  layout = 'wide',
  className = '',
}: {
  layout?: 'wide' | 'compact'
  className?: string
}) => {
  const compact = layout === 'compact'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '', // honeypot — hidden field, humans never fill it
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  // The stepped "transmitting" bar runs its own 1.5s; the real request runs in
  // parallel and the outcome is read when the bar completes.
  const sendRef = useRef<Promise<boolean> | null>(null)
  // The sending/sent states are much shorter than the form — lock the area's
  // height at submit so whatever sits below doesn't jump between states.
  const formAreaRef = useRef<HTMLDivElement>(null)
  const [lockedHeight, setLockedHeight] = useState<number | undefined>(undefined)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    setFormData({ name: '', email: '', message: '', company: '' })
  }

  // The result dialogs are windows in their own right on the homepage band; in
  // the hero they are already inside contact.exe's chrome, so they drop the
  // border and shadow rather than nesting a window inside a window.
  const dialogClass = compact
    ? 'bg-white'
    : 'max-w-md border border-black bg-white'
  const dialogStyle = compact
    ? { animation: 'win-open 220ms steps(4) both' }
    : { boxShadow: winShadow(6, 0.18), animation: 'win-open 220ms steps(4) both' }

  /* Status glyph box, shared by the sent and error dialogs so the two can't
     drift.

     It was a fixed `w-10 h-10`, but the heading beside it is `text-display-3` —
     a clamp(1.375rem, 3.2vw, 2.4rem). So 40px agreed with the heading at
     exactly one viewport width and drifted at every other, worst at narrow
     widths where the heading falls to 22px and the box stayed at 40.

     Sized in `cap`, not `em`: 1cap is the font's actual capital height, which
     is what reads as "the height of the text". Gravity Wide sets tall caps, so
     an em-sized box still stood visibly proud of them. The face has to be
     declared here for `cap` to measure the right one — the heading inherits
     `font-display` from the base layer, but this span is its sibling and would
     otherwise measure the body font.

     `mt` drops the box from the line-box top onto the cap band. Centring it in
     the line box is the obvious guess and is wrong — caps are not centred
     there, they sit on the baseline with descender space below, so a centred
     box rides visibly low. The offset has to put the box's BOTTOM on the
     baseline; being 1cap tall, its top then lands exactly on the cap line.

     Baseline position, from ABCGravity-Wide's own metrics (unitsPerEm 2048,
     hhea ascent 1916, descent -735, capHeight 1434; `useTypoMetrics` is off
     and the win metrics are identical, so there is no ambiguity about which
     set the browser uses):
       content height = (1916 + 735) / 2048               = 1.2944em
       half-leading   = (1em - 1.2944em) / 2              = -0.1472em
       baseline       = -0.1472em + 1916/2048             =  0.7883em
     so margin-top = 0.7883em - 1cap, which is 0.0881em for this face.

     Kept as `0.7883em - 1cap` rather than the collapsed 0.0881em: the baseline
     figure is the font-metric part and `1cap` is measured live, so swapping the
     display face only invalidates the one constant.

     The trailing `- 0.5px` is a rasterisation correction, not part of the
     geometry. The maths above is exact — 'M' measures yMin 0 to yMax 1434
     against a declared sCapHeight of 1434, so 1cap is precisely its height —
     but the computed offset lands on a fraction (3.38px at the clamp's
     ceiling) and Chrome rounded the bordered box just below the rasterised
     cap. Half a pixel, arrived at by bisection: uncorrected read low, a full
     1px read high. Flat unit deliberately — a rounding artifact does not scale
     with font-size, so it must not be expressed in em. This is the dial if the
     box ever looks a touch high or low. */
  const glyphBoxClass =
    'flex-shrink-0 font-display text-display-3 w-[1cap] h-[1cap] mt-[calc(0.7883em-1cap-0.5px)] border border-black flex items-center justify-center leading-none'

  /* The tick and cross are drawn, not typed.

     As text they sat 2px high in the box, and no amount of flex centring
     fixes that: flex centres the glyph's LINE box, but its ink sits on the
     baseline with descender space beneath, so the ink lands above centre.
     The size of that error is a property of whichever font supplies the
     character — and neither brand face has ✓ or ✕, so it is a per-platform
     fallback that also renders them as emoji in some stacks. A hardcoded
     nudge would only be right on the machine it was measured on.

     Drawn to the box, the marks are centred by construction and identical
     everywhere. 55% leaves the mark reading as ink inside a frame rather
     than filling it; the 10-unit viewBox keeps the coordinates whole. */
  const markProps = {
    viewBox: '0 0 10 10',
    className: 'w-[55%] h-[55%]',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'square' as const,
  }

  /* The form area keeps the form's height once submitted (see `lockedHeight`),
     so the short result dialog would otherwise sit at the top of a tall empty
     box. On a phone the submit button is near the bottom of that box, so a
     top-aligned confirmation lands above the viewport and reads as nothing
     having happened. Centre it in the reserved space below md; the wide layout
     is short enough on desktop to stay top-aligned. */
  const resultAreaClass =
    status === 'idle' ? '' : 'flex flex-col justify-center md:block'

  return (
    <div
      ref={formAreaRef}
      className={`${resultAreaClass} ${className}`}
      style={{ minHeight: lockedHeight }}
    >
      {status === 'sent' ? (
        /* Digital system-confirmation dialog — message.exe */
        <div className={dialogClass} style={dialogStyle} role="status" aria-live="polite">
          {!compact && (
            <WindowTitleBar name="message.exe" className="border-b border-black/15 px-3 py-2" />
          )}
          <div className={`flex items-start gap-4 ${compact ? 'py-7' : 'px-6 py-7'}`}>
            <span className={`${glyphBoxClass} bg-bb-mint text-black`} aria-hidden="true">
              <svg {...markProps}>
                <path d="M1.5 5.2 L4 7.7 L8.5 2.3" />
              </svg>
            </span>
            <div>
              <h3 className="text-display-3 text-black mb-1.5">Message sent.</h3>
              <p className="text-black/60">Thanks - we&rsquo;ll reply within 24 hours.</p>
            </div>
          </div>
          <div className={`border-t border-black/10 py-4 flex justify-end ${compact ? '' : 'px-6'}`}>
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
        <div className={dialogClass} style={dialogStyle} role="alert">
          {!compact && (
            <WindowTitleBar name="message.exe" className="border-b border-black/15 px-3 py-2" />
          )}
          <div className={`flex items-start gap-4 ${compact ? 'py-7' : 'px-6 py-7'}`}>
            <span className={`${glyphBoxClass} bg-bb-mint text-black`} aria-hidden="true">
              <svg {...markProps}>
                <path d="M2 2 L8 8 M8 2 L2 8" />
              </svg>
            </span>
            <div>
              <h3 className="text-display-3 text-black mb-1.5">Not sent.</h3>
              <p className="text-black/60">
                Something went wrong - try again, or email us at{' '}
                <CopyEmail className="px-underline text-black" />.
              </p>
            </div>
          </div>
          <div className={`border-t border-black/10 py-4 flex justify-end ${compact ? '' : 'px-6'}`}>
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
          <p className="text-label tracking-label-wide uppercase text-black/70 mb-3">
            transmitting message…
          </p>
          <StepBar autoplay durationMs={1500} onComplete={onTransmitted} className="w-fit" />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`relative grid gap-y-0 ${compact ? '' : 'md:grid-cols-2 gap-x-16'}`}
        >
          {/* Honeypot — visually hidden and skipped by keyboard/AT; the API
              silently drops any submission that fills it */}
          <div
            aria-hidden="true"
            className="absolute w-px h-px overflow-hidden -m-px"
            style={{ clipPath: 'inset(50%)' }}
          >
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

          {/* Name + email */}
          <div className="flex flex-col">
            <div className={`px-field relative border-b border-black/10 ${compact ? 'py-4' : 'py-6'}`}>
              <span className="px-corners" aria-hidden="true" />
              <label
                htmlFor="contact-name"
                className="block text-label uppercase tracking-label text-black/70 mb-3"
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

            {/* The "Where do you need us?" service <select> was removed to cut
                friction: the capture is name, email and message only, since a
                first-time visitor is unlikely to know which of the four
                services they need. The API's matching `service` handling went
                with it — it was still printing "Interested in: -" into every
                enquiry email. */}
            <div
              className={`px-field relative border-b border-black/10 ${
                compact ? 'py-4' : 'md:border-b-0 py-6'
              }`}
            >
              <span className="px-corners" aria-hidden="true" />
              <label
                htmlFor="contact-email"
                className="block text-label uppercase tracking-label text-black/70 mb-3"
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
          </div>

          {/* Message + submit */}
          <div className="flex flex-col">
            <div
              className={`px-field relative border-b border-black/10 flex-1 ${
                compact ? 'py-4' : 'py-6'
              }`}
            >
              <span className="px-corners" aria-hidden="true" />
              <label
                htmlFor="contact-message"
                className="block text-label uppercase tracking-label text-black/70 mb-3"
              >
                What are you working on?
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you need…"
                rows={compact ? 3 : 6}
                className="w-full bg-transparent text-black text-body-lg border-none outline-none resize-none placeholder:text-black/25"
              />
            </div>

            {/* `flex-col-reverse` below sm, so on a phone Send sits directly
                under the message rather than below three lines of fallback
                copy — that's ~90px, the difference between the button landing
                above the fold and just under it. From sm up it is the usual
                row: note left, button right. */}
            <div
              className={
                compact
                  ? 'py-4 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6'
                  : 'py-6 flex items-center justify-between gap-6'
              }
            >
              <span className="text-body-sm text-black/70">
                Or email us directly at <CopyEmail className="px-underline text-black" />
                <span className="block text-black/60 mt-1.5">
                  We aim to come back to you within 24 hours.
                </span>
              </span>
              <button
                type="submit"
                className={`btn-phys border border-black px-8 py-3 text-body-sm uppercase tracking-label text-black bg-white hover:bg-bb-blue ${
                  compact ? 'w-full sm:w-auto' : ''
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default ContactForm
