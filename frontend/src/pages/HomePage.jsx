import { useState } from "react";

import AddButton from "../components/AddButton";
import BookCard from "../components/BookCard";
import Nav from "../components/Nav";

const HomePage = () => {
  const [books, _setBooks] = useState([]);

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
