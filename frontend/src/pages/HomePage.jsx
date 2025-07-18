import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  useDisclosure,
} from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import Nav from "../components/Nav";
import { UserAuth } from "../context/AuthContext";
import supabase from "../utils/supabase";

const HomePage = () => {
  const { session } = UserAuth();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [readValue, setReadValue] = useState(0);
  const [valueChanged, setValueChanged] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    if (session?.user?.id) {
      fetchBooks();
    }
  }, [session]);

  const handlePress = (book) => {
    onOpen();
    setSelectedBook(book);
    setReadValue(book.read || 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedBook((prev) => {
      const updated = {
        ...prev,
        [name]: name === "pages" ? parseInt(value || 0, 10) : value,
      };

      if (name === "pages" && readValue > updated.pages) {
        setReadValue(updated.pages);
      }

      return updated;
    });
  };

  const handleSave = async (onClose) => {
    if (!selectedBook) return;

    const updatedBook = {
      title: selectedBook.title,
      author: selectedBook.author,
      pages: selectedBook.pages || 1,
      cover: selectedBook.cover || "https://placehold.co/200x300?text=No+Cover",
      read: readValue,
    };

    const { error } = await supabase
      .from("books")
      .update(updatedBook)
      .eq("id", selectedBook.id);

    if (error) {
      console.error("Error updating book:", error);
    } else {
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === selectedBook.id ? { ...selectedBook, ...updatedBook } : b
        )
      );
    }

    onClose();
  };

  const handleReadValueChange = (value) => {
    setReadValue(value);
    setValueChanged(true);
    setTimeout(() => setValueChanged(false), 1000);
  };

  return (
    <>
      <Nav />

      <div className="p-6 mx-auto max-w-5xl columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8">
        {books.length === 0 ? (
          <p className="text-xl text-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            No books found. Click the "+" button to add your first book.
          </p>
        ) : (
          books.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              onPress={() => handlePress(book)}
            />
          ))
        )}

        <Modal
          isOpen={isOpen}
          placement="center"
          onOpenChange={onOpenChange}
          className="w-[90%]"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="mb-6 mx-auto text-xl">
                  Edit Book
                </ModalHeader>

                <ModalBody>
                  <Input
                    required
                    type="text"
                    name="title"
                    label="Title"
                    size="lg"
                    variant="bordered"
                    placeholder="Atomic Habits"
                    labelPlacement="outside-top"
                    value={selectedBook?.title || ""}
                    onChange={handleInputChange}
                  />

                  <Input
                    type="text"
                    name="author"
                    label="Author"
                    size="lg"
                    variant="bordered"
                    placeholder="James Clear"
                    labelPlacement="outside-top"
                    value={selectedBook?.author || ""}
                    onChange={handleInputChange}
                  />

                  <Input
                    type="number"
                    name="pages"
                    label="Pages"
                    size="lg"
                    variant="bordered"
                    placeholder="320"
                    labelPlacement="outside-top"
                    value={selectedBook?.pages || ""}
                    onChange={handleInputChange}
                    min={1}
                  />

                  <Input
                    type="text"
                    name="cover"
                    label="Cover Link"
                    size="lg"
                    variant="bordered"
                    placeholder="https://placehold.co/200x300?text=No+Cover"
                    labelPlacement="outside-top"
                    value={selectedBook?.cover || ""}
                    onChange={handleInputChange}
                  />

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <Button
                      isIconOnly
                      radius="full"
                      variant="flat"
                      onPress={() =>
                        handleReadValueChange(Math.max(0, readValue - 1))
                      }
                    >
                      <Minus />
                    </Button>

                    <Slider
                      value={readValue}
                      onChange={handleReadValueChange}
                      minValue={0}
                      maxValue={selectedBook?.pages || 1}
                      size="lg"
                      hideValue
                      className="mt-4"
                      showTooltip
                      step={1}
                      tooltipProps={{
                        style: { fontWeight: "bold" },
                        isOpen: valueChanged,
                      }}
                      marks={[
                        { value: 0, label: 0 },
                        {
                          value: selectedBook?.pages || 0,
                          label: selectedBook?.pages || 0,
                        },
                      ]}
                    />

                    <Button
                      isIconOnly
                      radius="full"
                      variant="flat"
                      onPress={() =>
                        handleReadValueChange(
                          Math.min(selectedBook?.pages || 1, readValue + 1)
                        )
                      }
                    >
                      <Plus />
                    </Button>
                  </div>
                </ModalBody>

                <ModalFooter className="flex justify-between gap-4">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>

                  <Button color="primary" onPress={() => handleSave(onClose)}>
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default HomePage;
