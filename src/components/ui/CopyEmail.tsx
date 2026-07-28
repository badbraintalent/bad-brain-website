'use client'

import React, { useRef, useState } from 'react'
import { CONTACT_EMAIL } from '@/lib/site'

/* Email link that copies the address to the clipboard on click (the mailto:
   still opens as normal — the copy is a bonus for people without a mail
   client) and pops a small COPIED ✓ sticker. Defaults to the site contact
   address, shown as its own label. */
const CopyEmail = ({
  email = CONTACT_EMAIL,
  className,
  children,
}: {
  email?: string
  className?: string
  children?: React.ReactNode
}) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(0)

  const onClick = () => {
    navigator.clipboard?.writeText(email).catch(() => {})
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <span className="relative inline-block">
      <a href={`mailto:${email}`} onClick={onClick} className={className}>
        {children ?? email}
      </a>
      {copied && (
        <span
          className="copied-badge absolute left-1/2 -translate-x-1/2 -top-7 bg-bb-mint text-black border border-black px-2 py-0.5 font-mono text-[0.55rem] tracking-[0.15em] uppercase whitespace-nowrap pointer-events-none"
          role="status"
        >
          copied ✓
        </span>
      )}
    </span>
  )
}

export default CopyEmail
