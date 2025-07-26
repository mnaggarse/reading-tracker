"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Book } from "@/lib/database.types";
import { CheckCircle, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
  book: Book;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function BookCard({ book, onClick, onEdit, onDelete }: BookCardProps) {
  const isRead = book.read > 0;
  const isCompleted = book.pages > 0 && book.read >= book.pages;
  const progress = book.pages > 0 ? (book.read / book.pages) * 100 : 0;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className="hover:shadow-lg transition-shadow duration-200 group rounded-xl cursor-pointer h-80"
          onClick={onClick}
        >
          <CardContent className="p-4 h-full flex flex-col">
            <div className="relative mb-4 flex-shrink-0">
              <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  width={200}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              {isCompleted && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="h-6 w-6 text-green-600 bg-white rounded-full" />
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-center mb-3 flex-shrink-0">
                {book.title}
              </h3>

              <div className="mt-auto">
                {/* Progress Bar and Percentage */}
                {book.pages > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isCompleted ? "bg-green-600" : "bg-blue-600"
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium text-right">
                      {Math.floor(progress)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="rounded-2xl">
        <ContextMenuItem onClick={onEdit} className="rounded-xl">
          <Edit className="mr-2 h-4 w-4" />
          Edit Book
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onDelete} className="text-red-600 rounded-xl">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Book
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
