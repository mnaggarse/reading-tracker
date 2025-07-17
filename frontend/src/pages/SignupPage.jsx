import { Button, Card, CardBody, CardHeader, Form, Input } from "@heroui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signup } = UserAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signup({ username, email, password });

      if (result.success) {
        navigate("/");
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-screen overflow-hidden flex items-center justify-center">
      <Card className="p-4 w-full max-w-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4 mx-auto">Signup</h1>
        </CardHeader>

        <CardBody>
          <Form onSubmit={handleSignup} className="gap-4">
            <Input
              required
              type="text"
              label="Name"
              size="lg"
              variant="bordered"
              placeholder="John Doe"
              labelPlacement="outside-top"
              value={username}
              onValueChange={setUsername}
            />

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
              isDisabled={loading}
              type="submit"
              size="lg"
              color="primary"
              className="mt-2 font-bold"
            >
              {loading ? "Please wait..." : "Create account"}
            </Button>

            {/* <Button
              fullWidth
              size="lg"
              variant="bordered"
              className="font-bold"
            >
              <GoogleIcon />
              Continue with Google
            </Button> */}

            <div className="w-full flex items-center justify-center gap-1">
              <p>Already have an account?</p>

              <Link className="text-blue-600 font-bold" to="/login">
                login
              </Link>
            </div>

            {error && (
              <p className="text-red-600 mx-auto text-center">{error}</p>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignupPage;
