'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { track } from '@vercel/analytics'

export default function ContactPage() {
  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-brand-yellow py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Image
            src="/images/logo/logo.svg"
            alt="Bad Brain"
            width={200}
            height={80}
            className="mx-auto h-20 w-auto mb-8"
          />
          <h1 className="text-5xl font-semibold text-gray-900 mb-8">Get in touch</h1>
          <p className="text-2xl text-gray-700">
            Ready to work smarter in the creator economy?
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-brand-blue text-white p-12 rounded-lg">
            <h2 className="text-3xl font-semibold mb-8">Let&apos;s Talk</h2>
            <p className="text-xl mb-8">
              Whether you&apos;re a brand looking to optimize your creator strategy,
              need integrated content production, or you&apos;re a creator seeking representation,
              we&apos;d love to hear from you.
            </p>
            <a
              href="mailto:info@badbrain.media"
              className="inline-block bg-brand-yellow text-gray-900 px-8 py-4 rounded-md text-xl font-semibold hover:bg-white transition-colors duration-300"
              onClick={() => track('Email Click', { location: 'Contact Page' })}
            >
              📨 info@badbrain.media
            </a>
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Consulting</h3>
              <p className="text-gray-700 mb-6">
                Need help with creator strategy and optimization?
              </p>
              <a
                href="/services/consulting"
                className="text-brand-blue font-semibold hover:underline"
              >
                Learn more about Consulting →
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Studio</h3>
              <p className="text-gray-700 mb-6">
                Looking for integrated content production?
              </p>
              <a
                href="/services/studio"
                className="text-brand-blue font-semibold hover:underline"
              >
                Learn more about Studio →
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Talent</h3>
              <p className="text-gray-700 mb-6">
                Are you a creator seeking representation?
              </p>
              <a
                href="/services/talent"
                className="text-brand-blue font-semibold hover:underline"
              >
                Learn more about Talent →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}