import { Button } from "@heroui/button";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AddButton from "@/components/AddButton";
import { BookCard } from "@/components/BookCard";
import Nav from "@/components/Nav";
import supabase from "@/utils/supabase";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setUser(null); // Don't throw, just treat as not logged in
        setLoadingUser(false);

        return;
      }
      setUser(data?.user ?? null);
      setLoadingUser(false);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (!loadingUser && user === null) {
      navigate("/login");
    }
  }, [loadingUser, user, navigate]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch books whenever user or location changes
  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return;
      const { data: booksData } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", user.id);

      setBooks(booksData ?? []);
    };

    fetchBooks();
  }, [user, location]);

  if (loadingUser || user === null) {
    // Show nothing or a spinner while checking auth
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <Nav />
      <div className="p-6 mx-auto max-w-5xl columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8">
        <Button className="fixed top-3 left-45 z-50" onPress={handleLogout}>
          Logout
        </Button>
        {books.map((book) => (
          <div key={book.id} className="mb-4">
            <BookCard book={book} />
          </div>
        ))}
      </div>
      <AddButton />
    </>
  );
}
