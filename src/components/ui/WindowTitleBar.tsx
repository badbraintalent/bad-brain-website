'use client'

import React from 'react'

type WindowTitleBarProps = {
  /** Filename shown at the right, e.g. "message.exe" or "roster.txt". */
  name: string
  /** If provided, the first square becomes an interactive close button. */
  onClose?: () => void
  closeLabel?: string
  /** Spacing/border for the bar wrapper (varies per context). */
  className?: string
}

const SQUARE = 'w-2.5 h-2.5 border border-black/40'

/* Shared OS-window title bar — three corner squares + a mono filename. Pass
   `onClose` to turn the first square into a close button (used by the contact
   wayfinder cards, which "minimise" then return). */
const WindowTitleBar = ({ name, onClose, closeLabel = 'Close', className = '' }: WindowTitleBarProps) => (
  <div className={`flex items-center justify-between ${className}`}>
    <span className="flex gap-1">
      {onClose ? (
        <button
          type="button"
          aria-label={closeLabel}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          className={`${SQUARE} bg-bb-blue hover:bg-black cursor-pointer`}
        />
      ) : (
        <span className={`${SQUARE} bg-bb-blue`} aria-hidden="true" />
      )}
      <span className={`${SQUARE} bg-bb-mint`} aria-hidden="true" />
      <span className={SQUARE} aria-hidden="true" />
    </span>
    <span className="text-label tracking-label text-black/40 lowercase">
      {name}
    </span>
  </div>
)

export default WindowTitleBar
