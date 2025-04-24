"use client"

import { useEffect, useRef } from "react"

interface RainEffectProps {
  isActive: boolean
}

export function RainEffect({ isActive }: RainEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const raindrops = useRef<any[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create raindrops
    const createRaindrops = () => {
      raindrops.current = []
      const dropCount = 100

      for (let i = 0; i < dropCount; i++) {
        raindrops.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * -1, // Start above the canvas
          length: Math.random() * 20 + 10,
          speed: Math.random() * 5 + 10,
          thickness: Math.random() * 2 + 1,
        })
      }
    }

    // Draw raindrops
    const drawRain = () => {
      if (!isActive) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = "rgba(174, 194, 224, 0.5)"
      ctx.lineWidth = 1
      ctx.lineCap = "round"

      for (let i = 0; i < raindrops.current.length; i++) {
        const drop = raindrops.current[i]

        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x, drop.y + drop.length)
        ctx.lineWidth = drop.thickness
        ctx.stroke()

        drop.y += drop.speed

        // Reset raindrop when it goes off screen
        if (drop.y > canvas.height) {
          drop.y = Math.random() * canvas.height * -1
          drop.x = Math.random() * canvas.width
        }
      }

      animationRef.current = requestAnimationFrame(drawRain)
    }

    if (isActive) {
      createRaindrops()
      drawRain()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 opacity-70"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
