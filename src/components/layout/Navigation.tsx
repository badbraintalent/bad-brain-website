'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'About', href: '/' },
    { name: 'Services', href: '/services',
      submenu: [
        { name: 'Consulting', href: '/services/consulting' },
        { name: 'Studio', href: '/services/studio' },
        { name: 'Talent', href: '/services/talent' },
      ]
    },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-brand-yellow/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo/logo.svg"
                alt="Bad Brain"
                width={140}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <button className="text-gray-700 hover:text-brand-blue px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 hover:bg-white/30">
                    {item.name}
                  </button>
                ) : item.name === 'Contact' ? (
                  <Link
                    href={item.href}
                    className="bg-brand-blue ml-4 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-brand-blue/90 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-brand-blue px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 hover:bg-white/30"
                  >
                    {item.name}
                  </Link>
                )}
                {item.submenu && (
                  <div className="absolute right-0 top-full mt-1 w-56 rounded-2xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-3 text-sm text-gray-600 hover:bg-brand-yellow/10 hover:text-brand-blue transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-gray-700 hover:text-brand-blue hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-brand-yellow/95 backdrop-blur-md border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navigation.map((item) => (
            <div key={item.name} className="space-y-2">
              {item.submenu ? (
                <>
                  <div className="text-gray-700 block px-4 py-3 rounded-xl text-base font-medium">
                    {item.name}
                  </div>
                  <div className="ml-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="text-gray-600 hover:text-brand-blue block px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : item.name === 'Contact' ? (
                <Link
                  href={item.href}
                  className="bg-brand-blue text-white block text-center px-6 py-3 rounded-xl text-base font-medium hover:bg-brand-blue/90 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-brand-blue block px-4 py-3 rounded-xl text-base font-medium hover:bg-white/30 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation