import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  Image,
  Input,
} from "@heroui/react";
import { useState } from "react";

const SearchBookPage = () => {
  const [searchText, setSearchText] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const query = searchText.trim().replace(/\s+/g, "+").toLowerCase();
    if (!query) return;

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=10`
      );
      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="w-full min-h-screen pt-12 p-6 mx-auto max-w-5xl">
      <Form className="w-full flex flex-row gap-4" onSubmit={handleSearch}>
        <Input
          placeholder="Search for a book"
          size="lg"
          value={searchText}
          variant="bordered"
          onValueChange={setSearchText}
        />

        <Button className="font-bold" color="primary" size="lg" type="submit">
          Search
        </Button>
      </Form>

      <div className="py-8 columns-2 md:columns-3 lg:columns-4 gap-4">
        {books.map((book, index) => (
          <Card
            key={index}
            fullWidth
            isPressable
            className="mb-4 cursor-pointer"
          >
            <CardHeader>
              <Image
                src={
                  book.cover_i
                    ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                    : "https://placehold.co/300x400?text=No+Cover"
                }
                width={500}
              />
            </CardHeader>

            <CardBody className="pt-0">
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p>{book.author_name?.[0] || "Unknown Author"}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchBookPage;
