"use client";

import { BookCard } from "@/components/book-card";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateProgressModal } from "@/components/update-progress-modal";
import { useAuth } from "@/lib/auth-context";
import { BookOpen, Home, LogOut, Plus, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data for books
const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    cover: "/placeholder.svg?height=300&width=200&text=The+Great+Gatsby",
    totalPages: 180,
    currentPage: 120,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    cover: "/placeholder.svg?height=300&width=200&text=To+Kill+a+Mockingbird",
    totalPages: 376,
    currentPage: 200,
  },
  {
    id: 3,
    title: "1984",
    cover: "/placeholder.svg?height=300&width=200&text=1984",
    totalPages: 328,
    currentPage: 328,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    cover: "/placeholder.svg?height=300&width=200&text=Pride+and+Prejudice",
    totalPages: 432,
    currentPage: 50,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    cover: "/placeholder.svg?height=300&width=200&text=The+Catcher+in+the+Rye",
    totalPages: 277,
    currentPage: 0,
  },
  {
    id: 6,
    title: "Lord of the Flies",
    cover: "/placeholder.svg?height=300&width=200&text=Lord+of+the+Flies",
    totalPages: 224,
    currentPage: 150,
  },
  {
    id: 7,
    title: "Brave New World",
    cover: "/placeholder.svg?height=300&width=200&text=Brave+New+World",
    totalPages: 268,
    currentPage: 0,
  },
  {
    id: 8,
    title: "The Hobbit",
    cover: "/placeholder.svg?height=300&width=200&text=The+Hobbit",
    totalPages: 310,
    currentPage: 310,
  },
];

function DashboardContent() {
  const { user, signOut } = useAuth();
  const [books, setBooks] = useState(mockBooks);
  const [selectedBook, setSelectedBook] = useState<
    (typeof mockBooks)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (book: (typeof mockBooks)[0]) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleUpdateProgress = (bookId: number, newPage: number) => {
    setBooks(
      books.map((book) =>
        book.id === bookId
          ? { ...book, currentPage: Math.min(newPage, book.totalPages) }
          : book
      )
    );
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Organize books by reading status
  const currentlyReading = books.filter(
    (book) => book.currentPage > 0 && book.currentPage < book.totalPages
  );
  const notStarted = books.filter((book) => book.currentPage === 0);
  const completed = books.filter((book) => book.currentPage >= book.totalPages);

  const BookSection = ({
    title,
    books,
    emptyMessage,
  }: {
    title: string;
    books: typeof mockBooks;
    emptyMessage: string;
  }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        {title}
      </h2>
      {books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-xl text-blue-600"
            >
              <BookOpen className="h-6 w-6 text-blue-600" />
              ReadTracker
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-blue-600 text-gray-600"
              >
                <Home className="h-4 w-4 inline mr-1" />
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-blue-600 text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                href="/add-book"
                className="text-sm font-medium transition-colors hover:text-blue-600 text-gray-600"
              >
                Add Book
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Reading List
            </h1>
            <p className="text-gray-600 mt-1">Track your reading progress</p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/add-book">
              <Plus className="h-4 w-4" />
              Add Book
            </Link>
          </Button>
        </div>

        <BookSection
          title="Currently Reading"
          books={currentlyReading}
          emptyMessage="No books currently being read. Start reading a book from your list!"
        />

        <BookSection
          title="Not Started"
          books={notStarted}
          emptyMessage="No books waiting to be read. Add some books to your reading list!"
        />

        <BookSection
          title="Completed"
          books={completed}
          emptyMessage="No books completed yet. Keep reading to see your achievements here!"
        />

        <UpdateProgressModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBook(null);
          }}
          onUpdate={handleUpdateProgress}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
