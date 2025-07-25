"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Book {
  id: number
  title: string
  cover: string
  totalPages: number
  currentPage: number
}

interface BookCardProps {
  book: Book
  onClick: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  const progress = (book.currentPage / book.totalPages) * 100
  const isCompleted = book.currentPage >= book.totalPages
  const isNotStarted = book.currentPage === 0

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group rounded-xl" onClick={onClick}>
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Image
            src={book.cover || "/placeholder.svg"}
            alt={book.title}
            width={200}
            height={300}
            className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem] text-center">{book.title}</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Progress
                value={progress}
                className={`h-2 flex-1 ${progress === 100 ? "[&>div]:bg-green-600" : "[&>div]:bg-blue-600"}`}
              />
              <span className="text-xs text-gray-600 ml-2">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
