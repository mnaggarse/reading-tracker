"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, bookReadToBoolean } from "@/lib/database.types";
import { BookOpen, CheckCircle, Star } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
  book: Book;
  onClick: () => void;
  onToggleRead: () => void;
}

export function BookCard({ book, onClick, onToggleRead }: BookCardProps) {
  const isRead = bookReadToBoolean(book.read);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 group rounded-xl">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Image
            src={book.cover || "/placeholder.svg"}
            alt={book.title}
            width={200}
            height={300}
            className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
          />
          {isRead && (
            <div className="absolute top-2 right-2">
              <CheckCircle className="h-6 w-6 text-green-600 bg-white rounded-full" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem] text-center">
            {book.title}
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{book.pages} pages</span>
              {book.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span>{book.rating}/5</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Badge
                variant={isRead ? "default" : "secondary"}
                className={`text-xs ${
                  isRead
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {isRead ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Read
                  </>
                ) : (
                  <>
                    <BookOpen className="h-3 w-3 mr-1" />
                    To Read
                  </>
                )}
              </Badge>

              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleRead();
                }}
                className="text-xs h-7 px-2"
              >
                {isRead ? "Mark Unread" : "Mark Read"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
