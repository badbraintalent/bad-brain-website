'use client'

import React, { useMemo } from 'react'

/* Deterministic per-cell hash (murmur-style finaliser) so SSR and client
   render identical pixels — a naive LCG produces visible banding. */
const hash = (x: number, y: number, seed: number) => {
  let h = Math.imul(x ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(y ^ seed, 0xc2b2ae35)
  h = Math.imul(h ^ (h >>> 13), 0x27d4eb2f)
  return ((h ^ (h >>> 15)) >>> 0) / 4294967295
}

/* The dither is monochrome — one tone per surface, never mixed, and never cyan.
   Grey is the default ornament on white; mint is for surfaces that want
   emphasis. */
const TONES = {
  grey: 'var(--bb-grey)',
  mint: 'var(--bb-mint)',
} as const

/* Hover-animated brand pixel frame: dither concentrated in a 3-cell edge
   band, each pixel fading in at its own offset (0–900ms) on group-hover.
   Parent must be `relative` and carry the `group` class. */
const PixelDitherFrame = ({
  cols = 48,
  rows = 32,
  seed = 1,
  visible = false,
  tone = 'grey',
}: {
  cols?: number
  rows?: number
  seed?: number
  /** Always show the pixels (default: only on parent group-hover). */
  visible?: boolean
  /** Which single tone the field renders in. */
  tone?: keyof typeof TONES
}) => {
  // Memoized: hosts re-render on unrelated hover state, and the grid loop is
  // thousands of hash calls per pass.
  // Colour is applied at render rather than baked into each cell, so changing
  // tone doesn't rebuild the grid.
  const pixels = useMemo(() => {
    const out: { x: number; y: number; d: number }[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const v = Math.min(x, y, cols - 1 - x, rows - 1 - y)
        const p = v === 0 ? 0.55 : v === 1 ? 0.3 : v === 2 ? 0.12 : 0
        if (p === 0 || hash(x, y, seed) > p) continue
        out.push({
          x,
          y,
          d: Math.round(hash(x + 13, y + 57, seed) * 900),
        })
      }
    }
    return out
  }, [cols, rows, seed])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pixels.map((p, i) => (
        <span
          key={i}
          className={visible ? 'absolute opacity-100' : 'absolute opacity-0 group-hover:opacity-100'}
          style={{
            left: `${(p.x / cols) * 100}%`,
            top: `${(p.y / rows) * 100}%`,
            width: `${100 / cols}%`,
            height: `${100 / rows}%`,
            background: TONES[tone],
            transition: 'opacity 120ms linear',
            transitionDelay: `${p.d}ms`,
          }}
        />
      ))}
    </div>
  )
}

export default PixelDitherFrame
