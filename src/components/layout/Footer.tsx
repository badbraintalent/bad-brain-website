'use client'

import React from 'react'
import Link from 'next/link'
import CopyEmail from '@/components/ui/CopyEmail'

const serviceLinks = [
  { name: 'Blueprint', href: '/services/blueprint' },
  { name: 'Connect', href: '/services/connect' },
  { name: 'Studio', href: '/services/studio' },
  { name: 'Resonate', href: '/services/resonate' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-9">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand/logo/BB_Wordmark_Focus.svg"
                alt="Bad Brain"
                className="boop h-12 w-auto invert"
              />
            </div>
            <p className="text-body-md mb-6 text-white/70 max-w-lg">
              The social entertainment agency.
              <br />For brands, creators and artists.
            </p>
            <div>
              <CopyEmail className="px-underline text-body-sm text-bb-mint hover:text-bb-blue" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-body-md mb-6 uppercase">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="px-underline text-white/70 hover:text-bb-blue text-body-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-body-md mb-6 uppercase">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="px-underline text-white/70 hover:text-bb-blue text-body-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 md:mt-12 pt-8 text-center">
          <p className="text-white/50 text-body-sm">
            &copy; {currentYear} Bad Brain Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
