import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="p-6 h-screen overflow-hidden flex items-center justify-center">
      <Card className="p-4 w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4 mx-auto">Signup</h1>
        </CardHeader>
        <CardBody>
          <Form className="gap-4">
            <div className="flex gap-4">
              <Input
                label="First name"
                labelPlacement="outside-top"
                placeholder="John"
                size="lg"
                type="text"
                variant="bordered"
              />
              <Input
                label="Last name"
                labelPlacement="outside-top"
                placeholder="Doe"
                size="lg"
                type="text"
                variant="bordered"
              />
            </div>
            <Input
              label="Email"
              labelPlacement="outside-top"
              placeholder="johndoe@gmail.com"
              size="lg"
              type="email"
              variant="bordered"
            />
            <Input
              label="Password"
              labelPlacement="outside-top"
              placeholder="jo******"
              size="lg"
              type="password"
              variant="bordered"
            />
            <Button
              fullWidth
              className="mx-auto mt-2 font-bold"
              color="primary"
              size="lg"
            >
              Create account
            </Button>
            <Button
              fullWidth
              className="mx-auto font-bold"
              size="lg"
              variant="bordered"
            >
              <svg
                height="20"
                viewBox="0 0 48 48"
                width="20"
                x="0px"
                xmlns="http://www.w3.org/2000/svg"
                y="0px"
              >
                <path
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  fill="#FFC107"
                />
                <path
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  fill="#FF3D00"
                />
                <path
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  fill="#4CAF50"
                />
                <path
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  fill="#1976D2"
                />
              </svg>
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
