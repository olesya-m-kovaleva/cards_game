"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/card"
import { Clock } from "@/components/clock"
import { GameOver } from "@/components/game-over"
import { RainEffect } from "@/components/rain-effect"
import { cardData } from "@/data/cards"
import { useSound } from "@/hooks/use-sound"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { shuffle } from "@/lib/utils"
import confetti from "canvas-confetti"

export default function GameBoard() {
  const [hours, setHours] = useState(8)
  const [cards, setCards] = useState<any[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [gameOver, setGameOver] = useState<"win" | "lose" | null>(null)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [showRainEffect, setShowRainEffect] = useState(false)
  const [lastCardEffect, setLastCardEffect] = useState<"good" | "bad" | null>(null)

  const { toast } = useToast()

  const flipSound = useSound("/sounds/card-flip.mp3")
  const goodSound = useSound("/sounds/good-card.mp3")
  const badSound = useSound("/sounds/bad-card.mp3")
  const winSound = useSound("/sounds/win.mp3")
  const loseSound = useSound("/sounds/lose.mp3")

  // Initialize game
useEffect(() => {
  if (isGameStarted) {
    const shuffledCards = shuffle(cardData).slice(0, 16)
    setCards(shuffledCards)
    setHours(8)
    setFlippedCards([])
    setGameOver(null)
    setLastCardEffect(null)
    setShowRainEffect(false)
  }
}, [isGameStarted])

  // Check win/lose conditions
  useEffect(() => {
    if (!isGameStarted) return

    if (hours <= 0) {
      setGameOver("win")
      winSound.play()
      triggerWinAnimation()
    } else if (hours >= 12) {
      setGameOver("lose")
      loseSound.play()
    }
  }, [hours, isGameStarted, winSound, loseSound])

  // Handle rain effect timeout
  useEffect(() => {
    let rainTimer: NodeJS.Timeout

    if (showRainEffect) {
      rainTimer = setTimeout(() => {
        setShowRainEffect(false)
      }, 3000) // Show rain for 3 seconds
    }

    return () => {
      if (rainTimer) clearTimeout(rainTimer)
    }
  }, [showRainEffect])

  const triggerGoodCardEffect = () => {
    // Trigger confetti from multiple origins for a holiday cracker effect
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

    // Left side confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: 0.3, y: 0.5 },
      colors,
      angle: 60,
    })

    // Right side confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: 0.7, y: 0.5 },
      colors,
      angle: 120,
    })
  }

  const triggerBadCardEffect = () => {
    setShowRainEffect(true)
  }

  const handleCardFlip = (index: number) => {
    if (flippedCards.includes(index) || gameOver) return

    flipSound.play()

    const card = cards[index]
    setFlippedCards((prev) => [...prev, index])

    // Update hours based on card type with a delay to match the flip animation
    setTimeout(() => {
      const newHours = hours + card.hours
      setHours(newHours)

      // Set the last card effect type
      const effectType = card.hours < 0 ? "good" : "bad"
      setLastCardEffect(effectType)

      // Play appropriate sound and trigger visual effect after the card is flipped
      if (effectType === "good") {
        goodSound.play()
        triggerGoodCardEffect()
      } else {
        badSound.play()
        triggerBadCardEffect()
      }

      // Show toast with card effect
      toast({
        title: card.title,
        description: `${card.hours > 0 ? "+" : ""}${card.hours} hour${Math.abs(card.hours) !== 1 ? "s" : ""}`,
        variant: card.hours > 0 ? "destructive" : "default",
      })
    }, 500) // Match this delay with the card flip animation duration
  }

  const triggerWinAnimation = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    })
  }

  const startNewGame = () => {
  restartGame() // <-- теперь инициализация
  setIsGameStarted(true)
}

const restartGame = () => {
  const shuffledCards = shuffle(cardData).slice(0, 16)
  setCards(shuffledCards)
  setHours(8)
  setFlippedCards([])
  setGameOver(null)
  setLastCardEffect(null)
  setShowRainEffect(false)
}

  if (!isGameStarted) {
    return (
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Team Lead IT Challenge</h1>
        <p className="text-xl text-white/90 mb-8">
          Manage your time wisely! Start with 8 working hours and try to reach 0 by the end of the day. Good cards
          reduce your hours, bad cards add more work. If you reach 12 hours, you lose!
        </p>
        <Button
          size="lg"
          onClick={startNewGame}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xl py-6 px-8"
        >
          Start Game
        </Button>
      </div>
    )
  }

  if (gameOver) {
    return <GameOver result={gameOver} onRestart={restartGame} />
  }

  return (
    <div className="w-full max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Team Lead IT Challenge</h1>
        <Clock hours={hours} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            hours={card.hours}
            isFlipped={flippedCards.includes(index)}
            onClick={() => handleCardFlip(index)}
          />
        ))}
      </div>

      {/* Visual effects */}
      <RainEffect isActive={showRainEffect} />

      
    </div>
  )
}
