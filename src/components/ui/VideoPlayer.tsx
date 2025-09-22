'use client'

import React, { useState, useRef } from 'react'
import { Play, Pause } from 'lucide-react'

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
  poster,
  className = "",
  autoPlay = false,
  muted = true,
  loop = true
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showControls, setShowControls] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Play/Pause Overlay */}
      <div
        className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 cursor-pointer ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={togglePlay}
      >
        {!isPlaying && (
          <div className="bg-white/90 p-4 rounded-full">
            <Play className="w-8 h-8 text-brand-blue ml-1" />
          </div>
        )}
        {isPlaying && showControls && (
          <div className="bg-white/90 p-4 rounded-full">
            <Pause className="w-8 h-8 text-brand-blue" />
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer