"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
    updates: { title: string; cover: string; pages: number }
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
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        cover: book.cover || "",
        pages: book.pages.toString(),
      });
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (book) {
      const newPages = parseInt(formData.pages) || 1;
      const currentRead = book.read;

      // Check if new pages is less than current read pages
      if (newPages < currentRead) {
        setShowConfirmation(true);
        setPendingSubmit(true);
        return;
      }

      // Proceed with normal save
      onSave(book.id, {
        title: formData.title,
        cover: formData.cover || "/placeholder.svg",
        pages: newPages,
      });
      onClose();
    }
  };

  const handleConfirmPagesChange = () => {
    if (book && pendingSubmit) {
      onSave(book.id, {
        title: formData.title,
        cover: formData.cover || "/placeholder.svg",
        pages: parseInt(formData.pages) || 1,
      });
      setShowConfirmation(false);
      setPendingSubmit(false);
      onClose();
    }
  };

  const handleCancelPagesChange = () => {
    setShowConfirmation(false);
    setPendingSubmit(false);
  };

  const handleClose = () => {
    onClose();
    setFormData({ title: "", cover: "", pages: "" });
    setShowConfirmation(false);
    setPendingSubmit(false);
  };

  if (!book) return null;

  return (
    <>
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
            </div>

            <div className="flex justify-between items-center mt-4">
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
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="sm:max-w-md max-w-[90vw] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Reading Progress?</AlertDialogTitle>
            <AlertDialogDescription>
              You're setting the total pages to {formData.pages}, but you've
              already read {book.read} pages. This will reset your reading
              progress to 0 pages. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-between items-center mt-4">
            <AlertDialogCancel
              onClick={handleCancelPagesChange}
              className="rounded-xl"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmPagesChange}
              className="bg-red-600 hover:bg-red-700 rounded-xl"
            >
              Reset Progress
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
