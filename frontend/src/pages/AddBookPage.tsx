import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import supabase from "@/utils/supabase";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [cover, setCover] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setUser(null);
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

  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    const { error } = await supabase.from("books").insert([
      {
        title,
        author,
        pages: pages ? Number(pages) : 0,
        cover,
        user_id: user?.id,
      },
    ]);

    if (error) {
      alert("Failed to add book: " + error.message);

      return;
    }

    navigate("/");
  }

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
              label="Title"
              labelPlacement="outside-top"
              placeholder="Atomic Habits"
              size="lg"
              type="text"
              value={title}
              variant="bordered"
              onValueChange={setTitle}
            />
            <Input
              label="Author"
              labelPlacement="outside-top"
              placeholder="James Clear"
              size="lg"
              type="text"
              value={author}
              variant="bordered"
              onValueChange={setAuthor}
            />
            <Input
              label="Pages"
              labelPlacement="outside-top"
              placeholder="320"
              size="lg"
              type="number"
              value={pages}
              variant="bordered"
              onValueChange={setPages}
            />
            <Input
              label="Cover Link"
              labelPlacement="outside-top"
              placeholder="https://placehold.co/300x400?text=No+Cover"
              size="lg"
              type="text"
              value={cover}
              variant="bordered"
              onValueChange={setCover}
            />
            <Button
              fullWidth
              className="mx-auto mt-2 font-bold"
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
