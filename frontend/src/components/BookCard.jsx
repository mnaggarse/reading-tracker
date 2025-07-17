import { Card, CardBody, CardHeader, Progress } from "@heroui/react";

export default function BookCard({ book }) {
  const progress = (book.read / book.pages) * 100;
  return (
    <Card
      fullWidth
      isPressable
      className="cursor-pointer mb-4"
      isDisabled={progress === 100}
    >
      <CardHeader>
        <Image src={book.cover} width={500} />
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
