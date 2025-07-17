import { Button, Card, CardBody, CardHeader, Form, Input } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import supabase from "../utils/supabase";

const AddBookPage = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    pages: "",
    cover: "",
  });

  const navigate = useNavigate();
  const { session } = UserAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("books").insert({
      ...book,
      cover: book.cover
        ? book.cover
        : "https://placehold.co/200x300?text=No+Cover",
      pages: book.pages ? book.pages : 0,
      user_id: session.user.id,
    });

    if (error) {
      console.error("Error adding book:", error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="p-6 h-screen overflow-hidden flex items-center justify-center">
      <Card className="p-4 w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4 mx-auto">Add Book</h1>
        </CardHeader>

        <CardBody>
          <Form className="gap-4" onSubmit={handleAdd}>
            <Input
              required
              type="text"
              name="title"
              label="Title"
              size="lg"
              variant="bordered"
              placeholder="Atomic Habits"
              labelPlacement="outside-top"
              value={book.title}
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
              value={book.author}
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
              value={book.pages}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="cover"
              label="Cover Link"
              size="lg"
              variant="bordered"
              placeholder="https://placehold.co/200x300?text=No+Cover"
              labelPlacement="outside-top"
              value={book.cover}
              onChange={handleInputChange}
            />

            <Button
              fullWidth
              type="submit"
              size="lg"
              color="primary"
              className="mt-2 font-bold"
            >
              Add
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddBookPage;
