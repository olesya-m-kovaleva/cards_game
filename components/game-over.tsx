"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trophy, AlertTriangle } from "lucide-react"

interface GameOverProps {
  result: "win" | "lose"
  onRestart: () => void
}

export function GameOver({ result, onRestart }: GameOverProps) {
  const isWin = result === "win"

  return (
    <motion.div
      className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        {isWin ? (
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
            <Trophy className="text-yellow-400" size={60} />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
            <AlertTriangle className="text-red-400" size={60} />
          </div>
        )}
      </div>

      <h2 className="text-3xl font-bold text-white mb-4">{isWin ? "You Won!" : "Game Over!"}</h2>

      <p className="text-xl text-white/90 mb-8">
        {isWin
          ? "Congratulations! You've successfully managed your time and completed all your tasks!"
          : "You've accumulated too much work! Better luck managing your time next round!"}
      </p>

      <Button
        onClick={onRestart}
        className={`w-full text-lg py-6 ${
          isWin
            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        }`}
      >
        Play Again
      </Button>
    </motion.div>
  )
}
