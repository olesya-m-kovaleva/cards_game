"use client"

import { useRef, useEffect } from "react"

export function useSound(soundPath: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(soundPath)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [soundPath])

  const play = () => {
    if (audioRef.current) {
      // Reset the audio to the beginning if it's already playing
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.error("Error playing sound:", e))
    }
  }

  return { play }
}
