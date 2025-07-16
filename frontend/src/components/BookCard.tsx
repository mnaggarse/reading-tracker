import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Progress } from "@heroui/progress";

export function BookCard() {
  return (
    <Card fullWidth isPressable>
      <CardHeader>
        <Image src="https://tmm.chicagodistributioncenter.com/IsbnImages/9780226822952.jpg" />
      </CardHeader>
      <CardBody className="pt-0">
        <h2 className="text-lg font-bold">Atomic Habits</h2>
        <p>James Clear</p>
        <Progress className="mt-2" value={30} />
      </CardBody>
    </Card>
  );
}
