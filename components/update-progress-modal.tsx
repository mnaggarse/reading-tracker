"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Book } from "@/lib/database.types";
import { useEffect, useState } from "react";

interface UpdateProgressModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (bookId: string, newPage: number) => void;
}

export function UpdateProgressModal({
  book,
  isOpen,
  onClose,
  onUpdate,
}: UpdateProgressModalProps) {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    if (book) {
      // Use the 'read' field as current page number
      setCurrentPage(book.read.toString());
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (book && currentPage) {
      const pageNumber = Number.parseInt(currentPage);
      if (pageNumber >= 0 && pageNumber <= book.pages) {
        onUpdate(book.id, pageNumber);
        onClose();
      }
    }
  };

  const handleClose = () => {
    onClose();
    setCurrentPage("");
  };

  if (!book) return null;

  const progress = book.pages > 0 ? (book.read / book.pages) * 100 : 0;
  const currentProgress = currentPage
    ? (Number.parseInt(currentPage) / book.pages) * 100
    : progress;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-w-[90vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Update Reading Progress
          </DialogTitle>
          <DialogDescription className="text-center">
            Update your progress for "{book.title}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-center">Total pages: {book.pages}</p>
              <div className="flex items-center gap-6">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 border-gray-200"
                  onClick={() => {
                    const newPage = Math.max(
                      0,
                      Number.parseInt(currentPage) - 1
                    );
                    setCurrentPage(newPage.toString());
                  }}
                  disabled={Number.parseInt(currentPage) <= 0}
                >
                  -
                </Button>
                <Input
                  id="currentPage"
                  type="number"
                  min="0"
                  max={book.pages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(e.target.value)}
                  className="text-center rounded-xl"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 border-gray-200"
                  onClick={() => {
                    const newPage = Math.min(
                      book.pages,
                      Number.parseInt(currentPage) + 1
                    );
                    setCurrentPage(newPage.toString());
                  }}
                  disabled={Number.parseInt(currentPage) >= book.pages}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-2 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="rounded-xl bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 rounded-xl"
            >
              Update Progress
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
