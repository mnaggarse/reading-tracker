import { useEffect, useState } from "react";

import AddButton from "../components/AddButton";
import BookCard from "../components/BookCard";
import Nav from "../components/Nav";
import { UserAuth } from "../context/AuthContext";
import supabase from "../utils/supabase";

const HomePage = () => {
  const { session } = UserAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error fetching books:", error);
      } else {
        setBooks(data);
      }
    };

    fetchBooks();
  }, [session]);

  return (
    <>
      <Nav />

      <div className="p-6 mx-auto max-w-5xl columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>

      <AddButton />
    </>
  );
};

export default HomePage;
