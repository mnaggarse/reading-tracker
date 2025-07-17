import { Button, Card, CardBody, CardHeader, Form, Input } from "@heroui/react";
import { useState } from "react";

export default function AddBookPage() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    pages: "",
    cover: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
    console.log(book);
  }

  return (
    <div className="p-6 h-screen overflow-hidden flex items-center justify-center">
      <Card className="p-4 w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4 mx-auto">Add Book</h1>
        </CardHeader>

        <CardBody>
          <Form className="gap-4">
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
              placeholder="https://placehold.co/300x400?text=No+Cover"
              labelPlacement="outside-top"
              value={book.cover}
              onChange={handleInputChange}
            />

            <Button
              fullWidth
              className="mt-2 font-bold"
              color="primary"
              size="lg"
              type="submit"
            >
              Add
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
