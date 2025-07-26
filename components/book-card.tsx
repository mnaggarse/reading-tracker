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
          className="hover:shadow-lg transition-shadow duration-200 group rounded-xl cursor-pointer"
          onClick={onClick}
        >
          <CardContent className="p-4">
            <div className="relative mb-4">
              <Image
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                width={200}
                height={300}
                className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
              />
              {isCompleted && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="h-6 w-6 text-green-600 bg-white rounded-full" />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-center">
                {book.title}
              </h3>

              <div>
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
      <ContextMenuContent>
        <ContextMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Book
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Book
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
