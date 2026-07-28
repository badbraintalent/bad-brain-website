'use client'

import { useEffect } from 'react'

const COLORS = ['var(--bb-blue)', 'var(--bb-mint)', 'var(--bb-blue)']
const MIN_DIST = 36 // px of travel between spawns — keeps it sparse
const MAX_PIXELS = 24

/* 90s cursor sparkle trail, restrained: small brand pixels drop behind the
   cursor and fade out in stepped frames. Pointer-fine devices only. */
const PixelTrail = () => {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    let lastX = -100
    let lastY = -100
    let count = 0
    let live = 0

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (dx * dx + dy * dy < MIN_DIST * MIN_DIST) return
      if (live >= MAX_PIXELS) return
      lastX = e.clientX
      lastY = e.clientY

      const px = document.createElement('span')
      px.className = 'trail-pixel'
      // snap to an 8px grid so the trail feels rasterised
      px.style.left = `${Math.round((e.clientX - 3) / 8) * 8}px`
      px.style.top = `${Math.round((e.clientY + 14) / 8) * 8}px`
      px.style.background = COLORS[count++ % COLORS.length]
      document.body.appendChild(px)
      live++
      // animationend never fires if the animation is cancelled (e.g. the
      // reduced-motion override sets `animation: none` mid-flight), which
      // would leave opaque pixels stuck on screen — so back it up with a
      // timeout slightly past the 360ms trail-fade.
      const remove = () => {
        if (!px.isConnected) return
        px.remove()
        live--
      }
      const fallback = window.setTimeout(remove, 500)
      px.addEventListener('animationend', () => {
        clearTimeout(fallback)
        remove()
      })
    }

    // Stop spawning if the user enables reduced motion mid-session
    const onMotionChange = () => {
      if (reducedMotion.matches) window.removeEventListener('pointermove', onMove)
    }
    reducedMotion.addEventListener('change', onMotionChange)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return null
}

export default PixelTrail
