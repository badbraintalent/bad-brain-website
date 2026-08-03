'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import StepBar from '@/components/ui/StepBar'
import PixelFieldStrips from '@/components/ui/PixelFieldStrips'

// Irregular step timings — a stepped Y2K loading bar, not a smooth tween
const STEP_TIMES = [120, 310, 420, 640, 900, 1020, 1260, 1380, 1610, 1730, 1900, 2050]

// sessionStorage throws when the browser blocks site data (e.g. "Block all
// cookies") — and this component mounts in the root layout, so an uncaught
// throw would blank the whole app. Treat blocked storage as "not seen".
const safeStorage = {
  get: (key: string) => {
    try {
      return sessionStorage.getItem(key)
    } catch {
      return null
    }
  },
  set: (key: string, value: string) => {
    try {
      sessionStorage.setItem(key, value)
    } catch {}
  },
}

const BootIntro = () => {
  const [phase, setPhase] = useState<'hidden' | 'show' | 'leave'>('hidden')
  const [step, setStep] = useState(0)
  const timersRef = useRef<number[]>([])

  // Skip must also cancel the pending leave/hidden timers — otherwise the
  // full-screen overlay remounts invisibly at 2.35s and swallows clicks.
  const skip = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setPhase('hidden')
  }, [])

  useEffect(() => {
    // ?intro forces a replay (demo helper); ?intro=hold also freezes it open
    const intro = new URLSearchParams(window.location.search).get('intro')
    if (intro === null && safeStorage.get('bb-intro-seen')) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    safeStorage.set('bb-intro-seen', '1')
    setPhase('show')
    const timers = STEP_TIMES.map((t, i) => window.setTimeout(() => setStep(i + 1), t))
    if (intro !== 'hold') {
      timers.push(window.setTimeout(() => setPhase('leave'), 2350))
      timers.push(window.setTimeout(() => setPhase('hidden'), 2800))
    }
    timersRef.current = timers
    return () => timers.forEach(clearTimeout)
  }, [])

  // Keyboard parity with click-to-skip — the overlay blocks the whole app,
  // so keyboard-only users need a way out too.
  useEffect(() => {
    if (phase === 'hidden') return
    const onKey = () => skip()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, skip])

  if (phase === 'hidden') return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center cursor-pointer"
      style={{
        opacity: phase === 'leave' ? 0 : 1,
        transition: 'opacity 400ms steps(5)',
      }}
      onClick={skip}
      role="presentation"
    >
      {/* Pixel-field strips top + bottom */}
      <PixelFieldStrips />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/brand/logo/BB_Square.svg" alt="Bad Brain" className="h-36 w-auto mb-10" />

      {/* Stepped loading bar */}
      <StepBar step={step} className="mb-4" />

      <p className="text-label tracking-label-wide uppercase text-black/50">
        loading bad brain v2.0{'.'.repeat((step % 3) + 1)}
      </p>
    </div>
  )
}

export default BootIntro
