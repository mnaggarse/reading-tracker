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
    <div className="p-6 mx-auto max-w-5xl columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8">
      {books.map((book) => (
        <div key={book.id} className="mb-4">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}
