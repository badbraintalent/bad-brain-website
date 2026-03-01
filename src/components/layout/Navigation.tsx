'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'About', href: '/' },
  { name: 'Consulting', href: '/services/consulting' },
  { name: 'Studio', href: '/services/studio' },
  { name: 'Talent', href: '/services/talent' },
  { name: 'Resonate', href: '/services/resonate' },
  { name: 'Contact', href: '/contact' },
]

const EXIT_DURATION = 500 // ms — matches CSS transition duration

const Navigation = () => {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const open = useCallback(() => {
    setMounted(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true))
    })
  }, [])

  const close = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => setMounted(false), EXIT_DURATION)
  }, [])

  const toggle = useCallback(() => {
    if (mounted && isVisible) {
      close()
    } else if (!mounted) {
      open()
    }
  }, [mounted, isVisible, open, close])

  const handleLinkClick = useCallback(() => {
    close()
  }, [close])

  // Clean up if component unmounts mid-animation
  useEffect(() => {
    return () => {
      setMounted(false)
      setIsVisible(false)
    }
  }, [])

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-lg font-bold text-gray-900">
                Bad Brain
              </Link>
            </div>
            <button
              onClick={toggle}
              className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-black focus:outline-none"
            >
              <span className="sr-only">Toggle menu</span>
              {mounted ? (
                <X className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {mounted && (
        <div
          className="fixed inset-0 z-40 bg-[#1a1a1a] overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity ${EXIT_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          <div className="h-16" />

          <nav className="nav-overlay-list max-w-7xl mx-auto px-6 lg:px-8">
            {navItems.map((item, i) => (
              <div
                key={item.name}
                className={`nav-item-row ${isVisible ? 'nav-item-row-visible' : ''} ${i > 0 ? 'border-t border-[#333]' : ''}`}
                style={{
                  '--stagger': isVisible ? i : navItems.length - 1 - i,
                } as React.CSSProperties}
              >
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className="nav-fill-item"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

export default Navigation
