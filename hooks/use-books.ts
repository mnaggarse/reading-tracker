import { bookService } from "@/lib/database";
import { Book } from "@/lib/database.types";
import { useEffect, useState } from "react";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user's books
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const userBooks = await bookService.getUserBooks();
      setBooks(userBooks);
    } catch (err) {
      setError("Failed to load books");
      console.error("Error loading books:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new book
  const addBook = async (bookData: {
    title: string;
    cover: string; // Required since we always provide a default value
    pages: number; // Required since we always provide a default value
    read: boolean; // Required since we always provide a default value
  }) => {
    try {
      setError(null);
      const newBook = await bookService.addBook(bookData);

      if (newBook) {
        setBooks((prev) => [newBook, ...prev]);
        return newBook;
      }
      return null;
    } catch (err) {
      setError("Failed to add book");
      console.error("Error adding book:", err);
      return null;
    }
  };

  // Update a book
  const updateBook = async (
    bookId: string,
    updates: Partial<{
      title: string;
      cover: string; // Required since we always provide a default value
      pages: number; // Required since we always provide a default value
      read: number; // Page number (0 = unread, >0 = current page)
    }>
  ) => {
    try {
      setError(null);
      const bookUpdate: any = {};

      if (updates.title !== undefined) bookUpdate.title = updates.title;
      if (updates.cover !== undefined)
        bookUpdate.cover = updates.cover || "/placeholder.svg";
      if (updates.pages !== undefined) bookUpdate.pages = updates.pages || 1;
      if (updates.read !== undefined) bookUpdate.read = updates.read || 0;

      const updatedBook = await bookService.updateBook(bookId, bookUpdate);

      if (updatedBook) {
        setBooks((prev) =>
          prev.map((book) => (book.id === bookId ? updatedBook : book))
        );
        return updatedBook;
      }
      return null;
    } catch (err) {
      setError("Failed to update book");
      console.error("Error updating book:", err);
      return null;
    }
  };

  // Delete a book
  const deleteBook = async (bookId: string) => {
    try {
      setError(null);
      const success = await bookService.deleteBook(bookId);

      if (success) {
        setBooks((prev) => prev.filter((book) => book.id !== bookId));
        return true;
      }
      return false;
    } catch (err) {
      setError("Failed to delete book");
      console.error("Error deleting book:", err);
      return false;
    }
  };

  // Delete all books for the current user
  const deleteAllBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get all book IDs for the user
      const bookIds = books.map((book) => book.id);
      for (const id of bookIds) {
        await bookService.deleteBook(id);
      }
      await loadBooks();
    } catch (err: any) {
      setError(err.message || "Failed to delete all books");
    } finally {
      setLoading(false);
    }
  };

  // Toggle read status
  const toggleReadStatus = async (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return false;

    // If book is unread (read = 0), set to first page (1), otherwise set to unread (0)
    const newReadStatus = book.read === 0 ? 1 : 0;
    const result = await updateBook(bookId, { read: newReadStatus });
    return result !== null;
  };

  // Get books by status
  const getBooksByStatus = (read: boolean) => {
    return books.filter((book) => {
      if (read) {
        // Return books that have been read (read > 0)
        return book.read > 0;
      } else {
        // Return books that are unread (read = 0)
        return book.read === 0;
      }
    });
  };

  // Get completed books (100% progress)
  const getCompletedBooks = () => {
    return books.filter((book) => book.pages > 0 && book.read >= book.pages);
  };

  // Get in-progress books (started but not completed)
  const getInProgressBooks = () => {
    return books.filter((book) => book.read > 0 && book.read < book.pages);
  };

  // Get read books (legacy - now returns in-progress books)
  const getReadBooks = () => getInProgressBooks();

  // Get unread books
  const getUnreadBooks = () => getBooksByStatus(false);

  // Load books on mount
  useEffect(() => {
    loadBooks();
  }, []);

  return {
    // State
    books,
    loading,
    error,

    // Actions
    loadBooks,
    addBook,
    updateBook,
    deleteBook,
    deleteAllBooks,
    toggleReadStatus,

    // Computed values
    getBooksByStatus,
    getReadBooks,
    getUnreadBooks,
    getCompletedBooks,
    getInProgressBooks,

    // Statistics
    totalBooks: books.length,
    readBooks: getReadBooks().length,
    unreadBooks: getUnreadBooks().length,
    completedBooks: getCompletedBooks().length,
    inProgressBooks: getInProgressBooks().length,
  };
}
