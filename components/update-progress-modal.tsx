"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Book {
  id: number
  title: string
  cover: string
  totalPages: number
  currentPage: number
}

interface UpdateProgressModalProps {
  book: Book | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (bookId: number, newPage: number) => void
}

export function UpdateProgressModal({ book, isOpen, onClose, onUpdate }: UpdateProgressModalProps) {
  const [currentPage, setCurrentPage] = useState("")

  useEffect(() => {
    if (book) {
      setCurrentPage(book.currentPage.toString())
    }
  }, [book])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (book && currentPage) {
      const pageNumber = Number.parseInt(currentPage)
      if (pageNumber >= 0 && pageNumber <= book.totalPages) {
        onUpdate(book.id, pageNumber)
      }
    }
  }

  const handleClose = () => {
    onClose()
    setCurrentPage("")
  }

  if (!book) return null

  const progress = (Number.parseInt(currentPage) / book.totalPages) * 100

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-w-[90vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Update Reading Progress</DialogTitle>
          <DialogDescription>Update your progress for "{book.title}"</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPage">Current Page</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 border-blue-200"
                  onClick={() => {
                    const newPage = Math.max(0, Number.parseInt(currentPage) - 1)
                    setCurrentPage(newPage.toString())
                  }}
                  disabled={Number.parseInt(currentPage) <= 0}
                >
                  -
                </Button>
                <Input
                  id="currentPage"
                  type="number"
                  min="0"
                  max={book.totalPages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(e.target.value)}
                  className="text-center rounded-xl"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 border-blue-200"
                  onClick={() => {
                    const newPage = Math.min(book.totalPages, Number.parseInt(currentPage) + 1)
                    setCurrentPage(newPage.toString())
                  }}
                  disabled={Number.parseInt(currentPage) >= book.totalPages}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>Total pages: {book.totalPages}</p>
              {currentPage && <p>Progress: {Math.round(progress)}%</p>}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose} className="rounded-xl bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-xl">
              Update Progress
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
