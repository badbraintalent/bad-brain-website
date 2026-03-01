'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 text-gray-900 pt-16 pb-9 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="text-lg font-bold text-gray-900">Bad Brain</span>
            </div>
            <p className="text-base mb-6 text-gray-600 max-w-lg">
              We&apos;re a specialist agency built for the creator economy.
              <br />We consult. We produce content. We develop talent.
            </p>
            <div>
              <a
                href="mailto:hello@badbrain.media"
                className="text-sm font-medium text-gray-900 hover:underline"
              >
                hello@badbrain.media
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/consulting" className="text-gray-600 hover:text-black hover:underline text-sm">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/services/studio" className="text-gray-600 hover:text-black hover:underline text-sm">
                  Studio
                </Link>
              </li>
              <li>
                <Link href="/services/talent" className="text-gray-600 hover:text-black hover:underline text-sm">
                  Talent
                </Link>
              </li>
              <li>
                <Link href="/services/resonate" className="text-gray-600 hover:text-black hover:underline text-sm">
                  Resonate
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-black hover:underline text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Bad Brain Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
