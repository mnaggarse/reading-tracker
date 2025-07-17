import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Progress } from "@heroui/progress";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddButton from "@/components/AddButton";
import Nav from "@/components/Nav";
import supabase from "@/utils/supabase";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    pages: "",
    read: "",
    cover: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Nav />

      <div className="p-6 mx-auto max-w-5xl columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8">
        {books.map((book, index) => (
          <Card
            key={index}
            fullWidth
            isPressable
            className="cursor-pointer mb-4"
            isDisabled={(book.read / book.pages) * 100 === 100}
            onPress={() => {
              setSelectedBook(book);
              setFormValues({
                title: book.title || "",
                author: book.author || "",
                cover: book.cover || "",
                pages: book.pages || 0,
                read: book.read || 0,
              });
              onOpen();
            }}
          >
            <CardHeader>
              <Image src={book.cover} width={500} />
            </CardHeader>
            <CardBody className="pt-0">
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p>{book.author}</p>
              <Progress
                className="mt-2"
                color={
                  (book.read / book.pages) * 100 === 100 ? "success" : "primary"
                }
                value={(book.read / book.pages) * 100}
              />
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal
        className="w-[90%]"
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Book</ModalHeader>
              <ModalBody className="flex gap-4">
                <Input
                  label="Title"
                  labelPlacement="outside-top"
                  name="title"
                  size="lg"
                  value={formValues.title}
                  variant="bordered"
                  onChange={handleInputChange}
                />
                <Input
                  label="Author"
                  labelPlacement="outside-top"
                  name="author"
                  size="lg"
                  value={formValues.author}
                  variant="bordered"
                  onChange={handleInputChange}
                />
                <Input
                  label="Pages"
                  labelPlacement="outside-top"
                  name="pages"
                  size="lg"
                  type="number"
                  value={formValues.pages}
                  variant="bordered"
                  onChange={handleInputChange}
                />
                <Input
                  label="Read"
                  labelPlacement="outside-top"
                  name="read"
                  size="lg"
                  type="number"
                  value={formValues.read}
                  variant="bordered"
                  onChange={handleInputChange}
                />
                <Input
                  label="Cover"
                  labelPlacement="outside-top"
                  name="cover"
                  size="lg"
                  type="text"
                  value={formValues.cover}
                  variant="bordered"
                  onChange={handleInputChange}
                />
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button
                  color="danger"
                  size="lg"
                  variant="flat"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  size="lg"
                  onPress={async () => {
                    if (!selectedBook) return;

                    const updatedBook = {
                      title: formValues.title,
                      author: formValues.author,
                      cover: formValues.cover,
                      pages: parseInt(formValues.pages),
                      read: parseInt(formValues.read),
                    };

                    const { error } = await supabase
                      .from("books")
                      .update(updatedBook)
                      .eq("id", selectedBook.id)
                      .eq("user_id", user.id); // ensure user owns the book

                    if (error) {
                      console.error("Failed to update book:", error.message);

                      return;
                    }

                    // Update book in UI
                    setBooks((prevBooks) =>
                      prevBooks.map((b) =>
                        b.id === selectedBook.id ? { ...b, ...updatedBook } : b
                      )
                    );

                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <AddButton />
    </>
  );
}
