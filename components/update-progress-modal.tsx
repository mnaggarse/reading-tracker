"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
          <DialogTitle>Update Reading Progress</DialogTitle>
          <DialogDescription>
            Update your progress for "{book.title}"
          </DialogDescription>
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
                  autoFocus
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 border-blue-200"
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

            <div className="text-sm text-gray-600">
              <p>Total pages: {book.pages}</p>
              {currentPage && <p>Progress: {Math.round(currentProgress)}%</p>}
            </div>
          </div>

          <DialogFooter className="gap-2">
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
