"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { usePathname } from "next/navigation"

// Global audio instance to persist across navigations
let globalAudioInstance: HTMLAudioElement | null = null
let isInitialized = false

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isReady, setIsReady] = useState(false)
  const restoreAttemptedRef = useRef(false)

  // Initialize audio element once
  useEffect(() => {
    if (isInitialized && globalAudioInstance) {
      // Reuse existing audio instance
      audioRef.current = globalAudioInstance
      setIsReady(true)
      return
    }

    // Create new audio instance
    const audioEl = document.createElement("audio")
    audioEl.src = encodeURI(
      "/background_music/Kina Grannis ft. Imaginary Future - I Will Spend My Whole Life Loving You (lyrics).mp3"
    )
    audioEl.loop = true
    audioEl.preload = "auto"
    audioEl.playsInline = true
    audioEl.style.display = "none"
    
    // Store globally
    globalAudioInstance = audioEl
    audioRef.current = audioEl
    isInitialized = true

    // Wait for audio to be ready
    const handleCanPlay = () => {
      setIsReady(true)
      audioEl.removeEventListener("canplay", handleCanPlay)
    }
    audioEl.addEventListener("canplay", handleCanPlay)

    // Append to body to keep it alive
    document.body.appendChild(audioEl)

    return () => {
      // Don't remove audio element on unmount - keep it alive
      audioEl.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  // Function to start music playback
  const startMusicPlayback = useCallback(() => {
    const audioEl = audioRef.current
    if (!audioEl || !isReady) return false

    if (audioEl.paused) {
      audioEl
        .play()
        .then(() => {
          restoreAttemptedRef.current = true
          sessionStorage.setItem("backgroundMusicPlaying", "true")
          sessionStorage.removeItem("startMusic")
        })
        .catch((error) => {
          console.log("Auto-play blocked:", error)
          const handleUserInteraction = () => {
            audioEl
              .play()
              .then(() => {
                restoreAttemptedRef.current = true
                sessionStorage.setItem("backgroundMusicPlaying", "true")
                sessionStorage.removeItem("startMusic")
              })
              .catch(() => {})
          }
          document.addEventListener("click", handleUserInteraction, { once: true })
          document.addEventListener("touchstart", handleUserInteraction, { once: true })
        })
      return true
    }
    return false
  }, [isReady])

  // Handle playback restoration and auto-play
  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl || !isReady) return

    const wasPlaying = sessionStorage.getItem("backgroundMusicPlaying") === "true"
    const savedTime = sessionStorage.getItem("backgroundMusicTime")

    // Reset restore flag on pathname change to allow restoration on new pages
    restoreAttemptedRef.current = false

    // If audio is already playing, ensure it continues and update sessionStorage
    if (!audioEl.paused && audioEl.currentTime > 0) {
      sessionStorage.setItem("backgroundMusicPlaying", "true")
      sessionStorage.setItem("backgroundMusicTime", audioEl.currentTime.toString())
      restoreAttemptedRef.current = true
      return
    }

    // If music was playing but audio is now paused (navigation happened), restore it
    if (wasPlaying && audioEl.paused && savedTime) {
      const targetTime = parseFloat(savedTime)
      
      // Only restore time if there's a significant difference to avoid glitches
      if (Math.abs(audioEl.currentTime - targetTime) > 0.5) {
        audioEl.currentTime = targetTime
      }

      // Resume playback smoothly without restarting
      const playPromise = audioEl.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            restoreAttemptedRef.current = true
            sessionStorage.setItem("backgroundMusicPlaying", "true")
          })
          .catch((error) => {
            console.log("Resume playback blocked:", error)
            // If blocked, wait for user interaction
            const handleUserInteraction = () => {
              audioEl
                .play()
                .then(() => {
                  restoreAttemptedRef.current = true
                  sessionStorage.setItem("backgroundMusicPlaying", "true")
                })
                .catch(() => {})
            }
            document.addEventListener("click", handleUserInteraction, { once: true })
            document.addEventListener("touchstart", handleUserInteraction, { once: true })
          })
      }
      return
    }

    // Prevent multiple restore attempts on the same page load
    if (restoreAttemptedRef.current) return

    // Auto-play on home page if not already playing AND envelope has been opened
    const envelopeOpened = sessionStorage.getItem("envelopeOpened") === "true"
    const shouldStartMusic = sessionStorage.getItem("startMusic") === "true"
    
    if (isHomePage && !wasPlaying && envelopeOpened && shouldStartMusic) {
      const playTimer = setTimeout(() => {
        startMusicPlayback()
      }, 500)

      return () => {
        clearTimeout(playTimer)
      }
    }
  }, [isHomePage, isReady, startMusicPlayback])

  // Listen for envelope opening event (via storage event)
  useEffect(() => {
    if (!isReady) return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "startMusic" && e.newValue === "true" && isHomePage) {
        // Envelope was opened, start music
        setTimeout(() => {
          startMusicPlayback()
        }, 300)
      }
    }

    // Also check periodically for the flag (for same-tab updates)
    const checkInterval = setInterval(() => {
      const shouldStartMusic = sessionStorage.getItem("startMusic") === "true"
      const envelopeOpened = sessionStorage.getItem("envelopeOpened") === "true"
      const isPlaying = !audioRef.current?.paused

      if (shouldStartMusic && envelopeOpened && isHomePage && !isPlaying && isReady) {
        startMusicPlayback()
      }
    }, 200)

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(checkInterval)
    }
  }, [isHomePage, isReady, startMusicPlayback])

  // Save current playback time periodically
  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl || !isReady) return

    const saveTimeInterval = setInterval(() => {
      if (!audioEl.paused && audioEl.currentTime > 0) {
        sessionStorage.setItem("backgroundMusicTime", audioEl.currentTime.toString())
        sessionStorage.setItem("backgroundMusicPlaying", "true")
      } else {
        sessionStorage.setItem("backgroundMusicPlaying", "false")
      }
    }, 500) // Save more frequently for smoother transitions

    // Save time on page visibility change (when user switches tabs)
    const handleVisibilityChange = () => {
      if (document.hidden && !audioEl.paused) {
        sessionStorage.setItem("backgroundMusicTime", audioEl.currentTime.toString())
        sessionStorage.setItem("backgroundMusicPlaying", "true")
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      clearInterval(saveTimeInterval)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      // Save final state before navigation
      if (audioEl && !audioEl.paused && audioEl.currentTime > 0) {
        sessionStorage.setItem("backgroundMusicTime", audioEl.currentTime.toString())
        sessionStorage.setItem("backgroundMusicPlaying", "true")
      }
    }
  }, [isReady])

  // Don't render audio element - it's already in the DOM
  return null
}

export default BackgroundMusic


