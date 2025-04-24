"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface CardProps {
  title: string
  hours: number
  isFlipped: boolean
  onClick: () => void
}

export function Card({ title, hours, isFlipped, onClick }: CardProps) {
  const isGoodCard = hours < 0

const CardBack = () => (
  <div className="w-full h-full bg-indigo-700 rounded-xl shadow-lg relative overflow-hidden backface-hidden">
    {/* Геометрический узор */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-0 w-20 h-20 bg-violet-400 rounded-full blur-md"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-indigo-300 rounded-full blur-md"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-40"></div>
    </div>

    {/* Убрали круг с вопросительным знаком */}

    {/* Рамка */}
    <div className="absolute inset-0 border-2 border-white/10 rounded-xl pointer-events-none"></div>
  </div>
)

  return (
    <div className="perspective-1000 h-36 w-full cursor-pointer" onClick={onClick}>
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Задняя сторона (рубашка с ?) */}
        <div className="absolute w-full h-full backface-hidden">
          <CardBack />
        </div>

        {/* Передняя сторона (содержимое карточки) */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl p-4 flex flex-col justify-between ${
            isGoodCard ? "bg-green-50" : "bg-red-50"
          }`}
          style={{
            transform: "rotateY(180deg)",
            boxShadow: `0 0 15px 5px ${
              isGoodCard ? "rgba(34, 197, 94, 0.5)" : "rgba(239, 68, 68, 0.5)"
            }`,
          }}
        >
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
          <div className={`flex items-center justify-center ${isGoodCard ? "text-green-600" : "text-red-600"}`}>
            <Clock className="mr-1" size={16} />
            <span className="text-lg font-bold">
              {hours > 0 ? "+" : ""}
              {hours} hr
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
