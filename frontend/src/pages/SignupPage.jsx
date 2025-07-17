import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleIcon } from "../components/icons";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="p-6 h-screen overflow-hidden flex items-center justify-center">
      <Card className="p-4 w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4 mx-auto">Signup</h1>
        </CardHeader>

        <CardBody>
          <Form className="gap-4">
            <Input
              required
              type="email"
              label="Email"
              size="lg"
              variant="bordered"
              placeholder="johndoe@gmail.com"
              labelPlacement="outside-top"
              value={email}
              onValueChange={setEmail}
            />

            <Input
              required
              type="password"
              label="Password"
              size="lg"
              variant="bordered"
              placeholder="jo******"
              labelPlacement="outside-top"
              value={password}
              onValueChange={setPassword}
            />

            <Button
              fullWidth
              className="mt-2 font-bold"
              color="primary"
              size="lg"
              type="submit"
            >
              Create account
            </Button>

            <Button
              fullWidth
              className="font-bold"
              size="lg"
              variant="bordered"
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <div className="w-full flex items-center justify-center gap-1">
              <p>Already have an account?</p>

              <Link className="text-blue-600 font-bold" to="/login">
                login
              </Link>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
