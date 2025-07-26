"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Book } from "@/lib/database.types";

interface DeleteBookDialogProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookId: string) => void;
}

export function DeleteBookDialog({
  book,
  isOpen,
  onClose,
  onConfirm,
}: DeleteBookDialogProps) {
  const handleConfirm = () => {
    if (book) {
      onConfirm(book.id);
      onClose();
    }
  };

  if (!book) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Book</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{book.title}"? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 rounded-xl"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
