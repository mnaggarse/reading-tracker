"use client";

import { Book } from "@/lib/database.types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { BookCard } from "./book-card";
import { DraggableBookCard } from "./draggable-book-card";

interface DraggableBookSectionProps {
  title: string;
  books: Book[];
  emptyMessage: string;
  onReorder: (bookOrders: { id: string; order: number }[]) => Promise<boolean>;
  onClick: (book: Book) => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export function DraggableBookSection({
  title,
  books,
  emptyMessage,
  onReorder,
  onClick,
  onEdit,
  onDelete,
}: DraggableBookSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [localBooks, setLocalBooks] = useState(books);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setLocalBooks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update order numbers
        const bookOrders = newItems.map((book, index) => ({
          id: book.id,
          order: index,
        }));

        // Save to database
        onReorder(bookOrders);

        return newItems;
      });
    }

    setActiveId(null);
  };

  const activeBook = activeId
    ? localBooks.find((book) => book.id === activeId)
    : null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        {title}
      </h2>
      {localBooks.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={localBooks.map((book) => book.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {localBooks.map((book) => (
                <DraggableBookCard
                  key={book.id}
                  book={book}
                  onClick={() => onClick(book)}
                  onEdit={() => onEdit(book)}
                  onDelete={() => onDelete(book)}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeBook ? (
              <BookCard
                book={activeBook}
                onClick={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="text-center py-4">
          <p className="w-[80%] mx-auto text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}
