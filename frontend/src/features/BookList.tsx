import { BookCard } from "@/components/BookCard";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from("books").select("*");

    if (error) {
      console.error("Error fetching books:", error);
    } else {
      setBooks(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6 mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
