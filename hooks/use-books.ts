import { bookService } from "@/lib/database";
import { Book, bookReadToBoolean } from "@/lib/database.types";
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
    rating: number; // Required since we always provide a default value
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
      read: boolean; // Required since we always provide a default value
      rating: number; // Required since we always provide a default value
    }>
  ) => {
    try {
      setError(null);
      const bookUpdate: any = {};

      if (updates.title !== undefined) bookUpdate.title = updates.title;
      if (updates.cover !== undefined)
        bookUpdate.cover = updates.cover || "/placeholder.svg";
      if (updates.pages !== undefined) bookUpdate.pages = updates.pages || 0;
      if (updates.read !== undefined) bookUpdate.read = updates.read ? 1 : 0;
      if (updates.rating !== undefined) bookUpdate.rating = updates.rating || 0;

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

  // Toggle read status
  const toggleReadStatus = async (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return false;

    const newReadStatus = !bookReadToBoolean(book.read);
    const result = await updateBook(bookId, { read: newReadStatus });
    return result !== null;
  };

  // Update rating
  const updateRating = async (bookId: string, rating: number) => {
    const result = await updateBook(bookId, { rating });
    return result !== null;
  };

  // Get books by status
  const getBooksByStatus = (read: boolean) => {
    return books.filter((book) => bookReadToBoolean(book.read) === read);
  };

  // Get books by rating
  const getBooksByRating = (minRating: number) => {
    return books.filter((book) => book.rating && book.rating >= minRating);
  };

  // Get read books
  const getReadBooks = () => getBooksByStatus(true);

  // Get unread books
  const getUnreadBooks = () => getBooksByStatus(false);

  // Get highly rated books (4+ stars)
  const getHighlyRatedBooks = () => getBooksByRating(4);

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
    toggleReadStatus,
    updateRating,

    // Computed values
    getBooksByStatus,
    getBooksByRating,
    getReadBooks,
    getUnreadBooks,
    getHighlyRatedBooks,

    // Statistics
    totalBooks: books.length,
    readBooks: getReadBooks().length,
    unreadBooks: getUnreadBooks().length,
    averageRating:
      books.length > 0
        ? books.reduce((sum, book) => sum + (book.rating || 0), 0) /
          books.filter((book) => book.rating).length
        : 0,
  };
}
