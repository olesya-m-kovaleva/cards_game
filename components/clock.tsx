"use client"

import { motion } from "framer-motion"
import { ClockIcon } from "lucide-react"

interface ClockProps {
  hours: number
}

export function Clock({ hours }: ClockProps) {
  // Ensure hours are within 0-12 range for display
  const displayHours = Math.max(0, Math.min(12, hours))

  // Calculate progress for the circular progress indicator (0 to 1)
  const progress = displayHours / 12

  // Determine color based on hours
  const getColor = () => {
    if (hours <= 2) return "text-green-500"
    if (hours <= 5) return "text-blue-500"
    if (hours <= 8) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <motion.div
      className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2"
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.05, 1],
        transition: { duration: 0.3 },
      }}
      key={hours} // This forces the animation to run on every hours change
    >
      <div className="relative mr-2">
        <svg width="40" height="40" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />

          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`${progress * 283} 283`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className={getColor()}
          />
        </svg>
        <ClockIcon
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
          size={20}
        />
      </div>
      <div className="text-2xl font-bold text-white">{displayHours}:00</div>
    </motion.div>
  )
}
