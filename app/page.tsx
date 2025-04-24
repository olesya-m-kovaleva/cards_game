import GameBoard from "@/components/game-board"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 p-4">
      <GameBoard />
    </main>
  )
}
