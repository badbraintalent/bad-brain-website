import type { CSSProperties } from 'react'

/* Shared Y2K chrome styles — one source of truth for the visual devices that
   repeat across pages. */

/** Hero entrance rise — used by every service/contact hero. References
    `@keyframes consulting-up-in` in globals.css (legacy identifier from the
    pre-rename Consulting page; renaming it is churn across every hero). */
export const enter = (delay: string, duration = '0.75s'): CSSProperties => ({
  animation: `consulting-up-in ${duration} cubic-bezier(0.22,1,0.36,1) both`,
  animationDelay: delay,
})

/** CRT scanline overlay — apply to an absolute inset-0 pointer-events-none div. */
export const scanlines = (alpha = 0.16, gap = 4): CSSProperties => ({
  background: `repeating-linear-gradient(0deg, rgba(0,0,0,${alpha}) 0px, rgba(0,0,0,${alpha}) 1px, transparent 1px, transparent ${gap}px)`,
})

/** Hard offset shadow for OS-window chrome. */
export const winShadow = (offset = 8, alpha = 0.25): string =>
  `${offset}px ${offset}px 0 rgba(0,0,0,${alpha})`
