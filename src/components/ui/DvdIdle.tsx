'use client'

import React, { useEffect, useRef, useState } from 'react'

const IDLE_MS = 45_000
const SPEED = 140 // px per second

/* Classic DVD-screensaver easter egg: after 45s with no input, the devil-horns
   mark drifts around the viewport, rebounding off the edges. Any interaction
   dismisses it and restarts the idle timer. */
const DvdIdle = () => {
  const [active, setActive] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let idleTimer: number

    const startIdleTimer = () => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => setActive(true), IDLE_MS)
    }

    const onInput = () => {
      // setActive(false) is safe to call repeatedly; the rAF loop is
      // cancelled by the cleanup of the active effect below.
      setActive(false)
      startIdleTimer()
    }

    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'touchstart'] as const
    events.forEach((e) => window.addEventListener(e, onInput, { passive: true }))
    startIdleTimer()

    return () => {
      window.clearTimeout(idleTimer)
      events.forEach((e) => window.removeEventListener(e, onInput))
    }
  }, [])

  useEffect(() => {
    if (!active) return
    const box = boxRef.current
    if (!box) return

    const w = 200
    const h = 200 * (870 / 972) // BB_Logo.svg intrinsic ratio
    let x = Math.random() * (window.innerWidth - w)
    let y = Math.random() * (window.innerHeight - h)
    let vx = SPEED * (Math.random() > 0.5 ? 1 : -1)
    let vy = SPEED * (Math.random() > 0.5 ? 1 : -1)
    let last = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      x += vx * dt
      y += vy * dt
      if (x <= 0 || x >= window.innerWidth - w) vx = -vx
      if (y <= 0 || y >= window.innerHeight - h) vy = -vy
      x = Math.max(0, Math.min(x, window.innerWidth - w))
      y = Math.max(0, Math.min(y, window.innerHeight - h))
      box.style.transform = `translate(${x}px, ${y}px)`
      raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [active])

  if (!active) return null

  return (
    <div className="fixed inset-0 z-[90] bg-black/60 pointer-events-none" aria-hidden="true">
      <div ref={boxRef} className="absolute top-0 left-0 will-change-transform" style={{ width: '200px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/brand/logo/BB_Logo.svg" alt="" className="w-full h-auto" draggable={false} />
      </div>
    </div>
  )
}

export default DvdIdle
