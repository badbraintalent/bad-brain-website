'use client'

import React from 'react'

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  className = "",
  muted = true,
  loop = true
}) => {
  return (
    <div className={`border border-gray-300 ${className}`}>
      <video
        src={src}
        controls
        muted={muted}
        loop={loop}
        preload="metadata"
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default VideoPlayer
