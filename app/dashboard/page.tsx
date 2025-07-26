"use client";

import { BookCard } from "@/components/book-card";
import { DeleteBookDialog } from "@/components/delete-book-dialog";
import { EditBookModal } from "@/components/edit-book-modal";
import { MobileNav } from "@/components/mobile-nav";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { UpdateProgressModal } from "@/components/update-progress-modal";
import { useBooks } from "@/hooks/use-books";
import { useAuth } from "@/lib/auth-context";
import { Book } from "@/lib/database.types";
import { BookOpen, Loader2, Plus, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function DashboardContent() {
  const { user, signOut } = useAuth();
  const {
    books,
    loading,
    error,
    getReadBooks,
    getUnreadBooks,
    getCompletedBooks,
    getInProgressBooks,
    toggleReadStatus,
    updateBook,
    totalBooks,
    readBooks,
    unreadBooks,
    completedBooks,
    inProgressBooks,
    deleteBook,
  } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookForAction, setBookForAction] = useState<Book | null>(null);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsProgressModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setBookForAction(book);
    setIsEditModalOpen(true);
  };

  const handleDeleteBook = (book: Book) => {
    setBookForAction(book);
    setIsDeleteDialogOpen(true);
  };

  const handleProgressUpdate = async (bookId: string, newPage: number) => {
    await updateBook(bookId, { read: newPage });
  };

  const handleEditSave = async (
    bookId: string,
    updates: { title: string; cover: string; pages: number }
  ) => {
    // Find the current book to check if we need to reset read pages
    const currentBook = books.find((book) => book.id === bookId);
    if (currentBook && updates.pages < currentBook.read) {
      // Reset read pages to 0 when total pages is reduced
      await updateBook(bookId, { ...updates, read: 0 });
    } else {
      await updateBook(bookId, updates);
    }
  };

  const handleDeleteConfirm = async (bookId: string) => {
    await deleteBook(bookId);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  // Organize books by reading status
  const completedBooksList = getCompletedBooks();
  const inProgressBooksList = getInProgressBooks();
  const unreadBooksList = getUnreadBooks();

  const BookSection = ({
    title,
    books,
    emptyMessage,
  }: {
    title: string;
    books: Book[];
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
              onEdit={() => handleEditBook(book)}
              onDelete={() => handleDeleteBook(book)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="w-[80%] mx-auto text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading your books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <Link href="/profile">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button asChild className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Link href="/add-book">
                  <Plus className="h-4 w-4" />
                  Add Book
                </Link>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {totalBooks === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Start Your Reading Journey
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Add your first book to begin tracking your reading progress and
                building your personal library.
              </p>
              <Button
                asChild
                size="lg"
                className="gap-3 bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link href="/add-book">
                  <Plus className="h-5 w-5" />
                  Add Your First Book
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <BookSection
              title="Currently Reading"
              books={inProgressBooksList}
              emptyMessage="No books in progress. Start reading to see your progress here!"
            />

            <BookSection
              title="To Read"
              books={unreadBooksList}
              emptyMessage="No books waiting to be read. Add some books to your reading list!"
            />

            <BookSection
              title="Completed"
              books={completedBooksList}
              emptyMessage="No books completed yet. Keep reading to see your achievements here!"
            />
          </>
        )}
      </div>

      {/* Progress Modal */}
      <UpdateProgressModal
        book={selectedBook}
        isOpen={isProgressModalOpen}
        onClose={() => {
          setIsProgressModalOpen(false);
          setSelectedBook(null);
        }}
        onUpdate={handleProgressUpdate}
      />

      {/* Edit Modal */}
      <EditBookModal
        book={bookForAction}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setBookForAction(null);
        }}
        onSave={handleEditSave}
      />

      {/* Delete Dialog */}
      <DeleteBookDialog
        book={bookForAction}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setBookForAction(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
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
