import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { useState } from "react";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false); // 👈

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = searchText.trim().replace(/\s+/g, "+").toLowerCase();

    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=10`
      );
      const data = await response.json();
      setBooks(data.docs);
      setHasSearched(true);
      console.log(data.docs);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-6 mx-auto max-w-5xl">
      <Form className="w-full flex flex-row gap-4" onSubmit={handleSearch}>
        <Input
          placeholder="Search for a book"
          size="lg"
          value={searchText}
          variant="bordered"
          onValueChange={setSearchText}
          isDisabled={loading}
        />
        <Button
          className="font-bold"
          color="primary"
          size="lg"
          type="submit"
          isDisabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Form>

      {/* Message logic */}
      {!hasSearched && (
        <p className="text-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-gray-500 py-8">
          Start by searching for a book.
        </p>
      )}

      {hasSearched && books.length === 0 && (
        <p className="text-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-gray-500 py-8">
          No books found.
        </p>
      )}

      {/* Results */}
      <div className="py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book, index) => (
          <Image
            key={index}
            className="cursor-pointer"
            height={300}
            shadow="sm"
            src={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
            width={200}
          />
        ))}
      </div>
    </div>
  );
}
