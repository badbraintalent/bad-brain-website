'use client'

import { useEffect, useRef, useState } from 'react'

type StepBarProps = {
  /** Number of segments (default 12). */
  segments?: number
  /** Controlled fill count (0..segments). Ignored when `autoplay`. */
  step?: number
  /** Self-advance through every segment over `durationMs`, then call `onComplete`. */
  autoplay?: boolean
  durationMs?: number
  onComplete?: () => void
  className?: string
}

const segColor = (i: number) => (i % 2 === 0 ? 'var(--bb-blue)' : 'var(--bb-mint)')

/* Shared stepped "12fps" segment bar — used by BootIntro (controlled via `step`)
   and the contact form's sending state (`autoplay`, which drives its own timing
   so the caller doesn't have to juggle timers). */
const StepBar = ({
  segments = 12,
  step = 0,
  autoplay = false,
  durationMs = 1500,
  onComplete,
  className = '',
}: StepBarProps) => {
  const [autoStep, setAutoStep] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!autoplay) return
    setAutoStep(0)
    const per = durationMs / segments
    const timers = Array.from({ length: segments }, (_, i) =>
      window.setTimeout(() => {
        setAutoStep(i + 1)
        if (i + 1 === segments) onCompleteRef.current?.()
      }, per * (i + 1))
    )
    return () => timers.forEach(clearTimeout)
  }, [autoplay, durationMs, segments])

  const filled = autoplay ? autoStep : step

  return (
    <div className={`flex gap-1 border border-black p-1 ${className}`}>
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className="block w-4 h-4"
          style={{ background: i < filled ? segColor(i) : 'transparent' }}
        />
      ))}
    </div>
  )
}

export default StepBar
