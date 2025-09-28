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
  const [showControls, setShowControls] = useState(true) // Show controls by default on mobile
  const [hasInteracted, setHasInteracted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleVideoClick = () => {
    if (videoRef.current) {
      setHasInteracted(true)
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(() => {
          // Handle play promise rejection on some browsers
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => {
        setShowControls(true)
        // Clear auto-hide timeout on hover
        if (hideControlsTimeoutRef.current) {
          clearTimeout(hideControlsTimeoutRef.current)
        }
      }}
      onMouseLeave={() => {
        if (!hasInteracted) {
          setShowControls(true)
        } else if (isPlaying) {
          // Auto-hide controls when mouse leaves during playback
          hideControlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false)
          }, 1000)
        }
      }}
    >
      <video
        ref={videoRef}
        src={`${src}#t=0.001`}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        preload="metadata"
        playsInline
        webkit-playsinline="true"
        className="w-full h-full object-cover"
        onPlay={() => {
          setIsPlaying(true)
          // Hide controls after 1 second when video starts playing
          if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current)
          }
          hideControlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false)
          }, 1000)
        }}
        onPause={() => {
          setIsPlaying(false)
          // Clear timeout and show controls when paused
          if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current)
          }
          setShowControls(true)
        }}
      />

      {/* Play/Pause Overlay */}
      <div
        className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 cursor-pointer ${
          showControls || !hasInteracted ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleVideoClick}
        onTouchEnd={(e) => {
          // Prevent double-tap zoom on mobile
          e.preventDefault()
          handleVideoClick()
        }}
      >
        {!isPlaying && (
          <div className="bg-white/90 p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
            <Play className="w-6 h-6 text-brand-blue" />
          </div>
        )}
        {isPlaying && showControls && (
          <div className="bg-white/90 p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
            <Pause className="w-6 h-6 text-brand-blue" />
          </div>
        )}
      </div>

    </div>
  )
}

export default VideoPlayer