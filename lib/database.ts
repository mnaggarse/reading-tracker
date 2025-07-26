import {
  Book,
  BookInsert,
  BookUpdate,
  User,
  UserInsert,
  UserUpdate,
} from "./database.types";
import { supabase } from "./supabase";

// Test database connectivity
export const testDatabaseConnection = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("books")
        .select("count")
        .limit(1);

      if (error) {
        console.error("Database connection test failed:", error);
        return false;
      }

      return true;
    } else {
      console.error("No authenticated user for database test");
      return false;
    }
  } catch (error) {
    console.error("Database test error:", error);
    return false;
  }
};

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
      .order("order", { ascending: true })
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
  async addBook(bookData: {
    title: string;
    cover: string; // Required since we always provide a default value
    pages: number; // Required since we always provide a default value
    read: number; // Number of pages read (0 = unread, >0 = pages read)
  }): Promise<Book | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      console.error("No authenticated user found");
      return null;
    }

    // Get the highest order number to place new book at the end
    const { data: existingBooks } = await supabase
      .from("books")
      .select("order")
      .eq("user_id", user.id)
      .order("order", { ascending: false })
      .limit(1);

    const nextOrder =
      existingBooks && existingBooks.length > 0
        ? (existingBooks[0].order || 0) + 1
        : 0;

    const newBook: BookInsert = {
      title: bookData.title,
      cover: bookData.cover || "/placeholder.svg", // Provide default cover image
      pages: bookData.pages || 1, // Default to 1 page
      read: bookData.read || 0, // Default to 0 pages read (unread)
      order: nextOrder,
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
    return this.updateBook(bookId, { read: read ? 1 : 0 });
  },

  // Update book order for drag and drop
  async updateBookOrder(
    bookId: string,
    newOrder: number
  ): Promise<Book | null> {
    return this.updateBook(bookId, { order: newOrder });
  },

  // Reorder multiple books (for drag and drop)
  async reorderBooks(
    bookOrders: { id: string; order: number }[]
  ): Promise<boolean> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    try {
      // Update each book's order
      for (const { id, order } of bookOrders) {
        const { error } = await supabase
          .from("books")
          .update({ order })
          .eq("id", id)
          .eq("user_id", user.id);

        if (error) {
          console.error("Error updating book order:", error);
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error("Error reordering books:", error);
      return false;
    }
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
      .eq("read", read ? 1 : 0)
      .order("order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching books by status:", error);
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
      read: book.read,
    };
  },

  // Convert form data to database insert
  toInsertData(formData: {
    title: string;
    cover: string; // Required since we always provide a default value
    pages?: number;
    read?: number;
  }) {
    return {
      title: formData.title,
      cover: formData.cover || "/placeholder.svg", // Provide default cover image
      pages: formData.pages || 1, // Default to 1 page
      read: formData.read || 0, // Default to 0 pages read (unread)
    };
  },
};

// Initialize order for existing books
export const initializeBookOrders = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    // Get all books without order - use a different approach
    const { data: allBooks, error: fetchError } = await supabase
      .from("books")
      .select("id, created_at, order")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (fetchError) {
      console.error("Error fetching books:", fetchError);
      return false;
    }

    if (allBooks) {
      // Filter books without order and update them
      const booksWithoutOrder = allBooks.filter((book) => book.order === null);
      
      if (booksWithoutOrder.length > 0) {
        // Get the highest existing order to continue from there
        const booksWithOrder = allBooks.filter((book) => book.order !== null);
        const maxOrder = booksWithOrder.length > 0 
          ? Math.max(...booksWithOrder.map(book => book.order || 0))
          : -1;
        
        // Update each book with an order based on creation date
        for (let i = 0; i < booksWithoutOrder.length; i++) {
          const { error: updateError } = await supabase
            .from("books")
            .update({ order: maxOrder + 1 + i })
            .eq("id", booksWithoutOrder[i].id)
            .eq("user_id", user.id);

          if (updateError) {
            console.error("Error updating book order:", updateError);
            return false;
          }
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error initializing book orders:", error);
    return false;
  }
};
