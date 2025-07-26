export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string | null;
          email: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string;
          created_at?: string;
        };
      };
      books: {
        Row: {
          id: string;
          title: string;
          cover: string | null;
          read: number; // Number of pages read (0 = unread, >0 = pages read)
          pages: number;
          created_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          title: string;
          cover: string; // Required since database has NOT NULL constraint
          read: number; // Required since database has NOT NULL constraint
          pages: number; // Required since database has NOT NULL constraint
          created_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          title?: string;
          cover?: string | null;
          read?: number;
          pages?: number;
          created_at?: string;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience types for common operations
export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export type Book = Database["public"]["Tables"]["books"]["Row"];
export type BookInsert = Database["public"]["Tables"]["books"]["Insert"];
export type BookUpdate = Database["public"]["Tables"]["books"]["Update"];

// Extended types for the application
export interface BookWithUser extends Book {
  users: User;
}

// Form types for easier handling
export interface BookFormData {
  title: string;
  cover: string; // Required since we always provide a default value
  pages: number; // Required since we always provide a default value
  read: number; // Number of pages read (0 = unread, >0 = pages read)
}

export interface UserFormData {
  name?: string;
  email: string;
}

// Helper functions for read status conversion
export const isBookRead = (read: number): boolean => read > 0;
export const isBookCompleted = (read: number, pages: number): boolean => read >= pages && pages > 0;
