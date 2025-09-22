'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface MarqueeTextProps {
  text: string
  className?: string
  speed?: number
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  className = "",
  speed = 50
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{
          x: ["100%", "-100%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
      </motion.div>
    </div>
  )
}

export default MarqueeText