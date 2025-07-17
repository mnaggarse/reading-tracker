import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Slider,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import BookCard from "../components/BookCard";
import Nav from "../components/Nav";
import { UserAuth } from "../context/AuthContext";
import supabase from "../utils/supabase";

const HomePage = () => {
  const { session } = UserAuth();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [readValue, setReadValue] = useState(0);
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

  const handleSave = async (onClose) => {
    if (!selectedBook) return;

    const { error } = await supabase
      .from("books")
      .update({ read: readValue })
      .eq("id", selectedBook.id)
      .select();

    if (error) {
      console.error("Error updating book:", error);
    } else {
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === selectedBook.id ? { ...b, read: readValue } : b
        )
      );
    }

    onClose();
  };

  return (
    <>
      <Nav />

      <div className="p-6 mx-auto max-w-5xl columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-8">
        {books.map((book, index) => (
          <BookCard key={index} book={book} onPress={() => handlePress(book)} />
        ))}

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
                  Pages you have read
                </ModalHeader>

                <ModalBody>
                  {selectedBook && (
                    <Slider
                      value={readValue}
                      onChange={setReadValue}
                      minValue={0}
                      maxValue={selectedBook.pages || 0}
                      showTooltip={true}
                      step={1}
                      tooltipProps={{ style: { fontWeight: "bold" } }}
                      size="lg"
                      marks={[
                        { value: 0, label: 0 },
                        {
                          value: selectedBook.pages,
                          label: selectedBook.pages,
                        },
                      ]}
                    />
                  )}
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

      <AddButton />
    </>
  );
};

export default HomePage;
