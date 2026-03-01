'use client'

import React, { useState } from 'react'

const ContactCTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate submission
    setTimeout(() => setStatus('sent'), 1500)
  }

  return (
    <section className="bg-white border-t border-gray-200">
      {/* Top area — massive heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h2
          className="text-gray-900 font-bold leading-[0.9] tracking-tight"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
          }}
        >
          Let&rsquo;s talk.
        </h2>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200" />

      {/* Form area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {status === 'sent' ? (
          <div className="max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Thanks. We&rsquo;ll be in touch.
            </h3>
            <p className="text-gray-500 text-lg">
              We typically respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-x-16 gap-y-0">
            {/* Left column — name, email, service */}
            <div className="flex flex-col">
              <div className="border-b border-gray-200 py-6">
                <label
                  htmlFor="contact-name"
                  className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
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
                  className="w-full bg-transparent text-gray-900 text-lg border-none outline-none placeholder:text-gray-300"
                />
              </div>

              <div className="border-b border-gray-200 py-6">
                <label
                  htmlFor="contact-email"
                  className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
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
                  className="w-full bg-transparent text-gray-900 text-lg border-none outline-none placeholder:text-gray-300"
                />
              </div>

              <div className="border-b border-gray-200 md:border-b-0 py-6">
                <label
                  htmlFor="contact-service"
                  className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
                >
                  What are you interested in?
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-transparent text-gray-900 text-lg border-none outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select a service</option>
                  <option value="consulting">Consulting</option>
                  <option value="studio">Studio Production</option>
                  <option value="talent">Talent Management</option>
                  <option value="resonate">Resonate</option>
                  <option value="other">Something else</option>
                </select>
              </div>
            </div>

            {/* Right column — message + submit */}
            <div className="flex flex-col">
              <div className="border-b border-gray-200 py-6 flex-1">
                <label
                  htmlFor="contact-message"
                  className="block text-xs uppercase tracking-widest text-gray-400 mb-3"
                >
                  Tell us about your project
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Brief description of what you're looking for..."
                  rows={6}
                  className="w-full bg-transparent text-gray-900 text-lg border-none outline-none resize-none placeholder:text-gray-300"
                />
              </div>

              <div className="py-6 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Or email us directly at{' '}
                  <a
                    href="mailto:hello@badbrain.media"
                    className="text-gray-900 hover:underline"
                  >
                    hello@badbrain.media
                  </a>
                </span>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="border border-gray-900 px-8 py-3 text-sm uppercase tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Bottom border */}
      <div className="border-t border-gray-200" />

      {/* Subtle sign-off line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <span className="text-xs text-gray-300 uppercase tracking-[0.3em]">
          Bad Brain Media
        </span>
        <span className="text-xs text-gray-300">
          London
        </span>
      </div>
    </section>
  )
}

export default ContactCTA
