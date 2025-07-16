import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Progress } from "@heroui/progress";

export function BookCard({ book }) {
  const progress = (book.read / book.pages) * 100;

  return (
    <Card
      fullWidth
      isPressable
      className="cursor-pointer"
      isDisabled={progress === 100}
    >
      <CardHeader className="w-full">
        <Image className="object-cover w-full" src={book.cover} />
      </CardHeader>
      <CardBody className="pt-0">
        <h2 className="text-lg font-bold">{book.title}</h2>
        <p>{book.author}</p>
        <Progress
          className="mt-2"
          color={progress === 100 ? "success" : "primary"}
          value={progress}
        />
      </CardBody>
    </Card>
  );
}
