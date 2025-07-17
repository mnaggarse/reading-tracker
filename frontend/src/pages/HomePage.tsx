import { useEffect, useState } from "react";

import AddButton from "@/components/AddButton";
import { BookCard } from "@/components/BookCard";
import Nav from "@/components/Nav";
import supabase from "@/utils/supabase";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error getting user:", error);
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
  }, [loadingUser, user]);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    const fetchBooks = async () => {
      const { data: booksData } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", user.id);

      setBooks(booksData);
    };
    fetchBooks();

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <Nav />
      <div className="p-6 mx-auto max-w-5xl columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8">
        <Button onPress={handleLogout}>Hello</Button>
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
