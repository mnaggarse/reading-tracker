import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const Error404Page = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg">Page Not Found</p>
        <Button
          color="primary"
          size="lg"
          className="mt-6 font-bold"
          onPress={() => navigate("/")}
        >
          Go back
        </Button>
      </div>
    </div>
  );
};

export default Error404Page;
