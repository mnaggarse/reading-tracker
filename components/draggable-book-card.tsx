"use client";

import { Book } from "@/lib/database.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BookCard } from "./book-card";

interface DraggableBookCardProps {
  book: Book;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function DraggableBookCard({
  book,
  onClick,
  onEdit,
  onDelete,
}: DraggableBookCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: book.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <BookCard
        book={book}
        onClick={onClick}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
