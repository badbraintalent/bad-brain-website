'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-blue text-white pt-16 pb-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Image
                src="/images/logo/logo.svg"
                alt="Bad Brain"
                width={150}
                height={50}
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-lg mb-6 text-white/90 max-w-lg">
              We&apos;re a specialist agency built for the creator economy.
              <br />We consult. We produce content. We develop talent.
            </p>
            <div>
              <a
                href="mailto:info@badbrain.media"
                className="text-md font-semibold hover:text-brand-yellow transition-colors duration-200"
              >
                info@badbrain.media
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/consulting" className="text-white/90 hover:text-white transition-colors duration-200">
                  Consulting
                </Link>
              </li>
              <li>
                <Link href="/services/studio" className="text-white/90 hover:text-white transition-colors duration-200">
                  Studio
                </Link>
              </li>
              <li>
                <Link href="/services/talent" className="text-white/90 hover:text-white transition-colors duration-200">
                  Talent
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-white/90 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/70">
            © {currentYear} Bad Brain Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer