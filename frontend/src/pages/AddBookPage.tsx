import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";

import supabase from "@/utils/supabase";
import { useNavigate } from "react-router-dom";

export default function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState();
  const [cover, setCover] = useState("");
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error getting user:", error);
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
  }, [loadingUser, user]);

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
              size="lg"
              type="text"
              value={cover}
              variant="bordered"
              placeholder="https://placehold.co/300x400?text=Cover"
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
