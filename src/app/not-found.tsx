'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import WindowTitleBar from '@/components/ui/WindowTitleBar'
import PixelFieldStrips from '@/components/ui/PixelFieldStrips'
import { scanlines, winShadow } from '@/lib/y2k'

/* Y2K crash-screen 404 — a restrained OS "fatal exception" window on a CRT-blue
   field, reusing the site's .exe title-bar chrome, scanline overlay and
   pixel-field strips. */
export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // "Press any key to continue" — but leave keys used for reading and
    // keyboard nav alone (Tab, modifiers, scrolling keys), or a keyboard user
    // gets yanked home before they can read the page.
    const exempt = new Set([
      'Tab', 'Shift', 'Control', 'Alt', 'Meta', 'Escape', 'CapsLock',
      ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'PageUp', 'PageDown', 'Home', 'End',
    ])
    const onKey = (e: KeyboardEvent) => {
      if (exempt.has(e.key) || e.metaKey || e.ctrlKey || e.altKey) return
      router.push('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

  return (
    <main className="relative min-h-screen bg-bb-grey text-black flex items-center justify-center overflow-hidden px-4">
      {/* CRT scanlines */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={scanlines()} />
      {/* Pixel-field strips top + bottom (echoes the boot screen) */}
      <PixelFieldStrips opacity={0.5} />

      {/* OS error window */}
      <div
        className="relative w-full max-w-lg bg-white border border-black"
        style={{
          boxShadow: winShadow(),
          animation: 'win-open 220ms steps(4) both',
          // The 404 is sized against this window, not the viewport — see below.
          containerType: 'inline-size',
        }}
      >
        <WindowTitleBar name="error.exe" className="border-b border-black/15 px-3 py-2" />

        {/* Body */}
        <div className="px-6 sm:px-8 py-8">
          <p className="text-label tracking-label-wide uppercase text-black/60 mb-4">
            ✕ fatal exception
          </p>
          {/* `text-hero` is viewport-relative (13vw), but this window is a fixed
              512px — so the numerals overran the box at every desktop width. Sized
              in `cqw` against the window instead: the display face sets ~3.08× its
              font-size wide, so 27cqw keeps "404" inside the body's padding at any
              window width. */}
          <h1
            className="uppercase text-black leading-hero mb-5"
            style={{ fontSize: 'clamp(2.5rem, 27cqw, 8.5rem)' }}
          >
            404
          </h1>
          <p className="text-black/70 text-body-md mb-2 max-w-[32rem]">
            The page you requested has stopped responding, or never existed in the first place.
          </p>
          <p className="text-label tracking-label text-black/60 mb-8">
            0x00000194&nbsp;&nbsp;PAGE_NOT_FOUND
          </p>

          {/* Actions */}
          <div className="flex items-center gap-5 flex-wrap">
            <Link
              href="/"
              className="btn-phys inline-block border border-black px-7 py-3 text-label uppercase tracking-label text-black bg-white hover:bg-bb-blue"
            >
              ← Return home
            </Link>
            <span className="text-label tracking-label uppercase text-black/60">
              or press any key
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
