'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  name: string
  href: string
  /** Hover fill colour (mirrors the hero accent scheme). */
  accent: string
  /** Overlay background field shown while this item is hovered. */
  field?: string
}

const navItems: NavItem[] = [
  { name: 'About', href: '/', accent: 'var(--bb-blue)' },
  { name: 'Blueprint', href: '/services/blueprint', accent: 'var(--bb-mint)', field: '/images/brand/halftones/blueprint_16x9_blue.png' },
  { name: 'Studio', href: '/services/studio', accent: 'var(--bb-blue)', field: '/images/brand/halftones/studio_16x9_blue.png' },
  { name: 'Connect', href: '/services/connect', accent: 'var(--bb-grey)', field: '/images/brand/halftones/connect_16x9_blue.png' },
  { name: 'Resonate', href: '/services/resonate', accent: 'var(--bb-mint)', field: '/images/brand/halftones/resonate_16x9_blue.png' },
  { name: 'Contact', href: '/contact', accent: 'var(--bb-blue)' },
]

const DEFAULT_FIELD = '/images/brand/halftones/bb_16x9_blue.png'

const EXIT_DURATION = 500 // ms — matches CSS transition duration

/* Live HH:MM:SS clock for the overlay status strip — renders blank on the
   server so hydration always matches, then ticks once mounted. */
const StatusClock = () => {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  return <span suppressHydrationWarning>{time}</span>
}

const Navigation = () => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const closeTimerRef = useRef<number | null>(null)

  const open = useCallback(() => {
    // Reopening mid-close: cancel the pending unmount so the overlay fades
    // straight back in instead of vanishing under the stale timer.
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setMounted(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true))
    })
  }, [])

  const close = useCallback(() => {
    setIsVisible(false)
    setHoveredItem(null)
    closeTimerRef.current = window.setTimeout(() => {
      setMounted(false)
      closeTimerRef.current = null
    }, EXIT_DURATION)
  }, [])

  const toggle = useCallback(() => {
    if (mounted && isVisible) {
      close()
    } else {
      open()
    }
  }, [mounted, isVisible, open, close])

  const handleLinkClick = useCallback(() => {
    close()
  }, [close])

  // Clean up if component unmounts mid-animation
  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
      setMounted(false)
      setIsVisible(false)
    }
  }, [])

  const isCurrent = (item: NavItem) =>
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

  // Glyph/label follow the visible state, not `mounted` (which lingers for
  // EXIT_DURATION during the close fade and made the revert look laggy).
  const isOpen = mounted && isVisible

  const activeField =
    (hoveredItem && navItems.find((i) => i.name === hoveredItem)?.field) ??
    DEFAULT_FIELD

  const barStyle = (offset: number, transform: string): React.CSSProperties => ({
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    background: 'currentColor',
    top: isOpen ? 4 : offset,
    transform: isOpen ? transform : 'none',
    transition: 'top 200ms steps(3), transform 200ms steps(3), opacity 200ms steps(2)',
  })

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 border-b border-black/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brand/logo/BB_wordmark.svg"
                  alt="Bad Brain"
                  className="h-5 w-auto"
                />
              </Link>
            </div>

            <button
              onClick={toggle}
              aria-expanded={isOpen}
              className="group inline-flex items-center gap-2.5 p-2 text-black hover:text-bb-blue cursor-pointer"
            >
              <span className="sr-only">Toggle menu</span>
              <span
                className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
                aria-hidden="true"
              >
                {isOpen ? 'Close' : 'Menu'}
                <span
                  className="inline-block"
                  style={{ animation: 'rec-blink 1.1s steps(2) infinite' }}
                >
                  _
                </span>
              </span>
              <span
                className="relative block w-[16px] h-[10px]"
                aria-hidden="true"
              >
                <span style={barStyle(0, 'rotate(45deg)')} />
                <span
                  style={{
                    ...barStyle(4, 'none'),
                    opacity: isOpen ? 0 : 1,
                  }}
                />
                <span style={barStyle(8, 'rotate(-45deg)')} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {mounted && (
        <div
          className="fixed inset-0 z-40 bg-white overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity ${EXIT_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          {/* Halftone logomark fields — default BB art, stepped "12fps" crossfade
              to the hovered service's own field art. All layered so they preload
              on open. */}
          {[DEFAULT_FIELD, ...navItems.map((i) => i.field).filter((f): f is string => !!f)].map((src) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                opacity: activeField === src ? 0.6 : 0,
                transition: 'opacity 350ms steps(5)',
              }}
            />
          ))}

          <div className="h-16" />

          <nav
            className="nav-overlay-list relative max-w-7xl mx-auto px-6 lg:px-8"
            style={{ paddingBottom: '4.5rem' }}
          >
            {navItems.map((item, i) => (
              <div
                key={item.name}
                className={`nav-item-row flex-1 min-h-0 flex ${isVisible ? 'nav-item-row-visible' : ''} ${i > 0 ? 'border-t border-black/15' : ''}`}
                style={{
                  '--stagger': isVisible ? i : navItems.length - 1 - i,
                } as React.CSSProperties}
              >
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-current={isCurrent(item) ? 'page' : undefined}
                  className="flex w-full h-full items-center"
                >
                  <span
                    className="nav-fill-item"
                    style={{
                      '--fill':
                        hoveredItem === item.name || isCurrent(item)
                          ? '100%'
                          : '0%',
                      background: `linear-gradient(to right, ${item.accent} var(--fill), #000 var(--fill))`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                    } as React.CSSProperties}
                  >
                    {item.name}
                  </span>
                </Link>
              </div>
            ))}
          </nav>

          {/* Status strip — quiet OS readout along the bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex justify-between font-mono text-[0.55rem] tracking-[0.15em] text-black/40 lowercase border-t border-black/15">
              <span>{navItems.length} items · badbrain.media</span>
              <span>
                local <StatusClock />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
