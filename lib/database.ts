import {
  Book,
  BookInsert,
  BookUpdate,
  User,
  UserInsert,
  UserUpdate,
  bookReadToBoolean,
  booleanToBookRead,
} from "./database.types";
import { supabase } from "./supabase";

// User operations
export const userService = {
  // Get current user profile
  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }

    return data;
  },

  // Create or update user profile
  async upsertUser(userData: UserInsert): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .upsert(userData, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("Error upserting user:", error);
      return null;
    }

    return data;
  },

  // Update user profile
  async updateUser(id: string, updates: UserUpdate): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating user:", error);
      return null;
    }

    return data;
  },
};

// Book operations (user-specific)
export const bookService = {
  // Get all books for current user
  async getUserBooks(): Promise<Book[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching books:", error);
      return [];
    }

    return data || [];
  },

  // Get a specific book by ID (user-specific)
  async getBook(bookId: string): Promise<Book | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", bookId)
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching book:", error);
      return null;
    }

    return data;
  },

  // Add a new book for current user
  async addBook(bookData: Omit<BookInsert, "user_id">): Promise<Book | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const newBook: BookInsert = {
      ...bookData,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("books")
      .insert(newBook)
      .select()
      .single();

    if (error) {
      console.error("Error adding book:", error);
      return null;
    }

    return data;
  },

  // Update a book (user-specific)
  async updateBook(bookId: string, updates: BookUpdate): Promise<Book | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("books")
      .update(updates)
      .eq("id", bookId)
      .eq("user_id", user.id) // Ensure user owns the book
      .select()
      .single();

    if (error) {
      console.error("Error updating book:", error);
      return null;
    }

    return data;
  },

  // Delete a book (user-specific)
  async deleteBook(bookId: string): Promise<boolean> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", bookId)
      .eq("user_id", user.id); // Ensure user owns the book

    if (error) {
      console.error("Error deleting book:", error);
      return false;
    }

    return true;
  },

  // Mark book as read/unread
  async toggleReadStatus(bookId: string, read: boolean): Promise<Book | null> {
    return this.updateBook(bookId, { read: booleanToBookRead(read) });
  },

  // Update book rating
  async updateRating(bookId: string, rating: number): Promise<Book | null> {
    return this.updateBook(bookId, { rating });
  },

  // Get books by read status
  async getBooksByStatus(read: boolean): Promise<Book[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user.id)
      .eq("read", booleanToBookRead(read))
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching books by status:", error);
      return [];
    }

    return data || [];
  },

  // Get books by rating
  async getBooksByRating(minRating: number): Promise<Book[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("user_id", user.id)
      .gte("rating", minRating)
      .order("rating", { ascending: false });

    if (error) {
      console.error("Error fetching books by rating:", error);
      return [];
    }

    return data || [];
  },
};

// Helper functions for form data conversion
export const bookHelpers = {
  // Convert database book to form data
  toFormData(book: Book) {
    return {
      title: book.title,
      cover: book.cover || "",
      pages: book.pages,
      read: bookReadToBoolean(book.read),
      rating: book.rating || undefined,
    };
  },

  // Convert form data to database insert
  toInsertData(formData: {
    title: string;
    cover?: string;
    pages: number;
    read: boolean;
    rating?: number;
  }) {
    return {
      title: formData.title,
      cover: formData.cover || null,
      pages: formData.pages,
      read: booleanToBookRead(formData.read),
      rating: formData.rating || null,
    };
  },
};
