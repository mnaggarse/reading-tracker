import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import supabase from "../utils/supabase";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");

  const [books, setBooks] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

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

  if (loadingUser || user === null) {
    // Show nothing or a spinner while checking auth
    return null;
  }

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
    } catch (error) {
      throw new Error("Error fetching books: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (book) => {
    if (!user) {
      alert("You must be logged in to add a book.");

      return;
    }

    const { error } = await supabase
      .from("books")
      .insert({
        title: book.title,
        author: book.author_name?.[0] || null,
        cover: book.cover_i
          ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://placehold.co/300x400?text=No+Cover",
        user_id: user.id,
      })
      .select();

    if (error) {
      throw new Error("Error adding book: " + error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen pt-12 p-6 mx-auto max-w-5xl">
      <Form className="w-full flex flex-row gap-4" onSubmit={handleSearch}>
        <Input
          isDisabled={loading}
          placeholder="Search for a book"
          size="lg"
          value={searchText}
          variant="bordered"
          onValueChange={setSearchText}
        />
        <Button
          className="font-bold"
          color="primary"
          isDisabled={loading}
          size="lg"
          type="submit"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Form>

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

      <div className="py-8 columns-2 md:columns-3 lg:columns-4 gap-4">
        {books.map((book, index) => (
          <Card
            key={index}
            fullWidth
            isPressable
            className="mb-4 cursor-pointer"
            onPress={() => handleAdd(book)}
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
}
