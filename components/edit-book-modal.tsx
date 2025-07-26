"use client";

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

interface EditBookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    bookId: string,
    updates: { title: string; cover: string; pages: number; rating: number }
  ) => void;
}

export function EditBookModal({
  book,
  isOpen,
  onClose,
  onSave,
}: EditBookModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    cover: "",
    pages: "",
    rating: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        cover: book.cover || "",
        pages: book.pages.toString(),
        rating: book.rating ? book.rating.toString() : "",
      });
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (book) {
      onSave(book.id, {
        title: formData.title,
        cover: formData.cover || "/placeholder.svg",
        pages: parseInt(formData.pages) || 1,
        rating: parseInt(formData.rating) || 0,
      });
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ title: "", cover: "", pages: "", rating: "" });
  };

  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-w-[90vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Update the details for "{book.title}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cover">Cover Image URL</Label>
              <Input
                id="cover"
                value={formData.cover}
                onChange={(e) =>
                  setFormData({ ...formData, cover: e.target.value })
                }
                placeholder="Enter cover image URL"
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pages">Total Pages</Label>
                <Input
                  id="pages"
                  type="number"
                  min="1"
                  value={formData.pages}
                  onChange={(e) =>
                    setFormData({ ...formData, pages: e.target.value })
                  }
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  placeholder="0-5"
                  className="rounded-xl"
                />
              </div>
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
